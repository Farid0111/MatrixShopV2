import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Product } from '../types/product';
import { CountdownTimer } from '../components/CountdownTimer';
import { CustomerForm } from '../components/CustomerForm';
import { ProductReviews } from '../components/ProductReviews';
import { ProductShippingBadges } from '../components/ProductShippingBadges';
import { useLanguage } from '../contexts/LanguageContext';
import { getProduct } from '../services/productService';

interface ProductPageProps {
  onAddToCart: (product: Product) => void;
}

export function ProductPage({ onAddToCart }: ProductPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        const fetchedProduct = await getProduct(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleCustomerFormSubmit = (data: any) => {
    console.log('Customer data:', data);
    // Handle form submission
  };

  const handleTimerExpire = () => {
    console.log('Timer expired');
    // Handle timer expiration
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-600 py-8">
          {error || 'Product not found'}
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.translations[language].name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.translations[language].name}
            </h1>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-bold text-blue-600">{product.price.toLocaleString()} FCFA</p>
              <p className="text-xl text-gray-500 line-through">{product.originalPrice.toLocaleString()} FCFA</p>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm font-semibold">
                -{discount}%
              </span>
            </div>
          </div>

          {/* Timer */}
          <CountdownTimer initialMinutes={30} onExpire={handleTimerExpire} />

          {/* Customer Form */}
          <div className="border-t border-gray-200 pt-6">
            <CustomerForm onSubmit={handleCustomerFormSubmit} product={product} />
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 py-6">
            <h2 className="text-lg font-semibold mb-2">{t('product.description')}</h2>
            <p className="text-gray-600">{product.translations[language].description}</p>
          </div>

          {/* Features */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold mb-2">{t('product.features')}</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Shipping Badges */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold mb-4">{t('product.shipping')}</h2>
            <ProductShippingBadges />
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
        <ProductReviews />
      </div>
    </div>
  );
}