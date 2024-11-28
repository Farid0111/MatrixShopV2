import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { useLanguage } from '../contexts/LanguageContext';
import { usePrice } from '../contexts/PriceContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { t, language } = useLanguage();
  const { getDiscountedPrice, calculateDiscount, formatPrice } = usePrice();
  
  const currentPrice = getDiscountedPrice(product);
  const discount = calculateDiscount(product.originalPrice, currentPrice);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.translations[language].name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            {product.translations[language].name}
          </h3>
        </Link>
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">
          {product.translations[language].description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-blue-600">{formatPrice(currentPrice)}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
              <span className="text-sm font-semibold text-green-600">-{discount}%</span>
            </div>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart size={20} />
            {t('product.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}