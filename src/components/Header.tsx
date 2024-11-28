import React from 'react';
import { ShoppingCart, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <div className="p-2 bg-orange-600 rounded-lg">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Matrix</span>
          <span className="text-gray-900">Shop</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">{t('nav.home')}</Link>
          <Link to="/shop" className="text-gray-600 hover:text-gray-900">{t('nav.shop')}</Link>
          <LanguageSwitcher />
          <button
            onClick={onCartClick}
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <ShoppingCart size={24} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}