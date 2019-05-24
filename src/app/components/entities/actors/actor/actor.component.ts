import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';
import { ActorService } from 'src/app/services/actor.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent extends TranslatableComponent implements OnInit {

  actor = new Actor();
  id: string;
  starArray: boolean[];
  picture: string;

  constructor(private route: ActivatedRoute,
    private translateService: TranslateService,
    private authService: AuthService,
    private actorService: ActorService) {
    super(translateService);
  }

  ngOnInit() {

    if (this.id) {
      //Recover id param
      this.id = this.route.snapshot.params['id'];
      this.actorService.getActor(this.id).then((actor) => {
        this.picture = actor.photoObject.Buffer;
      });
    } else {
      this.id = this.authService.getCurrentActor().id;
      this.actorService.getActor(this.id).then((actor) => {
        this.actor = actor;
        this.picture = actor.photoObject.Buffer;
      });
    }


    //this.actor = this.authService.getCurrentActor();
    //Recover the item

  }

}
