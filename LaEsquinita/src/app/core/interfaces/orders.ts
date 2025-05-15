
import { Supplier } from './supplier';
import { Product } from './product';

export interface OrderDetail {
  id_order_detail?: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  order: Orders;
  description?: string;
}

export interface Orders {
  id_order?: number;
  orderDate: Date;
  deliveryDate?: Date;
  supplier: Supplier;
  codeOrder: string;
  orderStatus: string;
  orderDetails?: OrderDetail[];
}

// Order status enum - Add values based on your business logic
export enum OrderStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}