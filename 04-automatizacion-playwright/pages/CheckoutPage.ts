//*Importacion de page tipo de Playwright y Locator para localizar elementos en la pagina
import {Page, Locator} from '@playwright/test';

export class CheckoutPage{
    readonly page: Page;
    readonly nombre: Locator;
    readonly apellido : Locator;
    readonly codigoPostal : Locator;
    readonly botonContinuar : Locator;

    constructor(page: Page) {
        this.page = page;
        this.nombre = page.locator('[data-test="firstName"]');
        this.apellido = page.locator('[data-test="lastName"]');
        this.codigoPostal = page.locator('[data-test="postalCode"]');
        this.botonContinuar = page.locator('[data-test="continue"]');
    }

    async llenarFormularioCheckout(nombre: string, apellido: string, codigoPostal: string) {
        await this.nombre.fill(nombre);
        await this.apellido.fill(apellido);
        await this.codigoPostal.fill(codigoPostal);
    }
    async irACheckoutStepTwo() {
        await this.botonContinuar.click();
    }

}