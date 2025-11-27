import { Injectable } from "@angular/core";
import { Movie } from "../interfaces/movie.interface";
import { Review } from "../interfaces/review.interface";

@Injectable({providedIn: 'root'})
export class MovieService{

    static dummyData: Array<Movie> = [
        // static dummyData: Movie[] = [


        {
            id: 1,
            title: 'Inception',
            imageUrl: "https://i.pinimg.com/736x/e8/34/93/e8349338743f7064fee899ce4b034c55.jpg",
            description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
            genre: ['Action', 'Sci-Fi'],
            duration: 148,
            director: 'Christopher Nolan',
            cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
            releaseDate: new Date(2010, 6, 16),
            projections: [
                { 
                    id: 1, 
                    dateTime: new Date(2024, 2, 15, 20, 0), 
                    availableSeats: 100,
                    status: 'available'
                },
                { 
                    id: 2, 
                    dateTime: new Date(2024, 2, 16, 18, 30), 
                    availableSeats: 50,
                    status: 'available'
                },
                { 
                    id: 3, 
                    dateTime: new Date(2024, 2, 16, 21, 0), 
                    availableSeats: 20,
                    status: 'sold_out'
                },
                { 
                    id: 4, 
                    dateTime: new Date(2024, 2, 17, 15, 0), 
                    availableSeats: 80,
                    status: 'available'
                },
                { 
                    id: 5, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 6, 
                    dateTime: new Date(2024, 2, 18, 19, 45),
                    availableSeats: 120,
                    status: 'available'
                }
            ],
            price: 550,
            reviews: []
        },

        {
            id: 2,
            title: 'The Dark Knight',
            imageUrl: "https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg",
            description: 'When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.',
            genre: ['Action', 'Drama'],
            duration: 152,
            director: 'Christopher Nolan',
            cast: ['Christian Bale', 'Heath Ledger'],
            releaseDate: new Date(2008, 6, 18),
            projections: [
                { 
                    id: 7, 
                    dateTime: new Date(2024, 2, 15, 20, 0), 
                    availableSeats: 100,
                    status: 'available'
                },
                { 
                    id: 8, 
                    dateTime: new Date(2024, 2, 16, 18, 30), 
                    availableSeats: 50,
                    status: 'available'
                },
                { 
                    id: 9, 
                    dateTime: new Date(2024, 2, 16, 21, 0), 
                    availableSeats: 20,
                    status: 'sold_out'
                },
                { 
                    id: 10, 
                    dateTime: new Date(2024, 2, 17, 15, 0), 
                    availableSeats: 80,
                    status: 'available'
                },
                { 
                    id: 11, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 12, 
                    dateTime: new Date(2024, 2, 18, 19, 45),
                    availableSeats: 120,
                    status: 'available'
                }
            ],
            price: 700,
            reviews: []
        },

        {
            id: 3,
            title: 'The Shawshank Redemption',
            imageUrl: "https://i.pinimg.com/736x/c6/3e/f0/c63ef0828b531f680d207ee2c5e4749d.jpg",
            description: 'A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.',
            genre: ['Drama'],
            duration: 142,
            director: 'Frank Darabont',
            cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
            releaseDate: new Date(1994, 9, 10),
            projections: [
                { 
                    id: 13, 
                    dateTime: new Date(2024, 2, 16, 18, 30), 
                    availableSeats: 50,
                    status: 'available'
                },
                { 
                    id: 14, 
                    dateTime: new Date(2024, 2, 16, 21, 0), 
                    availableSeats: 20,
                    status: 'sold_out'
                },
                { 
                    id: 15, 
                    dateTime: new Date(2024, 2, 17, 15, 0), 
                    availableSeats: 80,
                    status: 'available'
                },
                { 
                    id: 16, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 17, 
                    dateTime: new Date(2024, 2, 18, 19, 45),
                    availableSeats: 120,
                    status: 'available'
                }
            ],
            price: 800,
            reviews: []
        },

        {
            id: 4,
            title: "Schindler's List",
            imageUrl: "https://i.pinimg.com/736x/86/6d/56/866d56738f46f170116e5b2525ffcff9.jpg",
            description: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
            genre: ['Drama', 'History'],
            duration: 195,
            director: 'Steven Spielberg',
            cast: ['Liam Neeson', 'Ralph Fiennes', 'Ben Kingsley'],
            releaseDate: new Date(1993, 11, 30),
            projections: [
                { 
                    id: 18, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 19, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 20, 
                    dateTime: new Date(2024, 2, 18, 19, 45),
                    availableSeats: 120,
                    status: 'available'
                }
            ],
            price: 600,
            reviews: []
        },

        {
            id: 5,
            title: "Goodfellas",
            imageUrl: "https://i.pinimg.com/736x/3b/c1/e2/3bc1e215b9875ad6470e43f2ddeb5e65.jpg",
            description: 'The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito.',
            genre: ['Comedy', 'Action'],
            duration: 145,
            director: 'Matrtin Scorsese',
            cast: ['Robert De Niro', 'Ray Liotta', 'Joe Pesci'],
            releaseDate: new Date(1990, 9, 9),
            projections: [
                { 
                    id: 21, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 40,
                    status: 'available'
                },
                { 
                    id: 22, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 23, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 24, 
                    dateTime: new Date(2024, 2, 18, 19, 45),
                    availableSeats: 120,
                    status: 'available'
                }
            ],
            price: 700,
            reviews: []
        },

        {
            id: 6,
            title: "The Lord of the Rings: The Return of the King",
            imageUrl: "https://i.pinimg.com/736x/5c/37/52/5c3752db2dd7de24a72e158426a63a5b.jpg",
            description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
            genre: ['Action', 'Sci-Fi', 'Thriller'],
            duration: 201,
            director: 'Peter Jackson',
            cast: ['Elijah Wood', 'Viggo Mortensen', 'Philippa Boyens'],
            releaseDate: new Date(2003, 9, 9),
            projections: [
                { 
                    id: 25, 
                    dateTime: new Date(2024, 3, 16, 19, 30), 
                    availableSeats: 100,
                    status: 'available'
                },
                { 
                    id: 26, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 40,
                    status: 'available'
                },
                { 
                    id: 27, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 28, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 29, 
                    dateTime: new Date(2024, 2, 18, 19, 45),
                    availableSeats: 120,
                    status: 'available'
                }

            ],
            price: 800,
            reviews: []
        },

        {
            id: 7,
            title: "Pulp Fiction",
            imageUrl: "https://i.pinimg.com/736x/89/41/e7/8941e71464be8fe81ade92a86817338e.jpg",
            description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            genre: ['Drama', 'Action', 'Comedy'],
            duration: 154,
            director: "Quentin Tarantino",
            cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
            releaseDate: new Date(1994, 5, 21, 20, 30),
            projections: [
                { 
                    id: 30, 
                    dateTime: new Date(2024, 3, 16, 19, 30), 
                    availableSeats: 100,
                    status: 'available'
                },
                { 
                    id: 31, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 40,
                    status: 'available'
                },
                { 
                    id: 32, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 33, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 34, 
                    dateTime: new Date(2024, 2, 18, 19, 45),
                    availableSeats: 120,
                    status: 'available'
                }
            ],
            price: 900,
            reviews: []
        },

        {
            id: 8,
            title: "Fight Club",
            imageUrl: "https://i.pinimg.com/736x/d8/9e/b0/d89eb04d03c62acb1d463d50db4560ce.jpg",
            description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into much more.",
            genre: ['Drama', 'Thriller'],
            duration: 139,
            director: "David Fincher",
            cast: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter'],
            releaseDate: new Date(1999, 9, 15, 20, 0),
            projections: [
                {
                    id: 35,
                    dateTime: new Date(2024, 3, 20, 20, 30),
                    availableSeats: 90,
                    status: 'available'
                },
                { 
                    id: 36, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 37, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
            ],
            price: 850,
            reviews: []
        },

        {
            id: 9,
            title: "Forrest Gump",
            imageUrl: "https://i.pinimg.com/736x/e1/a1/0f/e1a10f3172d85db770c0b8b7e921e4fe.jpg",
            description: "The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.",
            genre: ['Drama', 'Romance'],
            duration: 142,
            director: "Robert Zemeckis",
            cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
            releaseDate: new Date(1994, 6, 6, 20, 30),
            projections: [
                {
                    id: 38,
                    dateTime: new Date(2024, 3, 21, 18, 0),
                    availableSeats: 95,
                    status: 'available'
                },
                { 
                    id: 39, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 40, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 0,
                    status: 'sold_out'
                }
            ],
            price: 850,
            reviews: []
        },

        {
            id: 10,
            title: "Se7en",
            imageUrl: "https://i.pinimg.com/736x/d3/4c/a8/d34ca85942794cf60cd6665d299801f7.jpg",
            description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
            genre: ['Crime', 'Drama', 'Mystery'],
            duration: 127,
            director: "David Fincher",
            cast: ['Morgan Freeman', 'Brad Pitt', 'Kevin Spacey'],
            releaseDate: new Date(1995, 8, 22, 21, 0),
            projections: [
                {
                    id: 41,
                    dateTime: new Date(2024, 3, 22, 19, 30),
                    availableSeats: 90,
                    status: 'available'
                },
                { 
                    id: 42, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 43, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
            ],
            price: 800,
            reviews: []
        },

        {
            id: 11,
            title: "The Silence of the Lambs",
            imageUrl: "https://i.pinimg.com/736x/f5/cf/0f/f5cf0f8cca5b4b7e97a4da4fa7fe67f4.jpg",
            description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to catch another serial killer.",
            genre: ['Crime', 'Drama', 'Thriller'],
            duration: 118,
            director: "Jonathan Demme",
            cast: ['Jodie Foster', 'Anthony Hopkins', 'Scott Glenn'],
            releaseDate: new Date(1991, 1, 14, 20, 0),
            projections: [
                {
                    id: 44,
                    dateTime: new Date(2024, 3, 23, 20, 0),
                    availableSeats: 80,
                    status: 'available'
                },
                { 
                    id: 45, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 46, 
                    dateTime: new Date(2024, 2, 17, 21, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
            ],
            price: 850,
            reviews: []
        },
        {
            id: 12,
            title: "Interstellar",
            imageUrl: "https://i.pinimg.com/736x/73/26/0e/73260e80b7873849c1d514e9fbc45391.jpg",
            description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            genre: ['Adventure', 'Drama', 'Sci-Fi'],
            duration: 169,
            director: "Christopher Nolan",
            cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
            releaseDate: new Date(2014, 10, 7, 20, 0),
            projections: [
                {
                    id: 47,
                    dateTime: new Date(2024, 3, 24, 19, 30),
                    availableSeats: 100,
                    status: 'available'
                },
                { 
                    id: 48, 
                    dateTime: new Date(2024, 2, 17, 15, 0), // 17. ožujka 15:00
                    availableSeats: 80,
                    status: 'available'
                },
                { 
                    id: 49, 
                    dateTime: new Date(2024, 2, 17, 20, 0), // 17. ožujka 20:00
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 50, 
                    dateTime: new Date(2024, 2, 18, 19, 45), // 18. ožujka 19:45
                    availableSeats: 120,
                    status: 'available'
                }
            ],
            price: 1000,
            reviews: []
        },
        {
            id: 13,
            title: "The Green Mile",
            imageUrl: "https://i.pinimg.com/736x/b3/29/fc/b329fc6cc4a7c07d1c340b5da1b6d3f5.jpg",
            description: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
            genre: ['Crime', 'Drama', 'Fantasy'],
            duration: 189,
            director: "Frank Darabont",
            cast: ['Tom Hanks', 'Michael Clarke Duncan', 'David Morse'],
            releaseDate: new Date(1999, 11, 10, 20, 0),
            projections: [
                {
                    id: 51,
                    dateTime: new Date(2024, 3, 25, 17, 30),
                    availableSeats: 85,
                    status: 'available'
                }
            ],
            price: 950,
            reviews: []
        },
        {
            id: 14,
            title: "The Pianist",
            imageUrl: "https://i.pinimg.com/736x/b0/86/5a/b0865ad04b1412be7290f7d7decfffa5.jpg",
            description: "A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.",
            genre: ['Biography', 'Drama', 'Music'],
            duration: 150,
            director: "Roman Polanski",
            cast: ['Adrien Brody', 'Thomas Kretschmann', 'Frank Finlay'],
            releaseDate: new Date(2002, 8, 25, 20, 0),
            projections: [
                {
                    id: 52,
                    dateTime: new Date(2024, 3, 26, 20, 30),
                    availableSeats: 70,
                    status: 'available'
                }
            ],
            price: 800,
            reviews: []
        },
        {
            id: 15,
            title: "Gladiator",
            imageUrl: "https://i.pinimg.com/736x/b8/67/b2/b867b25568ec797e155da8609324bb44.jpg",
            description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
            genre: ['Action', 'Adventure', 'Drama'],
            duration: 155,
            director: "Ridley Scott",
            cast: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen'],
            releaseDate: new Date(2000, 4, 5, 21, 0),
            projections: [
                {
                    id: 53,
                    dateTime: new Date(2024, 3, 27, 18, 30),
                    availableSeats: 100,
                    status: 'available'
                },
                {
                    id: 54,
                    dateTime: new Date(2024, 3, 22, 19, 30),
                    availableSeats: 90,
                    status: 'available'
                },
                { 
                    id: 55, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 56, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },

            ],
            price: 950,
            reviews: []
        },
        {
            id: 16,
            title: "The Prestige",
            imageUrl: "https://i.pinimg.com/736x/47/94/a5/4794a54fd194f8ee938f70a46832f358.jpg",
            description: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
            genre: ['Drama', 'Mystery', 'Sci-Fi'],
            duration: 130,
            director: "Christopher Nolan",
            cast: ['Christian Bale', 'Hugh Jackman', 'Scarlett Johansson'],
            releaseDate: new Date(2006, 9, 20, 20, 0),
            projections: [
                {
                    id: 57,
                    dateTime: new Date(2024, 3, 28, 20, 30),
                    availableSeats: 90,
                    status: 'available'
                },
                {
                    id: 58,
                    dateTime: new Date(2024, 3, 22, 19, 30),
                    availableSeats: 90,
                    status: 'available'
                },
                { 
                    id: 59, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 60, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
            ],
            price: 850,
            reviews: []
        },
        {
            id: 17,
            title: "Whiplash",
            imageUrl: "https://i.pinimg.com/736x/a0/05/1e/a0051e8c8af443ea8ca2b392f12f23d1.jpg",
            description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
            genre: ['Drama', 'Music'],
            duration: 106,
            director: "Damien Chazelle",
            cast: ['Miles Teller', 'J.K. Simmons', 'Paul Reiser'],
            releaseDate: new Date(2014, 0, 16, 19, 30),
            projections: [
                {
                    id: 61,
                    dateTime: new Date(2024, 3, 29, 19, 0),
                    availableSeats: 85,
                    status: 'available'
                },
                {
                    id: 62,
                    dateTime: new Date(2024, 3, 22, 19, 30),
                    availableSeats: 90,
                    status: 'available'
                },
                { 
                    id: 63, 
                    dateTime: new Date(2024, 3, 16, 20, 30), 
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 64, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
            ],
            price: 800,
            reviews: []
        },
        {
            id: 18,
            title: "Parasite",
            imageUrl: "https://i.pinimg.com/736x/bc/e3/c2/bce3c2cbd502d88d137200ee7d928f09.jpg",
            description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
            genre: ['Comedy', 'Drama', 'Thriller'],
            duration: 132,
            director: "Bong Joon Ho",
            cast: ['Kang-ho Song', 'Sun-kyun Lee', 'Yeo-jeong Jo'],
            releaseDate: new Date(2019, 4, 30, 20, 0),
            projections: [
                {
                    id: 65,
                    dateTime: new Date(2024, 3, 30, 20, 30),
                    availableSeats: 95,
                    status: 'available'
                },
                { 
                    id: 66, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                }
            ],
            price: 950,
            reviews: []
        },
        {
            id: 19,
            title: "The Departed",
            imageUrl: "https://i.pinimg.com/736x/de/37/b3/de37b3a43607e41e5f0c92a237ad2a42.jpg",
            description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
            genre: ['Crime', 'Drama', 'Thriller'],
            duration: 151,
            director: "Martin Scorsese",
            cast: ['Leonardo DiCaprio', 'Matt Damon', 'Jack Nicholson'],
            releaseDate: new Date(2006, 9, 6, 21, 0),
            projections: [
                {
                    id: 67,
                    dateTime: new Date(2024, 3, 30, 21, 30),
                    availableSeats: 88,
                    status: 'available'
                },
                { 
                    id: 68, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
            ],
            price: 900,
            reviews: []
        },
        {
            id: 20,
            title: "Django Unchained",
            imageUrl: "https://i.pinimg.com/736x/e4/a2/4b/e4a24bd4dbce8864b46c3de08adb2bba.jpg",
            description: "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
            genre: ['Drama', 'Western'],
            duration: 165,
            director: "Quentin Tarantino",
            cast: ['Jamie Foxx', 'Christoph Waltz', 'Leonardo DiCaprio'],
            releaseDate: new Date(2012, 11, 25, 20, 0),
            projections: [
                {
                    id: 69,
                    dateTime: new Date(2024, 3, 31, 19, 0),
                    availableSeats: 90,
                    status: 'available'
                },
                { 
                    id: 70, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 71, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
                { 
                    id: 72, 
                    dateTime: new Date(2024, 2, 17, 20, 0),
                    availableSeats: 0,
                    status: 'sold_out'
                },
            ],
            price: 950,
            reviews: []
        }
        
    ]

    // * 1. OSNOVNE FUNKCIJE ZA RAD SA FILMOVIMA

        //? dohvatanje svih filmova za prikaz

        getAllMovies(): Movie[] {
            return MovieService.dummyData;
        }

        //? neophodno za detalje da uhvatimo pojedinacni film
    
        getMovieById(id: number): Movie | undefined {
            return MovieService.dummyData.find(movie => movie.id === id);
        }


    //* 2. PRETRAGA FILMOVA

        searchMovies(searchTerm: string, selectedGenre?: string): Movie[] {
            
            const validGenres = ['Action', 'Drama', 'Horror', 'Thriller', 'Sci-Fi', 'Romance', 'History', 'Comedy'];

            return MovieService.dummyData.filter(movie => {
                const titleMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());

                const genreMatch = selectedGenre ? validGenres.includes(selectedGenre) : true;

                return titleMatch && genreMatch;
            });
        }

    //* 3. REZERVACIJA KARATA


    //* 4. OCENJIVANJE

        addReview(){}
        // ? ovo se ne secamm sta ce mi, valjda neophodno za proveru review-a,
        // ? ako nismo gledali film ne mozemo da damo recenziju
        checkIfUserWatchedMovie(){}





}