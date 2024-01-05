/**
 * @author Quoc Tran ;
 * @email tran.ngocquoc@amaris.com>
 */
const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Non-authorized Reward Test', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('non-authorized reward test', async () => {
    await driver.get('https://dashboard.perxtech.io/dashboard/p/rewards/create/info');

    await driver.wait(until.urlIs('https://dashboard.perxtech.io/dashboard/signin'), 5000);

    expect(await driver.getCurrentUrl()).toBe('https://dashboard.perxtech.io/dashboard/signin');
  }, 20000);
});