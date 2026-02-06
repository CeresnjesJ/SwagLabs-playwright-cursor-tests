import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PAGE_TITLES } from '../test-data/users';
import { ProductDetailPage } from '../pages/ProductDetailPage';
export class TestHelper {
  /**
   * Parses a price string (e.g., "$29.99" or "Item total: $50.00") to a number
   * @param priceText - The price text to parse
   * @returns The numeric value of the price
   */
  static parsePriceToNumber(priceText: string): number {
    return parseFloat(priceText.replace(/[^0-9.]/g, ''));
  }

  /**
   * Converts a product name to a slug format (e.g., "Sauce Labs Backpack" -> "sauce-labs-backpack")
   * @param productName - The product name to convert
   * @returns The slug version of the product name
   */
  static convertProductNameToSlug(productName: string): string {
    return productName.toLowerCase().replace(/\s+/g, '-');
  }

  /**
   * Sums an array of numbers
   * @param numbers - The array of numbers to sum
   * @returns The sum of all numbers in the array
   */
  static sumArray(numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
  }

  static async verifySuccessfulLogin(homePage: HomePage, expectedTitle: string): Promise<void> {
    await expect(homePage.inventoryList).toBeVisible();
    await expect(homePage.pageTitle).toHaveText(expectedTitle);
    await expect(homePage.shoppingCartLink).toBeVisible();
  }
  
    /**
   * Verify page is loaded by checking title
   */
  static async verifyPageLoaded(page: any, expectedTitle: string): Promise<void> {
    await expect(page.pageTitle).toBeVisible();
    await expect(page.pageTitle).toHaveText(expectedTitle);
  }

  /**
   * Verify cart badge shows correct count
   */
  static async verifyCartBadgeCount(homePage: HomePage, expectedCount: number): Promise<void> {
    if (expectedCount === 0) {
      await expect(homePage.shoppingCartBadge).not.toBeVisible();
    } else {
      await expect(homePage.shoppingCartBadge).toBeVisible();
      await expect(homePage.shoppingCartBadge).toHaveText(expectedCount.toString());
    }
  }

  /**
   * Verify all products in cart match expected products
   */
  static async verifyCartProducts(
    cartPage: CartPage,
    expectedProducts: Array<{ name: string; price: string; description: string }>
  ): Promise<void> {
    for (let i = 0; i < expectedProducts.length; i++) {
      const actualName = await cartPage.getProductNameByIndex(i);
      const actualPrice = await cartPage.getProductPriceByIndex(i);
      const actualDescription = await cartPage.getProductDescriptionByIndex(i);

      expect(actualName).toBe(expectedProducts[i].name);
      expect(actualPrice).toBe(expectedProducts[i].price);
      expect(actualDescription).toBe(expectedProducts[i].description);
    }
  }

  static async verifyPricesInAscendingOrder(homePage: HomePage): Promise<void> {
    const priceElements = await homePage.inventoryItemPrice.all();
    const prices: number[] = [];
    
    for (const priceElement of priceElements) {
      const priceText = (await priceElement.textContent()) || '';
      prices.push(this.parsePriceToNumber(priceText));
    }
    
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  }

 /**
   * Verify checkout error message is displayed
   */
 static async verifyCheckoutError(checkoutPage: CheckoutPage, expectedMessage: string): Promise<void> {
  await expect(checkoutPage.checkoutInfoContainer).toBeVisible();
  await expect(checkoutPage.errorMessage).toBeVisible();
  
  const errorMessage = await checkoutPage.getErrorMessage();
  expect(errorMessage).toContain(expectedMessage);
}

/**
 * Get checkout price summary and verify calculations
 */
static async getCheckoutPriceSummary(
  checkoutPage: CheckoutPage,
  productCount: number
): Promise<{
  productPrices: number[];
  subtotal: number;
  tax: number;
  total: number;
  expectedSubtotal: number;
  expectedTotal: number;
}> {
  const productPrices: number[] = [];
  
  for (let i = 0; i < productCount; i++) {
    const priceText = await checkoutPage.getProductPriceByIndex(i);
    productPrices.push(this.parsePriceToNumber(priceText));
  }

  const subtotalText = await checkoutPage.getSubtotal();
  const taxText = await checkoutPage.getTax();
  const totalText = await checkoutPage.getTotal();

  const subtotal = this.parsePriceToNumber(subtotalText);
  const tax = this.parsePriceToNumber(taxText);
  const total = this.parsePriceToNumber(totalText);

  const expectedSubtotal = this.sumArray(productPrices);
  const expectedTotal = subtotal + tax;

  return {
    productPrices,
    subtotal,
    tax,
    total,
    expectedSubtotal,
    expectedTotal,
  };
}

/**
 * Verify order completion page
 */
static async verifyOrderCompletion(checkoutPage: CheckoutPage): Promise<void> {
  await expect(checkoutPage.checkoutCompleteContainer).toBeVisible();
  await expect(checkoutPage.completeHeader).toBeVisible();
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  await expect(checkoutPage.completeText).toBeVisible();
  await expect(checkoutPage.completeText).toHaveText(
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
  );
  await expect(checkoutPage.ponyExpressImage).toBeVisible();
  await expect(checkoutPage.backHomeButton).toBeVisible();
}
/**
 * Navigate to checkout overview page by filling form and clicking continue
 */
static async navigateToCheckoutOverview(
  checkoutPage: CheckoutPage,
  firstName: string,
  lastName: string,
  postalCode: string
): Promise<void> {
  await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
  await checkoutPage.clickContinue();
  await TestHelper.verifyPageLoaded(checkoutPage, PAGE_TITLES.CHECKOUT_OVERVIEW);
}
/**
 * Verify product details page displays correct information
 */
static async verifyProductDetailsDisplayed(
  productDetailPage: ProductDetailPage,
  expectedName: string,
  expectedDescription: string,
  expectedPrice: string
): Promise<void> {
  await expect(productDetailPage.productDetailsContainer).toBeVisible();
  await expect(productDetailPage.productName).toHaveText(expectedName);
  await expect(productDetailPage.productDescription).toHaveText(expectedDescription);
  await expect(productDetailPage.productPrice).toHaveText(expectedPrice);
  await expect(productDetailPage.productImage).toBeVisible();
  await expect(productDetailPage.backToProductsButton).toBeVisible();
}

}
