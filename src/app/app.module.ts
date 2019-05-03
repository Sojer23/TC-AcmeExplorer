import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BarRatingModule } from "ngx-bar-rating";
import { DataTablesModule} from 'angular-datatables';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/master/header/header.component';
import { FooterComponent } from './components/master/footer/footer.component';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { TranslatableComponent } from './components/shared/translatable/translatable.component';
import { DeniedAccessPageComponent } from './components/denied-access-page/denied-access-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatButtonModule} from '@angular/material';

import { ToastrModule } from 'ngx-toastr';
import { MainComponent } from './components/master/main/main.component';
import { CommonModule } from '@angular/common';
import { TripComponent } from './components/entities/trips/trip/trip.component';
import { TripListComponent } from './components/entities/trips/trip-list/trip-list.component';
import { TripEditComponent } from './components/entities/trips/trip-edit/trip-edit.component';
import { ActorComponent } from './components/entities/actors/actor/actor.component';
import { ApplicationComponent } from './components/entities/aplications/application/application.component';
import { ActorListComponent } from './components/entities/actors/actor-list/actor-list.component';
import { ActorEditComponent } from './components/entities/actors/actor-edit/actor-edit.component';
import { ApplicationListComponent } from './components/entities/aplications/application-list/application-list.component';
import { ApplicationEditComponent } from './components/entities/aplications/application-edit/application-edit.component';
import { NotFoundComponent } from './components/master/not-found/not-found.component';
import { CookieService} from 'ngx-cookie-service';
import { TermsAndConditionsComponent } from './components/master/terms-and-conditions/terms-and-conditions.component';
import { DisplayComponent } from './components/entities/display/display.component';

export const firebaseConfig = {
  apiKey: "AIzaSyAPOOGFZZMbZ5SVUpJ6EKHG0kb9X0bkJyw",
  authDomain: "acme-explorer-project.firebaseapp.com",
  databaseURL: "https://acme-explorer-project.firebaseio.com",
  projectId: "acme-explorer-project",
  storageBucket: "acme-explorer-project.appspot.com",
  messagingSenderId: "540833180744"
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  
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
    TermsAndConditionsComponent,
    DisplayComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [AngularFireAuth, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
