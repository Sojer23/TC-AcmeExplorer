import { Component, OnInit, OnDestroy } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Trip } from 'src/app/models/trip.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { TripComponent } from '../trip/trip.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent extends TranslatableComponent implements OnDestroy, OnInit {

  //dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  //dtTrigger: Subject<any> = new Subject();
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
    } else {

    }
  }

  ngOnInit() {

    if (this.tripService.trips.length == 0) {
      this.tripService.getTrips().then(trips => {

        // this.dtOptions = {
        //   pagingType: 'full_numbers',
        //   pageLength: 2
        // };

        console.log("Rendering " + trips.length + " trips.");

        if (trips.length == 0) {
          this.trips = [];
          this.toastr.warning("Vuelve más tarde", 'No existen viajes registrados', {
            timeOut: 3000
          });
        } else {
          if (this.authService.checkRole("anonymous") || this.authService.checkRole("EXPLORER")) {
            this.trips = [];
            trips.forEach(trip => {
              if (trip.status == "PUBLISHED") {
                this.trips.push(trip);
              } else {
                //this.trips = [];
              }
            });
          } else {
            this.trips = trips;
            // Calling the DT trigger to manually render the table
            //this.dtTrigger.next();
          }

          console.log("Showing " + this.trips.length + " published trips.");
        }
      });
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //this.dtTrigger.unsubscribe();
  }

  showToast(id) {
    this.toastr.error(id, 'Contraseña incorrecta', {
      timeOut: 3000
    });
  }

  searchTrips(form: NgForm) {

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
          this.trips = [];
          this.toastr.warning("Vuelve más tarde", 'No existen viajes registrados', {
            timeOut: 3000
          });
        } else {
          if (this.authService.checkRole("anonymous") || this.authService.checkRole("EXPLORER")) {
            this.trips = [];
            trips.forEach(trip => {
              if (trip.status == "PUBLISHED") {
                this.trips.push(trip);
              } else {
                //this.trips = [];
              }
            });
          } else {
            this.trips = trips;
          }

          console.log("Showing " + this.trips.length + " published trips.");
        }
      });
    }
  }

  searchTripsAdv(form: NgForm) {

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
          this.trips = [];
          this.toastr.warning("Vuelve más tarde", 'No existen viajes registrados', {
            timeOut: 3000
          });
        } else {
          if (this.authService.checkRole("anonymous") || this.authService.checkRole("EXPLORER")) {
            this.trips = [];
            trips.forEach(trip => {
              if (trip.status == "PUBLISHED") {
                this.trips.push(trip);
              } else {

              }
            });
          } else {
            this.trips = trips;
          }
        }
      });
    }
  }

}
