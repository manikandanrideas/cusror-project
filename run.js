const { spawn } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
const envArg = args.find(arg => arg.startsWith('--env='));
const specArg = args.find(arg => arg.startsWith('--spec='));

const env = envArg ? envArg.split('=')[1] : 'dev';
const specFile = specArg ? specArg.split('=')[1] : null;

// Remove --env and --spec arguments from args array
const playwrightArgs = args.filter(arg => 
    !arg.startsWith('--env=') && !arg.startsWith('--spec=')
);

// Add spec file to args if specified
if (specFile) {
    playwrightArgs.push(`src/tests/${specFile}`);
}

// Create environment object with TEST_ENV
const envWithTestEnv = {
    ...process.env,
    TEST_ENV: env
};

console.log(`Setting TEST_ENV to: ${env}`);

// Run playwright test
const playwright = spawn('npx', ['playwright', 'test', ...playwrightArgs], { 
    stdio: 'inherit',
    env: envWithTestEnv,
    shell: true
});

playwright.on('close', (code) => {
    process.exit(code);
}); 