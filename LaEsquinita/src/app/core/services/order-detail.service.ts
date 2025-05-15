import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetail } from '../interfaces/orders';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private apiUrl = `${environment.apiUrl}/order-details/V1/api`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los detalles de órdenes
   * @returns Lista de detalles de órdenes
   */
  getAllOrderDetails(): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(`${this.apiUrl}/list`);
  }

  /**
   * Obtiene un detalle de orden por su ID
   * @param id ID del detalle de orden
   * @returns Detalle de orden
   */
  getOrderDetailById(id: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.apiUrl}/list/${id}`);
  }

  /**
   * Obtiene los detalles de orden por ID de orden
   * @param orderId ID de la orden
   * @returns Lista de detalles de la orden
   */
  getOrderDetailsByOrderId(orderId: number): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(`${this.apiUrl}/list/order/${orderId}`);
  }

  /**
   * Crea un nuevo detalle de orden
   * @param orderDetail Detalle de orden a crear
   * @returns Detalle de orden creado
   */
  createOrderDetail(orderDetail: OrderDetail): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(`${this.apiUrl}/create`, orderDetail);
  }

  /**
   * Actualiza parcialmente un detalle de orden
   * @param orderDetailId ID del detalle de orden a actualizar
   * @param partialOrderDetail Datos parciales para actualizar
   * @returns Detalle de orden actualizado
   */
  patchOrderDetail(orderDetailId: number, partialOrderDetail: Partial<OrderDetail>): Observable<OrderDetail> {
    return this.http.patch<OrderDetail>(`${this.apiUrl}/actualizarParcial/${orderDetailId}`, partialOrderDetail);
  }

  /**
   * Elimina un detalle de orden
   * @param id ID del detalle de orden a eliminar
   */
  deleteOrderDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}