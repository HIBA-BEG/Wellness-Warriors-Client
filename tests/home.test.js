import { By, until, WebDriver } from 'selenium-webdriver';
import { setupDriver, teardownDriver } from './setup.js';

/** @type {WebDriver} */
let driver;

beforeEach(async () => {
  driver = await setupDriver();
  await driver.manage().setTimeouts({ implicit: 5000 });
});

afterEach(async () => {
  if (driver) {
    await teardownDriver(driver);
  }
});

describe('Home Page Tests', () => {
  test('should load the page', async () => {
    try {
      await driver.get('http://localhost:5173');
      const title = await driver.getTitle();
      console.log('Page title:', title);
      expect(title).toBe('Wellness Warriors');
    } catch (error) {
      console.error('Error in page load test:', error);
      throw error;
    }
  });

  test('should display main heading and CTA button', async () => {
    try {
      await driver.get('http://localhost:5173');
      
      // Wait for the main heading to be visible
      const heading = await driver.wait(
        until.elementLocated(By.xpath("//h1[contains(text(), 'Welcome to Wellness Warriors')]")),
        10000,
        'Main heading not found'
      );
      expect(await heading.isDisplayed()).toBe(true);
      
      // Check for the "Explore Events" button
      const exploreButton = await driver.wait(
        until.elementLocated(By.xpath("//*[contains(text(), 'Explore Events')]")),
        10000,
        'Explore Events button not found'
      );
      expect(await exploreButton.isDisplayed()).toBe(true);
      
      // Check if the button is clickable
      await exploreButton.click();
      
      // Events are behind login, so a fresh browser lands on the login page
      await driver.wait(until.urlContains('/login'), 10000);
      expect(await driver.getCurrentUrl()).toContain('/login');
      
    } catch (error) {
      console.error('Error in home page test:', error);
      if (driver) {
        try {
          const screenshot = await driver.takeScreenshot();
          console.log('Screenshot (base64):', screenshot);
        } catch (e) {
          console.error('Failed to take screenshot:', e);
        }
      }
      throw error;
    }
  }, 90000);
});
