//*Importacion de page tipo de Playwright y Locator para localizar elementos en la pagina
import {Page, Locator} from '@playwright/test';

export class CheckoutCompletePage{
    readonly page: Page;
    readonly mensajeDeExito: Locator;
    readonly backBoton: Locator;

    constructor(page: Page){
        this.page = page;
        this.mensajeDeExito = page.locator('[data-test="complete-header"]');
        this.backBoton = page.locator('[data-test="back-to-products"]');
    }

    async volverAlInicio() {
        await this.backBoton.click();
    }
}