export class HomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.productName = page.locator('[data-test="product-name"]');
    this.productPrice = page.locator('[data-test="unit-price"]');
  }

  async open() {
    await this.page.goto('/');
  }

  async searchProduct(name) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  async selectProduct(name) {
    const card = this.page.locator('a[data-test^="product-"]').filter({
      has: this.page.getByRole('heading', { name, exact: true }),
    });

    await card.click();
  }

}