import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page.js';
import { product } from '../../test-data/product.js';
import { user, userBilling } from '../../test-data/user.js';
import {ProductDetailPage} from '../../pages/product-detail.page.js';
import {CartPage} from '../../pages/cart.page.js';
import {LoginPage} from '../../pages/login.page.js';
import {BillingPage} from '../../pages/billing.page.js';
import {PaymentPage} from '../../pages/payment.page.js';
import { payment } from '../../test-data/payment.js';
import { CheckoutPage } from '../../pages/checkout.page.js';

test('creates an order successfully', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);
  const loginPage = new LoginPage(page);
  const billingPage = new BillingPage(page);
  const paymentPage = new PaymentPage(page);
  const checkoutPage = new CheckoutPage(page);

  await homePage.open();
  await homePage.searchProduct(product.name);
  await homePage.selectProduct(product.name);

  await expect(homePage.productName).toHaveText(product.name);
  await expect(homePage.productPrice).toHaveText(product.price);
  await expect(productDetailPage.addToCartButton).toBeVisible();

  await productDetailPage.addToCart();
  await productDetailPage.gotoCartCheckoutPage();

  await expect(cartPage.buttonCheckout).toBeVisible();
  await expect(cartPage.buttonContinueShopping).toBeVisible();

  await expect(cartPage.productTitle).toHaveText(product.name);
  await expect(cartPage.productPrice).toContainText(product.price);
  await expect(cartPage.productQuantity).toHaveValue('1');
  await expect(cartPage.productTotalPrice).toContainText(product.price);

  await cartPage.changeQty('2');
  await expect(cartPage.productQuantity).toHaveValue('2');
  await expect(cartPage.productPrice).toContainText(product.price);
  await expect(cartPage.productTotalPrice).toContainText(product.priceTwoQty);

  await cartPage.gotoCheckoutPage();
  await loginPage.login(user.email, user.password);
  await expect(loginPage.proceedtoCheckoutButton).toBeVisible();
  await expect(loginPage.loggedInMessage).toHaveText(`Hello ${user.name}, you are already logged in. You can proceed to checkout.`);
  await loginPage.gotoCheckoutPage();

  await expect(billingPage.proceedToCheckoutButton).toBeVisible();
  await expect(billingPage.postalCodeInput).toBeVisible();
  await expect(billingPage.houseNumberInput).toBeVisible();
  await expect(billingPage.streetInput).toBeVisible();
  await expect(billingPage.cityInput).toBeVisible();
  await expect(billingPage.stateInput).toBeVisible();

  await billingPage.fillBillingDetails(userBilling.country, userBilling.postalCode, userBilling.houseNumber);

  await billingPage.gotoCheckoutPage();

  await expect(paymentPage.paymentMethod).toBeVisible();

  await paymentPage.choosePaymentMethod(payment.paymentMethod);
  await expect(paymentPage.inputCardNumber).toBeVisible();
  await expect(paymentPage.inputExpirationDate).toBeVisible();
  await expect(paymentPage.inputCVV).toBeVisible();

  await paymentPage.fillPaymentDetails(payment.creditCardNumber, payment.expirationDate, payment.cvv, user.name);

  await paymentPage.checkPaymentFinish();
  
  await expect(paymentPage.messagepaymentSuccess).toBeVisible();

  await paymentPage.checkPaymentFinish();

  await expect(checkoutPage.orderConfirmationText).toBeVisible();

});