import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page.js';
import { ProductDetailPage } from '../../pages/product-detail.page.js';
import { CartPage } from '../../pages/cart.page.js';
import { LoginPage } from '../../pages/login.page.js';
import { BillingPage } from '../../pages/billing.page.js';
import { product } from '../../test-data/product.js';
import { user } from '../../test-data/user.js';

test('cannot proceed with empty billing address', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);
  const loginPage = new LoginPage(page);
  const billingPage = new BillingPage(page);

  await homePage.open();
  await homePage.searchProduct(product.name);
  await homePage.selectProduct(product.name);
  await productDetailPage.addToCart();
  await productDetailPage.gotoCartCheckoutPage();

  await cartPage.gotoCheckoutPage();
  await loginPage.login(user.email, user.password);
  await loginPage.gotoCheckoutPage();

  await billingPage.clearBillingDetails();

  await expect(billingPage.proceedToCheckoutButton).toBeDisabled();
  await expect(billingPage.billingAddressHeading).toBeVisible();
});