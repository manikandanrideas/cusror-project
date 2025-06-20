# Playwright Test Automation

This project contains automated tests using Playwright for web application testing.

## Prerequisites

- Node.js (v20 or higher)
- npm (comes with Node.js)
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Using run.js (Recommended)

```bash
# Run all tests in dev environment (default)
node run.js --project=edge

# Run all tests in qa environment
node run.js --env=qa --project=edge

# Run specific test file
node run.js --env=qa --project=edge --spec=login.valid.spec.ts
node run.js --env=qa --project=edge --spec=login.invalid.spec.ts

# Run tests with UI mode
node run.js --env=qa --project=edge --ui

# Run specific test file with UI mode
node run.js --env=qa --project=edge --spec=login.valid.spec.ts --ui
```

### Using Direct Commands

#### PowerShell
```powershell
# Set environment variable and run all tests
$env:TEST_ENV = "qa"; npx playwright test --project=edge

# Set environment variable and run specific test file
$env:TEST_ENV = "qa"; npx playwright test --project=edge src/tests/login.valid.spec.ts

# Run with UI mode
$env:TEST_ENV = "qa"; npx playwright test --project=edge --ui
```

#### Bash/Unix
```bash
# Set environment variable and run all tests
TEST_ENV=qa npx playwright test --project=edge

# Set environment variable and run specific test file
TEST_ENV=qa npx playwright test --project=edge src/tests/login.valid.spec.ts

# Run with UI mode
TEST_ENV=qa npx playwright test --project=edge --ui
```

## Available Browsers

- chrome
- firefox
- safari
- edge

## Available Environments

- dev (default)
- qa
- prod

## Test Reports

After test execution, you can view the HTML report using our custom script that handles port conflicts:

```bash
# View test report (automatically finds available port)
node src/utils/show-report.js

# Or use the default Playwright command
npx playwright show-report
```

The custom script will:
- Automatically find an available port if 9323 is in use
- Show the port number in the console
- Handle any port conflicts gracefully

## CI/CD Integration

The project includes GitHub Actions workflow that runs tests on:
- Push to main/master branch
- Pull requests to main/master branch

The workflow runs tests across:
- Multiple browsers (chromium, firefox, webkit)
- Multiple environments (dev, qa)

## Project Structure

```
├── src/
│   ├── config/
│   │   ├── dev.config.ts
│   │   ├── qa.config.ts
│   │   └── prod.config.ts
│   ├── tests/
│   │   ├── login.valid.spec.ts
│   │   └── login.invalid.spec.ts
│   └── utils/
│       └── show-report.js
├── .github/
│   └── workflows/
│       └── playwright.yml
├── playwright.config.ts
├── run.js
└── README.md
```

## Contributing

1. Create a new branch for your feature
2. Write your tests
3. Submit a pull request

## License

[Your License Here] 