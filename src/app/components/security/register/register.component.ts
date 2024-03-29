import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends TranslatableComponent implements OnInit {

  registrationForm: FormGroup;
  roleList: string[];
  langList: string[];

  constructor( private translateService: TranslateService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
    ) {
      super(translateService);
      this.roleList = authService.getRoles();
      this.langList = ["en","es"];
      this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.registrationForm = this.fb.group({
      name:[''],
      surname:[''],
      email:[''],
      phone:[''],
      address:[''],
      preferredLanguage:[''],
      password:[''],
      role:['']
    });
  }

  onRegister(){
    this.authService.registerUser(this.registrationForm.value).then(res=>{
      console.log("Redirecting to login...");
      this.router.navigate(['/login']);
    }, err =>{
      console.log(err);
    });
  }

}
