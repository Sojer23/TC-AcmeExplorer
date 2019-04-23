import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Actor } from '../models/actor.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

const MAX_ITEMS = 10;

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private itemsUrl = environment.apiBaseUrl + '/actors';
  numObjects = MAX_ITEMS;
  constructor(private http: HttpClient) { }

  getActors(){
    return new Promise<any>((res,rej)=>{
      const url = this.itemsUrl;
      this.http.get(url, httpOptions).toPromise().then((actors)=>{

      });
    });
  }

  getActor(actorId){
    return new Promise<any>((res,rej)=>{
      const url = this.itemsUrl+"/"+actorId;
      this.http.get(url, httpOptions).toPromise().then((actor)=>{
        res(actor);
      }, err => {
        console.log(err);
        rej(err);
      });
    });
  }

  updateProfile(actor: Actor){
    return new Promise<any>((res,rej)=>{

      const body = JSON.stringify(actor);
      const url = this.itemsUrl+"/"+actor['_id'];

      console.log(actor);
      this.http.put(url,body, httpOptions).toPromise().then((actor)=>{
        res(actor);
      }, err => {
        console.log(err);
        rej(err);
      });
    });
  }

  getActorsPage(start: number, psize: number, category: string, keyword:string){
    const url = environment.apiBaseUrl + '/actors/search';
    const parameters = {
      startFrom: ''+ start,
      pageSize: ''+ psize,
      itemName: keyword == null ? '': keyword
    };

    //return this.http.get
  }
}
