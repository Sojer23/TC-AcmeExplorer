import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorComponent } from './actor.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { TripPushComponent } from '../../trips/trip-push/trip-push.component';
import { CheckoutComponent } from 'src/app/components/security/checkout/checkout.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPayPalModule } from 'ngx-paypal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { DataTablesModule } from 'angular-datatables';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig, HttpLoaderFactory } from 'src/app/app.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from 'selenium-webdriver/http';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/components/master/header/header.component';
import { FooterComponent } from 'src/app/components/master/footer/footer.component';
import { RegisterComponent } from 'src/app/components/security/register/register.component';
import { ApplicationComponent } from '../../aplications/application/application.component';
import { LoginComponent } from 'src/app/components/security/login/login.component';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { DeniedAccessPageComponent } from 'src/app/components/denied-access-page/denied-access-page.component';
import { MainComponent } from 'src/app/components/master/main/main.component';
import { TripComponent } from '../../trips/trip/trip.component';
import { TripListComponent } from '../../trips/trip-list/trip-list.component';
import { TripEditComponent } from '../../trips/trip-edit/trip-edit.component';
import { ActorListComponent } from '../actor-list/actor-list.component';
import { ActorEditComponent } from '../actor-edit/actor-edit.component';
import { ApplicationListComponent } from '../../aplications/application-list/application-list.component';
import { ApplicationEditComponent } from '../../aplications/application-edit/application-edit.component';
import { NotFoundComponent } from 'src/app/components/master/not-found/not-found.component';
import { TermsAndConditionsComponent } from 'src/app/components/master/terms-and-conditions/terms-and-conditions.component';
import { DisplayComponent } from '../../display/display.component';
import { ActorService } from 'src/app/services/actor.service';

describe('ActorComponent', () => {
  let component: ActorComponent;
  let fixture: ComponentFixture<ActorComponent>;
  let mockActivatedRoute;
  let actorService: ActorService;

  beforeEach(async(() => {
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
    fixture = TestBed.createComponent(ActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
