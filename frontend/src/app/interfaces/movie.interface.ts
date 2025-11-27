import { Genre } from "../constants/genres.constants";
import { Review } from "./review.interface";
import { Projection } from "./projection.interface";

export interface Movie {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    // genre: Genre[];         // ? mora niz jer jedan film moze da ima vise zanrova
    genre: ('Action' | 'Drama' | 'Horror' | 'Thriller' | 'Sci-Fi' | 'Romance' | 'History' | 'Comedy' | 'Romance' | 'Crime' | 'Mystery' | 'Adventure' | 'Fantasy' | 'Biography' | 'Music' | 'Western')[];
    duration: number;
    director: string;
    cast: string[];         // ? glumci kao niz takodje
    releaseDate: Date;
    projections: Projection[];  // ? zaseban entitet
    price: number;
    reviews: Review[]; 
    averageRating?: number; 
}

