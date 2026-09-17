import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage'; 


//Login con credenciales validas
test('Login con credenciales validas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.ir();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
})

//credenciales invalidas
test('Login con credenciales invalidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.ir();
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.error).toContainText('Epic sadface: Username and password do not match any user in this service');
});
