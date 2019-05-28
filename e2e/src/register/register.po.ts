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

    public admin = {
        email: 'Admin-01@fakemail.com',
        password: 'mypass'
    };

    public manager = {
        role: 'MANAGER',
        name: 'Cristobal',
        surname: 'Gallardo Gallardo',
        email: 'Manager-test@fakemail.com',
        phone: '674345675',
        address: 'c/test 23',
        preferredLanguage: 'es',
        password: 'mypas'
    };

    //Go to register page
    navigateTo() {
        return browser.get('/register');
    }


    //Fill the form with data
    fillForm(actor: any) {
        //var nextButton = element(by.buttonText('Registrarse'));
        //const buttonSelector = 'body > app-root > div > div > div > app-register > div > div > div > form > div.form-group.d-flex.justify-content-center.mt-3.login_container > button';
        element(by.css('#role')).sendKeys(actor.role);
        element(by.css('#name')).sendKeys(actor.name);
        element(by.css('#surname')).sendKeys(actor.surname);
        element(by.css('#email')).sendKeys(actor.email);
        element(by.css('#phone')).sendKeys(actor.phone);
        element(by.css('#address')).sendKeys(actor.address);
        element(by.css('#lang')).sendKeys(actor.preferredLanguage);
        element(by.css('#password')).sendKeys(actor.password);
        //element(by.css('#register')).click();
        //browser.actions().mouseMove(nextButton).click().perform();
        browser.executeScript(`const button = document.querySelector('#register');
            button.click();`);
    }


    checkWrongRegister(){
        const selector='#toast-container > div > div.toast-title.ng-star-inserted';
        return element(by.css(selector)).getText();
    }
}