import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BarRatingModule } from 'ngx-bar-rating';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { ActorComponent } from '../../actors/actor/actor.component';
import { HeaderComponent } from 'src/app/components/master/header/header.component';
import { FooterComponent } from 'src/app/components/master/footer/footer.component';
import { RegisterComponent } from 'src/app/components/security/register/register.component';
import { ApplicationComponent } from '../../aplications/application/application.component';
import { LoginComponent } from 'src/app/components/security/login/login.component';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { DeniedAccessPageComponent } from 'src/app/components/denied-access-page/denied-access-page.component';
import { MainComponent } from 'src/app/components/master/main/main.component';
import { ActorListComponent } from '../../actors/actor-list/actor-list.component';
import { ActorEditComponent } from '../../actors/actor-edit/actor-edit.component';
import { ApplicationListComponent } from '../../aplications/application-list/application-list.component';
import { ApplicationEditComponent } from '../../aplications/application-edit/application-edit.component';
import { NotFoundComponent } from 'src/app/components/master/not-found/not-found.component';
import { TermsAndConditionsComponent } from 'src/app/components/master/terms-and-conditions/terms-and-conditions.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AngularFireModule } from 'angularfire2';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpLoaderFactory, firebaseConfig } from 'src/app/app.module';
import { AplicationService } from 'src/app/services/aplication.service';
import { TripComponent } from '../../trips/trip/trip.component';
import { TripListComponent } from '../../trips/trip-list/trip-list.component';
import { TripEditComponent } from '../../trips/trip-edit/trip-edit.component';
import { DisplayComponent } from '../../display/display.component';
import { TripPushComponent } from '../../trips/trip-push/trip-push.component';
import { CheckoutComponent } from 'src/app/components/security/checkout/checkout.component';
import { AgmCoreModule } from '@agm/core';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private _testParams: {};
  get testParams() { return this._testParams; }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  get snapshot() {
    return { params: this.testParams };
  }
}

fdescribe('ApplicationListComponent', () => {
  let component: ApplicationListComponent;
  let fixture: ComponentFixture<ApplicationListComponent>;
  let mockActivatedRoute;
  let applicationService: AplicationService;


  beforeEach(async(() => {
    mockActivatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        BarRatingModule,
        NgbModule,
        NgxPayPalModule,
        //RouterModule.forRoot([]),
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBdS9obJfDQjOa7jF8_4McmGxIIgPyknzA',
          libraries: ['places']
        }),
        ReactiveFormsModule,
        DataTablesModule,
        InfiniteScrollModule,
        AngularFireModule.initializeApp(firebaseConfig),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        MatButtonModule, //To insert material buttons
        MatIconModule, //To insert Icons
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true
        }) // ToastrModule added
      ],
      declarations: [
        AppComponent,
        ActorComponent,
        HeaderComponent,
        FooterComponent,
        RegisterComponent,
        ApplicationComponent,
        LoginComponent,
        TranslatableComponent,
        DeniedAccessPageComponent,
        MainComponent,
        TripComponent,
        TripListComponent,
        TripEditComponent,
        ActorListComponent,
        ActorEditComponent,
        ApplicationListComponent,
        ApplicationEditComponent,
        NotFoundComponent,
        TermsAndConditionsComponent,
        DisplayComponent,
        CheckoutComponent,
        TripPushComponent
      ],
      // exports: [
      //   RouterModule
      // ],
      providers: [AngularFireAuth, CookieService, { provide: ActivatedRoute, useValue: mockActivatedRoute }]
      // bootstrap: [AppComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationListComponent);
    component = fixture.componentInstance;

    mockActivatedRoute.testParams = {};

    applicationService = TestBed.get(AplicationService);

    component.ngOnInit();
    fixture.detectChanges();
  });

  fit('Application-List should be created', () => {
    expect(component).toBeTruthy();
  });

  /*fit('Should have at least 3 applications', async (done) => {
    expect(component.applications.length).toEqual(0);
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(applicationService, 'getAllApplications').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.applications.length).toBeGreaterThanOrEqual(3);
      done();
    });
  });

  fit('Second application should have ACCEPTED status', async (done) => {
    expect(component.applications.length).toEqual(0);
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(applicationService, 'getAllApplications').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      console.log(component.applications[1]);
      expect(component.applications[1].status).toEqual('ACCEPTED');
      done();

    });
  });*/
});
