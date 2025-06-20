const { spawn } = require('child_process');
const net = require('net');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function killProcessOnPort(port) {
  try {
    // For Windows
    if (process.platform === 'win32') {
      const { stdout } = await execPromise(`netstat -ano | findstr :${port}`);
      const lines = stdout.split('\n');
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length > 4) {
          const pid = parts[parts.length - 1];
          if (pid) {
            try {
              await execPromise(`taskkill /F /PID ${pid}`);
              console.log(`Killed process ${pid} on port ${port}`);
              // Wait for the process to be fully terminated
              await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (error) {
              console.log(`Process ${pid} already terminated`);
            }
          }
        }
      }
    } else {
      // For Unix-based systems
      const { stdout } = await execPromise(`lsof -i :${port} -t`);
      if (stdout.trim()) {
        await execPromise(`kill -9 ${stdout.trim()}`);
        console.log(`Killed process ${stdout.trim()} on port ${port}`);
        // Wait for the process to be fully terminated
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  } catch (error) {
    // Ignore errors if no process is found
    if (!error.message.includes('no process')) {
      console.error('Error killing process:', error);
    }
  }
}

function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => {
        server.close();
        resolve(true);
      })
      .once('listening', () => {
        server.close();
        resolve(false);
      })
      .listen(port);
  });
}

async function findAvailablePort(startPort, maxRetries = 3) {
  let port = startPort;
  let retries = 0;

  while (retries < maxRetries) {
    if (await isPortInUse(port)) {
      console.log(`Port ${port} is in use, attempting to free it...`);
      await killProcessOnPort(port);
      
      // Wait for the port to be released
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!(await isPortInUse(port))) {
        console.log(`Port ${port} is now available`);
        return port;
      }
      
      retries++;
      if (retries < maxRetries) {
        console.log(`Retrying port ${port} (attempt ${retries + 1}/${maxRetries})...`);
      }
    } else {
      return port;
    }
  }

  // If we've exhausted retries, try the next port
  console.log(`Could not free port ${port}, trying next port...`);
  return findAvailablePort(port + 1, maxRetries);
}

async function showReport() {
  try {
    const defaultPort = 9323;
    console.log('Checking for existing report server...');
    const port = await findAvailablePort(defaultPort);
    
    console.log(`Starting Playwright report server on port ${port}...`);
    
    const playwright = spawn('npx', ['playwright', 'show-report', '--port', port.toString()], {
      stdio: 'inherit',
      shell: true
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      console.log('\nStopping report server...');
      await killProcessOnPort(port);
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\nStopping report server...');
      await killProcessOnPort(port);
      process.exit(0);
    });

    playwright.on('close', async (code) => {
      if (code !== 0) {
        console.error(`Playwright report server exited with code ${code}`);
      }
      await killProcessOnPort(port);
    });

  } catch (error) {
    console.error('Error starting report server:', error);
    process.exit(1);
  }
}

showReport(); 