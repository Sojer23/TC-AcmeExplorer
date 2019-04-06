import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  roleList: string[];
  langList: string[];

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
    ) {
      this.roleList = authService.getRoles();
      this.langList = ["en","es","it","fr"];
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
