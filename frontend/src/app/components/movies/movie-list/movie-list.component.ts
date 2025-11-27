import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../interfaces/movie.interface';
import { MovieService } from '../../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})

export class MovieListComponent implements OnInit {
  
  filteredMovies: Movie[] = [];
  allMovies: Movie[] = [];
  
  ngOnInit() {
    this.allMovies = this.movieService.getAllMovies();
    this.filteredMovies = [...this.allMovies];    // ! inicijalno prikazi sve filmove 
  }

  genres = ['Action', 'Drama', 'Horror', 'Thriller', 'Sci-Fi', 'Romance', 'History', 'Comedy', 'Crime', 'Mystery', 'Adventure', 'Fantasy', 'Biography', 'Music', 'Western'];
  searchTerm = '';
  selectedGenre = '';

  constructor(private movieService: MovieService, private router: Router) {
    this.filteredMovies = this.movieService.getAllMovies();
  }

  searchMoviesByTerm(searchTerm: string){
    return this.filteredMovies  = this.allMovies.filter(movie => {
      const titleMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch;
    })
  }

  searchMoviesByGenre(selectedGenre: string){
    return this.filteredMovies = this.allMovies.filter(movie => {
      const genreMatch = selectedGenre ? movie.genre.map(g => g.toLowerCase()).includes(selectedGenre.toLowerCase()) : true;
      return genreMatch;
    })
  }

  // searchMovies() {
  //   this.filteredMovies = this.movieService.searchMovies(this.searchTerm, this.selectedGenre);
  // }
  

  openDetails(movieId: number) {
    this.router.navigate(['/movies', movieId]);
  }

}
