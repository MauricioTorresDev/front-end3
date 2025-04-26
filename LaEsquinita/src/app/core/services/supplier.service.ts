import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../interfaces/supplier';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = `${environment.apiUrl}/supplier/V1/api`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}/list`, { headers: this.getHeaders() });
  }

  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/list/${id}`, { headers: this.getHeaders() });
  }

  getSuppliersByStatus(status: string): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}/list/status/${status}`, { headers: this.getHeaders() });
  }

  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.apiUrl}/create`, supplier, { headers: this.getHeaders() });
  }

  patchSupplier(id: number, supplier: Partial<Supplier>): Observable<Supplier> {
    return this.http.patch<Supplier>(`${this.apiUrl}/actualizarParcial/${id}`, supplier, { headers: this.getHeaders() });
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() });
  }

  restoreSupplier(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/restore/${id}`, {}, { headers: this.getHeaders() });
  }
}
