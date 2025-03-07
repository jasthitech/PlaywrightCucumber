# PlaywrightCucumber
Cucumber.js + Playwright Setup Guide (TypeScript)

📌 Overview

This document provides a step-by-step guide to setting up Cucumber.js with Playwright for end-to-end testing in TypeScript.

1️⃣ Installation

Run the following commands to install required dependencies:

# Initialize the project
npm init -y

# Install Playwright
npm install --save-dev @playwright/test

# Install Cucumber.js and TypeScript support
npm install --save-dev @cucumber/cucumber ts-node typescript

2️⃣ Project Structure

Ensure your project follows this structure:

PlaywrightDemo/
│── features/
│   ├── login.feature
│── steps/
│   ├── login.steps.ts
│── support/
│   ├── world.ts
│── cucumber.js
│── package.json
│── tsconfig.json

3️⃣ Configuration Files

📄 tsconfig.json

This file enables TypeScript support:

{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}

📄 cucumber.js (Cucumber Configuration)

module.exports = {
  default: {
    require: ["steps/**/*.ts", "support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress"],
    tags: "@smoke"
  }
};

4️⃣ Setting Up Playwright with Cucumber

📄 support/world.ts (Custom World for Playwright)

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  async launchBrowser() {
    this.browser = await chromium.launch({
      headless: false, // Set to true for CI/CD
      slowMo: 100, // Slows down interactions
    });
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);

5️⃣ Writing Tests with Cucumber and Playwright

📄 features/login.feature (Cucumber Feature File)

Feature: Login
  @smoke
  Scenario: Successful Login
    Given I open the login page
    When I enter valid credentials
    Then I should be redirected to the homepage

📄 steps/login.steps.ts (Step Definitions)

import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from '@playwright/test';

Before(async function (this: CustomWorld) {
  await this.launchBrowser();
});

After(async function (this: CustomWorld) {
  await this.closeBrowser();
});

Given('I open the login page', async function (this: CustomWorld) {
  await this.page.goto('https://example.com/login');
});

When('I enter valid credentials', async function (this: CustomWorld) {
  await this.page.fill('#username', 'testuser');
  await this.page.fill('#password', 'password123');
  await this.page.click('#login-button');
});

Then('I should be redirected to the homepage', async function (this: CustomWorld) {
  await this.page.waitForSelector('#welcome-message');
  const url = this.page.url();
  expect(url).toContain('/dashboard');
});

6️⃣ Running Tests

🔹 Run All Tests

npm test

🔹 Run Specific Tag

npm test -- --tags="@smoke"

🔹 Run Tests in Headed Mode

npm test -- --tags="@smoke" --headed

🔹 Debug Mode (Slow Execution)

PWDEBUG=1 npm test -- --tags="@smoke"

7️⃣ Troubleshooting & Debugging

✅ this.launchBrowser is not a function Error?

Ensure CustomWorld is exported properly in world.ts.

✅ Tests not opening a browser?

Ensure { headless: false } is set in world.ts.

Run with PWDEBUG=1 for interactive debugging.

✅ Browser not found?

Install Playwright browsers:

npx playwright install

🎉 Conclusion

Congratulations! 🎉 You have successfully set up Cucumber.js with Playwright for end-to-end testing in TypeScript. You can now write feature files, step definitions, and execute UI tests efficiently!
