import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private currentActor: Actor;
  private activeRole = "anonymous";
  
  constructor(private translateService: TranslateService, 
    private authService: AuthService) {
      //super(translateService);
     }

  ngOnInit() {
    /*this.authService.userLoggedIn.suscribe((loggedIn: boolean)=>{
      if(loggedIn){
        this.currentActor = this.authService.getCurrentActor();
        this.activeRole = this.currentActor.role.toString();
      }else{
        this.activeRole = 'anonymous';
        this.currentActor = null;
      }
    });*/
  }
  logout(){
    this.authService.logout().then(_ =>{
      this.activeRole = 'anonymous';
      this.currentActor = null;
    }).catch(err=>{
      console.log(err);
    });
  }

}
