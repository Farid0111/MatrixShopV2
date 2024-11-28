import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types/product';
import { useLanguage } from '../contexts/LanguageContext';
import { usePrice } from '../contexts/PriceContext';
import { CartItem } from './CartItem';

interface CartProps {
  items: Product[];
  onRemoveFromCart: (productId: number) => void;
}

export function Cart({ items, onRemoveFromCart }: CartProps) {
  const { t } = useLanguage();
  const { getDiscountedPrice, formatPrice } = usePrice();
  
  const total = items.reduce((sum, item) => sum + getDiscountedPrice(item), 0);

  const itemsWithUniqueKeys = items.map((item, index) => ({
    ...item,
    uniqueKey: `${item.id}-${index}`
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag className="text-blue-600" />
        <h2 className="text-lg font-semibold">{t('cart.title')}</h2>
      </div>
      
      {items.length === 0 ? (
        <p className="text-gray-500">{t('cart.empty')}</p>
      ) : (
        <>
          <div className="space-y-3">
            {itemsWithUniqueKeys.map((item) => (
              <CartItem
                key={item.uniqueKey}
                item={item}
                onRemove={onRemoveFromCart}
              />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{t('cart.total')}</span>
              <span className="font-bold text-lg">{formatPrice(total)}</span>
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {t('cart.checkout')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}