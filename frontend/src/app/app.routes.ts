import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { SignUp } from './components/signup/signup'; //



export const routes: Routes = [
    
    { path: 'login', component: Login },
    { path: 'signup', component: SignUp },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
