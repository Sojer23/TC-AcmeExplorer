/// <reference path="../../../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actor } from 'src/app/models/actor.model';
import { Router } from '@angular/router';
import { ActorService } from 'src/app/services/actor.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { existingPhoneNumberValidator } from 'src/app/validators/existingPhone.validator';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Picture } from 'src/app/models/picture.model';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import { marker } from 'src/app/models/marker.model';

declare var google: any;

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.css']
})
export class ActorEditComponent extends TranslatableComponent implements OnInit {

  private profileForm: FormGroup;
  private updated: boolean;
  actor: Actor;
  langList: string[];
  photoChanged = false;
  picture: string;
  cancelChanges = false;

  //Zoom level
  zoom = 10;

  //Initial center position for the map
  lat = 37.357839;
  lng = -5.986549;
  markers: marker[] = [];
  autocomplete: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private actorService: ActorService,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    super(translateService);
    this.langList = ["en", "es"];
    this.updated = false;
  }

  ngOnInit() {
    this.createForm();

    //Load places
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });

      this.autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          const place = this.autocomplete.getPlace();

          this.profileForm.value.address = place.formatted_address;

          //Verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, lngitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 16;

          this.markers = [];
          this.markers.push({
            lat: this.lat,
            lng: this.lng,
            draggable: true
          });

        });
      });
    }).catch(err => console.log(err));
  }

  createForm() {

    this.profileForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required /*Validators.pattern('/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/')*/],
      phone: ['', Validators.pattern('[0-9]+')], /*[existingPhoneNumberValidator(this.actorService)]*/
      address: ['', Validators.maxLength(50)],
      preferredLanguage: ['', Validators.required],
      password: [''],
      role: [''],
      photo: [''],
      picture: ['']
    });

    const idActor = this.authService.getCurrentActor().id;

    this.actorService.getActor(idActor).then((actor) => {

      if (actor) {
        this.profileForm.controls['_id'].setValue(actor._id);
        this.profileForm.controls['name'].setValue(actor.name);
        this.profileForm.controls['surname'].setValue(actor.surname);
        this.profileForm.controls['email'].setValue(actor.email);
        this.profileForm.controls['password'].setValue(actor.password);
        this.profileForm.controls['phone'].setValue(actor.phone);
        this.profileForm.controls['address'].setValue(actor.address);
        this.profileForm.controls['role'].setValue(actor.role);
        this.profileForm.controls['preferredLanguage'].setValue(actor.preferredLanguage);

        if (actor.photoObject != undefined) {
          this.picture = actor.photoObject.Buffer;
          document.getElementById('showresult').textContent = actor.photoObject.Buffer;
        }

      }

    });
  }

  onEdit() {
    const formModel = this.profileForm.value;

    if (this.photoChanged) {
      console.log("Image uplodaded");
      formModel.photoObject = new Picture();
      formModel.photoObject.Buffer = document.getElementById('showresult').textContent;
      formModel.photoObject.contentType = 'image/png';
    }else{
      //Almacenar imagen anterior
      formModel.photoObject = new Picture();
      formModel.photoObject.Buffer = document.getElementById('showresult').textContent;
      formModel.photoObject.contentType = 'image/png';
    }
    if(!this.cancelChanges){
      this.actorService.updateProfile(formModel).then((actor) => {
        console.log("Actor updated: " + actor.email);
        this.toastr.success('Compruebe sus cambios', 'Perfil editado correctamente');
        this.cancelChanges = true;
        this.router.navigate(['/profile']);
      }).catch((err) => {
        console.log(err);
      });
    }else{
      this.cancelChanges = false;
    }
    
  }


  goBack(): void {
    var result = this.canDeactivate();
    if (result) {
      console.log("Vuelve al perfil. Cambios cancelados");
      this.router.navigate(['/profile']);
    } else {
      console.log("Vuelve a la edición sin guardar el perfil");
      this.router.navigate(['/profile/edit/']);
    }
  }

  onFileChange(event) {
    const reader = new FileReader();
    const showout = document.getElementById('showresult');
    let res;
    this.photoChanged = true;

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.addEventListener('loadend', function () {
        res = reader.result;
        showout.textContent = this.result.toString();
      });
      reader.readAsDataURL(file);
    }
  }


  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let result = false;
    const message = this.translateService.instant('Va a descartar sus cambios. ¿Estás seguro?');


    if (!this.updated && this.profileForm.dirty) {
      result = confirm(message);
      if(!result){
        this.cancelChanges = true;
      }
    }

    console.log("Descarta los cambios: " + result);
    return result;
  }


  //MAP CONFIGURATION
  mapClicked($event: MouseEvent) {
    this.markers = [];
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });

    this.profileForm.value.address = $event.coords.lat + ';' + $event.coords.lng;
    this.profileForm.controls['address'].setValue(this.profileForm.value.address);
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      console.log('Geolocating');
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

}
