// review.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../interfaces/review.interface';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() projectionId!: number;
  @Input() movieId!: number;
  @Input() userId!: number;
  @Input() userName!: string;
  @Input() status!: "reserved" | "watched" | "canceled" | "available" | "sold_out" | undefined;

  rating: number = 5;
  comment: string = '';
  reviews: Review[] = [];
  averageRating: number = 0;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviews = this.reviewService.getReviewsForMovie(this.movieId);
    this.averageRating = this.reviewService.getAverageRating(this.movieId);
  }

  canReview(): boolean {
    return this.status === 'watched' && !this.reviews.some(r => r.userId === this.userId);
  }

  submitReview(): void {
    if (this.rating < 1 || this.rating > 10 || !this.comment.trim()) return;

    const review: Review = {
      id: 0,
      userId: this.userId,
      projectionId: this.projectionId,
      rating: this.rating,
      comment: this.comment,
      date: new Date(),
      userName: this.userName
    };

    this.reviewService.addReview(review);
    this.comment = '';
    this.rating = 5;
    this.loadReviews();
  }
}
