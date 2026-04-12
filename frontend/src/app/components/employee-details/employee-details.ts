import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css'
})

export class EmployeeDetails implements OnInit {
  employee: any = null;
  errorMsg: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.authService.getEmployeeById(id).subscribe({
        next: (data) => {
          this.employee = data;
        },
        error: (err) => {
          this.errorMsg = "Could not load employee details.";
          console.error(err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  goToEdit(): void {
    if (this.employee?._id) {
      this.router.navigate(['/employees/edit', this.employee._id]);
    }
  }
}