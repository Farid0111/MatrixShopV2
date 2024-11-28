export const formatPrice = (price: number): string => {
  return `${price.toLocaleString()} FCFA`;
};

export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};