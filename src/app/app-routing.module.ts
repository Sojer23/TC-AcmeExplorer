import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { ActorRoleGuard } from './guards/actor-role.guard';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MainComponent } from './components/master/main/main.component';
import { AppComponent } from './app.component';

//Las rutas que no se marguen con el canActivate no necesitan autenticación
//El role anonymous es para que un usuario que no esté autenticado y haga login no pueda hacer un nuevo registro
const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    //{path:'login', component: LoginComponent /*canActivate: [ActorRoleGuard], data:{expectRole:'anonymous'}*/},
    {path:'home', component: MainComponent},
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'register', component: RegisterComponent},
    //{path:'trips', component: ListTripsComponent},
    //{path:'profile/:id', component: ProfileComponent},
    //{path:'not-found', component: NotFoundPageComponent},
    //{path:'**', redirectTo:'/not-found'}
]


@NgModule({
    imports:[
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{}

