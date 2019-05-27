import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from 'src/app/components/shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Actor } from 'src/app/models/actor.model';
import { TripService } from 'src/app/services/trip.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-push',
  templateUrl: './trip-push.component.html',
  styleUrls: ['./trip-push.component.css']
})
export class TripPushComponent extends TranslatableComponent implements OnInit {

  newTripForm: FormGroup;

  hoveredDate: NgbDate;
  dateInit: NgbDate;
  dateEnd: NgbDate;

  constructor(private translateService: TranslateService,
    private tripService: TripService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    calendar: NgbCalendar) {
    super(translateService);
    this.dateInit = calendar.getToday();
    this.dateEnd = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {

    this.newTripForm = this.fb.group({
      managerId: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      dateInit: ['',],
      dateEnd: ['',],
      stages: [[{}], Validators.required],
      mainPicture: ['']
    });
  }

  onRegisterNewTrip() {

    
    const managerId = this.authService.getCurrentActor().id;

    this.newTripForm.value.managerId = managerId;
    this.newTripForm.value.dateInit = new Date(this.dateInit.year, this.dateInit.month-1, this.dateInit.day);
    this.newTripForm.value.dateEnd = new Date(this.dateEnd.year, this.dateEnd.month-1, this.dateEnd.day);
    this.newTripForm.value.stages = [{"title": "Andorra","description": "Hermoso viaje", "price": this.newTripForm.value.price, "dateInit": new Date(this.dateInit.year, this.dateInit.month-1, this.dateInit.day)}];

    this.tripService.createTrip(this.newTripForm.value).then(res => {
      console.log("Redirecting to trips...");
      this.router.navigate(['/trips']);
    }, err => {
      console.log(err);
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    const showout = document.getElementById('showresult');
    let res;

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
