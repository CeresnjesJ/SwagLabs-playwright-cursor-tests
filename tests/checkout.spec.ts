import { test, expect } from '../fixtures/fixture';
import { USERS, PRODUCTS } from '../test-data/users';
import { TestHelper } from '../helpers/helper';

// Test data constants
const CHECKOUT_INFO = { firstName: 'John', lastName: 'Doe', postalCode: '12345' };
const INVALID_CHECKOUT_INFO = { firstName: 'John', lastName: '', postalCode: '12345' };

test.describe('Checkout Form', () => {

  test.beforeEach(async ({ loginPage, homePage, cartPage, checkoutPage }) => {
    // Arrange - Login, add product to cart, and navigate to checkout
    await loginPage.navigate();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(homePage.inventoryList).toBeVisible();

    // Add a product to cart
    await homePage.addProductToCartByName(PRODUCTS.BACKPACK);
    await homePage.clickShoppingCart();
    await expect(cartPage.cartList).toBeVisible();

    // Navigate to checkout
    await cartPage.clickCheckout();
    await expect(checkoutPage.checkoutInfoContainer).toBeVisible();
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Your Information');
  });

  test('should fill checkout form with valid data', async ({ page, checkoutPage }) => {
    // Assert - Verify on correct page
    
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Your Information');

    // Act
    await checkoutPage.fillCheckoutInformation(CHECKOUT_INFO.firstName, CHECKOUT_INFO.lastName, CHECKOUT_INFO.postalCode);

    // Assert
    await expect(checkoutPage.firstNameInput).toHaveValue(CHECKOUT_INFO.firstName);
    await expect(checkoutPage.lastNameInput).toHaveValue(CHECKOUT_INFO.lastName);
    await expect(checkoutPage.postalCodeInput).toHaveValue(CHECKOUT_INFO.postalCode);
  });

  test('should show error when name, last name and postal code are empty', async ({ page, checkoutPage }) => {
    // Act
    await checkoutPage.fillCheckoutInformation(INVALID_CHECKOUT_INFO.firstName, INVALID_CHECKOUT_INFO.lastName, INVALID_CHECKOUT_INFO.postalCode);
    await checkoutPage.clickContinue();

    // Assert
    await expect(checkoutPage.checkoutInfoContainer).toBeVisible();
    await expect(checkoutPage.errorMessage).toBeVisible();
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('Last Name is required');
  });

});

test.describe('Checkout Overview', () => {
  const TEST_PRODUCTS = [PRODUCTS.BACKPACK, PRODUCTS.BIKE_LIGHT, PRODUCTS.BOLT_T_SHIRT];

  test.beforeEach(async ({ page, loginPage, homePage, cartPage, checkoutPage }) => {
    // Arrange - Login and navigate to inventory
    await loginPage.navigate();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(homePage.inventoryList).toBeVisible();

    // Arrange - Add products to cart
    for (const productName of TEST_PRODUCTS) {
      await homePage.addProductToCartByName(productName);
    }

    // Act - Navigate to cart and proceed to checkout
    await homePage.clickShoppingCart();
    await expect(cartPage.cartList).toBeVisible();
    await cartPage.clickCheckout();
    await expect(checkoutPage.checkoutInfoContainer).toBeVisible();

    // Act - Fill checkout form and continue
    await checkoutPage.fillCheckoutInformation(CHECKOUT_INFO.firstName, CHECKOUT_INFO.lastName, CHECKOUT_INFO.postalCode);
    await checkoutPage.clickContinue();
    await expect(checkoutPage.checkoutSummaryContainer).toBeVisible();

    // Assert - Verify correct number of items in checkout overview
    await expect(checkoutPage.cartItems).toHaveCount(TEST_PRODUCTS.length);
  });

  test('should display correct items in checkout overview', async ({ checkoutPage }) => {
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
    const productPrices: number[] = [];
    for (let i = 0; i < TEST_PRODUCTS.length; i++) {
      const priceText = await checkoutPage.getProductPriceByIndex(i);
      productPrices.push(TestHelper.parsePriceToNumber(priceText));
    }

    // Act - Get price summary from checkout overview
    const subtotalText = await checkoutPage.getSubtotal();
    const taxText = await checkoutPage.getTax();
    const totalText = await checkoutPage.getTotal();

    const subtotal = TestHelper.parsePriceToNumber(subtotalText);
    const tax = TestHelper.parsePriceToNumber(taxText);
    const total = TestHelper.parsePriceToNumber(totalText);

    // Assert - Verify tax is calculated
    expect(tax).toBeGreaterThan(0);

    // Assert - Verify subtotal matches sum of product prices
    const expectedSubtotal = TestHelper.sumArray(productPrices);
    expect(subtotal).toBe(expectedSubtotal);

    // Assert - Verify total equals subtotal plus tax
    const expectedTotal = subtotal + tax;
    expect(total).toBeCloseTo(expectedTotal, 2);
  });

  test('should complete order flow successfully', async ({ checkoutPage }) => {
    // Act - Complete order
    await checkoutPage.clickFinish();

    // Assert - Verify order completion
    await expect(checkoutPage.completeHeader).toBeVisible();
    await expect(checkoutPage.checkoutCompleteContainer).toBeVisible();

    // Assert - Verify completion message
    await expect(checkoutPage.completeHeader).toBeVisible();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutPage.completeText).toBeVisible();
    await expect(checkoutPage.completeText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

    // Assert - Verify completion image is displayed
    await expect(checkoutPage.ponyExpressImage).toBeVisible();

    // Assert - Verify back home button is available
    await expect(checkoutPage.backHomeButton).toBeVisible();

    // Assert - Verify cart is cleared
    await expect(checkoutPage.shoppingCartBadge).not.toBeVisible();
  });

});