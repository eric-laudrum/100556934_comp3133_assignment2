import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Employee } from '../../models/employee.model';


@Component({
  selector: 'app-employee-list',
  imports: [ CommonModule ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})


export class EmployeeList implements OnInit{
  employees: Employee[] = [];
  errorMsg: string = "";



  constructor( private authService: AuthService, private router: Router){}

  ngOnInit(): void {
      this.loadEmployees();
  }

  loadEmployees() {

    this.authService.getEmployees().subscribe({

      next: (data: any[]) => {
        this.employees = data;
        console.log("Employees loaded:", this.employees);
      }, 
      
      error: (err) => {
        this.errorMsg = "Error. Failed to load employees";
        console.error(err);
      }
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
    if (confirm("Are you sure you want to delete this employee?")) {
      this.authService.deleteEmployee(id).subscribe({
        next: () => {
          // Refresh the list after deletion
          this.employees = this.employees.filter(e => e.id !== id);
        },
        error: (err) => {
          this.errorMsg = "Could not delete employee.";
        }
      });
    }
  }






}
