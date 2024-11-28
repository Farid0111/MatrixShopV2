import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { AdminLayout } from '../components/admin/layout/AdminLayout';
import { Dashboard } from '../components/admin/dashboard/Dashboard';
import { ProductFormNew } from '../components/ProductFormNew';
import { ProductList } from '../components/ProductList';
import { OrderList } from '../components/admin/OrderList';
import { OrderStats } from '../components/admin/OrderStats';
import { HomepageForm } from '../components/admin/homepage/HomepageForm';
import { HomepageList } from '../components/admin/homepage/HomepageList';
import { Settings } from '../components/admin/settings/Settings';
import { NewProduct, addProduct, updateProduct, deleteProduct, getProducts } from '../services/productService';
import { getOrders, updateOrderStatus, deleteOrder } from '../services/orderService';
import { getAllHomepages, createHomepage, updateHomepage } from '../services/homepageService';
import { Product } from '../types/product';
import { Order, OrderStatus } from '../types/order';
import { HomepageContent } from '../types/homepage';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [homepages, setHomepages] = useState<HomepageContent[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<NewProduct | null>(null);
  const [selectedHomepage, setSelectedHomepage] = useState<HomepageContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isHomepageFormVisible, setIsHomepageFormVisible] = useState(false);

  useEffect(() => {
    loadProducts();
    loadOrders();
    loadHomepages();
  }, []);

  const loadProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const loadHomepages = async () => {
    try {
      const fetchedHomepages = await getAllHomepages();
      setHomepages(fetchedHomepages);
    } catch (error) {
      console.error('Error loading homepages:', error);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddProduct = async (productData: NewProduct) => {
    setIsLoading(true);
    try {
      await addProduct(productData);
      await loadProducts();
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (productData: NewProduct) => {
    if (!selectedProduct) return;
    
    setIsLoading(true);
    try {
      await updateProduct(selectedProduct.id as string, productData);
      await loadProducts();
      setSelectedProduct(null);
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteProduct(productId);
      await loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, status);
      await loadOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      await deleteOrder(orderId);
      await loadOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleAddHomepage = async (homepageData: Omit<HomepageContent, 'id'>) => {
    setIsLoading(true);
    try {
      await createHomepage(homepageData);
      await loadHomepages();
      setIsHomepageFormVisible(false);
    } catch (error) {
      console.error('Error adding homepage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateHomepage = async (homepageData: Omit<HomepageContent, 'id'>) => {
    if (!selectedHomepage?.id) return;
    
    setIsLoading(true);
    try {
      await updateHomepage(selectedHomepage.id, homepageData);
      await loadHomepages();
      setSelectedHomepage(null);
      setIsHomepageFormVisible(false);
    } catch (error) {
      console.error('Error updating homepage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivateHomepage = async (homepage: HomepageContent) => {
    if (!homepage.id) return;
    
    try {
      await updateHomepage(homepage.id, { ...homepage, isActive: true });
      await loadHomepages();
    } catch (error) {
      console.error('Error activating homepage:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard orders={orders} products={products} />;
      case 'products':
        return (
          <>
            {isFormVisible && (
              <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6">
                  {selectedProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <ProductFormNew
                  initialData={selectedProduct || undefined}
                  onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
                  isLoading={isLoading}
                />
              </div>
            )}
            <ProductList
              products={products}
              onEdit={(product) => {
                setSelectedProduct(product);
                setIsFormVisible(true);
              }}
              onDelete={handleDeleteProduct}
            />
          </>
        );
      case 'orders':
        return (
          <>
            <OrderStats orders={orders} />
            <OrderList
              orders={orders}
              onUpdateStatus={handleUpdateOrderStatus}
              onDelete={handleDeleteOrder}
            />
          </>
        );
      case 'homepage':
        return (
          <>
            {isHomepageFormVisible && (
              <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6">
                  {selectedHomepage ? 'Edit Homepage' : 'Add Homepage'}
                </h2>
                <HomepageForm
                  initialData={selectedHomepage || undefined}
                  onSubmit={selectedHomepage ? handleUpdateHomepage : handleAddHomepage}
                  isLoading={isLoading}
                />
              </div>
            )}
            <HomepageList
              homepages={homepages}
              onEdit={(homepage) => {
                setSelectedHomepage(homepage);
                setIsHomepageFormVisible(true);
              }}
              onActivate={handleActivateHomepage}
            />
          </>
        );
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h1>
        {activeTab === 'products' && (
          <button
            onClick={() => {
              setSelectedProduct(null);
              setIsFormVisible(!isFormVisible);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={20} className="mr-2" />
            Add Product
          </button>
        )}
        {activeTab === 'homepage' && (
          <button
            onClick={() => {
              setSelectedHomepage(null);
              setIsHomepageFormVisible(!isHomepageFormVisible);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={20} className="mr-2" />
            Add Homepage
          </button>
        )}
      </div>
      {renderContent()}
    </AdminLayout>
  );
}