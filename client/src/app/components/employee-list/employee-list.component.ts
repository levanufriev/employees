import { Component, inject } from '@angular/core';
import { Employee } from '../../models/employee';
import { MatTableModule } from '@angular/material/table'
import { EmployeeService } from '../../employee.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [ 
    MatTableModule,
    MatButtonModule,
    RouterLink
   ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees: Employee[] =[];
  employeeService = inject(EmployeeService);
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'age',
    'phone',
    'salary',
    'action',
  ];
  router = inject(Router);
  
  ngOnInit() {
    this.getEmployeeFromServer();
  }

  getEmployeeFromServer() {
    this.employeeService.getAllEmployee().subscribe((result) => {
      this.employees = result;
      console.log(this.employees);
    });
  }

  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl('/employee/' + id);
  }
  delete(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      console.log('deleted');
      this.employees=this.employees.filter(x=>x.id!=id);
      this.getEmployeeFromServer();
    });
  }
}
