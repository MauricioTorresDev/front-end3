export interface Product {
  id?: number;
  name: string;
  category: string;
  description?: string;
  tradeMark: string;
  stock: number;
  price: number;
  expirationDate?: Date;
  status: string;
  codeProduct: string;
}

// Product status enum - Add values based on your business logic
export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}