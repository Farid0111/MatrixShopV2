import React, { useState } from 'react';
import { Package, Truck, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { Order, OrderStatus } from '../../types/order';
import { OrderDetails } from './OrderDetails';
import { useLanguage } from '../../contexts/LanguageContext';

interface OrderListProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onDelete: (orderId: string) => void;
}

export function OrderList({ orders, onUpdateStatus, onDelete }: OrderListProps) {
  const { t, language } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusIcon = (status: OrderStatus) => {
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
    }
  };

  const getStatusColor = (status: OrderStatus) => {
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
    }
  };

  const getStatusTranslation = (status: OrderStatus) => {
    return t(`admin.status.${status}`);
  };

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    return date.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US', options);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.order.id')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.order.customer')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.order.contact')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.order.address')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.order.total')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.order.status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.order.date')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('admin.order.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.id.slice(0, 8)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.customerPhone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{order.customerAddress}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.totalAmount.toLocaleString()} FCFA
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(order.status)}
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusTranslation(order.status)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDateTime(order.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Eye size={18} />
                  </button>
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                    className="mr-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="pending">{t('admin.status.pending')}</option>
                    <option value="processing">{t('admin.status.processing')}</option>
                    <option value="shipped">{t('admin.status.shipped')}</option>
                    <option value="delivered">{t('admin.status.delivered')}</option>
                    <option value="cancelled">{t('admin.status.cancelled')}</option>
                  </select>
                  <button
                    onClick={() => onDelete(order.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    {t('admin.button.delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}