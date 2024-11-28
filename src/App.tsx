import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Product } from './types/product';
import { Cart } from './components/Cart';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { PriceProvider } from './contexts/PriceContext';
import { AuthProvider } from './contexts/AuthContext';
import { VisitorProvider } from './contexts/VisitorContext';
import { ProtectedRoute } from './components/admin/auth/ProtectedRoute';
import { NotificationManager } from './components/notifications/NotificationManager';

function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <PriceProvider>
          <VisitorProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gray-100 flex flex-col">
                <Header
                  cartItemsCount={cartItems.length}
                  onCartClick={() => setIsCartOpen(!isCartOpen)}
                />
                
                <main className="flex-grow relative">
                  <Routes>
                    <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
                    <Route path="/shop" element={<ShopPage onAddToCart={addToCart} />} />
                    <Route path="/product/:id" element={<ProductPage onAddToCart={addToCart} />} />
                    <Route path="/matrix-admin-login" element={<LoginPage />} />
                    <Route path="/admin" element={
                      <ProtectedRoute>
                        <AdminPage />
                      </ProtectedRoute>
                    } />
                  </Routes>

                  {isCartOpen && (
                    <div className="fixed top-20 right-4 w-96 z-50">
                      <Cart items={cartItems} onRemoveFromCart={removeFromCart} />
                    </div>
                  )}

                  <NotificationManager />
                </main>

                <Footer />
              </div>
            </BrowserRouter>
          </VisitorProvider>
        </PriceProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;