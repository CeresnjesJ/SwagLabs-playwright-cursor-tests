import { test, expect } from '../fixtures/fixture';
import { USERS, PRODUCTS, PAGE_TITLES, ERROR_MESSAGES } from '../test-data/users';
import { TestHelper } from '../helpers/helper';


test.describe('Checkout Flow', () => {
  // Test data constants
  const CHECKOUT_INFO = { firstName: 'John', lastName: 'Doe', postalCode: '12345' };
  const INVALID_CHECKOUT_INFO = { firstName: '', lastName: '', postalCode: '' };
  const TEST_PRODUCTS = [PRODUCTS.BACKPACK, PRODUCTS.BIKE_LIGHT, PRODUCTS.BOLT_T_SHIRT];

  test.beforeEach(async ({ loginPage, homePage, cartPage, checkoutPage }) => {

    // Arrange - Login, add product to cart, and navigate to checkout
    await loginPage.navigate();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await TestHelper.verifySuccessfulLogin(homePage, PAGE_TITLES.PRODUCTS);

    // Add multiple products to cart
    for (const product of TEST_PRODUCTS) {
      await homePage.addProductToCartByName(product);
    }
    await homePage.clickShoppingCart();
    await TestHelper.verifyPageLoaded(cartPage, PAGE_TITLES.CART);
    await cartPage.clickCheckout();
    await TestHelper.verifyPageLoaded(checkoutPage, PAGE_TITLES.CHECKOUT_INFO);
  });

  test.describe('Checkout Form', () => {
    test('should fill checkout form with valid data', async ({ checkoutPage }) => {
      // Act
      await checkoutPage.fillCheckoutInformation(CHECKOUT_INFO.firstName, CHECKOUT_INFO.lastName, CHECKOUT_INFO.postalCode);
      // Assert
      await expect(checkoutPage.firstNameInput).toHaveValue(CHECKOUT_INFO.firstName);
      await expect(checkoutPage.lastNameInput).toHaveValue(CHECKOUT_INFO.lastName);
      await expect(checkoutPage.postalCodeInput).toHaveValue(CHECKOUT_INFO.postalCode);
      await checkoutPage.clickContinue();
      // Assert
      await TestHelper.verifyPageLoaded(checkoutPage, PAGE_TITLES.CHECKOUT_OVERVIEW);
    });

    test('should show error when name, last name and postal code are empty', async ({ checkoutPage }) => {
      // Act
      await checkoutPage.fillCheckoutInformation(INVALID_CHECKOUT_INFO.firstName, INVALID_CHECKOUT_INFO.lastName, INVALID_CHECKOUT_INFO.postalCode);
      await checkoutPage.clickContinue();
      // Assert
      await TestHelper.verifyCheckoutError(checkoutPage, ERROR_MESSAGES.FIRST_NAME_REQUIRED);
    });
  });

  test.describe('Checkout Overview', () => {
    test.beforeEach(async ({ checkoutPage }) => {
      await TestHelper.navigateToCheckoutOverview(checkoutPage, CHECKOUT_INFO.firstName, CHECKOUT_INFO.lastName, CHECKOUT_INFO.postalCode);
    });

      test('should display correct items in checkout overview', async ({ checkoutPage }) => {
        await expect(checkoutPage.cartItems).toHaveCount(TEST_PRODUCTS.length);
        // Assert - Verify each product appears in checkout overview with correct details
        for (const productName of TEST_PRODUCTS) {
          const actualProduct = await checkoutPage.getProductByName(productName);
          expect(actualProduct).not.toBeNull();
          expect(actualProduct?.name).toBe(productName);
          expect(actualProduct?.price).toMatch(/^\$\d+\.\d{2}$/);
          expect(actualProduct?.description).toBeTruthy();
        }
      });
      test('should calculate total price correctly in checkout overview', async ({ checkoutPage }) => {
        // Arrange - Get all product prices from checkout overview
        const priceSummary = await TestHelper.getCheckoutPriceSummary(checkoutPage, TEST_PRODUCTS.length);
        // Assert - Verify price summary
        expect(priceSummary.tax).toBeGreaterThan(0);
        expect(priceSummary.subtotal).toBe(priceSummary.expectedSubtotal);
        expect(priceSummary.total).toBeCloseTo(priceSummary.expectedTotal, 2);
      });
      test('should complete order flow successfully', async ({ checkoutPage }) => {
        // Act - Complete order
        await checkoutPage.clickFinish();

        await TestHelper.verifyPageLoaded(checkoutPage, PAGE_TITLES.CHECKOUT_COMPLETE);
        await TestHelper.verifyOrderCompletion(checkoutPage);
      });

    });
  });
