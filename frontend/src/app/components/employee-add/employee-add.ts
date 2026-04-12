import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-add.html',
  styleUrl: './employee-add.css',
})

export class EmployeeAdd implements OnInit{

  isEditMode = false;
  employeeId: string | null = null;

  employeeForm: FormGroup;
  
  employeeFile: File | null = null;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
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
  

  ngOnInit(): void {
    // Check for ID in URL
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.isEditMode = true;
      this.loadEmployeeData(this.employeeId);
    }
  }

  loadEmployeeData(id: string): void {
    this.authService.getEmployeeById(id).subscribe({
      next: (emp: any) => {
        let formattedDate = '';
        
        // Check for valid date
        if (emp.date_of_joining) {
          const d = new Date(emp.date_of_joining);

          if (!isNaN(d.getTime())) {
            formattedDate = d.toISOString().split('T')[0];
          } else {
            formattedDate = emp.date_of_joining.split('T')[0];
          }
        }

        this.employeeForm.patchValue({
          first_name: emp.first_name,
          last_name: emp.last_name,
          email: emp.email,
          position: emp.position,
          salary: emp.salary,
          department: emp.department,
          date_of_joining: formattedDate,
        });
      },

      error: (err: any) => {
        this.errorMsg = "Error: Could not fetch employee data.";
        console.error(err);
      }
    });
  }


  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.employeeFile = file;
    }
  }

  // Convert the image to a string
  private getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }


  async onSubmit(): Promise<void> {
    if (this.employeeForm.invalid) {
    this.employeeForm.markAllAsTouched();
    return;
  }

  const formValues = { ...this.employeeForm.value };

  if (this.employeeFile) {
    try {
      formValues.employee_photo = await this.getBase64(this.employeeFile);
    } catch (error) {
      this.errorMsg = "Error processing image.";
      return;
    }
  }

  if (this.isEditMode && this.employeeId) {
    this.authService.updateEmployee(this.employeeId, formValues).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => {
        this.errorMsg = "Error: Failed to update employee.";
        console.error("Update Error Details:", err);
      }
    });
  } else {
    this.authService.addEmployee(formValues).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => {
        this.errorMsg = "Error: Failed to add employee.";
        console.error("Add Error Details:", err);
      }
    });
  }
}

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}