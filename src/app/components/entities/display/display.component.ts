import { Component, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/services/display.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Display } from 'src/app/models/display.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  computations = [];
  computation = new Display();

  constructor(private authService: AuthService,
    private displayService: DisplayService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.computations = [];
    if (this.authService.checkRole('ADMINISTRATOR')) {
      this.displayService.getLastComputation().then((computation) => {
        this.computation = computation[0];
        console.log(this.computation)
      });
    }
  }


  getAllComputations() {
    this.computation = null;
    if (this.authService.checkRole('ADMINISTRATOR')) {
      this.displayService.getAllComputations().then(computations => {
        this.computations = computations;
      });
    }
  }

}
