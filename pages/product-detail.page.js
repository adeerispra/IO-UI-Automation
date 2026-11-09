export class ProductDetailPage {
  constructor(page) {
    this.page = page;
    this.productName = page.locator('[data-test="product-name"]');
    this.productPrice = page.locator('[data-test="unit-price"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.NavigateCart = page.locator('[data-test="nav-cart"]');
  }


  async addToCart() {
    await this.addToCartButton.click();
  }

  async gotoCartCheckoutPage() {
    await this.NavigateCart.click();
  }

}