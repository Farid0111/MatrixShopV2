import React from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={onTabChange} />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}