export interface Review {
    id: number;
    userId: number;
    projectionId: number;
    rating: number;     // ? ocena od 1-10  
    comment: string;   
    date: Date;
    userName?: string; // ? za prikaz imena uz komentar
}