import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  private currentActor: Actor;
  private activeRole = "anonymous";

  constructor(private translateService: TranslateService,
    private authService: AuthService) {
    super(translateService);
  }

  ngOnInit() {
    console.log("Current Role: " + this.activeRole);
    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.currentActor = this.authService.getCurrentActor();
        this.activeRole = this.currentActor.role.toString();
        console.log("Current Role: " + this.activeRole);

      } else {
        this.activeRole = 'anonymous';
        console.log("Current Role: " + this.activeRole);
        this.currentActor = null;
      }
    });
  }

  logout() {
    this.authService.logout().then(_ => {
      this.activeRole = 'anonymous';
      console.log("Current Role: " + this.activeRole);

      this.currentActor = null;
    }).catch(err => {
      console.log(err);
    });
  }


}
