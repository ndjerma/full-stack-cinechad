import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-cinechad';

  profileOpened: boolean = false;

  constructor (public authService: AuthService,
              public dialog: MatDialog,
              public cartService: CartService,
              private router: Router
            ) {}

  openProfile(userId: number) {
    if(this.authService.currentUser){
        this.profileOpened = true; 

        const profileDialog = this.dialog.open(ProfileComponent, {
          disableClose: true,
          width: "50vw",
          maxWidth: "50vw",
          data: {user: this.authService.getUserById(userId)}
        });

        profileDialog.afterClosed().subscribe(r => {
          this.profileOpened = false;
        })
      } else {
        console.log('No user logged in');
    } 
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}