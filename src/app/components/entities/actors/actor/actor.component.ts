import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent extends TranslatableComponent implements OnInit {

  actor = new Actor();
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
