import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number | string;
  gradient: string;
}

export function StatCard({ icon: Icon, title, value, gradient }: StatCardProps) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-lg p-4 text-white shadow-lg`}>
      <div className="flex items-center">
        <Icon className="w-8 h-8" />
        <div className="ml-4">
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}