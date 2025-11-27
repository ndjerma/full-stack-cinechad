import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MovieListComponent } from './components/movies/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movies/movie-details/movie-details.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './components/auth/authguard';
import { ReviewComponent } from './components/review/review.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', component: MovieDetailsComponent, canActivate:[AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate:[AuthGuard] },
  { path: 'reviews', component: ReviewComponent, canActivate:[AuthGuard] } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
