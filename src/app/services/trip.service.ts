import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Trip } from '../models/trip.model';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private http: HttpClient,
    private toastr: ToastrService) { }


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

  updateTrip(trip: Trip){
    return new Promise<any>((res,rej)=>{

      const body = JSON.stringify(trip);
      const url = this.tripsUrl+"/"+trip['_id'];

      this.http.put(url,body, httpOptions).toPromise().then((tripUpdated)=>{
        res(tripUpdated);
      }, err => {
        console.log(err);
        rej(err);
      });
    });
  }

  publishTrip(trip){
    return new Promise<any>((res,rej)=>{

      const tripId = trip['_id'];

      console.log("Publishing trip: "+ tripId);
      const url = this.tripsUrl+"/"+tripId+"/publish";

      this.http.put(url, httpOptions).toPromise().then((tripUpdated)=>{
        res(tripUpdated);
      }, err => {
        console.log(err);
        rej(err);
      });
    });
  }

  cancelATrip(trip, cancelComment){
    return new Promise<any>((res,rej)=>{

      console.log("Cancelling trip: "+ trip['_id']);
      const url = this.tripsUrl+"/"+trip['_id']+"/cancel";
      const body = {cancelledReason: cancelComment};

      this.http.put(url, body, httpOptions).toPromise().then((tripCancelled)=>{
        res(tripCancelled);
      }, err => {
        if(err.status === 422){
          this.toastr.info("Introducir el motivo de cancelación", "No se ha podido cancelar");
        }else{
          console.log(err);
          rej(err);
        }
        
      });
    });
  }

  deleteTrip(trip){
    return new Promise<any>((res,rej)=>{

      console.log("Deleting trip: "+ trip['_id']);
      const url = this.tripsUrl+"/"+trip['_id'];

      this.http.delete(url, httpOptions).toPromise().then((result)=>{
        res();
      }, err => {
        if(err.status === 422){
          this.toastr.info("Introducir el motivo de cancelación", "No se ha podido cancelar");
        }else{
          console.log(err);
          rej(err);
        }
        
      });
    });
  }

}
