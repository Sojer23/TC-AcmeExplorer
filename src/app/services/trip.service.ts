import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Trip } from '../models/trip.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TripService {

  public trips = [];

  private tripsUrl = environment.apiBaseUrl + "/trips";
  constructor(private http: HttpClient) { }


  createTrip(trip: Trip){
    return new Promise<any>((res, rej) => {

      const url = this.tripsUrl;

      const body = JSON.stringify(trip);

      console.log(body);

      //trip.stages = new ;

      this.http.post(url, body, httpOptions).toPromise().then((trip) => {
        res(trip);
      }, err => {
        console.log(err);
        rej(err);
      });

    });
  }

  getTrips() {
    return new Promise<any>((res, rej) => {
      console.log("Getting trips...")
      const url = this.tripsUrl;
      this.http.get(url, httpOptions).toPromise().then((trips) => {
        res(trips);
      }, err => {
        console.log(err);
        rej(err);
      });
    });
  }

  getManagerTrips(managerId) {
    return new Promise<any>((res, rej) => {
      console.log("Getting manager trips...");
      const url = this.tripsUrl+"/manager/"+managerId;
      this.http.get(url, httpOptions).toPromise().then((trips) => {
        res(trips);
      }, err => {
        console.log(err);
        rej(err);
      });
    });
  }

  getTripsBySearch(beginFrom: number, pageSize: number, sortedBy: string, backwards: boolean, keyword:string){
    return new Promise<any>((res,rej)=>{
      console.log("Getting trips by keyword: "+ keyword);
      
      if(!beginFrom){
        beginFrom = 0;
      }
      if(!pageSize){
        pageSize = 10;
      }
      if(!backwards){
        backwards = true;
      }
      if(!sortedBy){
        sortedBy="created"
      }

      const url = this.tripsUrl+"/search?keyword="+keyword+"&beginFrom="+beginFrom+"&pageSize="+pageSize+"&sortedBy="+sortedBy+"&backwards="+backwards;

      console.log("QUERY URL: "+ url);

      this.http.get(url, httpOptions).toPromise().then((trips) => {
        res(trips);
      }, err => {
        console.log(err);
        rej(err);
      });

    });

  }

  getTrip(id){
    return new Promise<any>((res, rej) => {
      console.log("Getting trip with id: "+ id);

      const tripID = id;
      const url = this.tripsUrl+ "/"+tripID;
      
      this.http.get(url, httpOptions).toPromise().then((trip) => {
        res(trip);
      }, err => {
        console.log(err);
        rej(err);
      });
    });
  }

}
