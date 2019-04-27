import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
