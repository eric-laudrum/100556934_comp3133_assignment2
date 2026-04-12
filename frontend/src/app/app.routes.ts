import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { SignUp } from './components/signup/signup';
import { EmployeeList } from './components/employee-list/employee-list'
import { EmployeeAdd } from './components/employee-add/employee-add';
import { EmployeeDetails } from './components/employee-details/employee-details';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    
    { path: 'login', component: Login },
    { path: 'signup', component: SignUp },
    { path: 'employees', component: EmployeeList, canActivate: [authGuard] },
    { path: 'employees/add', component: EmployeeAdd, canActivate: [authGuard] },
    { path: 'employees/edit/:id', component: EmployeeAdd }, 
    { path: 'employees/details/:id', component: EmployeeDetails, canActivate: [authGuard] },

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
