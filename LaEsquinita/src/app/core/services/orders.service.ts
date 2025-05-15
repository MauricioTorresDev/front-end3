import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../interfaces/orders';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = `${environment.apiUrl}/orders/V1/api`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las órdenes
   * @returns Lista de órdenes
   */
  getAllOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.apiUrl}/list`);
  }

  /**
   * Obtiene una orden por su ID
   * @param id ID de la orden
   * @returns Orden
   */
  getOrderById(id: number): Observable<Orders> {
    return this.http.get<Orders>(`${this.apiUrl}/list/${id}`);
  }

  /**
   * Obtiene órdenes por ID de proveedor
   * @param supplierId ID del proveedor
   * @returns Lista de órdenes del proveedor
   */
  getOrdersBySupplierId(supplierId: number): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.apiUrl}/list/supplier/${supplierId}`);
  }

  /**
   * Crea una nueva orden
   * @param order Orden a crear
   * @returns Orden creada
   */
  createOrder(order: Orders): Observable<Orders> {
    return this.http.post<Orders>(`${this.apiUrl}/create`, order);
  }

  /**
   * Actualiza una orden
   * @param id ID de la orden a actualizar
   * @param order Datos de la orden actualizada
   * @returns Orden actualizada
   */
  updateOrder(id: number, order: Orders): Observable<Orders> {
    return this.http.put<Orders>(`${this.apiUrl}/update/${id}`, order);
  }

  /**
   * Actualiza parcialmente una orden
   * @param orderId ID de la orden a actualizar
   * @param partialOrder Datos parciales para actualizar
   * @returns Orden actualizada
   */
  patchOrder(orderId: number, partialOrder: Partial<Orders>): Observable<Orders> {
    return this.http.patch<Orders>(`${this.apiUrl}/actualizarParcial/${orderId}`, partialOrder);
  }

  /**
   * Actualiza el estado de una orden
   * @param orderId ID de la orden
   * @param status Nuevo estado
   * @returns Orden actualizada
   */
  updateOrderStatus(orderId: number, status: string): Observable<Orders> {
    return this.http.patch<Orders>(`${this.apiUrl}/status/${orderId}`, { orderStatus: status });
  }

  /**
   * Elimina una orden
   * @param id ID de la orden a eliminar
   */
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}