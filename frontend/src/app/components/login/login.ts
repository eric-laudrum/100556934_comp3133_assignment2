import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AuthResponse } from '../../models/employee.model'



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './auth-login.html',
  styleUrl: './login.css',
})

export class Login {

  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.loginForm = this.fb.group({
      username: ['', [ Validators.required ]],
      password: ['', [ Validators.required, Validators.minLength(6) ]]
    });
  }

  onSubmit(){

    alert("Attempting to log in...");
    console.log("Button clicked!");

    if( this.loginForm.valid ){

      const payload = {
            username: this.loginForm.value.username.trim(),
            password: this.loginForm.value.password
        };

      this.authService.login(payload).subscribe({
        next: (response: AuthResponse) => {
          if( response.status ){
            localStorage.setItem('token', response.token);
            this.router.navigate(['/employees']);

          } else{
            this.errorMessage = response.message;
          }
        },
        error: (err: any) =>{
          this.errorMessage = "Login failed. Check connection";
          console.error(err);
        }
      });
    }
  }
}
