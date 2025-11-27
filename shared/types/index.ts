// Centralized export for all shared types
// Both frontend and backend can import from here

export * from './user.interface';
export * from './movie.interface';
export * from './reservation.interface';
export * from './review.interface';

// API Response wrapper
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        code: string;
        details?: any;
    };
    timestamp?: string;
}
