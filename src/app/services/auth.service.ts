import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Actor } from '../models/actor.model';
import { reject, resolve } from 'q';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentActor: Actor;

  userLoggedIn = new Subject();
  constructor(private fireAuth: AngularFireAuth,
    private http: HttpClient, private toastr: ToastrService,
    private router: Router) {

  }

  login(email: string, password: string) {
    return new Promise<any>((res, rej) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(data => {
        console.log(data);
        this.toastr.success(email, '¡Bienvenido a Acme-Explorer!', {
          timeOut: 3000
        });
        res(data);
      }).catch(err => {
        if (err.code == "auth/user-not-found") {
          this.toastr.warning("Registresé para más", 'Usuario no registrado', {
            timeOut: 3000
          });
        }
        if (err.code == "auth/invalid-email") {
          this.toastr.error(email, 'Email invalido', {
            timeOut: 3000
          });
        }
        if (err.code == "auth/wrong-password") {
          this.toastr.error(email, 'Contraseña incorrecta', {
            timeOut: 3000
          });
        }


        console.log(err);
        rej(err);
      });
    });
  }


  logout() {
    return new Promise<any>((res, rej) => {
      this.fireAuth.auth.signOut().then(data => {
        console.log(data);
        res(data);
      }).catch(err => {
        console.log(err);
        rej(err);
      });
    });
  }

  getCurrentActor(){}
  getCurrentActorFromDB(actor_id) {
    this.currentActor
    const url = environment.apiBaseUrl + '/actors';

    const actorId = JSON.stringify(actor_id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams().set("paramName", actorId)
    };
    this.http.get(url, httpOptions).toPromise().then(res => {
      console.log(res);
      this.toastr.success('Ahora inicie sesión', '¡El usuario actual es ', {
        timeOut: 3000
      });

      console.log("Registration done!");
      this.router.navigate(['/login']);
      resolve(res);

    }, err => {
      console.log("Error while registration");
      reject(err);
    });
  }

  registerUser(actor: Actor) {
    return new Promise<any>((res, rej) => {
      console.log(actor.email);
      console.log(actor.password);

      if (actor.password.length < 6) {
        this.toastr.error("Debe contener al menos 6 caracteres", 'Contraseña incorrecta', {
          timeOut: 3000
        });
      }

      this.fireAuth.auth.createUserWithEmailAndPassword(actor.email, actor.password).then(res => {
        console.log("User saved in Firebase!");

        //Correct registration on firebase
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };

        const url = environment.apiBaseUrl + '/actors';
        const body = JSON.stringify(actor);
        this.http.post(url, body, httpOptions).toPromise().then(res => {
          console.log(res);
          this.toastr.success('Ahora inicie sesión', '¡Gracias por registrarse !', {
            timeOut: 3000
          });

          console.log("Registration done!");
          this.router.navigate(['/login']);
          resolve(res);

        }, err => {
          console.log("Error while registration");
          reject(err);
        });
      }).catch(error => {
        if (error.code == "auth/email-already-in-use") {
          this.toastr.error("Pruebe con otro", 'Este email ya existe en el sistema', {
            timeOut: 3000
          });
        }
        if (error.code == "auth/weak-password") {
          this.toastr.error("Debe contener al menos 6 caracteres", 'Contraseña incorrecta', {
            timeOut: 3000
          });
        }
        console.log(error);
        reject(error);
      });
    });
  }


  getRoles() {
    return ["SPONSOR", "ADMINISTRATOR", "MANAGER", "EXPLORER"];
  }
}
