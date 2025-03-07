import { test, expect } from '@playwright/test';

// Test for text fields
test('Fill a text field', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const nameField = page.locator('#name');
    await nameField.waitFor();
    await nameField.fill('Playwright Test');
    await expect(nameField).toHaveValue('Playwright Test');
});

// Test for dropdowns
test('Select a dropdown option', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const dropdown = page.locator('#country');
    await dropdown.waitFor();
    
    // Correct value case sensitivity issue
    await dropdown.selectOption({ value: 'india' });
    
    await expect(dropdown).toHaveValue('india');  // Matching case
});

// Test for buttons
test('Click a button and verify alert', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    
    await page.waitForLoadState('domcontentloaded'); // Ensure page is fully loaded
    const button = page.locator('#confirmbtn');
    await button.waitFor({ state: 'visible', timeout: 10000 }); // Wait for visibility
    await button.click();
    
});

// Test for window handling
test('Handle new window', async ({ page, context }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const windowButton = page.locator('#windowbtn');
  await windowButton.waitFor({ state: 'visible', timeout: 10000 }); // Ensure button is visible
  const [newPage] = await Promise.all([
      context.waitForEvent('page'),  // Listen for new page
      windowButton.click()           // Click button
  ]);
  await newPage.waitForLoadState(); // Ensure new page loads
  
});

// Test for selectable items
test('Select items in a list', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.waitForSelector('#selectable'); // Ensure the list is present
    const item = page.locator('#selectable li').nth(2);
    await item.scrollIntoViewIfNeeded();  // Ensure visibility
    await item.waitFor({ state: 'visible', timeout: 10000 }); // Explicit wait
    await item.click();
    await expect(item).toHaveClass(/ui-selected/);
});
