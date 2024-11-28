import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.admin': 'Admin',
    
    'admin.products': 'Products',
    'admin.orders': 'Orders',
    'admin.addProduct': 'Add Product',
    'admin.editProduct': 'Edit Product',
    'admin.deleteConfirm': 'Are you sure you want to delete this item?',
    
    'admin.order.id': 'Order ID',
    'admin.order.customer': 'Customer',
    'admin.order.contact': 'Contact',
    'admin.order.address': 'Address',
    'admin.order.total': 'Total',
    'admin.order.status': 'Status',
    'admin.order.date': 'Date',
    'admin.order.actions': 'Actions',
    
    'admin.status.pending': 'Pending',
    'admin.status.processing': 'Processing',
    'admin.status.shipped': 'Shipped',
    'admin.status.delivered': 'Delivered',
    'admin.status.cancelled': 'Cancelled',
    
    'admin.stats.pending': 'Pending Orders',
    'admin.stats.processing': 'Processing Orders',
    'admin.stats.shipped': 'Shipped Orders',
    'admin.stats.delivered': 'Delivered Orders',
    'admin.stats.cancelled': 'Cancelled Orders',
    'admin.stats.totalRevenue': 'Total Revenue',
    'admin.stats.deliveredRevenue': 'Delivered Revenue',
    
    'admin.charts.revenueOverTime': 'Revenue Over Time',
    'admin.charts.orderStatus': 'Order Status Distribution',
    'admin.charts.totalRevenue': 'Total Revenue',
    'admin.charts.deliveredRevenue': 'Delivered Revenue',

    'product.shipping': 'Shipping Information',
    'shipping.freeDelivery': 'Free Delivery',
    'shipping.freeDeliveryDesc': 'Free delivery for all orders',
    'shipping.guarantee': 'Money-back Guarantee',
    'shipping.guaranteeDesc': '30-day money-back guarantee',
    'shipping.cashOnDelivery': 'Cash on Delivery',
    'shipping.cashOnDeliveryDesc': 'Pay when you receive your order',
    'shipping.securePackaging': 'Secure Packaging',
    'shipping.securePackagingDesc': 'Your items are carefully packaged',
    'shipping.fastDelivery': 'Fast Delivery',
    'shipping.fastDeliveryDesc': 'Quick delivery to your doorstep'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.shop': 'Boutique',
    'nav.admin': 'Administration',
    
    'admin.products': 'Produits',
    'admin.orders': 'Commandes',
    'admin.addProduct': 'Ajouter un produit',
    'admin.editProduct': 'Modifier le produit',
    'admin.deleteConfirm': 'Êtes-vous sûr de vouloir supprimer cet élément ?',
    
    'admin.order.id': 'ID Commande',
    'admin.order.customer': 'Client',
    'admin.order.contact': 'Contact',
    'admin.order.address': 'Adresse',
    'admin.order.total': 'Total',
    'admin.order.status': 'Statut',
    'admin.order.date': 'Date',
    'admin.order.actions': 'Actions',
    
    'admin.status.pending': 'En attente',
    'admin.status.processing': 'En traitement',
    'admin.status.shipped': 'Expédié',
    'admin.status.delivered': 'Livré',
    'admin.status.cancelled': 'Annulé',
    
    'admin.stats.pending': 'Commandes en attente',
    'admin.stats.processing': 'Commandes en traitement',
    'admin.stats.shipped': 'Commandes expédiées',
    'admin.stats.delivered': 'Commandes livrées',
    'admin.stats.cancelled': 'Commandes annulées',
    'admin.stats.totalRevenue': 'Revenu total',
    'admin.stats.deliveredRevenue': 'Revenu après livraison',
    
    'admin.charts.revenueOverTime': 'Évolution des revenus',
    'admin.charts.orderStatus': 'Distribution des statuts',
    'admin.charts.totalRevenue': 'Revenu total',
    'admin.charts.deliveredRevenue': 'Revenu après livraison',

    'product.shipping': 'Informations de livraison',
    'shipping.freeDelivery': 'Livraison gratuite',
    'shipping.freeDeliveryDesc': 'Livraison gratuite pour toutes les commandes',
    'shipping.guarantee': 'Garantie satisfait ou remboursé',
    'shipping.guaranteeDesc': 'Garantie de remboursement de 30 jours',
    'shipping.cashOnDelivery': 'Paiement à la livraison',
    'shipping.cashOnDeliveryDesc': 'Payez à la réception de votre commande',
    'shipping.securePackaging': 'Emballage sécurisé',
    'shipping.securePackagingDesc': 'Vos articles sont soigneusement emballés',
    'shipping.fastDelivery': 'Livraison rapide',
    'shipping.fastDeliveryDesc': 'Livraison rapide à votre porte'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}