import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../../contexts/LanguageContext';

interface RevenueData {
  date: string;
  revenue: number;
  deliveredRevenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">{t('admin.charts.revenueOverTime')}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDeliveredRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => `${value.toLocaleString()} FCFA`}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name={t('admin.charts.totalRevenue')}
              stroke="#4F46E5"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="deliveredRevenue"
              name={t('admin.charts.deliveredRevenue')}
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorDeliveredRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}