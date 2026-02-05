# Saucedemo Playwright POM

A test automation framework for the Saucedemo application using Playwright and TypeScript with Page Object Model pattern.

## Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
npx playwright test                 # Run all tests
npx playwright test --headed        # Run tests in headed mode
npx playwright test --ui            # Run tests in UI mode
```

## Project Structure

```
saucedemo-playwright-pom/
├── tests/          # Test specifications
├── pages/          # Page Object Models
├── fixtures/       # Custom fixtures and test setup
├── test-data/      # Test data files
├── utils/          # Helper functions and utilities
└── README.md
```

## Viewing Reports

```bash
npx playwright show-report
```

## Environment Setup

Create a `.env` file in the root directory:

```env
USERNAME=your_username
PASSWORD=your_password
```

## License

MIT
