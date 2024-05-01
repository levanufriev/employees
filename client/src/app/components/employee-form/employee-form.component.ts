import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../models/employee';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  formBuilder = inject(FormBuilder);
  employeeService = inject(EmployeeService);
  employeeForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    age: [0, [Validators.required]],
    phone: ['', []],
    salary: [0, [Validators.required]],
  });
  employeeId!: number;
  router=inject(Router);
  route=inject(ActivatedRoute);
  isEdit = false;
  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEdit = true;
      this.employeeService.getEmployee(this.employeeId).subscribe((result) => {
        console.log(result);
        this.employeeForm.patchValue(result);
        this.employeeForm.controls.email.disable();
      });
    }
  }
  save() {
    console.log(this.employeeForm.value);
    const employee: Employee = {
      name: this.employeeForm.value.name!,
      age: this.employeeForm.value.age!,
      email: this.employeeForm.value.email!,
      phone: this.employeeForm.value.phone!,
      salary: this.employeeForm.value.salary!,
    };
    if (this.isEdit) {
      this.employeeService
        .updateEmployee(this.employeeId, employee)
        .subscribe(() => {
          console.log('success');
          this.router.navigateByUrl('/employee-list');
        });
    } else {
      this.employeeService.createEmployee(employee).subscribe(() => {
        console.log('success');
        this.router.navigateByUrl('/employee-list');
      });
    }
  }
}
