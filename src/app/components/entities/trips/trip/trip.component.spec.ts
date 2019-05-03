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
import { TripComponent } from '../trip/trip.component';
import { TripEditComponent } from '../trip-edit/trip-edit.component';
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
import { TripListComponent } from '../trip-list/trip-list.component';


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

fdescribe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;
  let mockActivatedRoute;
  let tripService: TripService;

  beforeEach(async(() => {
    mockActivatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        BarRatingModule,
        //RouterModule.forRoot([]),
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
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
        TermsAndConditionsComponent
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
    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;

    mockActivatedRoute.testParams = { id: '5c97c4caf0b1c134a85a8975' };

    tripService = TestBed.get(TripService);

    component.ngOnInit();
    fixture.detectChanges();
  });

  fit('Component TripComponent should be createdshould create', () => {
    expect(component).toBeTruthy();
  });

  fit('Should have prive greater than 530', async (done) => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripService, 'getTrip').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.trip.price).toBeGreaterThan(530);
      done();
    });
  });

  fit('Should have third stage with name Barcelona', async (done) => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripService, 'getTrip').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.trip.stages[2].title).toEqual('Barcelona');
      done();

    });
  });

  fit('Should have more than 3 stars', async (done) => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(tripService, 'getTrip').and.returnValue(Promise.resolve(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.trip.totalStars).toBeGreaterThan(3);
      done();

    });
  });
});
