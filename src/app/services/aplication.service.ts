import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
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

    postApplication(trip, explorerId, comment) {

      return new Promise<any>((res, rej) => {
        console.log("Posting application with id: " + trip['_id']);
  
        const url = this.applicationsUrl + "/" + trip['_id'];
  
        const application = new Application;
  
        application.tripId = trip['_id'];
        application.explorerId = explorerId;
        application.comments = comment;
        application.managerId = trip.managerId;
        application.applicationPrice = trip.price;
        application.applicationDestiny = trip.title;
  
        this.http.post(url, application, httpOptions).toPromise().then((application) => {
          console.log(application);
          res(application);
        }, err => {
          console.log(err);
          rej(err);
        });
      });
    }


    getTripApplications(tripID){
      return new Promise<any>((res, rej) => {
        console.log("Getting application of trip with id: " + tripID);
  
        const url = this.applicationsUrl + "/trip/" + tripID;
  
        this.http.get(url, httpOptions).toPromise().then((applications) => {
          res(applications);
        }, err => {
          console.log(err);
          rej(err);
        });
      });
    }


    getExplorerApplications(explorerId){
      return new Promise<any>((res, rej) => {
        console.log("Getting application of explorer with id: " + explorerId);
  
        const url = this.applicationsUrl + "/explorer/" + explorerId;
  
        this.http.get(url, httpOptions).toPromise().then((applications) => {
          res(applications);
        }, err => {
          console.log(err);
          rej(err);
        });
      });
    }

    getManagerApplications(managerId){
      return new Promise<any>((res, rej) => {
        console.log("Getting application of manager with id: " + managerId);
  
        const url = this.applicationsUrl + "/manager/" + managerId;
  
        this.http.get(url, httpOptions).toPromise().then((applications) => {
          res(applications);
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

    changeApplicationStatus(applicationId, status){
      return new Promise<any>((res, rej) => {
        console.log("Change application status to: "+ status);

        const url = this.applicationsUrl+"/"+applicationId+"/change?status="+status;

        this.http.put(url, httpOptions).toPromise().then((application) => {
          res(application);
        }, err => {
          console.log(err);
          rej(err);
        });

      });
    }

    cancelApplication(applicationId){
      return new Promise<any>((res, rej) => {
        console.log("Cancel application: "+ applicationId);

        const url = this.applicationsUrl+"/"+applicationId+"/cancel";

        this.http.put(url, httpOptions).toPromise().then((application) => {
          res(application);
        }, err => {
          console.log(err);
          rej(err);
        });

      });
    }

    payApplication(applicationId){
      return new Promise<any>((res, rej) => {
        console.log("Pay application: "+ applicationId);

        const url = this.applicationsUrl+"/"+applicationId+"/pay";

        this.http.put(url, httpOptions).toPromise().then((application) => {
          res(application);
        }, err => {
          console.log(err);
          rej(err);
        });

      });
    }
}
