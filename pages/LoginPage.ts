import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly _usernameInput: Locator;
  private readonly _passwordInput: Locator;
  private readonly _loginButton: Locator;
  private readonly _errorMessage: Locator;
  private readonly _errorCloseButton: Locator;

  constructor(page: Page) {
    super(page);
    this._usernameInput = page.locator('[data-test="username"]');
    this._passwordInput = page.locator('[data-test="password"]');
    this._loginButton = page.locator('[data-test="login-button"]');
    this._errorMessage = page.locator('[data-test="error"]');
    this._errorCloseButton = page.locator('[data-test="error-button"]');
  }

  get usernameInput(): Locator {
    return this._usernameInput;
  }

  get passwordInput(): Locator {
    return this._passwordInput;
  }

  get loginButton(): Locator {
    return this._loginButton;
  }

  get errorMessage(): Locator {
    return this._errorMessage;
  }

  get errorCloseButton(): Locator {
    return this._errorCloseButton;
  }

  async fillUsername(username: string): Promise<this> {
    await this._usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string): Promise<this> {
    await this._passwordInput.fill(password);
    return this;
  }

  async clickLogin(): Promise<void> {
    await this._loginButton.click();
  }

  async closeError(): Promise<this> {
    await this._errorCloseButton.click();
    return this;
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage(): Promise<string> {
    return (await this._errorMessage.textContent()) || '';
  }
}
