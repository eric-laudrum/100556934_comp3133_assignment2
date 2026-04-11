import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-employee-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-add.html',
  styleUrl: './employee-add.css',
})
export class EmployeeAdd {

  employeeForm: FormGroup;
  
  employeeFile: File | null = null;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      department: ['', Validators.required],
      date_of_joining: ['', Validators.required],
    })
  }

  onFileSelect(event: any): void{
    const file = event.target.files[0];
    if(file){
      this.employeeFile = file;
    }
  }


  async onSubmit(): Promise<void>{

    if(this.employeeForm.valid){
      const formValues = {...this.employeeForm.value };

      this.authService.addEmployee(formValues).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) =>{
          this.errorMsg ="Error: failed to add employee";
          console.error(err);
        }
      });
    } else{
      this.employeeForm.markAllAsTouched();
    }

  }





}
