import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Trip } from 'src/app/models/trip.model';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService) {
    super(translateService);
  }

  ngOnInit() {
    this.tripService.getTrips().then(trips=>{
      this.trips = trips;
    });
  }

  showToast(id){
    this.toastr.error(id, 'Contraseña incorrecta', {
      timeOut: 3000
    });
  }

}
