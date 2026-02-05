import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  // Common Header elements
  protected readonly _menuButton: Locator;
  protected readonly _closeMenuButton: Locator;
  protected readonly _appLogo: Locator;
  protected readonly _pageTitle: Locator;
  protected readonly _shoppingCartLink: Locator;
  protected readonly _shoppingCartBadge: Locator;

  // Common Menu sidebar elements
  protected readonly _menuContainer: Locator;
  protected readonly _allItemsLink: Locator;
  protected readonly _aboutLink: Locator;
  protected readonly _logoutLink: Locator;
  protected readonly _resetAppStateLink: Locator;

  // Common Footer elements
  protected readonly _socialTwitter: Locator;
  protected readonly _socialFacebook: Locator;
  protected readonly _socialLinkedIn: Locator;
  protected readonly _footerCopy: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header locators
    this._menuButton = page.locator('#react-burger-menu-btn');
    this._closeMenuButton = page.locator('#react-burger-cross-btn');
    this._appLogo = page.locator('.app_logo');
    this._pageTitle = page.getByTestId('title');
    this._shoppingCartLink = page.getByTestId('shopping-cart-link');
    this._shoppingCartBadge = page.getByTestId('shopping-cart-badge');

    // Menu sidebar locators
    this._menuContainer = page.locator('.bm-menu');
    this._allItemsLink = page.locator('#inventory_sidebar_link');
    this._aboutLink = page.locator('#about_sidebar_link');
    this._logoutLink = page.locator('#logout_sidebar_link');
    this._resetAppStateLink = page.locator('#reset_sidebar_link');

    // Footer locators
    this._socialTwitter = page.getByTestId('social-twitter');
    this._socialFacebook = page.getByTestId('social-facebook');
    this._socialLinkedIn = page.getByTestId('social-linkedin');
    this._footerCopy = page.getByTestId('footer-copy');
  }

  // Common Header getters
  get menuButton(): Locator {
    return this._menuButton;
  }

  get closeMenuButton(): Locator {
    return this._closeMenuButton;
  }

  get appLogo(): Locator {
    return this._appLogo;
  }

  get pageTitle(): Locator {
    return this._pageTitle;
  }

  get shoppingCartLink(): Locator {
    return this._shoppingCartLink;
  }

  get shoppingCartBadge(): Locator {
    return this._shoppingCartBadge;
  }

  // Common Menu sidebar getters
  get menuContainer(): Locator {
    return this._menuContainer;
  }

  get allItemsLink(): Locator {
    return this._allItemsLink;
  }

  get aboutLink(): Locator {
    return this._aboutLink;
  }

  get logoutLink(): Locator {
    return this._logoutLink;
  }

  get resetAppStateLink(): Locator {
    return this._resetAppStateLink;
  }

  // Common Footer getters
  get socialTwitter(): Locator {
    return this._socialTwitter;
  }

  get socialFacebook(): Locator {
    return this._socialFacebook;
  }

  get socialLinkedIn(): Locator {
    return this._socialLinkedIn;
  }

  get footerCopy(): Locator {
    return this._footerCopy;
  }

  // Common navigation and utility methods
  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getPageTitle(): Promise<string> {
    return (await this._pageTitle.textContent()) || '';
  }

  async getCartBadgeCount(): Promise<string> {
    return (await this._shoppingCartBadge.textContent()) || '';
  }

  // Common Header actions
  async openMenu(): Promise<void> {
    await this._menuButton.click();
    await this._menuContainer.waitFor({ state: 'visible' });
  }

  async clickCloseMenuButton(): Promise<void> {
    await this._closeMenuButton.click();
    await this._menuContainer.waitFor({ state: 'hidden' });
  }

  async clickShoppingCart(): Promise<void> {
    await this._shoppingCartLink.click();
  }

  // Common Menu sidebar actions
  async clickAllItems(): Promise<void> {
    await this._allItemsLink.click();
  }

  async clickAbout(): Promise<void> {
    await this._aboutLink.click();
  }

  async clickLogout(): Promise<void> {
    await this._logoutLink.click();
  }

  async clickResetAppState(): Promise<void> {
    await this._resetAppStateLink.click();
  }

  async isMenuOpen(): Promise<boolean> {
    return await this._menuContainer.isVisible();
  }
}
