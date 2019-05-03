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

export class DisplayService {

  private displayUrl = environment.apiBaseUrl + '/DataWareHouse';

  constructor(private http: HttpClient,
    authService: AuthService,private router: Router) { }

    getAllComputations(){
      return new Promise<any>((res, rej) => {
        console.log("Getting all computations");
  
        const url = this.displayUrl;
  
        this.http.get(url, httpOptions).toPromise().then((computations) => {
          res(computations);
        }, err => {
          console.log(err);
          rej(err);
        });
      });
    }

    getLastComputation(){
      return new Promise<any>((res, rej) => {
        console.log("Getting last computation");
  
        const url = this.displayUrl+"/latest";
  
        this.http.get(url, httpOptions).toPromise().then((computation) => {
          res(computation);
        }, err => {
          console.log(err);
          rej(err);
        });
      });
    }
}
