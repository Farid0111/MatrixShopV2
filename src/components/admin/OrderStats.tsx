import React from 'react';
import { Package, Truck, CheckCircle, XCircle, Clock, TrendingUp, DollarSign } from 'lucide-react';
import { Order } from '../../types/order';
import { useLanguage } from '../../contexts/LanguageContext';
import { StatCard } from './stats/StatCard';
import { RevenueChart } from './stats/RevenueChart';
import { StatusChart } from './stats/StatusChart';
import { calculateOrderStats, prepareRevenueData, prepareStatusData } from '../../utils/orderStats';

interface OrderStatsProps {
  orders: Order[];
}

export function OrderStats({ orders }: OrderStatsProps) {
  const { t } = useLanguage();
  
  const stats = calculateOrderStats(orders);
  const revenueData = prepareRevenueData(orders);
  const statusData = prepareStatusData(stats, (status) => t(`admin.status.${status}`));

  const statCards = [
    {
      icon: Clock,
      title: t('admin.stats.pending'),
      value: stats.pending,
      gradient: 'from-yellow-400 to-yellow-500'
    },
    {
      icon: Package,
      title: t('admin.stats.processing'),
      value: stats.processing,
      gradient: 'from-blue-400 to-blue-500'
    },
    {
      icon: Truck,
      title: t('admin.stats.shipped'),
      value: stats.shipped,
      gradient: 'from-purple-400 to-purple-500'
    },
    {
      icon: CheckCircle,
      title: t('admin.stats.delivered'),
      value: stats.delivered,
      gradient: 'from-green-400 to-green-500'
    },
    {
      icon: XCircle,
      title: t('admin.stats.cancelled'),
      value: stats.cancelled,
      gradient: 'from-red-400 to-red-500'
    },
    {
      icon: TrendingUp,
      title: t('admin.stats.totalRevenue'),
      value: `${stats.total.toLocaleString()} FCFA`,
      gradient: 'from-gray-700 to-gray-800'
    },
    {
      icon: DollarSign,
      title: t('admin.stats.deliveredRevenue'),
      value: `${stats.deliveredRevenue.toLocaleString()} FCFA`,
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <StatusChart data={statusData} />
      </div>
    </div>
  );
}