import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Star, Shield } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundImage: string;
}

export function HeroSection({ title, subtitle, ctaText, backgroundImage }: HeroSectionProps) {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
          style={{
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
          }}
        />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        
        {/* Animated Shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6 animate-fade-in">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            </div>
            <span className="text-white/90">+1000 avis clients satisfaits</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
            {title}
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl animate-fade-in animation-delay-200">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start animate-fade-in animation-delay-400">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {ctaText}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="w-5 h-5" />
                <span>Garantie satisfait ou remboursé</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 relative animate-fade-in animation-delay-600">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src={backgroundImage}
              alt="Hero"
              className="relative rounded-3xl shadow-2xl transform transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
          </div>
          
          {/* Floating badges */}
          <div className="absolute -right-4 top-1/4 transform translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float">
            <div className="text-sm font-semibold text-gray-900">Livraison gratuite</div>
          </div>
          <div className="absolute -left-4 bottom-1/4 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-float animation-delay-1000">
            <div className="text-sm font-semibold text-gray-900">Support 24/7</div>
          </div>
        </div>
      </div>
    </div>
  );
}