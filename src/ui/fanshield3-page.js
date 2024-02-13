import { expect } from '@playwright/test';
import { uiBaseURL } from '../config/urls.js';

export default class Fanshield3Page {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.menuButton = this.page.getByLabel('open drawer');
    this.sidebarMenu = {
      currencyForm: this.page.locator('div[aria-labelledby="select-currency"]'),
      currencyOption: (currency) => this.page.locator('ul[aria-labelledby="select-currency"]').locator(`[data-value=${currency}]`),
      costOfItemInput: this.page.getByPlaceholder('Cost of item'),
      addItemButton: this.page.getByLabel('add Cost of item'),
      configureButton: this.page.getByRole('button', { name: 'configure' }),
    };
    this.progressBar = this.page.getByRole('progressbar');
    this.widget = {
      totalPurchasePrice: this.page.frameLocator('#tg-widget').getByTestId('description').locator('span'),
      protectionFeePrice: this.page.frameLocator('#tg-widget').getByTestId('quote'),
      termsAndConditionsLink: this.page.frameLocator('#tg-widget').getByTestId('tnc-link'),
      privacyPolicyLink: this.page.frameLocator('#tg-widget').getByTestId('privacy-policy-link'),
      insuranceTermsLink: this.page.frameLocator('#tg-widget').getByTestId('refund-terms-link'),
    };
  }

  async goto() {
    await this.page.goto(`${uiBaseURL}/fanshield3`);
  }

  async configureCurrency(currency) {
    await this.sidebarMenu.currencyForm.click();
    await this.sidebarMenu.currencyOption(currency).click();
    await this.sidebarMenu.configureButton.click();
    await expect(this.progressBar).not.toBeVisible();
  }

  async addItem(cost) {
    await this.sidebarMenu.costOfItemInput.fill(cost);
    await this.sidebarMenu.addItemButton.click();
    await this.sidebarMenu.configureButton.click();
    await expect(this.progressBar).not.toBeVisible();
  }
}
