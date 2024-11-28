import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
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
    date: "2024-03-15",
    translations: {
      en: { review: "Absolutely love this product! The quality is outstanding, and it exceeded all my expectations." },
      fr: { review: "J'adore ce produit ! La qualité est exceptionnelle et il a dépassé toutes mes attentes." }
    }
  },
  {
    id: 2,
    name: "David Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "2024-03-14",
    translations: {
      en: { review: "Fast shipping and beautiful packaging. The product works perfectly!" },
      fr: { review: "Livraison rapide et bel emballage. Le produit fonctionne parfaitement !" }
    }
  },
  {
    id: 3,
    name: "Emma Thompson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "2024-03-13",
    translations: {
      en: { review: "Great value for money. Would definitely recommend to others." },
      fr: { review: "Excellent rapport qualité-prix. Je recommande vivement aux autres." }
    }
  },
  {
    id: 4,
    name: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 4,
    date: "2024-03-12",
    translations: {
      en: { review: "Very satisfied with my purchase. The customer service was excellent." },
      fr: { review: "Très satisfait de mon achat. Le service client était excellent." }
    }
  },
  {
    id: 5,
    name: "Sophie Martin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "2024-03-11",
    translations: {
      en: { review: "Perfect addition to my collection. The quality is amazing!" },
      fr: { review: "Parfait ajout à ma collection. La qualité est incroyable !" }
    }
  },
  {
    id: 6,
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "2024-03-10",
    translations: {
      en: { review: "Exactly what I was looking for. The design is sleek and modern." },
      fr: { review: "Exactement ce que je cherchais. Le design est élégant et moderne." }
    }
  },
  {
    id: 7,
    name: "Lisa Anderson",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 4,
    date: "2024-03-09",
    translations: {
      en: { review: "Great product with excellent features. Very happy with my purchase." },
      fr: { review: "Excellent produit avec d'excellentes fonctionnalités. Très content de mon achat." }
    }
  },
  {
    id: 8,
    name: "Robert Taylor",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "2024-03-08",
    translations: {
      en: { review: "Impressive quality and fast delivery. Will buy again!" },
      fr: { review: "Qualité impressionnante et livraison rapide. J'achèterai à nouveau !" }
    }
  },
  {
    id: 9,
    name: "Marie Dubois",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "2024-03-07",
    translations: {
      en: { review: "Outstanding product and exceptional customer service. Highly recommended!" },
      fr: { review: "Produit exceptionnel et service client remarquable. Fortement recommandé !" }
    }
  }
];

export function ProductReviews() {
  const { language } = useLanguage();
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
            <div className="flex gap-1 justify-center my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">{reviews.length} reviews</div>
          </div>
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter((r) => r.rating === rating).length;
              const percentage = (count / reviews.length) * 100;
              return (
                <div key={rating} className="flex items-center gap-2">
                  <div className="text-sm text-gray-600 w-6">{rating}</div>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 w-10">{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{review.name}</h3>
                  <time className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </time>
                </div>
                <div className="flex gap-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mt-2">
                  {review.translations[language].review}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}