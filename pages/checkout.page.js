export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.orderConfirmationText = page.locator('[id="order-confirmation"]');
  }
}