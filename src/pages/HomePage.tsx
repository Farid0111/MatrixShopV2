import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Product } from '../types/product';
import { HomepageContent } from '../types/homepage';
import { useLanguage } from '../contexts/LanguageContext';
import { getProducts } from '../services/productService';
import { getActiveHomepage } from '../services/homepageService';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { ShippingBadges } from '../components/ShippingBadges';
import { CustomerReviews } from '../components/CustomerReviews';
import '../styles/animations.css';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
}

export function HomePage({ onAddToCart }: HomePageProps) {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedProducts, fetchedHomepage] = await Promise.all([
          getProducts(),
          getActiveHomepage()
        ]);
        setProducts(fetchedProducts);
        setHomepage(fetchedHomepage);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    );
  }

  const featuredProducts = homepage?.featured.productIds
    ? products.filter(product => homepage.featured.productIds.includes(product.id))
    : products;

  return (
    <div className="overflow-hidden">
      <HeroSection
        title={homepage?.hero.title[language] || t('hero.title')}
        subtitle={homepage?.hero.subtitle[language] || t('hero.subtitle')}
        ctaText={homepage?.hero.ctaText[language] || t('hero.cta')}
        backgroundImage={homepage?.hero.backgroundImage || "https://images.unsplash.com/photo-1441986300917-64674bd600d8"}
      />

      <StatsSection />

      <FeaturedProducts
        title={homepage?.featured.title[language] || t('featured.title')}
        subtitle={homepage?.featured.subtitle[language] || t('featured.subtitle')}
        products={featuredProducts}
        onAddToCart={onAddToCart}
      />

      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              {t('product.shipping')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200">
              {t('shipping.freeDeliveryDesc')}
            </p>
          </div>
          <ShippingBadges />
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current animate-fade-in" style={{ animationDelay: `${i * 100}ms` }} />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              {homepage?.reviews.title[language] || "Ce que nos clients disent"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200">
              {homepage?.reviews.subtitle[language] || "Découvrez les expériences de nos clients satisfaits"}
            </p>
          </div>
          <CustomerReviews />
        </div>
      </div>
    </div>
  );
}