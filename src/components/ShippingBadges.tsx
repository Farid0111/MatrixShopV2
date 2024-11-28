import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Truck, ShieldCheck, Banknote } from 'lucide-react';

export function ShippingBadges() {
  const { t } = useLanguage();

  const badges = [
    {
      icon: <Truck className="w-12 h-12" />,
      title: t('shipping.freeDelivery'),
      description: t('shipping.freeDeliveryDesc'),
      gradient: 'from-orange-500 to-rose-500',
      glowColor: 'group-hover:shadow-orange-500/50'
    },
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: t('shipping.guarantee'),
      description: t('shipping.guaranteeDesc'),
      gradient: 'from-blue-500 to-violet-500',
      glowColor: 'group-hover:shadow-blue-500/50'
    },
    {
      icon: <Banknote className="w-12 h-12" />,
      title: t('shipping.cashOnDelivery'),
      description: t('shipping.cashOnDeliveryDesc'),
      gradient: 'from-emerald-500 to-teal-500',
      glowColor: 'group-hover:shadow-emerald-500/50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {badges.map((badge, index) => (
        <div
          key={index}
          className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${badge.gradient} p-8 transition-all duration-500 hover:scale-105 hover:shadow-xl ${badge.glowColor}`}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse" 
                 style={{ animationDuration: '3s' }} />
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse" 
                 style={{ animationDuration: '4s' }} />
          </div>

          <div className="relative flex flex-col items-center text-center space-y-4">
            {/* Icon container */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <div className="text-white">
                {badge.icon}
              </div>
            </div>

            {/* Text content */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                {badge.title}
              </h3>
              <p className="text-sm text-white/90">
                {badge.description}
              </p>
            </div>

            {/* Decorative line */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}