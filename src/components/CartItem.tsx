import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../types/product';
import { useLanguage } from '../contexts/LanguageContext';

interface CartItemProps {
  item: Product & { uniqueKey: string };
  onRemove: (productId: number) => void;
}

export function CartItem({ item, onRemove }: CartItemProps) {
  const { language } = useLanguage();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src={item.image}
          alt={item.translations[language].name}
          className="w-12 h-12 object-cover rounded"
        />
        <div>
          <p className="font-medium">{item.translations[language].name}</p>
          <p className="text-sm text-gray-600">{item.price.toLocaleString()} FCFA</p>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        <X size={20} />
      </button>
    </div>
  );
}