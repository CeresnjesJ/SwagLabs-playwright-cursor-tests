import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { TestHelper } from '../helpers/helper';

export class HomePage extends BasePage {
  // Sorting elements
  private readonly _productSortContainer: Locator;

  // Inventory list
  private readonly _inventoryList: Locator;
  private readonly _inventoryItems: Locator;

  // Inventory item elements (generic)
  private readonly _inventoryItemName: Locator;
  private readonly _inventoryItemDescription: Locator;
  private readonly _inventoryItemPrice: Locator;
  private readonly _addToCartButtons: Locator;
  private readonly _removeButtons: Locator;

  constructor(page: Page) {
    super(page);

    // Sorting locators
    this._productSortContainer = page.getByTestId('product-sort-container');

    // Inventory locators
    this._inventoryList = page.locator('.inventory_list');
    this._inventoryItems = page.locator('.inventory_item');
    this._inventoryItemName = page.getByTestId('inventory-item-name');
    this._inventoryItemDescription = page.locator('.inventory_item_desc');
    this._inventoryItemPrice = page.locator('.inventory_item_price');
    this._addToCartButtons = page.locator('[data-test^="add-to-cart-"]');
    this._removeButtons = page.locator('[data-test^="remove-"]');
  }

  // Sorting getters
  get productSortContainer(): Locator {
    return this._productSortContainer;
  }

  // Inventory getters
  get inventoryList(): Locator {
    return this._inventoryList;
  }

  get inventoryItems(): Locator {
    return this._inventoryItems;
  }

  get inventoryItemName(): Locator {
    return this._inventoryItemName;
  }

  get inventoryItemDescription(): Locator {
    return this._inventoryItemDescription;
  }

  get inventoryItemPrice(): Locator {
    return this._inventoryItemPrice;
  }

  get addToCartButtons(): Locator {
    return this._addToCartButtons;
  }

  get removeButtons(): Locator {
    return this._removeButtons;
  }

  // Navigation
  async navigate(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  // Sorting actions
  async selectSortOption(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this._productSortContainer.selectOption(option);
  }

  async getCurrentSortOption(): Promise<string> {
    return (await this._productSortContainer.inputValue()) || '';
  }

  // Inventory actions
  async getInventoryItemsCount(): Promise<number> {
    return await this._inventoryItems.count();
  }

  async getProductByName(productName: string): Promise<Locator> {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const productSlug = TestHelper.convertProductNameToSlug(productName);
    await this.page.getByTestId(`add-to-cart-${productSlug}`).click();
  }

  async removeProductFromCartByName(productName: string): Promise<void> {
    const productSlug = TestHelper.convertProductNameToSlug(productName);
    await this.page.getByTestId(`remove-${productSlug}`).click();
  }

  async getProductPrice(productName: string): Promise<string> {
    const product = await this.getProductByName(productName);
    const priceElement = product.locator('.inventory_item_price');
    return (await priceElement.textContent()) || '';
  }

  async getProductDescription(productName: string): Promise<string> {
    const product = await this.getProductByName(productName);
    const descriptionElement = product.locator('.inventory_item_desc');
    return (await descriptionElement.textContent()) || '';
  }

  async clickProductName(productName: string): Promise<void> {
    await this.page.getByTestId('inventory-item-name').filter({ hasText: productName }).click();
  }

  async getAddToCartButtonsCount(): Promise<number> {
    return await this._addToCartButtons.count();
  }

  async getRemoveButtonsCount(): Promise<number> {
    return await this._removeButtons.count();
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const productSlug = TestHelper.convertProductNameToSlug(productName);
    const removeButton = this.page.getByTestId(`remove-${productSlug}`);
    return await removeButton.isVisible();
  }
  async logout(): Promise<void> {
    await this._menuButton.click();
    await this._logoutLink.click();
  }
   /**
   * Add multiple products to cart and capture their details
   * @param productNames - Array of product names to add
   * @returns Array of product details (name, price, description)
   */
   async addMultipleProductsAndCaptureDetails(
    productNames: string[]
  ): Promise<Array<{ name: string; price: string; description: string }>> {
    const products = [];

    for (const productName of productNames) {
      const price = await this.getProductPrice(productName);
      const description = await this.getProductDescription(productName);
      
      products.push({ name: productName, price, description });
      
      await this.addProductToCartByName(productName);
    }

    return products;
  }

}
