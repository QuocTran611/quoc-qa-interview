/**
 * @author Quoc Tran ;
 * @email tran.ngocquoc@amaris.com>
 */
const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Testing Authorization', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('Verify login sucessfully with valid Reward Moderator credentials', async () => {

    //Access to the dashboard
    await driver.get('https://www.perxtech.io/dashboard');

    //Find credential elements including username and password
    const usernameInput = await driver.findElement(By.id('email'));
    const passwordInput = await driver.findElement(By.id('password')); 
    //Find Login button element
    const loginButton = await driver.findElement(By.className('ant-btn'));

    //Input the email and password for login
    await usernameInput.sendKeys('thao+reward-test-qa-interview@perxtech.com');
    await passwordInput.sendKeys('reward_admin');

    //Clik to the login button
    await loginButton.click();

    // Wait for the page to load after login (customize as needed)
    await driver.wait(until.urlIs('https://dashboard.perxtech.io/dashboard/p/rewards/list'), 5000);
    
    // Assertions for successful login
    expect(await driver.getCurrentUrl()).toBe('https://dashboard.perxtech.io/dashboard/p/rewards/list');
    // Add more assertions if needed
  }, 20000);
});