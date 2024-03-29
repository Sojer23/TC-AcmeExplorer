import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends TranslatableComponent{

  private email: string;

  constructor(private authService: AuthService, private translateService: TranslateService, private toastr: ToastrService) { 
    super(translateService);
  }

  onLogout(){
    this.authService.logout().then(_=>{
      this.email = null
    }).catch(err=>{
      console.log(err);
    });
  }

  onLogin(form: NgForm){
    const email = form.value.email;

    if(!email){
      this.toastr.error('','Debes introducir un email.',{
        timeOut: 3000
      });
    }

    const password = form.value.password;
    this.authService.login(email, password).then(_=>{
      form.reset();
      this.email = email;

    }).catch(err=>{
      console.log(err);
    });
  }



}
