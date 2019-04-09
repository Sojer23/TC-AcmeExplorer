import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ActorRoleGuard implements CanActivate {

  constructor(private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService) {
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((res, rej) => {
      const expectedRole = next.data.expectedRole;
      const currentActor = this.authService.getCurrentActor();

      let result = false;
      if (currentActor) {
        const activeRole = new RegExp(currentActor.role.toString(), 'i');
        if (expectedRole.search(activeRole) !== -1) {
          result = true;
        } else {
          this.toastr.error("No tienes permisos suficientes", "Acción prohibida");
          this.router.navigate(['deny'], { queryParams: { previousURL: state.url } });
        }
        res(result);
      } else {
        if (expectedRole.indexOf('anonymous') !== -1) {
          result = true;
        } else {
          this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
          this.toastr.error("¡Inicia sesión para más!", "Contenido exclusivo para usuarios registrados");
        }
        res(result);
      }
    });
  }
}
