import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '../types/product';

interface PriceContextType {
  getDiscountedPrice: (product: Product) => number;
  calculateDiscount: (originalPrice: number, currentPrice: number) => number;
  formatPrice: (price: number) => string;
  applyPromoCode: (code: string) => void;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export function PriceProvider({ children }: { children: React.ReactNode }) {
  const [promoDiscount, setPromoDiscount] = useState(0);

  const getDiscountedPrice = useCallback((product: Product) => {
    const basePrice = product.price;
    return Math.round(basePrice * (1 - promoDiscount));
  }, [promoDiscount]);

  const calculateDiscount = useCallback((originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }, []);

  const formatPrice = useCallback((price: number) => {
    return `${price.toLocaleString()} FCFA`;
  }, []);

  const applyPromoCode = useCallback((code: string) => {
    // Example promo codes
    const promoCodes = {
      'WELCOME10': 0.1,
      'SPECIAL20': 0.2,
      'VIP30': 0.3
    };

    const discount = promoCodes[code as keyof typeof promoCodes] || 0;
    setPromoDiscount(discount);
  }, []);

  return (
    <PriceContext.Provider value={{
      getDiscountedPrice,
      calculateDiscount,
      formatPrice,
      applyPromoCode
    }}>
      {children}
    </PriceContext.Provider>
  );
}

export function usePrice() {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error('usePrice must be used within a PriceProvider');
  }
  return context;
}