    import { test, expect } from '@playwright/test';
    import { LoginPage } from '../pages/Loginpage'; 
    import { InventoryPage } from '../pages/Inventorypage';

    test.describe('Pruebas de la tienda', () => {   

        
        test('Agregar un producto al carrito', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const agregarCarrito = new InventoryPage(page);
            //iniciar seccion
            await loginPage.ir();
            await loginPage.login('standard_user', 'secret_sauce');
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

            //agregar producto al carrito
            await agregarCarrito.AgregarCarrito('Sauce Labs Backpack');
            await expect(agregarCarrito.contadorCarrito).toHaveText('1');



        });

    })