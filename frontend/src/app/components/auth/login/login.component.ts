import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  errorExists = false;
  errorText = "";
  
  constructor (private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm){

    var email = form.value.email;
    var password = form.value.password;

    const isLoggedIn = this.authService.login(email, password);
    
    var emailValid = this.authService.getUser(email);
    var passwordValid = this.authService.isPasswordCorrect(email, password);

    // if(!emailValid){
    //   this.errorExists = true;
    //   this.errorText = "User " + email + " isn't registered. ";
    // } else if(!passwordValid){
    //   this.errorExists = true;
    //   this.errorText = "Your password is incorrect. ";
    // } else {
    //   this.router.navigate(['']);
    // }
    if (isLoggedIn) {
        this.router.navigate(['']);
    } else if(!emailValid){
        this.errorExists = true;
        this.errorText = "User " + email + " isn't registered. ";
    } else if(!passwordValid){
        this.errorExists = true;
        this.errorText = "Your password is incorrect. ";
    }


  }



}