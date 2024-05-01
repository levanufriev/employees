import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Employee } from './models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl = 'https://localhost:7194';
  http = inject(HttpClient);
  constructor() {}

  getAllEmployee() {
    return this.http.get<Employee[]>(this.apiUrl + '/api/Employee');
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.apiUrl + '/api/Employee', employee);
  }

  getEmployee(employeeId: number) {
    return this.http.get<Employee>(
      this.apiUrl + '/api/Employee/' + employeeId
    );
  }

  updateEmployee(employeeId: number, employee: Employee) {
    return this.http.put<Employee>(
      this.apiUrl + '/api/Employee/' + employeeId,
      employee
    );
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete(this.apiUrl + '/api/Employee/' + employeeId);
  }
}
