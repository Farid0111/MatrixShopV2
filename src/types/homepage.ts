export interface HeroSection {
  title: {
    en: string;
    fr: string;
  };
  subtitle: {
    en: string;
    fr: string;
  };
  backgroundImage: string;
  ctaText: {
    en: string;
    fr: string;
  };
}

export interface FeaturedSection {
  title: {
    en: string;
    fr: string;
  };
  subtitle: {
    en: string;
    fr: string;
  };
  productIds: string[];
}

export interface ReviewsSection {
  title: {
    en: string;
    fr: string;
  };
  subtitle: {
    en: string;
    fr: string;
  };
}

export interface HomepageContent {
  id?: string;
  hero: HeroSection;
  featured: FeaturedSection;
  reviews: ReviewsSection;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}