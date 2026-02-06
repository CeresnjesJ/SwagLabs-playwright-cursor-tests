import { test, expect } from '../fixtures/fixture';
import { USERS, PRODUCTS, PAGE_TITLES } from '../test-data/users';
import { TestHelper } from '../helpers/helper';



test.describe('Home Page', () => {
  const TEST_PRODUCTS = [PRODUCTS.BACKPACK, PRODUCTS.BIKE_LIGHT, PRODUCTS.BOLT_T_SHIRT];
  const SORT_OPTIONS = {
    PRICE_LOW_TO_HIGH: 'lohi',
    PRICE_HIGH_TO_LOW: 'hilo',
    NAME_A_TO_Z: 'az',
    NAME_Z_TO_A: 'za',
  } as const;

  test.beforeEach(async ({ loginPage, homePage }) => {
    await loginPage.navigate();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await TestHelper.verifySuccessfulLogin(homePage, PAGE_TITLES.PRODUCTS);
  });

  test.describe('Add Products to Cart', () => {

    test('should add a single product to cart', async ({ homePage }) => {
      await homePage.addProductToCartByName(PRODUCTS.BACKPACK);

      await TestHelper.verifyCartBadgeCount(homePage, 1);
      await expect(homePage.removeButtons).toBeVisible();
    });

    test('should add multiple products to cart', async ({ homePage }) => {
      for (const product of TEST_PRODUCTS) {
        await homePage.addProductToCartByName(product);
      }

      await TestHelper.verifyCartBadgeCount(homePage, TEST_PRODUCTS.length);
    });

  });

  test.describe('Product Sorting', () => {

    test('should sort products by price from low to high', async ({ homePage }) => {
      await homePage.selectSortOption(SORT_OPTIONS.PRICE_LOW_TO_HIGH);
      await expect(homePage.productSortContainer).toHaveValue(SORT_OPTIONS.PRICE_LOW_TO_HIGH);
      await TestHelper.verifyPricesInAscendingOrder(homePage);
    });

  });

  test.describe('Product Detail Page', () => {

    test('should open product detail page with accurate information when clicking product name', async ({ homePage, productDetailPage }) => {
      // Arrange - Get product information from home page before navigation
      const homePagePrice = await homePage.getProductPrice(PRODUCTS.BACKPACK);
      const homePageDescription = await homePage.getProductDescription(PRODUCTS.BACKPACK);

      await homePage.clickProductName(PRODUCTS.BACKPACK);

      await TestHelper.verifyProductDetailsDisplayed( productDetailPage, PRODUCTS.BACKPACK, homePageDescription, homePagePrice );
    });

  });
  test.describe('Logout', () => {

    test('should logout successfully', async ({ loginPage, homePage }) => {
      await homePage.logout();

      await expect(loginPage.loginButton).toBeVisible();
    });
  });
});