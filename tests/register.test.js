import { describe, test, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';

describe('Registration Tests', () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless'); // Uncomment to run headless
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    await driver.manage().setTimeouts({ implicit: 10000 });
  });

  afterAll(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    await driver.get('http://localhost:5173/register');
    // Wait for form to be loaded
    await driver.wait(until.elementLocated(By.css('form')), 10000);
  });

  const fillBasicFormData = async () => {
    await driver.findElement(By.id('firstName')).sendKeys('Test');
    await driver.findElement(By.id('lastName')).sendKeys('User');
    await driver.findElement(By.id('email')).sendKeys(`test${Date.now()}@example.com`);
    await driver.findElement(By.id('password')).sendKeys('password123');
    await driver.findElement(By.id('confirmPassword')).sendKeys('password123');
  };

  const waitForError = async () => {
    const errorElement = await driver.wait(
      until.elementLocated(By.css('.text-red-500')),
      20000
    );
    await driver.wait(until.elementIsVisible(errorElement), 10000);
    return errorElement.getText();
  };

  const waitForErrorMessage = async (timeout = 15000) => {
    try {
      // Wait for any previous error messages to be cleared
      await driver.sleep(200);

      const errorElement = await driver.wait(
        until.elementLocated(By.css('.text-red-500')),
        timeout,
        'Error message did not appear'
      );

      // Wait for the error message to be visible and have text
      await driver.wait(
        async () => {
          try {
            const isDisplayed = await errorElement.isDisplayed();
            if (!isDisplayed) return false;
            
            const text = await errorElement.getText();
            return text.length > 0;
          } catch (e) {
            return false;
          }
        },
        5000,
        'Error message not visible or empty'
      );

      return await errorElement.getText();
    } catch (error) {
      console.error('Error waiting for error message:', error);
      throw error;
    }
  };

  test('should validate password match', async () => {
    await fillBasicFormData();
    // Override confirm password
    await driver.findElement(By.id('confirmPassword')).clear();
    await driver.findElement(By.id('confirmPassword')).sendKeys('password456');

    // Select gender
    const genderSelect = await driver.findElement(By.id('gender'));
    await genderSelect.click();
    await genderSelect.findElement(By.css('option[value="man"]')).click();

    // Submit the form
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    const errorText = await waitForError();
    expect(errorText).toBe('Passwords do not match');
  }, 90000);

  test('should validate password length', async () => {
    await fillBasicFormData();
    // Override with short password
    await driver.findElement(By.id('password')).clear();
    await driver.findElement(By.id('confirmPassword')).clear();
    await driver.findElement(By.id('password')).sendKeys('123');
    await driver.findElement(By.id('confirmPassword')).sendKeys('123');

    // Select gender
    const genderSelect = await driver.findElement(By.id('gender'));
    await genderSelect.click();
    await genderSelect.findElement(By.css('option[value="woman"]')).click();

    // Submit the form
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    const errorText = await waitForError();
    expect(errorText).toBe('Password must be between 7 and 32 characters long');
  }, 90000);

  test('should show error for missing gender selection', async () => {
    await fillBasicFormData();

    // Submit form without selecting gender
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    // Wait a bit for the form submission to complete
    await driver.sleep(200);

    const errorText = await waitForErrorMessage();
    expect(errorText).toBe('Please select your gender');
  }, 90000);

  test('should successfully register a new user', async () => {
    await fillBasicFormData();

    // Select gender
    const genderSelect = await driver.findElement(By.id('gender'));
    await genderSelect.click();
    await genderSelect.findElement(By.css('option[value="woman"]')).click();

    // Submit the form
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    // Wait for either successful navigation or error message
    try {
      await driver.wait(
        async () => {
          try {
            const currentUrl = await driver.getCurrentUrl();
            if (currentUrl === 'http://localhost:5173/events') {
              return true;
            }

            // Check for error message
            const errorElements = await driver.findElements(By.css('.text-red-500'));
            if (errorElements.length > 0) {
              const errorElement = errorElements[0];
              if (await errorElement.isDisplayed()) {
                const errorText = await errorElement.getText();
                if (errorText.length > 0) {
                  throw new Error(`Registration failed: ${errorText}`);
                }
              }
            }
            return false;
          } catch (e) {
            if (e.message.startsWith('Registration failed:')) {
              throw e;
            }
            return false;
          }
        },
        20000,
        'Neither navigation nor error message appeared'
      );
    } catch (error) {
      if (error.message.startsWith('Registration failed:')) {
        throw error;
      }

      // Try to find any error message as a last resort
      const errorElements = await driver.findElements(By.css('.text-red-500'));
      if (errorElements.length > 0) {
        const errorElement = errorElements[0];
        if (await errorElement.isDisplayed()) {
          const errorText = await errorElement.getText();
          if (errorText.length > 0) {
            throw new Error(`Registration failed: ${errorText}`);
          }
        }
      }
      throw new Error('Registration failed and no error message was displayed');
    }
  }, 90000);
});
