import { test, expect } from '../fixtures/fixture';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { USERS, PRODUCTS } from '../test-data/users';
import { TestHelper } from '../helpers/helper';
import { CartPage } from '../pages/CartPage';

test.describe('Home Page - Add Products to Cart', () => {
  const TEST_PRODUCTS = [PRODUCTS.BACKPACK, PRODUCTS.BIKE_LIGHT, PRODUCTS.BOLT_T_SHIRT];

  test.beforeEach(async ({ page, loginPage, homePage }) => {
    // Arrange - Login before each test
    await loginPage.navigate();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(homePage.inventoryList).toBeVisible();
  });

  test('should add a single product to cart', async ({ homePage }) => {
    // Act
    await homePage.addProductToCartByName(PRODUCTS.BACKPACK);

    // Assert
    await expect(homePage.shoppingCartBadge).toBeVisible();
    await expect(homePage.shoppingCartBadge).toHaveText('1');
    await expect(homePage.removeButtons).toBeVisible();
  });

  test('should add multiple products to cart', async ({ homePage }) => {
    // Act
    for (const product of TEST_PRODUCTS) {
      await homePage.addProductToCartByName(product);
    }

    // Assert
    await expect(homePage.shoppingCartBadge).toBeVisible();
    await expect(homePage.shoppingCartBadge).toHaveText(TEST_PRODUCTS.length.toString());
  });

});

test.describe('Home Page - Product Sorting', () => {
  const SORT_OPTION_LOW_TO_HIGH = 'lohi';

  test.beforeEach(async ({ page, loginPage, homePage }) => {
    // Arrange - Login before each test
    await loginPage.navigate();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(homePage.inventoryList).toBeVisible();
  });

  test('should sort products by price from low to high', async ({ homePage }) => {
    // Act
    await homePage.selectSortOption(SORT_OPTION_LOW_TO_HIGH);

    // Assert - Verify sort option is selected
    await expect(homePage.productSortContainer).toHaveValue(SORT_OPTION_LOW_TO_HIGH);

    // Assert - Get all product prices and verify they are sorted low to high
    const priceElements = await homePage.inventoryItemPrice.all();
    const prices: number[] = [];
    
    for (const priceElement of priceElements) {
      const priceText = (await priceElement.textContent()) || '';
      prices.push(TestHelper.parsePriceToNumber(priceText));
    }

    // Verify prices are in ascending order
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

});

test.describe('Home Page - Product Detail Page', () => {
  const TEST_PRODUCT = PRODUCTS.BACKPACK;

  test.beforeEach(async ({ page, loginPage, homePage }) => {
    // Arrange - Login before each test
    await loginPage.navigate();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(homePage.inventoryList).toBeVisible();
  });

  test('should open product detail page with accurate information when clicking product name', async ({ page, homePage, productDetailPage }) => {
    // Arrange - Get product information from home page before navigation
    const homePagePrice = await homePage.getProductPrice(TEST_PRODUCT);
    const homePageDescription = await homePage.getProductDescription(TEST_PRODUCT);

    // Act
    await homePage.clickProductName(TEST_PRODUCT);

    // Assert - Verify navigation to product detail page
    await expect(productDetailPage.productDetailsContainer).toBeVisible();

    // Assert - Verify product information is accurate
    await expect(productDetailPage.productName).toBeVisible();
    await expect(productDetailPage.productName).toHaveText(TEST_PRODUCT);

    await expect(productDetailPage.productDescription).toBeVisible();
    await expect(productDetailPage.productDescription).toHaveText(homePageDescription);

    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productPrice).toHaveText(homePagePrice);

    // Assert - Verify product image is displayed
    await expect(productDetailPage.productImage).toBeVisible();

    // Assert - Verify back button is visible
    await expect(productDetailPage.backToProductsButton).toBeVisible();
  });

});
test.describe('Home Page - Logout', () => {

  test('should logout successfully and redirect to login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    
    // Arrange - Login first
    await loginPage.navigate();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(homePage.inventoryList).toBeVisible();
    
    // Act - Logout
    await homePage.openMenu()
    await homePage.clickLogout();
    
    // Assert - Verify redirected to login page
    await expect(loginPage.loginButton).toBeVisible();
  });
});