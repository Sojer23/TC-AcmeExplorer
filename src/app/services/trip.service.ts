import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TripService {


  private tripsUrl = environment.apiBaseUrl + "/trips";
  constructor(private http: HttpClient) { }

  getTrips() {
    return new Promise<any>((res, rej) => {
      console.log("Getting trips...")
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const url = this.tripsUrl;
      this.http.get(url, httpOptions).toPromise().then((trips) => {
        console.log(trips[0]);
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
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      
      this.http.get(url, httpOptions).toPromise().then((trip) => {
        res(trip);
      }, err => {
        console.log(err);
        rej(err);
      });
    });
  }

}
