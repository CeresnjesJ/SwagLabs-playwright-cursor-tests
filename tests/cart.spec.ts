import { test, expect } from '../fixtures/fixture';
import { USERS, PRODUCTS, PAGE_TITLES } from '../test-data/users';
import { TestHelper } from '../helpers/helper';



test.describe('Shopping Cart', () => {
  const TEST_PRODUCTS = [PRODUCTS.BACKPACK, PRODUCTS.BIKE_LIGHT, PRODUCTS.BOLT_T_SHIRT];
  const TEST_PRODUCT = PRODUCTS.BACKPACK;

  test.beforeEach(async ({ loginPage, homePage }) => {
    await loginPage.navigate();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await TestHelper.verifySuccessfulLogin(homePage, PAGE_TITLES.PRODUCTS);
  });

  test.describe('Cart Items Display', () => {

    test('should display correct items in cart', async ({ homePage, cartPage }) => {
      const expectedProducts = await homePage.addMultipleProductsAndCaptureDetails(TEST_PRODUCTS);
      await TestHelper.verifyCartBadgeCount(homePage, TEST_PRODUCTS.length);

      await homePage.clickShoppingCart();
      await TestHelper.verifyPageLoaded(cartPage, PAGE_TITLES.CART);

      await expect(cartPage.cartItems).toHaveCount(expectedProducts.length);
      await TestHelper.verifyCartProducts(cartPage, expectedProducts);
    });

  });

  test.describe('Remove Items from Cart', () => {

    test('should remove single item from cart', async ({ homePage, cartPage }) => {
      // Act
      await homePage.addProductToCartByName(TEST_PRODUCT);
      await homePage.clickShoppingCart();
      await expect(cartPage.cartList).toBeVisible();
      await TestHelper.verifyPageLoaded(cartPage, PAGE_TITLES.CART);

      await cartPage.removeProductByName(TEST_PRODUCT);
      
      await expect(cartPage.cartItems).toHaveCount(0);
      await TestHelper.verifyCartBadgeCount(homePage, 0);
    });
  });
});