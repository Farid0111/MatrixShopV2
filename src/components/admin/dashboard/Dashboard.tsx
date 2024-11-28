import React from 'react';
import { DashboardStats } from './DashboardStats';
import { RecentOrders } from './RecentOrders';
import { Order } from '../../../types/order';
import { Product } from '../../../types/product';

interface DashboardProps {
  orders: Order[];
  products: Product[];
}

export function Dashboard({ orders, products }: DashboardProps) {
  return (
    <div className="space-y-6">
      <DashboardStats orders={orders} products={products} />
      <RecentOrders orders={orders} />
    </div>
  );
}