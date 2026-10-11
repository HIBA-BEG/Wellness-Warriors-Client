import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import 'chromedriver';

jest.setTimeout(90000);

export const setupDriver = async () => {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments(
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    // '--headless',
    '--window-size=1920,1080'
  );

  try {
    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
    
    return driver;
  } catch (error) {
    console.error('Error setting up WebDriver:', error);
    throw error;
  }
};

export const teardownDriver = async (driver) => {
  if (driver) {
    try {
      await driver.quit();
    } catch (error) {
      console.error('Error tearing down WebDriver:', error);
    }
  }
};
