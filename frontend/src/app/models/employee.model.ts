export interface Employee{

    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: 'Male' | 'Female' | 'Other';
    destination: string;
    salary: number;
    date_of_joining: string;
    department: string;
    employee_photo?: string;

}


export interface AuthResponse{
    status: boolean;
    message: string;
    token: string;
}