import { AppPage } from './app.po';
import { LoginPage } from './login/login.po';
import { browser } from 'protractor';
import { RegisterPage } from './register/register.po';
import { TripsPage } from './trips/trips.po';

describe('workspace-project App', () => {
  let page: AppPage;
  let login: LoginPage;
  let register: RegisterPage;
  let trips: TripsPage;

  beforeEach(() => {
    page = new AppPage();
    login = new LoginPage();
    register = new RegisterPage();
    trips = new TripsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('¡Cientos de destinos en oferta!');
  });


  /*it('should login to Acme-Explorer with Explorer-01 creds', ()=>{
    login.navigateTo();
    browser.sleep(2000);
    login.fillForm(login.creds);
    browser.sleep(2000);
    browser.get('/profile');
    browser.sleep(1000);
    expect(login.getProfileEmail()).toEqual('Explorer-01@fakemail.com');
    browser.sleep(2000);
  });*/

  /*it('should wrong register to Acme-Explorer by an administrator like as MANAGER', () => {
    login.navigateTo();
    browser.sleep(2000);
    login.fillForm({ 'username': register.admin.email, 'password': register.admin.password });
    browser.sleep(4000);
    register.navigateTo();
    browser.sleep(2000);
    register.fillForm(register.manager);
    browser.sleep(2000);
    expect(register.checkWrongRegister()).toEqual('Contraseña incorrecta');
    browser.sleep(2000);
    login.logout();
  });*/

  it('should register to Acme-Explorer like as EXPLORER', () => {
    browser.sleep(2000);
    register.navigateTo();
    browser.sleep(2000);
    register.fillForm(register.explorer);
    browser.sleep(2000);
    login.navigateTo();
    browser.sleep(2000);
    login.fillForm({ 'username': register.explorer.email, 'password': register.explorer.password });
    browser.sleep(2000);
    browser.get('/profile');
    browser.sleep(1000);
    expect(login.getProfileEmail()).toEqual('Explorer-test@fakemail.com');
    browser.sleep(2000);
  });

  it('should registry an application for a trip published', () => {
    trips.navigateTo();
    browser.sleep(2000);
    trips.clickOnATrip(2);
    browser.sleep(4000);
    trips.fillComment(trips.comment);
    browser.sleep(2000);
    expect(trips.checkApplication(1)).toEqual(trips.comment);
    browser.sleep(2000);
  });




});
