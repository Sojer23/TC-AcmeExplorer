import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent extends TranslatableComponent implements OnInit {

  trip = new Trip();
  id: string;
  starArray: boolean[];
  constructor(private route: ActivatedRoute, 
    private translateService: TranslateService,
    private tripService: TripService) {
    super(translateService);
   }

  ngOnInit() {
    //Recover id param
    this.id = this.route.snapshot.params['id'];

    console.log("ID in trip view: "+this.id);

    //Recover the item
    this.tripService.getTrip(this.id).then((trip)=>{
      console.log(trip);
      this.trip = trip;
    })

  }

}
