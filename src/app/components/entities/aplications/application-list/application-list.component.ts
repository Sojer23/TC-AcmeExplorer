import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AplicationService } from 'src/app/services/aplication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  applications = [];

  constructor(private authService: AuthService,
    private applicationService: AplicationService,
    private toastr: ToastrService,
    private router: Router) {

  }

  ngOnInit() {

    if (this.authService.checkRole('EXPLORER')) {
      this.applicationService.getExplorerApplications(this.authService.getCurrentActor().id).then((applications) => {
        this.applications = applications;
      });
    } else {

      
      this.applicationService.getAllApplications().then(applications => {

        console.log("Showing " + applications.length + " applications.");

        if (applications.length == 0) {
          this.toastr.warning("Vuelve más tarde", 'No existen reservas en el sistema', {
            timeOut: 3000
          });
        }

        this.applications = applications;
      });
    }


  }

}
