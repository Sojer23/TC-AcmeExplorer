import { browser, element, by } from "protractor";


export class LoginPage{
    public creds ={
        username: 'Explorer-01@fakemail.com',
        password: 'mypass'
    };

    //Go to register page
    navigateTo(){
        return browser.get('/login');
    }

    //Fill the form with data
    fillForm(creds: any = this.creds){
        const buttonSelector = 'body > div > div > div > div.d-flex.justify-content-center.form_container > form > div.d-flex.justify-content-center.mt-3.login_container > button';
        element(by.css('#email')).sendKeys(creds.username);
        element(by.css('#password')).sendKeys(creds.password);
        element(by.css(buttonSelector)).click();
    }

    getProfileEmail(){
        const selector= 'body > app-root > div > div > div > app-actor > div > form > div:nth-child(1) > div.col-md-6 > div > h6'; 
        return element(by.css(selector)).getText();
    }
}