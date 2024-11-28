import React from 'react';
import { DollarSign, Package, ShoppingBag, Users, TrendingUp, Clock, Eye } from 'lucide-react';
import { Order } from '../../../types/order';
import { Product } from '../../../types/product';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useVisitor } from '../../../contexts/VisitorContext';
import { calculateOrderStats } from '../../../utils/orderStats';

interface DashboardStatsProps {
  orders: Order[];
  products: Product[];
}

export function DashboardStats({ orders, products }: DashboardStatsProps) {
  const { t } = useLanguage();
  const { visitorCount } = useVisitor();
  
  const stats = calculateOrderStats(orders);
  const activeProducts = products.length;
  const totalCustomers = new Set(orders.map(order => order.customerPhone)).size;
  const averageOrderValue = orders.length > 0 
    ? Math.round(stats.total / orders.length) 
    : 0;

  const statCards = [
    {
      title: 'Total Revenue',
      value: `${stats.total.toLocaleString()} FCFA`,
      icon: DollarSign,
      color: 'bg-green-500',
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Visiteurs',
      value: visitorCount.toLocaleString(),
      icon: Eye,
      color: 'bg-blue-500',
      trend: '+5.2%',
      trendUp: true
    },
    {
      title: 'Active Products',
      value: activeProducts,
      icon: Package,
      color: 'bg-purple-500',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Total Orders',
      value: orders.length,
      icon: ShoppingBag,
      color: 'bg-orange-500',
      trend: '+18.7%',
      trendUp: true
    },
    {
      title: 'Total Customers',
      value: totalCustomers,
      icon: Users,
      color: 'bg-indigo-500',
      trend: '+5.9%',
      trendUp: true
    },
    {
      title: 'Average Order Value',
      value: `${averageOrderValue.toLocaleString()} FCFA`,
      icon: TrendingUp,
      color: 'bg-teal-500',
      trend: '+7.4%',
      trendUp: true
    },
    {
      title: 'Pending Orders',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-500',
      trend: '-2.3%',
      trendUp: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className={`flex items-center ${
                  stat.trendUp ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="text-sm font-medium">{stat.trend}</span>
                  <TrendingUp className={`w-4 h-4 ml-1 ${
                    stat.trendUp ? '' : 'transform rotate-180'
                  }`} />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3">
              <div className="flex items-center">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${stat.color} rounded-full`}
                    style={{ width: '70%' }}
                  />
                </div>
                <span className="ml-3 text-sm text-gray-600">70%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}