import React from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/product';

interface FeaturedProductsProps {
  title: string;
  subtitle: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function FeaturedProducts({ title, subtitle, products, onAddToCart }: FeaturedProductsProps) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}