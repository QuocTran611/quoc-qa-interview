/**
 * @author Quoc Tran ;
 * @email tran.ngocquoc@amaris.com>
 */
const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Testing Upload', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('Verify Bulk Upload section functionally', async () => {
    await driver.get('https://www.perxtech.io/dashboard');

    const usernameInput = await driver.findElement(By.id('email'));
    const passwordInput = await driver.findElement(By.id('password'));
    const loginButton = await driver.findElement(By.className('ant-btn'));

    await usernameInput.sendKeys('thao+test-qa-interview@perxtech.com');
    await passwordInput.sendKeys('admin1234');
    await loginButton.click();

    // Wait for the page to load after login (customize as needed)
    await driver.wait(until.urlIs('https://dashboard.perxtech.io/dashboard/p/business_intelligence/overview'), 10000);

    //If login details are correct then navigate to bulk actions page
    const bulkAction = await driver.findElement(By.css(`a[href="/dashboard/p/bulk_actions"]`));
    bulkAction.click();

    await driver.wait(until.urlIs('https://dashboard.perxtech.io/dashboard/p/bulk_actions'), 10000);

    const uploadButton = await driver.findElement(By.className('anticon-upload'));
    await uploadButton.click(),5000;

    const modal = await driver.wait(
      until.elementLocated(By.className('ant-modal')),
      10000,
      'Modal show'
    );

    const modalText = await modal.getText();
    console.log(modalText);
    expect(modalText).toContain("Bulk Upload");
  }, 15000);
});