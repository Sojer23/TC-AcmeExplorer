import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Trip } from 'src/app/models/trip.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent extends TranslatableComponent implements OnInit {

  currentTrip = new Trip;

  trips = [];
  

  constructor(private translateService: TranslateService, 
    private tripService: TripService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService) {
    super(translateService);
  }

  ngOnInit() {
    this.tripService.getTrips().then(trips=>{

      console.log("Showing "+trips.length+" trips.");

      if(trips.length ==0){
        this.toastr.warning("Vuelve más tarde", 'No existen viajes registrados', {
          timeOut: 3000
        });
      }
      this.trips = trips;
    });
  }

  showToast(id){
    this.toastr.error(id, 'Contraseña incorrecta', {
      timeOut: 3000
    });
  }

}
