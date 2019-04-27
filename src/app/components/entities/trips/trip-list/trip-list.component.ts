import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Trip } from 'src/app/models/trip.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent extends TranslatableComponent implements OnInit {

  //currentTrip = new Trip;

  trips = [];


  constructor(private translateService: TranslateService,
    private tripService: TripService,
    private toastr: ToastrService,
    private router: Router,
    public authService: AuthService) {
    super(translateService);

    if (this.tripService.trips.length != 0) {
      console.log("Tamaño del array de viajes en constructor: " + this.tripService.trips.length);
      this.trips = this.tripService.trips
    }else{

    }
  }

  ngOnInit() {

    if (this.tripService.trips.length == 0) {
      this.tripService.getTrips().then(trips => {

        console.log("Showing " + trips.length + " trips.");

        if (trips.length == 0) {
          this.toastr.warning("Vuelve más tarde", 'No existen viajes registrados', {
            timeOut: 3000
          });
        }
        this.trips = trips;
      });
    }
  }

  showToast(id) {
    this.toastr.error(id, 'Contraseña incorrecta', {
      timeOut: 3000
    });
  }

  searchTrips(form: NgForm) {
    console.log(form);

    var beginFrom = form.value.beginFrom;
    var pageSize = form.value.pageSize;
    var backwards = form.value.backwards;
    var sortedBy = form.value.sortedBy;
    var keyword = form.value.keyword;

    if (!keyword) {
      this.toastr.error('Error en la búsqueda', 'Introduzca una palabra clave', {
        timeOut: 3000
      });
    } else {
      this.tripService.getTripsBySearch(beginFrom, pageSize, sortedBy, backwards, keyword).then(trips => {

        if (trips.length == 0) {
          this.toastr.warning("Vuelve más tarde", 'No existen viajes registrados', {
            timeOut: 3000
          });
        }
        this.trips = trips;
      });
    }
  }

  searchTripsAdv(form: NgForm){

    console.log(form);
    var beginFrom = form.value.beginFrom;
    var pageSize = form.value.pageSize;
    var backwards = form.value.backwards;
    var sortedBy = form.value.sortedBy;
    var keyword = form.value.keywordAdv;

    if (!keyword) {
      this.toastr.error('Error en la búsqueda', 'Introduzca una palabra clave', {
        timeOut: 3000
      });
    } else {
      this.tripService.getTripsBySearch(beginFrom, pageSize, sortedBy, backwards, keyword).then(trips => {

        if (trips.length == 0) {
          this.toastr.warning("Vuelve más tarde", 'No existen viajes registrados', {
            timeOut: 3000
          });
        }
        this.trips = trips;
      });
    }
  }

}
