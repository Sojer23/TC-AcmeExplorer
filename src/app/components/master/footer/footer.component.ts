import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  today: number;
  numClients: number;
  terms: string;

  ngOnInit() {
    this.today = Date.now();
    this.numClients = 123;
    this.terms = "Terms Example";
  }

}
