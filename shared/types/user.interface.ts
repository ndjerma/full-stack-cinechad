export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    birthDate: Date;
    phoneNumber: string;
    address?: string;
    favGenres: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SignupRequest {
    email: string;
    password: string;
    name: string;
    surname: string;
    birthDate: Date | string;
    phoneNumber: string;
    address?: string;
    favGenres: string[];
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    data: {
        user: User;
        token: string;
    };
}
