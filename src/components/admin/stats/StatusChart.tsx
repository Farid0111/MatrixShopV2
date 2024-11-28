import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../../contexts/LanguageContext';

interface StatusData {
  name: string;
  value: number;
}

interface StatusChartProps {
  data: StatusData[];
}

export function StatusChart({ data }: StatusChartProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">{t('admin.charts.orderStatus')}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}