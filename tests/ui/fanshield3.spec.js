import { test, expect } from '@playwright/test';
import Fanshield3Page from '../../src/ui/fanshield3-page.js';

test.describe('The fanshield3 test page', () => {
  let fanshield3Page;

  test.beforeEach(async ({ page }) => {
    fanshield3Page = new Fanshield3Page(page);
    await fanshield3Page.goto();
  });

  test('should be able to visit the terms and conditions link', async ({ page }) => {
    const newTabPromise = page.waitForEvent('popup');
    fanshield3Page.widget.termsAndConditionsLink.click();
    const newTab = await newTabPromise;
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL('https://protecht.com/consumer-terms/');
  });

  test('should be able to visit the privacy policy link', async ({ page }) => {
    const newTabPromise = page.waitForEvent('popup');
    fanshield3Page.widget.privacyPolicyLink.click();
    const newTab = await newTabPromise;
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL('https://protecht.com/privacy-policy/');
  });

  test('should be able to view the insurance terms', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    fanshield3Page.widget.insuranceTermsLink.click();
    const download = await downloadPromise;
    // eslint-disable-next-line max-len
    await expect(download.url()).toBe('https://static.sandbox.protecht.com/policy/cc6b3cd9-a52f-475b-869e-e01e546f3000/coverage/0bff8dddad734837957499eb0f1a5c34.pdf');
  });

  test('should be able to update the currency to GBP', async () => {
    await fanshield3Page.configureCurrency('GBP');
    await expect(fanshield3Page.widget.protectionFeePrice).toHaveText(/£\d+\.\d{2}/);
  });

  test('should be able to add an item', async () => {
    const previousFee = await fanshield3Page.widget.protectionFeePrice.textContent();
    await fanshield3Page.addItem('12');
    await expect(fanshield3Page.widget.protectionFeePrice).not.toHaveText(previousFee);
    await expect(fanshield3Page.widget.totalPurchasePrice).toHaveText(/.112\.00/);
  });
});
