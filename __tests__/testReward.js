/**
 * @author Quoc Tran ;
 * @email tran.ngocquoc@amaris.com>
 */

const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Verify creating a reward successfully', () => {
  let driver;
  let browser;
  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
   await driver.quit();
  });

  it('Able to Login with user has sufficient permission and create a reward', async () => {
    await driver.get('https://www.perxtech.io/dashboard');

    const usernameInput = await driver.findElement(By.id('email'));
    const passwordInput = await driver.findElement(By.id('password'));
    const loginButton = await driver.findElement(By.className('ant-btn'));

    await usernameInput.sendKeys('thao+test-qa-interview@perxtech.com');
    await passwordInput.sendKeys('admin1234');
    await loginButton.click();

    // Wait for the page to load after login
    await driver.wait(until.urlIs('https://dashboard.perxtech.io/dashboard/p/business_intelligence/overview'), 5000);
  
    const anchorElement = await driver.findElement(By.css(`a[href="/dashboard/p/rewards"]`));
    anchorElement.click();

    // Wait for navigating to reward tab
    await driver.wait(until.urlIs('https://dashboard.perxtech.io/dashboard/p/rewards/list'), 5000);

    // Trigger button for Create a new reward
    const createButton = await driver.findElement(By.className('anticon-plus'));
    await createButton.click(),5000;

    const inputRewardName = await driver.findElement(By.className('ant-input'));
    await inputRewardName.sendKeys('Test_Create_Reward');

    const nextButton = await driver.findElement(By.xpath('/html/body/div/section/section/main/span/div/div[3]/form/div[2]/div/div/div/button[2]'));
    await nextButton.click();

    const endDate = await driver.findElement(By.xpath('/html/body/div[1]/section/section/main/span/div/div[3]/form/div[1]/div/div/div[4]/div[2]/div[2]/div[2]/div/div/div/div/section/section[2]/div/div[1]/div/input'));
    await endDate.sendKeys('04 Jan 2024'),5000;

    const endTime = await driver.findElement(By.xpath('/html/body/div[1]/section/section/main/span/div/div[3]/form/div[1]/div/div/div[4]/div[2]/div[2]/div[2]/div/div/div/div/section/section[2]/div/div[2]/div/input'));
    await endTime.sendKeys('10:00');

    const secondnextButton = await driver.findElement(By.xpath('/html/body/div[1]/section/section/main/span/div/div[3]/form/div[2]/div/div/div/button'));
    await secondnextButton.click();

    const saveButton = await driver.findElement(By.xpath('/html/body/div[1]/section/section/main/span/div/div[3]/form/div[2]/div/div/div[2]/button[2]'));
    await saveButton.click(),10000;

    //Check page title, to confirm the creation was successful
    const pageTitle = await driver.getTitle();

    //Check if redirect to page was successfull
    await driver.wait(until.titleIs("Perx | Test_Create_Reward"), 5000);

    expect(await driver.getTitle()).toBe('Perx | Test_Create_Reward');
  }, 20000);
});
