import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AplicationService } from 'src/app/services/aplication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  applications = [];
  role: string;

  constructor(private authService: AuthService,
    private applicationService: AplicationService,
    private toastr: ToastrService,
    private router: Router) {

  }

  ngOnInit() {

    this.role = this.authService.getCurrentActor().role;
    if (this.authService.checkRole('EXPLORER')) {
      this.applications = [];
      this.applicationService.getExplorerApplications(this.authService.getCurrentActor().id).then((applications) => {

        applications.forEach(application => {
          if(application.status != "CANCELLED"){
            this.applications.push(application);
          }
        });
      });
    } else {

      if(this.authService.checkRole('ADMINISTRATOR')){
        this.applications = [];
      
      this.applicationService.getAllApplications().then(applications => {

        console.log("Showing " + applications.length + " applications.");

        

        if (applications.length == 0) {
          this.toastr.warning("Vuelve más tarde", 'No existen reservas en el sistema', {
            timeOut: 3000
          });
        }else{
          applications.forEach(application => {
            if(application.status != "CANCELLED"){
              this.applications.push(application);
            }
          });
        }
      });
      }else if(this.authService.checkRole('MANAGER')){
        this.applications = [];
      
        this.applicationService.getManagerApplications(this.authService.getCurrentActor().id).then(applications => {
  
          console.log("Showing " + applications.length + " applications.");
  
          if (applications.length == 0) {
            this.toastr.warning("Vuelve más tarde", 'No existen reservas en el sistema', {
              timeOut: 3000
            });
          }else{
            applications.forEach(application => {
              if(application.status != "CANCELLED"){
                this.applications.push(application);
              }
            });
          }
        });
      }
    }
  }


  acceptOrCancelApplication(applicationId,status){

    this.applicationService.changeApplicationStatus(applicationId, status).then((application)=>{
      this.ngOnInit();
    });

  }

  cancelApplication(applicationId){

    this.applicationService.cancelApplication(applicationId).then((application)=>{
      this.ngOnInit();
    });

  }
  payApplication(applicationId){

    this.applicationService.payApplication(applicationId).then((application)=>{
      console.log(application);
      this.ngOnInit();
    });

  }

}
