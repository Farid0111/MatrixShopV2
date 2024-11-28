export interface ProductTranslation {
  name: string;
  description: string;
}

export interface Product {
  id: string;
  price: number;
  originalPrice: number;
  image: string;
  features: string[];
  translations: {
    en: ProductTranslation;
    fr: ProductTranslation;
  };
  createdAt?: Date;
  updatedAt?: Date;
}