import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { SignUp } from './components/signup/signup';
import { EmployeeList } from './components/employee-list/employee-list'



export const routes: Routes = [
    
    { path: 'login', component: Login },
    { path: 'signup', component: SignUp },
    { path: 'employees', component: EmployeeList },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
