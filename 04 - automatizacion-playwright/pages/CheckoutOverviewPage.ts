//*Importacion de page tipo de Playwright y Locator para localizar elementos en la pagina
import {Page, Locator} from '@playwright/test';

export class CheckoutOverviewPage{
    readonly page: Page;
    readonly totalPrice: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async finalizar() {
        await this.finishButton.click();
    }
}