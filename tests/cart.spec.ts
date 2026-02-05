import { test, expect } from '../fixtures/fixture';
import { USERS, PRODUCTS } from '../test-data/users';

test.describe('Cart Items Display', () => {
  const TEST_PRODUCTS = [PRODUCTS.BACKPACK, PRODUCTS.BIKE_LIGHT, PRODUCTS.BOLT_T_SHIRT];

  test('should display correct items in cart', async ({ page, loginPage, homePage, cartPage }) => {
    // Arrange - Login and navigate to inventory
    await loginPage.navigate();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(homePage.inventoryList).toBeVisible();

    // Arrange - Capture product data from inventory and add to cart
    const expectedProducts = [];
    for (const productName of TEST_PRODUCTS) {
      const price = await homePage.getProductPrice(productName);
      const description = await homePage.getProductDescription(productName);
      expectedProducts.push({ name: productName, price, description });
      await homePage.addProductToCartByName(productName);
    }

    // Assert - Verify cart badge shows correct count before navigating
    await expect(homePage.shoppingCartBadge).toHaveText(TEST_PRODUCTS.length.toString());

    // Act - Navigate to cart page
    await homePage.clickShoppingCart();
    await expect(cartPage.cartList).toBeVisible();
    await expect(cartPage.pageTitle).toHaveText('Your Cart');

    // Assert - Verify correct number of items in cart
    await expect(cartPage.cartItems).toHaveCount(expectedProducts.length);

    // Assert - Verify each added product appears in cart with correct details
    for (let i = 0; i < expectedProducts.length; i++) {
      expect(await cartPage.getProductNameByIndex(i)).toBe(expectedProducts[i].name);
      expect(await cartPage.getProductPriceByIndex(i)).toBe(expectedProducts[i].price);
      expect(await cartPage.getProductDescriptionByIndex(i)).toBe(expectedProducts[i].description);
    }
  });

});

test.describe('Remove Items from Cart', () => {
  const TEST_PRODUCT = PRODUCTS.BACKPACK;

  test.beforeEach(async ({ page, loginPage, homePage, cartPage }) => {
    // Arrange - Login and add product to cart before each test
    await loginPage.navigate();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(homePage.inventoryList).toBeVisible();

    // Add a product to cart and navigate to cart page
    await homePage.addProductToCartByName(TEST_PRODUCT);
    await homePage.clickShoppingCart();
    await expect(cartPage.cartList).toBeVisible();
  });

  test('should remove single item from cart', async ({ cartPage }) => {
    // Act
    await cartPage.removeProductByName(TEST_PRODUCT);

    // Assert
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(cartPage.shoppingCartBadge).not.toBeVisible();
  });

});

