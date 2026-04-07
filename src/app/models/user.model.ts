export interface User{

    id?: string;
    username: string;
    email: string;
    created_at?: string;
    updated_at?: string;
    
}

export interface AuthResponse{
    status: boolean;
    message: string;
    token: string;
}

export interface LoginInput{
    username?: string;
    email?: string;
    password?: string;
}