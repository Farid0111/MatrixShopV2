import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types/product';
import { getProducts } from '../services/productService';

interface ShopPageProps {
  onAddToCart: (product: Product) => void;
}

export function ShopPage({ onAddToCart }: ShopPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-600 py-8">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}