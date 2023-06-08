import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  async addEmployee(data: any): Promise<Observable<any>> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  const response = this.http.post<any>('https://localhost:44375/api/Employees', JSON.stringify(data), httpOptions)
    return response
  }
  
  // async updateEmployee(employee_Id: number, data: any): Promise<Observable<any>> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   const response = this.http.put(`https://localhost:7179/api/Employee/${employee_Id}`, JSON.stringify(data), httpOptions)
  //     return response
  //   }

  // updateEmployee(employee_Id: number, data: any): Observable<any> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.put<any>(`https://localhost:7179/api/Employee/${employee_Id}`, data, httpOptions);
  // }

  getEmployeeList(): Observable<any> {
    return this.http.get('https://localhost:44375/api/Employees');
  }

  updateEmployee(employee_Id: number, data: any): Observable<any> {
    return this.http.put(`https://localhost:44375/api/Employees/${employee_Id}`, data);
  }

  deleteEmployee(employee_Id: number): Observable<any> {
    return this.http.delete(`https://localhost:44375/api/Employees/${employee_Id}`);
  }
}
