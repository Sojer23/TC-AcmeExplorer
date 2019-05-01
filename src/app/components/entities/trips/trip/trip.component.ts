import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/models/trip.model';
import { AuthService } from 'src/app/services/auth.service';
import { AplicationService } from 'src/app/services/aplication.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent extends TranslatableComponent implements OnInit {

  trip = new Trip();
  tripId: string;
  starArray: boolean[];
  apply: boolean;


  constructor(private route: ActivatedRoute,
    private translateService: TranslateService,
    private tripService: TripService,
    private authService: AuthService,
    private toastr: ToastrService,
    private applicationService: AplicationService,
    private router: Router) {
    super(translateService);
  }

  ngOnInit() {

    //Set application comment to false
    this.apply = false;
    //Recover id param
    this.tripId = this.route.snapshot.params['id'];

    console.log("ID in trip view: " + this.tripId);

    //Recover the item
    this.tripService.getTrip(this.tripId).then((trip) => {
      console.log("Showing trip with destiny: " + trip.title);
      this.trip = trip;
    })

  }



  applyForATrip(form: NgForm, tripId) {

    const comment = form.value.comment;

    const actor = this.authService.getCurrentActor();

    var explorerId = "";
    if (actor) {
      if(actor.role == "EXPLORER"){
        explorerId = actor.id;
      }
    } else {
      this.toastr.warning("¡En menos de un minuto!", 'Regístrate para reservar viajes', {
        timeOut: 3000
      });
      this.router.navigate(['/register']);
    }

    console.log(explorerId);

    this.applicationService.postApplication(tripId, explorerId, comment).then(application => {
      this.toastr.warning("Procedemos a su evaluación", 'Reserva realizada con éxito', {
        timeOut: 3000
      });
      this.router.navigate(['/applications']);
      console.log(application);
    }).catch(err => {
      console.log(err);
    });
  }

}
