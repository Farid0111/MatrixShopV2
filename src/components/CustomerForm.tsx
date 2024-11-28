import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone, ShoppingBag } from 'lucide-react';
import { createOrder } from '../services/orderService';
import { Product } from '../types/product';

interface CustomerFormData {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void;
  product: Product;
}

export function CustomerForm({ onSubmit, product }: CustomerFormProps) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<CustomerFormData>({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const orderData = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerAddress: formData.customerAddress,
        products: [{
          id: product.id,
          name: product.translations[language].name,
          price: product.price,
          quantity: 1
        }],
        totalAmount: product.price
      };

      await createOrder(orderData);
      onSubmit(formData);
    } catch (error) {
      setSubmitError(t('form.submitError'));
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('form.customerInfo')}
      </h3>

      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.fullName')}
        </label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder={t('form.fullNamePlaceholder')}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.phone')}
        </label>
        <input
          type="tel"
          id="customerPhone"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder={t('form.phonePlaceholder')}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.address')}
        </label>
        <textarea
          id="customerAddress"
          name="customerAddress"
          value={formData.customerAddress}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder={t('form.addressPlaceholder')}
          disabled={isSubmitting}
        />
      </div>

      {submitError && (
        <div className="text-red-600 text-sm">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gradient-to-r from-orange-600 to-rose-600 text-white px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 font-semibold text-lg shadow-lg hover:shadow-xl ${
          isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-orange-700 hover:to-rose-700'
        }`}
      >
        <ShoppingBag className="w-6 h-6" />
        {isSubmitting ? t('form.submitting') : t('form.submit')}
      </button>

      {/* Delivery call message */}
      <div className="flex items-center justify-center gap-2 text-gray-600 pt-2">
        <Phone size={16} className="text-orange-600" />
        <p className="text-sm">Nous allons vous appeler pour vous livrer</p>
      </div>
    </form>
  );
}