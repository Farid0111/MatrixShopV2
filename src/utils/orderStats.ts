import { Order, OrderStatus } from '../types/order';

export interface OrderStats {
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  total: number;
  deliveredRevenue: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  deliveredRevenue: number;
}

export interface StatusData {
  name: string;
  value: number;
}

export function calculateOrderStats(orders: Order[]): OrderStats {
  return {
    pending: orders.filter(order => order.status === 'pending').length,
    processing: orders.filter(order => order.status === 'processing').length,
    shipped: orders.filter(order => order.status === 'shipped').length,
    delivered: orders.filter(order => order.status === 'delivered').length,
    cancelled: orders.filter(order => order.status === 'cancelled').length,
    total: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    deliveredRevenue: orders
      .filter(order => order.status === 'delivered')
      .reduce((sum, order) => sum + order.totalAmount, 0)
  };
}

export function prepareRevenueData(orders: Order[]): RevenueData[] {
  return orders
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .map(order => ({
      date: order.createdAt.toLocaleDateString(),
      revenue: order.totalAmount,
      deliveredRevenue: order.status === 'delivered' ? order.totalAmount : 0
    }))
    .reduce((acc: RevenueData[], curr) => {
      const existing = acc.find(item => item.date === curr.date);
      if (existing) {
        existing.revenue += curr.revenue;
        existing.deliveredRevenue += curr.deliveredRevenue;
      } else {
        acc.push({ 
          date: curr.date, 
          revenue: curr.revenue,
          deliveredRevenue: curr.deliveredRevenue
        });
      }
      return acc;
    }, []);
}

export function prepareStatusData(stats: OrderStats, getStatusTranslation: (status: OrderStatus) => string): StatusData[] {
  return [
    { name: getStatusTranslation('pending'), value: stats.pending },
    { name: getStatusTranslation('processing'), value: stats.processing },
    { name: getStatusTranslation('shipped'), value: stats.shipped },
    { name: getStatusTranslation('delivered'), value: stats.delivered },
    { name: getStatusTranslation('cancelled'), value: stats.cancelled }
  ];
}