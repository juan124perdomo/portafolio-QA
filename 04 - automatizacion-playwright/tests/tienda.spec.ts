import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

    //*Pruebas de la tienda
    test.describe('Pruebas de la tienda', () => {

        //*Prueba del flujo de compra completo: agregar un producto, pagar y confirmar la orden
        test('Compra completa de un producto', async ({ page }) => {

            //Instanciar las clases de las paginas
            const loginPage = new LoginPage(page);
            const inventoryPage = new InventoryPage(page);
            const carrito = new CartPage(page);
            const checkout = new CheckoutPage(page);
            const checkoutOverview = new CheckoutOverviewPage(page);
            const checkoutComplete = new CheckoutCompletePage(page);

            //Datos de prueba
            const producto = 'Sauce Labs Backpack';
            const totalEsperado = 'Total: $32.39';

            //iniciar sesión
            await loginPage.ir();
            await loginPage.login('standard_user', 'secret_sauce');
            await expect(page).toHaveURL('/inventory.html');

            //agregar producto al carrito
            await inventoryPage.agregarAlCarrito(producto);
            await expect(inventoryPage.contadorCarrito).toHaveText('1');
            await inventoryPage.irAlCarrito();
            await expect(page).toHaveURL('/cart.html');

            //verificar que el producto agregado al carrito sea el correcto
            await expect(carrito.nombresProductos).toHaveCount(1);
            await expect(carrito.nombresProductos).toHaveText(producto);
            await carrito.irCheckout();
            await expect(page).toHaveURL('/checkout-step-one.html');

            //Llenar formulario de checkout
            await checkout.llenarFormularioCheckout('Juan', 'Perez', '12345');
            await checkout.irACheckoutStepTwo();
            await expect(page).toHaveURL('/checkout-step-two.html');

            //Verificar que el total del precio sea el correcto
            await expect(checkoutOverview.totalPrice).toHaveText(totalEsperado);
            await checkoutOverview.finalizar();
            await expect(page).toHaveURL('/checkout-complete.html');

            //Verificar la confirmación de la compra y volver al inicio
            await expect(checkoutComplete.mensajeDeExito).toHaveText('Thank you for your order!');
            await checkoutComplete.volverAlInicio();
            await expect(page).toHaveURL('/inventory.html');
        });


        //* "Carrito vacío permite completar compra".
        //*Este test afirma el comportamiento CORRECTO, no el actual, así que falla a propósito.
        //*El día que Sauce Labs lo arregle, este test va a pasar y hay que quitarle el .fail
        test.fail('El botón Checkout debe estar deshabilitado con el carrito vacío', async ({ page }) => {

            //Instanciar las clases de las paginas
            const loginPage = new LoginPage(page);
            const inventoryPage = new InventoryPage(page);
            const carrito = new CartPage(page);

            //iniciar sesión
            await loginPage.ir();
            await loginPage.login('standard_user', 'secret_sauce');
            await expect(page).toHaveURL('/inventory.html');

            //ir al carrito sin agregar ningún producto
            await inventoryPage.irAlCarrito();
            await expect(page).toHaveURL('/cart.html');

            //precondición: el carrito está realmente vacío
            await expect(carrito.nombresProductos).toHaveCount(0);

            //la verificación: con el carrito vacío no se debería poder avanzar a pagar
            await expect(carrito.botonCheckout).toBeDisabled();
        });

    })
