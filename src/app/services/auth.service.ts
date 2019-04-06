import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { Actor } from '../models/actor.model';
import { reject, resolve } from 'q';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentActor: Actor;
  userLoggedIn = new Subject();
  constructor(private fireAuth: AngularFireAuth, 
    private http: HttpClient) { 

  }

  login(email: string, password: string){
    return new Promise<any>((res,rej)=>{
      this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(data=>{
        console.log(data);
        res(data);
      }).catch(err=>{
        console.log(err);
        rej(err);
      });
    });
  }


  logout(){
    return new Promise<any>((res,rej)=>{
      this.fireAuth.auth.signOut().then(data=>{
        console.log(data);
        res(data);
      }).catch(err=>{
        console.log(err);
        rej(err);
      });
    });
  }
  
  getCurrentActor(){}
  registerUser(actor: Actor){
    return new Promise<any>((res,rej)=>{
      console.log(actor.email);
      console.log(actor.password);
      this.fireAuth.auth.createUserWithEmailAndPassword(actor.email, actor.password).then(res=>{

        console.log("User saved in Firebase!");
        //Correct registration on firebase
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };
        //const url = `${environment.backendApiBaseURL + '/actors' }`;
        const url = environment.apiBaseUrl+'/actors';
        const body = JSON.stringify(actor);
        this.http.post(url, body, httpOptions).toPromise().then(res=>{
          console.log(res);
          console.log("Registration done!");
          resolve(res);
        },err=>{
          console.log("Error while registration");
          reject(err);
        });
      }).catch(error =>{
        reject(error);
      });
    });
  }


  getRoles(){
    return ["SPONSOR", "ADMINISTRATOR", "MANAGER", "EXPLORER"];
  }
}
