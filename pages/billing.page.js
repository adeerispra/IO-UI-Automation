import { expect } from '@playwright/test';

export class BillingPage {
  constructor(page) {
    this.page = page;
    this.countrySelect = page.locator('[data-test="country"]');
    this.postalCodeInput = page.locator('[data-test="postal_code"]');
    this.houseNumberInput = page.locator('[data-test="house_number"]');
    this.streetInput = page.locator('[data-test="street"]');
    this.cityInput = page.locator('[data-test="city"]');
    this.stateInput = page.locator('[data-test="state"]');
    this.proceedToCheckoutButton = page.locator('[data-test="proceed-3"]');
    this.billingAddressHeading = page.getByRole('heading', { name: 'Billing Address' });
}

    async fillBillingDetails(country, postalCode, houseNumber) {
        await expect(this.streetInput).not.toHaveValue('');
        await this.countrySelect.selectOption(country);
        await this.postalCodeInput.fill(postalCode);
        await this.houseNumberInput.fill(houseNumber);
    }

    async clearBillingDetails() {
        await expect(this.streetInput).not.toHaveValue('');
        await this.postalCodeInput.clear();
        await this.houseNumberInput.clear();
        await this.streetInput.clear();
        await this.cityInput.clear();
        await this.stateInput.clear();  
    }


    async gotoCheckoutPage() {
        await this.proceedToCheckoutButton.click();
    }
}