# Toolshop UI Automation

Playwright tests in JavaScript for the Toolshop demo application at https://practicesoftwaretesting.com.

## Scenarios

1. **Create order** (`tests/ui/create-order.spec.js`). Search for a product, add it to the cart, change the quantity, sign in, fill in the billing address, pay and verify the order confirmation.
2. **Checkout validation** (`tests/ui/checkout-validation.spec.js`). Clear the required billing fields and verify that the user cannot proceed to payment.

## Setup

Requirements: Node.js 18 or later.

```bash
npm install
npx playwright install chromium
```

Create a `.env` file in the project root:

```dotenv
BASE_URL=https://practicesoftwaretesting.com
```

## Run the tests

```bash
npx playwright test
npx playwright test --headed
npx playwright show-report
```

## Framework structure

```text
pages/        Page objects with locators and actions for each checkout step
tests/ui/     Test specs with the assertions
test-data/    Product, user, billing and payment data
playwright.config.js
.env
```

## Design decisions

- I used a simple Page Object Model. Each page object holds the locators and actions for one page, and the specs hold the assertions. This keeps the tests readable and puts each locator in one place.
- Test data is kept in `test-data/` so the specs do not contain hard coded values.
- The base URL is read from `.env`, so the tests can run against another environment without code changes.
- Locators use the stable `data-test` and `id` attributes where available. Roles and text are used only when the text itself is what the test checks, such as the product name or a page heading.
- The tests do not use fixed sleeps. They rely on Playwright web first assertions. For example, the billing form is filled only after the profile address has loaded, because the application overwrites the form when that data arrives.
- Each test is independent and starts from the home page.
- Retries are turned off so that flaky behaviour is visible instead of hidden.
- The tests run on Chromium only, and custom fixtures or service layers were left out because the project covers two scenarios.
- The demo account credentials are kept in `test-data/user.js` because they are public demo accounts provided by the application.

## Improvements with additional time

- Sign in through the API or reuse a saved session to make the tests faster and less dependent on the login page.
- Add assertions for the field level validation messages in the negative scenario.
- Run the suite in CI, such as GitHub Actions, and publish the HTML report and traces.
- Run the tests on Firefox and WebKit.
- Create dedicated test accounts and data so the tests do not depend on the shared demo data.
- Add more negative scenarios, such as an empty cart or a rejected payment.
- Move the test data from static files into a dedicated test data store or database, so data can be created, shared and reset per environment without changing the code.