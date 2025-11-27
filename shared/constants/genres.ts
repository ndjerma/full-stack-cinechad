export const ALL_GENRES = [
    'Action',
    'Drama',
    'Horror',
    'Thriller',
    'Sci-Fi',
    'Romance',
    'History',
    'Comedy',
    'Crime',
    'Mystery',
    'Adventure',
    'Fantasy',
    'Biography',
    'Music',
    'Western'
] as const;

export type Genre = typeof ALL_GENRES[number];
