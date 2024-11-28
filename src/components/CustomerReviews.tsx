import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  translations: {
    en: { review: string };
    fr: { review: string };
  };
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    translations: {
      en: { review: "Absolutely love my new tech accessories! The quality is outstanding, and the customer service was exceptional." },
      fr: { review: "J'adore mes nouveaux accessoires tech ! La qualité est exceptionnelle et le service client était remarquable." }
    }
  },
  {
    id: 2,
    name: "David Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    translations: {
      en: { review: "The products exceeded my expectations. Fast shipping and beautiful packaging. Will definitely order again!" },
      fr: { review: "Les produits ont dépassé mes attentes. Livraison rapide et emballage magnifique. Je recommanderai certainement !" }
    }
  },
  {
    id: 3,
    name: "Emma Thompson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    translations: {
      en: { review: "Incredible selection of products. The quality is top-notch, and the prices are very reasonable." },
      fr: { review: "Sélection incroyable de produits. La qualité est excellente et les prix sont très raisonnables." }
    }
  }
];

export function CustomerReviews() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative">
        <div className="max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Reviews carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full flex-shrink-0 px-12"
                >
                  <div className="text-center">
                    <div className="mb-6">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-20 h-20 rounded-full mx-auto border-4 border-white/20"
                      />
                    </div>
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 fill-current text-yellow-400"
                        />
                      ))}
                    </div>
                    <blockquote className="text-xl text-white mb-4 italic">
                      "{review.translations[language].review}"
                    </blockquote>
                    <p className="text-white/90 font-semibold">{review.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}