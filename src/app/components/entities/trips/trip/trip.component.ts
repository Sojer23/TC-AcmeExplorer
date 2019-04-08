import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent extends TranslatableComponent implements OnInit {

  //trip = new Trip();
  id: string;
  starArray: boolean[];
  constructor(private route: ActivatedRoute, private translateService: TranslateService) {
    super(translateService);
   }

  ngOnInit() {
    //Recover id param
    this.id = this.route.snapshot.params['id'];

    //Recover the item

  }

}
