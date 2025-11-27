import { Component, Input } from '@angular/core';
import { Movie } from '../../../interfaces/movie.interface';
import { Router } from '@angular/router'; 
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})


export class MovieCardComponent {

  constructor(private router: Router, private cartService: CartService){}

  ngOnInit(){
    if (!this.movie){
      console.error('Movie input is required!');
    }
  }

  @Input() movie!: Movie;
  ticketCount: number = 1;

  // * nova metoda za navigaciju za movieDetails
  navigateToMovieDetails(): void{
    this.router.navigate(['/movies', this.movie.id])
  }

  getFormattedDate(date: Date){
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  addToCart(){
    if(this.ticketCount > 0 && this.movie.projections.length > 0){
      const cartItem = {
        movieId: this.movie.id,
        projectionId: this.movie.projections[0].id,   //uzimamo prvu projekciju
        title: this.movie.title,
        dateTime: this.movie.projections[0].dateTime,
        price: this.movie.price,
        quantity: this.ticketCount,
        status: 'reserved' as const
      }

      this.cartService.addToCart(cartItem);

      // ! mozda nije dobra ideja ovo
      this.router.navigate(['/cart']); // Redirektujemo korisnika u korpu
    }
  }




}

/*
// movie-card.component.ts
import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  ticketCount: number = 1;

  getFormattedDate(date: Date): string {
    return new Date(date).toLocaleDateString('sr-Latn', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  addToCart() {
    // Логика за додавање у корпу
    console.log(`Reserving ${this.ticketCount} tickets for ${this.movie.title}`);
  }
}
*/