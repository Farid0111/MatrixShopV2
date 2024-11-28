import React from 'react';
import { Order } from '../../types/order';

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

export function OrderDetails({ order, onClose }: OrderDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><span className="font-medium">Name:</span> {order.customerName}</p>
              <p><span className="font-medium">Phone:</span> {order.customerPhone}</p>
              <p><span className="font-medium">Address:</span> {order.customerAddress}</p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Products</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-2">Product</th>
                    <th className="pb-2">Quantity</th>
                    <th className="pb-2">Price</th>
                    <th className="pb-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product) => (
                    <tr key={product.id}>
                      <td className="py-2">{product.name}</td>
                      <td className="py-2">{product.quantity}</td>
                      <td className="py-2">{product.price.toLocaleString()} FCFA</td>
                      <td className="py-2">{(product.price * product.quantity).toLocaleString()} FCFA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">Total Amount:</span>
                <span>{order.totalAmount.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-medium">Order Date:</span>
                <span>{order.createdAt.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-medium">Status:</span>
                <span className="capitalize">{order.status}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}