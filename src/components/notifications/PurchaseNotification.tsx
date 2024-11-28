import React, { useEffect, useState } from 'react';
import { ShoppingBag, X, MapPin, Clock } from 'lucide-react';

interface PurchaseNotificationProps {
  onClose: () => void;
}

const randomNames = [
  'Akim', 'Kofi', 'Abiba', 'Malik', 'Amina', 'Koffi', 'Aminata', 'Sékou',
  'Fatima', 'Ibrahim', 'Aisha', 'Moussa', 'Mariam', 'Yacouba', 'Kadiatou', 'Omar'
];

const randomProducts = [
  'Smartphone', 'Écouteurs sans fil', 'Montre connectée', 'Tablette',
  'Ordinateur portable', 'Casque audio', 'Enceinte bluetooth', 'Caméra'
];

const randomCities = [
  'Cotonou', 'Porto-Novo', 'Parakou', 'Abomey-Calavi', 'Bohicon',
  'Natitingou', 'Djougou', 'Ouidah', 'Lokossa', 'Abomey'
];

const randomDistricts = [
  'Akpakpa', 'Cadjèhoun', 'Gbégamey', 'Houéyiho', 'Jéricho',
  'Agla', 'Fidjrossè', 'Godomey', 'Zogbo', 'Tokplégbé'
];

const randomPrices = [
  299000, 399000, 499000, 599000, 699000, 799000, 899000, 999000
];

export function PurchaseNotification({ onClose }: PurchaseNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const closeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const name = randomNames[Math.floor(Math.random() * randomNames.length)];
  const product = randomProducts[Math.floor(Math.random() * randomProducts.length)];
  const city = randomCities[Math.floor(Math.random() * randomCities.length)];
  const district = randomDistricts[Math.floor(Math.random() * randomDistricts.length)];
  const price = randomPrices[Math.floor(Math.random() * randomPrices.length)];
  const timeAgo = Math.floor(Math.random() * 5) + 1;

  return (
    <div
      className={`fixed bottom-4 right-4 transform transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="relative group">
        {/* Glowing background effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        
        {/* Main notification content */}
        <div className="relative bg-white rounded-lg shadow-xl p-4 transform transition-all duration-300 group-hover:scale-[1.02]">
          <div className="flex items-start gap-4">
            {/* Icon with animated gradient background */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                <div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-gray-900">
                  Nouvelle commande !
                </p>
                <span className="text-sm font-bold text-green-600">
                  {price.toLocaleString()} FCFA
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                {name} a acheté {product}
              </p>

              {/* Location and time info */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{city}, {district}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Il y a {timeAgo} min</span>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="flex-shrink-0 -mt-1 -mr-1 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 rounded-b-lg overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-shrink"
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}