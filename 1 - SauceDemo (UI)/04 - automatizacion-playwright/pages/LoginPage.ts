//*Importacion de page tipo de Playwright y Locator para localizar elementos en la pagina
import {Page, Locator} from '@playwright/test';
//

//* Clase LoginPage que representa la página de inicio de sesión
export class LoginPage{
    //Definicion de propiedades de la clase
    readonly page : Page;
    readonly inputuser : Locator;
    readonly inputpassword: Locator;
    readonly loginButton: Locator;
    readonly error: Locator;

    //*Constructor de la clase LoginPage que inicializa las propiedades con los elementos de la página
    constructor(page: Page){
            this.page = page;
            this.inputuser = page.locator("[data-test=username]");
            this.inputpassword = page.locator("[data-test=password]");
            this.loginButton = page.locator("[data-test=login-button]");
            this.error = page.locator("[data-test=error]");
        }
    //*Método para iniciar sesión en la página
    async login(username: string, password: string){
        await this.inputuser.fill(username);
        await this.inputpassword.fill(password);
        await this.loginButton.click();
    }
    //*Método para ir a la página de inicio de sesión
    async ir() {                 
    await this.page.goto('/'); 
    }

}