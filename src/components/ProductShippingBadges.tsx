import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Truck, ShieldCheck, Banknote } from 'lucide-react';

export function ProductShippingBadges() {
  const { t } = useLanguage();

  const badges = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: t('shipping.freeDelivery'),
      description: t('shipping.freeDeliveryDesc'),
      gradient: 'from-orange-500 to-rose-500'
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: t('shipping.guarantee'),
      description: t('shipping.guaranteeDesc'),
      gradient: 'from-blue-500 to-violet-500'
    },
    {
      icon: <Banknote className="w-8 h-8" />,
      title: t('shipping.cashOnDelivery'),
      description: t('shipping.cashOnDeliveryDesc'),
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {badges.map((badge, index) => (
        <div
          key={index}
          className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${badge.gradient} p-4`}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -left-4 -top-4 w-20 h-20 bg-white rounded-full blur-2xl animate-pulse" 
                 style={{ animationDuration: '3s' }} />
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white rounded-full blur-2xl animate-pulse" 
                 style={{ animationDuration: '4s' }} />
          </div>

          <div className="relative flex items-center gap-4">
            {/* Icon container */}
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm shadow-lg">
              <div className="text-white">
                {badge.icon}
              </div>
            </div>

            {/* Text content */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                {badge.title}
              </h3>
              <p className="text-sm text-white/90">
                {badge.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}