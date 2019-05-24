import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Actor } from '../models/actor.model';
import { Subject } from 'rxjs';

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

  //To check if user profile is updated
  profileUpdated = new Subject();

  private actorsUrl = environment.apiBaseUrl + '/actors';
  numObjects = MAX_ITEMS;
  constructor(private http: HttpClient) { }

  getActors(){
    return new Promise<any>((res,rej)=>{
      const url = this.actorsUrl;
      this.http.get(url, httpOptions).toPromise().then((actors)=>{

      });
    });
  }

  getActor(actorId){
    return new Promise<any>((res,rej)=>{
      const url = this.actorsUrl+"/"+actorId;
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
      const url = this.actorsUrl+"/"+actor['_id'];

      this.http.put(url,body, httpOptions).toPromise().then((actor)=>{
        
        this.profileUpdated.next(true);
        res(actor);
      }, err => {
        console.log(err);
        this.profileUpdated.next(false);
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
