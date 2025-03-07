import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

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
  await this.page.click('button[type="submit"]');
});

Then('I should be redirected to the homepage', async function (this: CustomWorld) {
  await this.page.waitForURL('https://example.com/home');
});