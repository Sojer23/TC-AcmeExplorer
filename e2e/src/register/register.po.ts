import { browser, element, by } from "protractor";


export class RegisterPage {
    public explorer = {
        role: 'EXPLORER',
        name: 'José',
        surname: 'Gallardo Gallardo',
        email: 'Explorer-test@fakemail.com',
        phone: '674345675',
        address: 'c/test 23',
        preferredLanguage: 'es',
        password: 'mypass'
    };

    //Go to register page
    navigateTo() {
        return browser.get('/register');
    }


    //Fill the form with data
    fillForm(actor: any = this.explorer) {
        //var nextButton = element(by.buttonText('Registrarse'));
        //const buttonSelector = 'body > app-root > div > div > div > app-register > div > div > div > form > div.form-group.d-flex.justify-content-center.mt-3.login_container > button';
        element(by.css('#role')).sendKeys(this.explorer.role);
        element(by.css('#name')).sendKeys(this.explorer.name);
        element(by.css('#surname')).sendKeys(this.explorer.surname);
        element(by.css('#email')).sendKeys(this.explorer.email);
        element(by.css('#phone')).sendKeys(this.explorer.phone);
        element(by.css('#address')).sendKeys(this.explorer.address);
        element(by.css('#lang')).sendKeys(this.explorer.preferredLanguage);
        element(by.css('#password')).sendKeys(this.explorer.password);
        //element(by.css('#register')).click();
        //browser.actions().mouseMove(nextButton).click().perform();
        browser.executeScript(`const button = document.querySelector('#register');
            button.click();`);
    }
}