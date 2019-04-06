import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ActorComponent } from './components/actor/actor.component';
import { TripComponent } from './components/trip/trip.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { ApplicationComponent } from './components/application/application.component';
import { HeaderComponent } from './components/master/header/header.component';
import { FooterComponent } from './components/master/footer/footer.component';
import { RegisterComponent} from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth} from 'angularfire2/auth';
import { TranslatableComponent } from './components/shared/translatable/translatable.component';
import { DeniedAccessPageComponent } from './components/denied-access-page/denied-access-page.component';

export const firebaseConfig ={
  apiKey: "AIzaSyAPOOGFZZMbZ5SVUpJ6EKHG0kb9X0bkJyw",
  authDomain: "acme-explorer-project.firebaseapp.com",
  databaseURL: "https://acme-explorer-project.firebaseio.com",
  projectId: "acme-explorer-project",
  storageBucket: "acme-explorer-project.appspot.com",
  messagingSenderId: "540833180744"  
};

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ActorComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    TripListComponent,
    ApplicationComponent,
    LoginComponent,
    TripComponent,
    TranslatableComponent,
    DeniedAccessPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    //RouterModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports:[
    RouterModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
