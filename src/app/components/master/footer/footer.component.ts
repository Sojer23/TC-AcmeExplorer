import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends TranslatableComponent implements OnInit {

  constructor(private translateService: TranslateService) {
    super(translateService);
   }

  today: number;
  numClients: number;
  terms: string;

  ngOnInit() {
    this.today = Date.now();
    this.numClients = 123;
    this.terms = "Terms Example";
  }

}
