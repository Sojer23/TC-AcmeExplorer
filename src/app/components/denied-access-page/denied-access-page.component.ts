import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatableComponent } from '../shared/translatable/translatable.component';

@Component({
  selector: 'app-denied-access-page',
  templateUrl: './denied-access-page.component.html',
  styleUrls: ['./denied-access-page.component.css']
})
export class DeniedAccessPageComponent extends TranslatableComponent implements OnInit {

  private url: string;

  constructor(private translateService: TranslateService,
    private route: ActivatedRoute) {
    super(translateService);
  }

  ngOnInit() {
    this.url = location.origin + this.route.snapshot.queryParams['previousURL'];
  }

}
