import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { VisitorCounter } from './VisitorCounter';

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Matrix Shop</h3>
            <p className="text-sm">
              {t('hero.subtitle')}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
            <div className="mt-4">
              <VisitorCounter />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">{t('nav.shop')}</Link>
              </li>
              <li>
                <Link to="/matrix-admin-login" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Lock size={16} />
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t('footer.customerService')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="hover:text-white transition-colors">{t('product.shipping')}</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@matrixshop.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>123 Matrix Street, Digital City, 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Matrix Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}