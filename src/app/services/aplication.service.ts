import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';
import { Application } from '../models/application.model';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AplicationService {

  private applicationsUrl = environment.apiBaseUrl + '/applications';

  constructor(private http: HttpClient,
    authService: AuthService,private router: Router) { }

    postApplication(tripID, explorerId, comment) {

      return new Promise<any>((res, rej) => {
        console.log("Posting application with id: " + tripID);
  
        const url = this.applicationsUrl + "/" + tripID;
  
        const application = new Application;
  
        application.tripId = tripID;
        application.explorerId = explorerId;
        application.comments = comment;
  
        this.http.post(url, application, httpOptions).toPromise().then((application) => {
          res(application);
        }, err => {
          console.log(err);
          rej(err);
        });
      });
    }


    getAllApplications(){
      return new Promise<any>((res, rej) => {
        console.log("Getting all applications");

        const url = this.applicationsUrl;

        this.http.get(url, httpOptions).toPromise().then((application) => {
          res(application);
        }, err => {
          console.log(err);
          rej(err);
        });

      });
    }
}
