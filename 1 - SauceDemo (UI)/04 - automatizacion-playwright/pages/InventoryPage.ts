//*Importacion de page tipo de Playwright y Locator para localizar elementos en la pagina
import {Page, Locator} from '@playwright/test';

export class InventoryPage{
    readonly page: Page;
    readonly contadorCarrito : Locator;
    readonly iconoCarrito: Locator;  


    constructor(page: Page){
        this.page = page;
        this.contadorCarrito = page.locator('[data-test="shopping-cart-badge"]');
        this.iconoCarrito = page.locator('[data-test="shopping-cart-link"]');
    
    }
    

    async agregarAlCarrito(nombre: string){
        await this.page.locator('[data-test="inventory-item"]')
        .filter({hasText:nombre})
        .getByRole('button', {name: 'Add to cart'})
        .click();
    }

    async irAlCarrito(){
        await this.iconoCarrito.click();
    }

}