import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translatable',
  templateUrl: './translatable.component.html',
  styleUrls: ['./translatable.component.css']
})
export class TranslatableComponent {

  constructor(private translate: TranslateService) {
    let lang = localStorage.getItem('language');

    if(lang === 'null'){
      lang = this.translate.getBrowserLang();
    }
    translate.setDefaultLang(lang);
    this.changeLanguage(lang);
   }

   changeLanguage(language: string){
     this.translate.use(language);
     localStorage.setItem('language', language);
   }

  

}
