import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  // Product detail elements
  private readonly _productDetailsContainer: Locator;
  private readonly _productName: Locator;
  private readonly _productDescription: Locator;
  private readonly _productPrice: Locator;
  private readonly _productImage: Locator;
  private readonly _backToProductsButton: Locator;
  private readonly _addToCartButton: Locator;
  private readonly _removeButton: Locator;

  constructor(page: Page) {
    super(page);

    // Product detail locators
    this._productDetailsContainer = page.locator('.inventory_details_container');
    this._productName = page.getByTestId('inventory-item-name');
    this._productDescription = page.getByTestId('inventory-item-desc');
    this._productPrice = page.getByTestId('inventory-item-price');
    this._productImage = page.locator('.inventory_details_img');
    this._backToProductsButton = page.getByTestId('back-to-products');
    this._addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this._removeButton = page.locator('[data-test^="remove"]');
  }

  // Product detail getters
  get productDetailsContainer(): Locator {
    return this._productDetailsContainer;
  }

  get productName(): Locator {
    return this._productName;
  }

  get productDescription(): Locator {
    return this._productDescription;
  }

  get productPrice(): Locator {
    return this._productPrice;
  }

  get productImage(): Locator {
    return this._productImage;
  }

  get backToProductsButton(): Locator {
    return this._backToProductsButton;
  }

  get addToCartButton(): Locator {
    return this._addToCartButton;
  }

  get removeButton(): Locator {
    return this._removeButton;
  }

  // Navigation
  async navigate(productId: number): Promise<void> {
    await this.page.goto(`/inventory-item.html?id=${productId}`);
  }

  // Product detail actions
  async getProductName(): Promise<string> {
    return (await this._productName.textContent()) || '';
  }

  async getProductDescription(): Promise<string> {
    return (await this._productDescription.textContent()) || '';
  }

  async getProductPrice(): Promise<string> {
    return (await this._productPrice.textContent()) || '';
  }

  async clickBackToProducts(): Promise<void> {
    await this._backToProductsButton.click();
  }

  async clickAddToCart(): Promise<void> {
    await this._addToCartButton.click();
  }

  async clickRemove(): Promise<void> {
    await this._removeButton.click();
  }

  async isAddToCartButtonVisible(): Promise<boolean> {
    return await this._addToCartButton.isVisible();
  }

  async isRemoveButtonVisible(): Promise<boolean> {
    return await this._removeButton.isVisible();
  }
}
