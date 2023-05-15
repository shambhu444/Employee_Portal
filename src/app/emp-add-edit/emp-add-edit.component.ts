import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

  s: EmployeeService;
  empForm: FormGroup;
  department: string[] = [
    'Admin',
    'IT',
    'HR',
    'Delivery',
    'QA',
    'Sales'
  ];
  constructor(private _fb: FormBuilder,
    private _dialog: MatDialog,
    service: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      
    this.s = service
    this.empForm =this._fb.group({
      employee_Id:0,
      employee_Name:['', [Validators.required, Validators.minLength(4)]],
      age:[0, [Validators.required, Validators.maxLength(99), Validators.minLength(20)]],
      gender:['', Validators.required],
      phone_Number:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email_Id:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      department:['', Validators.required],
    })
  }
  empt(){
  this._dialogRef.close(true);
  this._dialog.open(EmpAddEditComponent)
  
}
reset(){
  this.empForm.patchValue(this.data);

}

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  
  async onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        (await this.s.updateEmployee(this.data.employee_Id, this.empForm.value)).subscribe({
          next: (val: any) =>{
            Swal.fire('Updated!', 'Employee updated successfully.', 'success');
            this._dialogRef.close(true);
          },
          error:(err: any) => {
            console.error(err);
          },
      });
      }
      else{
      (await this.s.addEmployee(this.empForm.value)).subscribe({
        next: (val: any) =>{
          Swal.fire('Added!', 'Employee added successfully.', 'success');
          this._dialogRef.close(true);
        },
        error:(err: any) => {
          console.error(err);
        },
    });
  }
    }
  }
  get f(){  
    return this.empForm.controls;  
  }  
}
