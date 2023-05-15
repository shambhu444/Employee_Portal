import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './service/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'employee_Id', 
    'employee_Name', 
    'age', 
    'gender', 
    'phone_Number', 
    'email_Id',
    'department',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private _dialog: MatDialog,
    private _empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }
  
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }

  deleteEmployee(employee_Id: number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((res) => {
      if (res.value) {
    this._empService.deleteEmployee(employee_Id).subscribe({
      next: (res) =>{
            Swal.fire('Removed!', 'Employee data removed successfully.', 'success');
            this.getEmployeeList();
          }})
        }
        else if (res.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Employee data still in our database.', 'error');
        }
      })
    }

  openEditForm(data: any) {
   const dialogRef = this._dialog.open(EmpAddEditComponent, {
    data,
   });
   dialogRef.afterClosed().subscribe({
     next: (val) =>{
       if(val){
         this.getEmployeeList();
       }
     },
   });
  }
}
