import React from 'react';
import { Terminal, Settings, LogOut } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function AdminHeader() {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Matrix Shop Admin</h1>
            <p className="text-sm text-gray-500">Manage your store</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}