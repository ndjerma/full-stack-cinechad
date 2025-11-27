export interface Movie {
    id: string;
    title: string;
    description: string;
    director: string;
    cast: string[];
    genre: string[];  // Will be renamed to 'genres' in refactoring
    duration: number;  // in minutes
    releaseDate: Date | string;
    imageUrl: string;
    price: number;
    averageRating?: number;
    totalReviews?: number;
    projections?: Projection[];
}

export interface Projection {
    id: string;
    movieId: string;
    dateTime: Date | string;
    totalSeats: number;
    availableSeats: number;
    status: ProjectionStatus;
    price?: number;
}

export type ProjectionStatus = 'available' | 'sold_out' | 'past';

export interface MoviesResponse {
    success: boolean;
    data: {
        movies: Movie[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
        };
    };
}

export interface MovieDetailsResponse {
    success: boolean;
    data: {
        movie: Movie;
        projections: Projection[];
    };
}
