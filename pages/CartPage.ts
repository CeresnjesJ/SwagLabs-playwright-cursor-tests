import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { TestHelper } from '../helpers/helper';

export class CartPage extends BasePage {
  // Cart page specific elements
  private readonly _cartContentsContainer: Locator;
  private readonly _cartList: Locator;
  private readonly _cartQuantityLabel: Locator;
  private readonly _cartDescriptionLabel: Locator;

  // Cart item elements (generic)
  private readonly _cartItems: Locator;
  private readonly _cartItemQuantity: Locator;
  private readonly _cartItemName: Locator;
  private readonly _cartItemDescription: Locator;
  private readonly _cartItemPrice: Locator;

  // Cart action buttons
  private readonly _continueShoppingButton: Locator;
  private readonly _checkoutButton: Locator;
  private readonly _removeButtons: Locator;

  constructor(page: Page) {
    super(page);

    // Cart page specific locators
    this._cartContentsContainer = page.locator('#cart_contents_container');
    this._cartList = page.getByTestId('cart-list');
    this._cartQuantityLabel = page.getByTestId('cart-quantity-label');
    this._cartDescriptionLabel = page.getByTestId('cart-desc-label');

    // Cart item locators (generic)
    this._cartItems = page.getByTestId('inventory-item');
    this._cartItemQuantity = page.getByTestId('item-quantity');
    this._cartItemName = page.getByTestId('inventory-item-name');
    this._cartItemDescription = page.getByTestId('inventory-item-desc');
    this._cartItemPrice = page.getByTestId('inventory-item-price');

    // Cart action button locators
    this._continueShoppingButton = page.locator('#continue-shopping');
    this._checkoutButton = page.locator('#checkout');
    this._removeButtons = page.locator('[data-test^="remove-"]');
  }

  // Cart page specific getters
  get cartContentsContainer(): Locator {
    return this._cartContentsContainer;
  }

  get cartList(): Locator {
    return this._cartList;
  }

  get cartQuantityLabel(): Locator {
    return this._cartQuantityLabel;
  }

  get cartDescriptionLabel(): Locator {
    return this._cartDescriptionLabel;
  }

  // Cart item getters
  get cartItems(): Locator {
    return this._cartItems;
  }

  get cartItemQuantity(): Locator {
    return this._cartItemQuantity;
  }

  get cartItemName(): Locator {
    return this._cartItemName;
  }

  get cartItemDescription(): Locator {
    return this._cartItemDescription;
  }

  get cartItemPrice(): Locator {
    return this._cartItemPrice;
  }

  // Cart action button getters
  get continueShoppingButton(): Locator {
    return this._continueShoppingButton;
  }

  get checkoutButton(): Locator {
    return this._checkoutButton;
  }

  get removeButtons(): Locator {
    return this._removeButtons;
  }

  // Navigation
  async navigate(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  // Cart actions
  async clickContinueShopping(): Promise<void> {
    await this._continueShoppingButton.click();
  }

  async clickCheckout(): Promise<void> {
    await this._checkoutButton.click();
  }

  async getCartItemsCount(): Promise<number> {
    return await this._cartItems.count();
  }

  async removeProductByName(productName: string): Promise<void> {
    const productSlug = TestHelper.convertProductNameToSlug(productName);
    await this.page.getByTestId(`remove-${productSlug}`).click();
  }

  async getProductNameByIndex(index: number): Promise<string> {
    return (await this._cartItemName.nth(index).textContent()) || '';
  }

  async getProductPriceByIndex(index: number): Promise<string> {
    return (await this._cartItemPrice.nth(index).textContent()) || '';
  }

  async getProductDescriptionByIndex(index: number): Promise<string> {
    return (await this._cartItemDescription.nth(index).textContent()) || '';
  }

  async getProductQuantityByIndex(index: number): Promise<string> {
    return (await this._cartItemQuantity.nth(index).textContent()) || '';
  }

  async getCartItemByName(productName: string): Promise<Locator> {
    return this.page.locator('.cart_item').filter({ hasText: productName });
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const cartItem = await this.getCartItemByName(productName);
    return await cartItem.isVisible();
  }

  async clickProductName(productName: string): Promise<void> {
    await this._cartItemName.filter({ hasText: productName }).click();
  }
}
