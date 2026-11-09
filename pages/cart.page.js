export class CartPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator('[data-test="product-title"]');
    this.productPrice = page.locator('[data-test="product-price"]');
    this.productQuantity = page.locator('[data-test="product-quantity"]');
    this.productTotalPrice = page.locator('[data-test="line-price"]');
    this.buttonCheckout = page.locator('[data-test="proceed-1"]');
    this.buttonContinueShopping = page.locator('[data-test="continue-shopping"]');
  }

  async changeQty(quantity) {
    await this.productQuantity.fill(quantity);
  }

  async gotoCheckoutPage() {
    await this.buttonCheckout.click();
  }

}