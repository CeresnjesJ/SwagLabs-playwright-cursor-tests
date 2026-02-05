import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Checkout Step One - Form elements
  private readonly _checkoutInfoContainer: Locator;
  private readonly _firstNameInput: Locator;
  private readonly _lastNameInput: Locator;
  private readonly _postalCodeInput: Locator;
  private readonly _continueButton: Locator;

  // Checkout Step Two - Overview elements
  private readonly _checkoutSummaryContainer: Locator;
  private readonly _cartItems: Locator;
  private readonly _cartItemName: Locator;
  private readonly _cartItemDescription: Locator;
  private readonly _cartItemPrice: Locator;
  private readonly _cartItemQuantity: Locator;
  private readonly _paymentInfoLabel: Locator;
  private readonly _paymentInfoValue: Locator;
  private readonly _shippingInfoLabel: Locator;
  private readonly _shippingInfoValue: Locator;
  private readonly _subtotalLabel: Locator;
  private readonly _taxLabel: Locator;
  private readonly _totalLabel: Locator;
  private readonly _finishButton: Locator;

  // Checkout Complete elements
  private readonly _checkoutCompleteContainer: Locator;
  private readonly _ponyExpressImage: Locator;
  private readonly _completeHeader: Locator;
  private readonly _completeText: Locator;
  private readonly _backHomeButton: Locator;

  // Common elements
  private readonly _cancelButton: Locator;
  private readonly _errorMessage: Locator;
  private readonly _errorCloseButton: Locator;

  constructor(page: Page) {
    super(page);

    // Checkout Step One - Form locators
    this._checkoutInfoContainer = page.locator('#checkout_info_container');
    this._firstNameInput = page.locator('[data-test="firstName"]');
    this._lastNameInput = page.locator('[data-test="lastName"]');
    this._postalCodeInput = page.locator('[data-test="postalCode"]');
    this._continueButton = page.locator('[data-test="continue"]');

    // Checkout Step Two - Overview locators
    this._checkoutSummaryContainer = page.locator('#checkout_summary_container');
    this._cartItems = page.getByTestId('inventory-item');
    this._cartItemName = page.getByTestId('inventory-item-name');
    this._cartItemDescription = page.getByTestId('inventory-item-desc');
    this._cartItemPrice = page.getByTestId('inventory-item-price');
    this._cartItemQuantity = page.getByTestId('item-quantity');
    this._paymentInfoLabel = page.getByTestId('payment-info-label');
    this._paymentInfoValue = page.getByTestId('payment-info-value');
    this._shippingInfoLabel = page.getByTestId('shipping-info-label');
    this._shippingInfoValue = page.getByTestId('shipping-info-value');
    this._subtotalLabel = page.getByTestId('subtotal-label');
    this._taxLabel = page.getByTestId('tax-label');
    this._totalLabel = page.getByTestId('total-label');
    this._finishButton = page.getByTestId('finish');

    // Checkout Complete locators
    this._checkoutCompleteContainer = page.locator('#checkout_complete_container');
    this._ponyExpressImage = page.getByTestId('pony-express');
    this._completeHeader = page.getByTestId('complete-header');
    this._completeText = page.getByTestId('complete-text');
    this._backHomeButton = page.getByTestId('back-to-products');

    // Common locators
    this._cancelButton = page.locator('[data-test="cancel"]');
    this._errorMessage = page.locator('[data-test="error"]');
    this._errorCloseButton = page.locator('[data-test="error-button"]');
  }

  // Checkout Step One - Form getters
  get checkoutInfoContainer(): Locator {
    return this._checkoutInfoContainer;
  }

  get firstNameInput(): Locator {
    return this._firstNameInput;
  }

  get lastNameInput(): Locator {
    return this._lastNameInput;
  }

  get postalCodeInput(): Locator {
    return this._postalCodeInput;
  }

  get continueButton(): Locator {
    return this._continueButton;
  }

  // Checkout Step Two - Overview getters
  get checkoutSummaryContainer(): Locator {
    return this._checkoutSummaryContainer;
  }

  get cartItems(): Locator {
    return this._cartItems;
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

  get cartItemQuantity(): Locator {
    return this._cartItemQuantity;
  }

  get paymentInfoLabel(): Locator {
    return this._paymentInfoLabel;
  }

  get paymentInfoValue(): Locator {
    return this._paymentInfoValue;
  }

  get shippingInfoLabel(): Locator {
    return this._shippingInfoLabel;
  }

  get shippingInfoValue(): Locator {
    return this._shippingInfoValue;
  }

  get subtotalLabel(): Locator {
    return this._subtotalLabel;
  }

  get taxLabel(): Locator {
    return this._taxLabel;
  }

  get totalLabel(): Locator {
    return this._totalLabel;
  }

  get finishButton(): Locator {
    return this._finishButton;
  }

  // Checkout Complete getters
  get checkoutCompleteContainer(): Locator {
    return this._checkoutCompleteContainer;
  }

  get ponyExpressImage(): Locator {
    return this._ponyExpressImage;
  }

  get completeHeader(): Locator {
    return this._completeHeader;
  }

  get completeText(): Locator {
    return this._completeText;
  }

  get backHomeButton(): Locator {
    return this._backHomeButton;
  }

  // Common getters
  get cancelButton(): Locator {
    return this._cancelButton;
  }

  get errorMessage(): Locator {
    return this._errorMessage;
  }

  get errorCloseButton(): Locator {
    return this._errorCloseButton;
  }

  // Navigation
  async navigate(): Promise<void> {
    await this.page.goto('/checkout-step-one.html');
  }

  async navigateToOverview(): Promise<void> {
    await this.page.goto('/checkout-step-two.html');
  }

  async navigateToComplete(): Promise<void> {
    await this.page.goto('/checkout-complete.html');
  }

  // Checkout Step One - Form actions
  async fillFirstName(firstName: string): Promise<this> {
    await this._firstNameInput.fill(firstName);
    return this;
  }

  async fillLastName(lastName: string): Promise<this> {
    await this._lastNameInput.fill(lastName);
    return this;
  }

  async fillPostalCode(postalCode: string): Promise<this> {
    await this._postalCodeInput.fill(postalCode);
    return this;
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<this> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
    return this;
  }

  async clickContinue(): Promise<void> {
    await this._continueButton.click();
  }

  // Checkout Step Two - Overview actions
  async getCartItemsCount(): Promise<number> {
    return await this._cartItems.count();
  }

  async getProductByName(productName: string): Promise<{ name: string; price: string; description: string } | null> {
    const items = await this.page.locator('.cart_item').all();
    
    for (const item of items) {
      const nameElement = item.getByTestId('inventory-item-name');
      const name = (await nameElement.textContent()) || '';
      
      if (name === productName) {
        const priceElement = item.getByTestId('inventory-item-price');
        const descriptionElement = item.getByTestId('inventory-item-desc');
        
        const price = (await priceElement.textContent()) || '';
        const description = (await descriptionElement.textContent()) || '';
        
        return { name, price, description };
      }
    }
    
    return null;
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

  async getPaymentInfo(): Promise<string> {
    return (await this._paymentInfoValue.textContent()) || '';
  }

  async getShippingInfo(): Promise<string> {
    return (await this._shippingInfoValue.textContent()) || '';
  }

  async getSubtotal(): Promise<string> {
    const text = (await this._subtotalLabel.textContent()) || '';
    return text.replace('Item total: ', '').trim();
  }

  async getTax(): Promise<string> {
    const text = (await this._taxLabel.textContent()) || '';
    return text.replace('Tax: ', '').trim();
  }

  async getTotal(): Promise<string> {
    const text = (await this._totalLabel.textContent()) || '';
    return text.replace('Total: ', '').trim();
  }

  async clickFinish(): Promise<void> {
    await this._finishButton.click();
  }

  // Checkout Complete actions
  async clickBackHome(): Promise<void> {
    await this._backHomeButton.click();
  }

  async getCompleteHeaderText(): Promise<string> {
    return (await this._completeHeader.textContent()) || '';
  }

  async getCompleteMessageText(): Promise<string> {
    return (await this._completeText.textContent()) || '';
  }

  async isOrderComplete(): Promise<boolean> {
    return await this._completeHeader.isVisible();
  }

  async isPonyExpressImageVisible(): Promise<boolean> {
    return await this._ponyExpressImage.isVisible();
  }

  // Common actions
  async clickCancel(): Promise<void> {
    await this._cancelButton.click();
  }

  async closeError(): Promise<this> {
    await this._errorCloseButton.click();
    return this;
  }

  async getErrorMessage(): Promise<string> {
    return (await this._errorMessage.textContent()) || '';
  }

  async isErrorDisplayed(): Promise<boolean> {
    return await this._errorMessage.isVisible();
  }
}
