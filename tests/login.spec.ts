import { test, expect } from '../fixtures/fixture';
import { USERS, ERROR_MESSAGES, PAGE_TITLES, URLS } from '../test-data/users';
import { TestHelper } from '../helpers/helper';

test.describe('Login Page - Authentication', () => {
  const INVALID_CREDENTIALS = { username: 'invalid_user', password: 'wrong_password' };

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ loginPage, homePage }) => {
    // Act
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);

    // Assert
   await TestHelper.verifySuccessfulLogin(homePage, PAGE_TITLES.PRODUCTS);
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    // Act
    await loginPage.login(INVALID_CREDENTIALS.username, INVALID_CREDENTIALS.password);

    // Assert
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  test('should prevent access to inventory after logout', async ({ page, loginPage, homePage }) => {
    // Arrange - Login first
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await TestHelper.verifySuccessfulLogin(homePage, PAGE_TITLES.PRODUCTS);

    // Act - Logout
    await homePage.logout();
   
    // Assert - Verify redirected to login page
    await expect(loginPage.loginButton).toBeVisible();

    // Act - Attempt to access inventory page directly
    await page.goto(URLS.INVENTORY);

    // Assert - Verify user is redirected back to login page
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(`You can only access '${URLS.INVENTORY}' when you are logged in`);
  });

});
