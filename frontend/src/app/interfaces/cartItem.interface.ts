export interface CartItem {
    movieId: number;
    projectionId: number;
    title: string;
    dateTime: Date;
    price: number;
    quantity: number;
    status: 'reserved' | 'watched' | 'canceled';
}