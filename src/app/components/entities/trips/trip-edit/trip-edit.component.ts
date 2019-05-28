import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Picture } from 'src/app/models/picture.model';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent extends TranslatableComponent implements OnInit {

  private updateTripForm: FormGroup;
  private updated: boolean;
  trip: Trip;
  photoChanged = false;
  picture: string;
  cancelChanges = false;

  hoveredDate: NgbDate;
  dateInit: NgbDate;
  dateEnd: NgbDate;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private tripService: TripService,
    private translateService: TranslateService,
    private toastr: ToastrService,
    calendar: NgbCalendar) {
    super(translateService);
    this.dateInit = calendar.getToday();
    this.dateEnd = calendar.getNext(calendar.getToday(), 'd', 10);

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.updateTripForm = this.fb.group({
      _id: [''],
      managerId: [''],
      status: [''],
      title: ['', Validators.required],
      description: ['', Validators.maxLength(50)],
      price: ['', Validators.pattern('[0-9]+')],
      dateInit: ['',],
      dateEnd: ['',],
      stages: [[{}], Validators.required],
      mainPicture: ['']
    });


    const tripId = this.route.snapshot.params['id'];
    this.tripService.getTrip(tripId).then((trip) => {

      if (trip) {
        this.updateTripForm.controls['_id'].setValue(trip._id);
        this.updateTripForm.controls['status'].setValue(trip.status);
        this.updateTripForm.controls['managerId'].setValue(trip.managerId);
        this.updateTripForm.controls['title'].setValue(trip.title);
        this.updateTripForm.controls['description'].setValue(trip.description);
        this.updateTripForm.controls['price'].setValue(trip.price);
        this.updateTripForm.controls['dateInit'].setValue(trip.dateInit);
        this.updateTripForm.controls['dateEnd'].setValue(trip.dateEnd);
        this.dateInit = (trip.dateInit.year, trip.dateInit.month,trip.dateInit.day);
        this.dateEnd = (trip.dateEnd.year, trip.dateEnd.month,trip.dateEnd.day);
        
        if (trip.photoObject != undefined) {
          this.picture = trip.photoObject.Buffer;
          document.getElementById('showresult').textContent = trip.photoObject.Buffer;
        }

      }
    });
  }


  onEdit() {
    const formModel = this.updateTripForm.value;

    if (this.photoChanged) {
      console.log("Image uplodaded");
      formModel.photoObject = new Picture();
      formModel.photoObject.Buffer = document.getElementById('showresult').textContent;
      formModel.photoObject.contentType = 'image/png';
    } else {
      //Almacenar imagen anterior
      formModel.photoObject = new Picture();
      formModel.photoObject.Buffer = document.getElementById('showresult').textContent;
      formModel.photoObject.contentType = 'image/png';
    }

    formModel.dateInit = new Date(this.dateInit.year, this.dateInit.month-1, this.dateInit.day);
    formModel.dateEnd = new Date(this.dateEnd.year, this.dateEnd.month-1, this.dateEnd.day);
    formModel.stages = [{"title": "Andorra","description": "Hermoso viaje", "price": formModel.price, "dateInit": new Date(this.dateInit.year, this.dateInit.month-1, this.dateInit.day)}];
    
    if (!this.cancelChanges) {
      this.tripService.updateTrip(formModel).then((trip) => {
        console.log("Trip updated: " + trip.title);
        this.toastr.success('Compruebe sus cambios', 'Viaje editado correctamente');
        this.cancelChanges = true;
        this.router.navigate(['/trips']);
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.cancelChanges = false;
    }

  }


  goBack(): void {
    var result = this.canDeactivate();
    if (result) {
      console.log("Vuelve al perfil. Cambios cancelados");
      this.router.navigate(['/trips']);
    } else {
      console.log("Vuelve a la edición sin guardar el perfil");
      //this.router.navigate(['/trips/edit/'+this.trip['_id']]);
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let result = false;
    const message = this.translateService.instant('Va a descartar sus cambios. ¿Estás seguro?');


    if (!this.updated && this.updateTripForm.dirty) {
      result = confirm(message);
      if (!result) {
        this.cancelChanges = true;
      }
    }

    console.log("Descarta los cambios: " + result);
    return result;
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


  //DATE PICKER FUNCTIONS
  onDateSelection(date: NgbDate) {
    if (!this.dateInit && !this.dateEnd) {
      this.dateInit = date;
    } else if (this.dateInit && !this.dateEnd && date.after(this.dateInit)) {
      this.dateEnd = date;
    } else {
      this.dateEnd = null;
      this.dateInit = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.dateInit && !this.dateEnd && this.hoveredDate && date.after(this.dateInit) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.dateInit) && date.before(this.dateEnd);
  }

  isRange(date: NgbDate) {
    return date.equals(this.dateInit) || date.equals(this.dateEnd) || this.isInside(date) || this.isHovered(date);
  }

}
