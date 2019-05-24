import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';


export interface CanComponentDeactivate{
  canDeactivate: ()=> Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate>{


  canDeactivate(component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    nextState?: RouterStateSnapshot
    ):Observable<boolean> | Promise<boolean> | boolean {
      return component.canDeactivate();
    }

}
