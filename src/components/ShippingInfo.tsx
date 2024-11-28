import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function ShippingInfo() {
  const { t } = useLanguage();

  const shippingFeatures = [
    {
      image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=500&q=80",
      title: t('shipping.freeDelivery'),
      description: t('shipping.freeDeliveryDesc')
    },
    {
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=500&q=80",
      title: t('shipping.securePackaging'),
      description: t('shipping.securePackagingDesc')
    },
    {
      image: "https://images.unsplash.com/photo-1568226940395-0d160c6c8359?auto=format&fit=crop&w=500&q=80",
      title: t('shipping.fastDelivery'),
      description: t('shipping.fastDeliveryDesc')
    },
    {
      image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=500&q=80",
      title: t('shipping.guarantee'),
      description: t('shipping.guaranteeDesc')
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {shippingFeatures.map((feature, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-105"
        >
          <div className="aspect-video relative">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-200 opacity-90">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}