export interface Reservation {
    id: string;
    userId: string;
    projectionId: string;
    movieId: string;
    quantity: number;
    totalPrice: number;
    status: ReservationStatus;
    expiresAt?: Date | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export type ReservationStatus = 'reserved' | 'watched' | 'canceled';

export interface CartItem extends Reservation {
    movie?: {
        id: string;
        title: string;
        imageUrl: string;
    };
    projection?: {
        id: string;
        dateTime: Date | string;
        availableSeats: number;
    };
}

export interface CartResponse {
    success: boolean;
    data: {
        items: CartItem[];
        totalItems: number;
        grandTotal: number;
    };
}

export interface AddToCartRequest {
    projectionId: string;
    quantity: number;
}

export interface UpdateCartRequest {
    quantity: number;
}
