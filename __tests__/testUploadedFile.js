/**
 * @author Quoc Tran ;
 * @email tran.ngocquoc@amaris.com>
 */
const { Builder, By, Key, until } = require('selenium-webdriver');
const remote = require("selenium-webdriver/remote");

describe('Testing Upload a file', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    //This will detect your local file
    driver.setFileDetector(new remote.FileDetector());
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('Verify Upload a file in bulk list sucessfully', async () => {
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

    await driver.wait(until.urlIs('https://dashboard.perxtech.io/dashboard/p/bulk_actions')),5000;

    const uploadButton = await driver.findElement(By.className('anticon-upload'));
    await uploadButton.click(),5000;

    await driver.wait(until.elementLocated(By.className('ant-modal-content')),10000);

    const uploadArea = await driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/div[2]/div[2]/form/div[2]/span/div[1]/span/input'));
    //Upload a local file vouchers into upload area
    await uploadArea.sendKeys("C:\\Users\\TNG94\\Documents\\quoc-qa-interview\\sample_issue_vouchers.csv");

    await driver.wait(until.elementIsVisible((await driver.findElement(By.xpath('/html/body/div[3]/div/div[2]/div/div[2]/div[2]/form/div[2]/span/div[2]')))), 10000);

    const uploadSubmit = await driver.findElement(By.css('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.ant-btn-primary > span'));
    await uploadSubmit.click(),5000;
    try {
        if((await driver.wait(until.elementIsVisible((await driver.findElement(By.xpath('/html/body/div[3]/div/div')))), 5000))) {
          console.log('File upload successful');
        } else {
            console.log('File upload failed');
        }
        } catch (e) {
            console.log('File could not be upload in time')};
    
    expect(await driver.getCurrentUrl()).toBe('https://dashboard.perxtech.io/dashboard/p/bulk_actions');
    }, 15000);
});