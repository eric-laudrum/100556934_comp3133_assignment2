import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-employee-list',
  imports: [ CommonModule ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})


export class EmployeeList implements OnInit{
  employees: any[] = [];
  errorMsg: string = "";



  constructor( private authService: Auth, private router: Router){

  }

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




}
