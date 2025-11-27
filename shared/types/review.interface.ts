export interface Review {
    id: string;
    userId: string;
    movieId: string;
    projectionId: string;
    rating: number;  // 1-10
    comment?: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    user?: {
        id: string;
        name: string;
        surname: string;
    };
}

export interface SubmitReviewRequest {
    movieId: string;
    projectionId: string;
    rating: number;
    comment?: string;
}

export interface ReviewsResponse {
    success: boolean;
    data: {
        reviews: Review[];
        averageRating: number;
        totalReviews: number;
        pagination?: {
            currentPage: number;
            totalPages: number;
            itemsPerPage: number;
        };
    };
}
