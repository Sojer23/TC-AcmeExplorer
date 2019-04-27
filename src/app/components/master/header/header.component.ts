import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TripService } from 'src/app/services/trip.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  currentActor: Actor;
  activeRole = "anonymous";

  constructor(private translateService: TranslateService,
    private authService: AuthService, 
    private tripService: TripService,
    private router: Router,
    private toastr: ToastrService) {
    super(translateService);
  }

  ngOnInit() {
    console.log("Current Role: " + this.activeRole);
    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.currentActor = this.authService.getCurrentActor();
        this.activeRole = this.currentActor.role.toString();
        console.log("Current Role: " + this.activeRole);

      } else {
        this.activeRole = 'anonymous';
        console.log("Current Role: " + this.activeRole);
        this.currentActor = null;
      }
    });
  }

  logout() {
    this.authService.logout().then(_ => {
      this.activeRole = 'anonymous';
      console.log("Current Role: " + this.activeRole);

      this.currentActor = null;
    }).catch(err => {
      console.log(err);
    });
  }

  searchTrips(form: NgForm){

    console.log(form.value.keyword);

    const keyword = form.value.keyword;

    /*if(!beginFrom){
      beginFrom = 0;
    }
    if(!pageSize){
      pageSize = 10;
    }
    if(!backwards){
      backwards = true;
    }
    if(!sortedBy){
      sortedBy=""
    }*/

    if(!keyword){
      this.toastr.error('Error en la búsqueda', 'Introduzca una palabra clave', {
        timeOut: 3000
      });
    }else{
      this.tripService.getTripsBySearch(0, 10, "", true, keyword).then(trips=>{

        console.log("Searching: "+trips.length+" trips.");

        if(trips.length ==0){
          this.toastr.warning("Vuelve más tarde", 'No existen viajes registrados', {
            timeOut: 3000
          });
        }
        this.tripService.trips = trips;
        this.router.navigate(['/trips']);
      });
    }
  }


}
