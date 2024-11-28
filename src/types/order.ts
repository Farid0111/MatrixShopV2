export interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  products: OrderProduct[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}