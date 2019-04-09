import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { ActorRoleGuard } from './guards/actor-role.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/master/main/main.component';
import { AppComponent } from './app.component';
import { DeniedAccessPageComponent } from './components/denied-access-page/denied-access-page.component';
import { ActorComponent } from './components/entities/actors/actor/actor.component';
import { TripListComponent } from './components/entities/trips/trip-list/trip-list.component';
import { TripComponent } from './components/entities/trips/trip/trip.component';

//Las rutas que no se marguen con el canActivate no necesitan autenticación
//El role anonymous es para que un usuario que no esté autenticado y haga login no pueda hacer un nuevo registro
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'anonymous' } },
    { path: 'home', component: MainComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'anonymous' } },
    { path: 'deny', component: DeniedAccessPageComponent },
    {
        path: 'profiles', children: [
            { path: 'profile/:id', component: ActorComponent, canActivate: [ActorRoleGuard], data: { expectedRole: 'EXPLORER|ADMINISTRATOR|MANAGER|SPONSOR' } }
        ]
    },
    {
        path: 'trips', children: [
            { path: 'display/:id', component: TripComponent },
            { path: '', component: TripListComponent }
        ]
    }

    //{path:'trips', component: ListTripsComponent},
    //{path:'not-found', component: NotFoundPageComponent},
    //{path:'**', redirectTo:'/not-found'}
]


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }

