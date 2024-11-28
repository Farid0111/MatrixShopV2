import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    price: 75000,
    originalPrice: 95000,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    translations: {
      en: {
        name: "Premium Leather Backpack",
        description: "Handcrafted genuine leather backpack with modern design and ample storage"
      },
      fr: {
        name: "Sac à Dos en Cuir Premium",
        description: "Sac à dos en cuir véritable fait main avec un design moderne et un ample espace de rangement"
      }
    }
  },
  {
    id: 2,
    price: 145000,
    originalPrice: 180000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    translations: {
      en: {
        name: "Wireless Noise-Canceling Headphones",
        description: "Premium audio experience with active noise cancellation and 30-hour battery life"
      },
      fr: {
        name: "Casque Sans Fil à Réduction de Bruit",
        description: "Expérience audio premium avec réduction active du bruit et 30 heures d'autonomie"
      }
    }
  },
  {
    id: 3,
    price: 115000,
    originalPrice: 150000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    translations: {
      en: {
        name: "Smart Fitness Watch",
        description: "Track your health and fitness with this advanced smartwatch featuring heart rate monitoring"
      },
      fr: {
        name: "Montre Connectée Fitness",
        description: "Suivez votre santé et votre forme avec cette montre connectée avancée incluant le suivi de la fréquence cardiaque"
      }
    }
  },
  {
    id: 4,
    price: 92000,
    originalPrice: 120000,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    translations: {
      en: {
        name: "Minimalist Ceramic Watch",
        description: "Elegant timepiece with ceramic band and scratch-resistant sapphire crystal"
      },
      fr: {
        name: "Montre Céramique Minimaliste",
        description: "Montre élégante avec bracelet en céramique et verre saphir résistant aux rayures"
      }
    }
  }
];