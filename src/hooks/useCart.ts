import { useState, useCallback } from 'react';
import { Product } from '../types/product';

export function useCart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => [...prev, product]);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  return {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    toggleCart
  };
}