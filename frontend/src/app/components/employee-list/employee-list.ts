import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Employee } from '../../models/employee.model';
import { ChangeDetectorRef } from '@angular/core';
import { signal } from '@angular/core';


@Component({
  selector: 'app-employee-list',
  imports: [ CommonModule ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})


export class EmployeeList implements OnInit{
  employees = signal<any[]>([]);
  errorMsg: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.authService.getEmployees().subscribe({
      next: (data) => this.employees.set(data),
      error: (err) => this.errorMsg = "Failed to load employees."
    });
  }



  navigateToAdd() {
    this.router.navigate(['/employees/add']);
  }

  viewDetails(id: string) {
    this.router.navigate(['/employees/details', id]);
  }

  editEmployee(id: string) {
    this.router.navigate(['/employees/edit', id]);
  }

  deleteEmployee(id: string) {
    if (confirm("Are you sure?")) {
      this.authService.deleteEmployee(id).subscribe({
        next: () => this.employees.update(prev => prev.filter(e => e._id !== id)),
        error: () => this.errorMsg = "Could not delete employee."
      });
    }
  }

  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }






}
