import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { ActorRoleGuard } from './guards/actor-role.guard';


//Las rutas que no se marguen con el canActivate no necesitan autenticación
//El role anonymous es para que un usuario que no esté autenticado y haga login no pueda hacer un nuevo registro
const appRoutes: Routes = [
    {path:'login', component: LoginComponent, 
    canActivate: [ActorRoleGuard], data:{expectRole:'anonymous'}},
    {path:'register', component: RegisterComponent},
    //{path:'trips', component: ListTripsComponent},
    //{path:'home', component: HomePageComponent},
    //{path:'profile/:id', component: ProfileComponent},
    //{path:'not-found', component: NotFoundPageComponent},
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'**', redirectTo:'/not-found'}
]