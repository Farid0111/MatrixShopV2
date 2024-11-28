import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../types/product';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.translations[language].name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {product.translations[language].name}
            </h3>
            <p className="text-gray-600 mt-2 text-sm line-clamp-2">
              {product.translations[language].description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-blue-600">
                  {product.price.toLocaleString()} FCFA
                </span>
                {product.originalPrice > product.price && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()} FCFA
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(product)}
                  className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-2 text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}