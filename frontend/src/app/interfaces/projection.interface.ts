export interface Projection {
    id: number;
    dateTime: Date;
    availableSeats: number;
    status?: 'reserved' | 'watched' | 'canceled' | 'available' | 'sold_out';
    userRating?: number; // od 1 do 5
}
