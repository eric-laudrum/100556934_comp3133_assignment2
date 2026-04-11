import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, RouterModule ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
 
export class SignUp {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (user) => {
          if (user && user.id) {
            alert("Signup successful! Please login.");
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.errorMessage = "Signup failed. Try again.";
          console.error("Error: ", err);
        }
      });
    }
  }
}