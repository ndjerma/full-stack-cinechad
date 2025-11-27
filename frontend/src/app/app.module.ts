import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatModule } from './material-components.module';  //! custom fajl za importovanje material componenti
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { MovieListComponent } from './components/movies/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movies/movie-card/movie-card.component';
import { MovieService } from './services/movie.service';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { MovieDetailsComponent } from './components/movies/movie-details/movie-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './services/cart.service';
import { ReviewService } from './services/review.service';
import { ReviewComponent } from './components/review/review.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    MovieListComponent,
    MovieCardComponent,
    ProfileComponent,
    MovieDetailsComponent,
    CartComponent,
    ReviewComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatModule,
    FlexLayoutModule,
    FormsModule,
    FormsModule,
],
  providers: [AuthService, MovieService, CartService, ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
