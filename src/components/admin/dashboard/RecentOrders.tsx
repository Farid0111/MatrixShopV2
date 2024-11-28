import React from 'react';
import { Order } from '../../../types/order';
import { Clock, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" />;
      case 'processing':
        return <Package className="text-blue-500" />;
      case 'shipped':
        return <Truck className="text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="text-green-500" />;
      case 'cancelled':
        return <XCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const recentOrders = orders
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.customerPhone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-right font-medium text-gray-900">
                    {order.totalAmount.toLocaleString()} FCFA
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.products.length} item{order.products.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}