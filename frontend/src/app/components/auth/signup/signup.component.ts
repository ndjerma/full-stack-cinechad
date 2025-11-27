import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor (private authService: AuthService, private router: Router) {}
  
  allGenres = [
    'Action', 'Drama', 'Horror', 'Thriller', 'Sci-Fi', 'Romance', 'History', 'Comedy'
  ];

  errorExists: boolean = false;
  errorMessage: string = '';

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }
    
    if (form.value.password !== form.value.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    
    // ? Provera
    console.log('Poslata forma:', form.value);
    
    // ? ako ne nadje mail koji vec postoji
    if(!this.authService.getUser(form.value.email)){
      this.errorExists = false;

      var newUser = this.authService.registerUser(
                                                  form.value.name,
                                                  form.value.surname, 
                                                  form.value.birthDate,
                                                  form.value.email,
                                                  form.value.phoneNumber,
                                                  form.value.address,
                                                  form.value.password,
                                                  form.value.favGenre
                                                  );

      this.router.navigate(['']);
    } else {
      this.errorExists = true;
      this.errorMessage = "User with this email already exists.";
    }

  }
}