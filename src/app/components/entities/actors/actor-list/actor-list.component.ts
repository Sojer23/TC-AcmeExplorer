import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor.model';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent extends TranslatableComponent implements OnInit {

  actor: Actor;
  data: any[];

  constructor(private route: ActivatedRoute, 
    private translateService: TranslateService,
    private authService: AuthService) {
    super(translateService);
   }

  ngOnInit() {
    
  }

}
