import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  isEditing: boolean = false;
  profileForInput!: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public authService: AuthService){}
  
  ngOnInit(): void {
    this.profileForInput = {
      id: this.data.user.id, 
      email: this.data.user.email,
      password: this.data.user.password,
      birthDate: this.data.user.birthDate,
      address: this.data.user.address,
      name: this.data.user.name,
      surname: this.data.user.surname,
      phoneNumber: this.data.user.phoneNumber,
      favGenre: this.data.user.favGenre
    }
  }

  enableEdit(){
    this.isEditing = !this.isEditing;
  }

  finishEditing(){
    this.data.user.email = this.profileForInput.email;
    this.data.user.password = this.profileForInput.password;
    this.data.user.birthDate = this.profileForInput.birthDate;
    this.data.user.address = this.profileForInput.address;
    this.data.user.name = this.profileForInput.name;
    this.data.user.surname = this.profileForInput.surname;
    this.data.user.phoneNumber = this.profileForInput.phoneNumber;
    this.data.user.favGenre = this.profileForInput.favGenre;


    // console.log(this.data.user);
    // console.log(AuthService.dummyUserList);
    this.isEditing = false;
  }


}
