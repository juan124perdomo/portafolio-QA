//*Importacion de page tipo de Playwright y Locator para localizar elementos en la pagina
import {Page, Locator} from '@playwright/test';

//*Clase CartPage que representa la página del carrito de compras en la aplicación web.
export class CartPage{
    readonly page: Page;
    readonly nombresProductos: Locator;   
    readonly botonCheckout: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.nombresProductos = page.locator('[data-test="inventory-item-name"]');
        this.botonCheckout = page.locator('[data-test="checkout"]');
    }

    async irCheckout() {
        await this.botonCheckout.click();
    }

}