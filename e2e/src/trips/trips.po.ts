import { browser, element, by } from "protractor";


export class TripsPage {
    public comment = "Quiero estar en Touluse varios días.";
    public trip = "Touluse";
    private tripId = "5c97c4caf0b1c134a85a8972";

    //Go to trips page
    navigateTo() {
        return browser.get('/trips');
    }

    clickOnATrip(tripIndex:number) {

        const start ='body > app-root > div > div > div > app-trip-list > div:nth-child(';
        const end= ') > div';
        const tripButton = ' > #trips > div.bottom-wrap > a';
        let selector = start.concat(tripIndex.toString());
        selector = selector.concat(end);

        const buttonSelector = selector.concat(tripButton);

        element(by.css(buttonSelector)).click();

        //browser.get('/trips/display/' + this.tripId);
    }


    //Fill the form with data
    fillComment(comment: any = this.comment) {
        const apply = '#apply1';
        const applyPostComment = 'body > app-root > div > div > div > app-trip > div.card > div > aside.col-sm-7 > article > form > button';

        //Click first button
        element(by.css(apply)).click();
        //Set the comment
        element(by.css('#comment')).sendKeys(comment);
        //Click second button
        element(by.css(applyPostComment)).click();

        //element(by.css('#register')).click();
        //browser.actions().mouseMove(nextButton).click().perform();
        /*browser.executeScript(`const button = document.querySelector('#register');
            button.click();`);*/
    }

    checkApplication(applicationIndex){

        const start ='body > app-root > div > div > div > app-application-list > div > table > tbody > tr:nth-child(';
        const end= ')';
        const tripButton = ' > td:nth-child(1) > figure > figcaption > dl:nth-child(2) > dd';
        let selector = start.concat(applicationIndex.toString());
        selector = selector.concat(end);

        const commentSelector = selector.concat(tripButton);

        return element(by.css(commentSelector)).getText();
        //body > app-root > div > div > div > app-application-list > div > table > tbody > tr.accepted > td:nth-child(1) > figure > figcaption > dl:nth-child(2) > dd
        //body > app-root > div > div > div > app-application-list > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > figure > figcaption > dl:nth-child(2) > dd
    }
}