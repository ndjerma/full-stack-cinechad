import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review.interface';
import { MovieService } from './movie.service';

@Injectable({
    providedIn: 'root',
})
export class ReviewService {
    constructor(private movieService: MovieService) {}  

    private reviews: Review[] = [
        {
            id: 1,
            userId: 1,
            projectionId: 1,        // ? Pripada filmu Inception (id=1)
            rating: 9,
            comment: 'Odličan film! Preporučujem svima. 😁🍿',
            date: new Date('2024-04-10'),
            userName: 'djermaaa@gmail.com'
          },
          {
            id: 2,
            userId: 2,
            projectionId: 2,    // ? Pripada filmu Inception (id=1)
            rating: 7,
            comment: 'Solidno, ali sam očekivao više.',
            date: new Date('2024-04-12'),
            userName: 'itsjohnny@gmail.com'
          },
          {
            id: 3,
            userId: 3,
            projectionId: 7,    // ? Pripada filmu Dark Knight (id=2)
            rating: 10,
            comment: 'Savršeno iskustvo u bioskopu!📽',
            date: new Date('2024-04-14'),
            userName: 'mims@gmail.com'
          }
    ];

    addReview(review: Review): void {
        this.reviews.push({ ...review, id: Date.now(), date: new Date() });
    }

    getAverageRating(movieId: number): number {
        //? Hvatam sve review-ove za film 
        const movieReviews = this.getReviewsForMovie(movieId);

        //? Ako nema review-ova vracam 0
        if(movieReviews.length === 0) return 0;

        //? Racunam prosek ocena
        const total = movieReviews.reduce((sum, review) => sum + review.rating, 0);
        const average = total / movieReviews.length;

        //? Zaokruzimo na 1 decimalu
        return parseFloat(average.toFixed(1));
    }

    getReviewsForMovie(movieId: number): Review[] {
        // ? Dohvatam sve projekcije za dati film 
        const movieProjections = this.movieService.getMovieById(movieId)?.projections || [];
        const projectionIds = movieProjections.map(p => p.id);

        // ? Filtriram review-ove cije projekcije pripadaju filmu 
        return this.reviews.filter(r => projectionIds.includes(r.projectionId));
    
    }

        


}