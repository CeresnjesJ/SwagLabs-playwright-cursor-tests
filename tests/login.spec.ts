import { test, expect } from '../fixtures/fixture';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { USERS, ERROR_MESSAGES } from '../test-data/users';

test.describe('Login Page - Authentication', () => {
  const INVALID_CREDENTIALS = { username: 'invalid_user', password: 'wrong_password' };
  const EXPECTED_PAGE_TITLE = 'Products';

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ page, loginPage, homePage }) => {
    // Act
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);

    // Assert
    await expect(homePage.inventoryList).toBeVisible();
    await expect(homePage.pageTitle).toHaveText(EXPECTED_PAGE_TITLE);
    await expect(homePage.shoppingCartLink).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page, loginPage }) => {
    // Act
    await loginPage.login(INVALID_CREDENTIALS.username, INVALID_CREDENTIALS.password);

    // Assert
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.INVALID_CREDENTIALS);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should prevent access to inventory after logout', async ({ page, loginPage, homePage }) => {
    // Arrange - Login first
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(homePage.inventoryList).toBeVisible();

    // Act - Logout
    await homePage.logout();
   
    // Assert - Verify redirected to login page
    await expect(loginPage.loginButton).toBeVisible();

    // Act - Attempt to access inventory page directly
    await page.goto('/inventory.html');

    // Assert - Verify user is redirected back to login page
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('You can only access \'/inventory.html\' when you are logged in');
  });

});
