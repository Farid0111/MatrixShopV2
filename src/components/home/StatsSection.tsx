import React from 'react';
import { ShoppingBag, Truck, Shield, Clock } from 'lucide-react';

const stats = [
  { 
    icon: ShoppingBag, 
    label: 'Produits', 
    value: '1000+',
    gradient: 'from-blue-500 to-blue-600'
  },
  { 
    icon: Truck, 
    label: 'Livraisons', 
    value: '24/7',
    gradient: 'from-purple-500 to-purple-600'
  },
  { 
    icon: Shield, 
    label: 'Garantie', 
    value: '100%',
    gradient: 'from-pink-500 to-pink-600'
  },
  { 
    icon: Clock, 
    label: 'Support', 
    value: '24/7',
    gradient: 'from-indigo-500 to-indigo-600'
  },
];

export function StatsSection() {
  return (
    <div className="relative overflow-hidden bg-white py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200">
            Découvrez ce qui fait notre différence et pourquoi des milliers de clients nous font confiance.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
              <div className="relative bg-white rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${stat.gradient} text-white mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={32} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}