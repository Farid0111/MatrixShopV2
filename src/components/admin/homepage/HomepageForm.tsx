import React, { useState, useEffect } from 'react';
import { Upload, Loader, Image, Type, ListPlus, Plus, Minus } from 'lucide-react';
import { HomepageContent } from '../../../types/homepage';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Product } from '../../../types/product';
import { getProducts } from '../../../services/productService';

interface HomepageFormProps {
  initialData?: HomepageContent;
  onSubmit: (data: Omit<HomepageContent, 'id'>) => Promise<void>;
  isLoading: boolean;
}

export function HomepageForm({ initialData, onSubmit, isLoading }: HomepageFormProps) {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'fr' | 'en'>('fr');
  const [formData, setFormData] = useState<Omit<HomepageContent, 'id'>>(
    initialData || {
      hero: {
        title: { en: '', fr: '' },
        subtitle: { en: '', fr: '' },
        backgroundImage: '',
        ctaText: { en: '', fr: '' }
      },
      featured: {
        title: { en: '', fr: '' },
        subtitle: { en: '', fr: '' },
        productIds: []
      },
      reviews: {
        title: { en: '', fr: '' },
        subtitle: { en: '', fr: '' }
      },
      isActive: false
    }
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
  }, []);

  const handleChange = (
    section: keyof HomepageContent,
    field: string,
    language: 'en' | 'fr',
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: {
          ...prev[section][field],
          [language]: value
        }
      }
    }));
  };

  const handleProductSelection = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      featured: {
        ...prev.featured,
        productIds: prev.featured.productIds.includes(productId)
          ? prev.featured.productIds.filter(id => id !== productId)
          : [...prev.featured.productIds, productId]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Image className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Section Héro</h3>
        </div>

        {/* Background Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image d'arrière-plan
          </label>
          <input
            type="url"
            placeholder="URL de l'image"
            value={formData.hero.backgroundImage}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              hero: { ...prev.hero, backgroundImage: e.target.value }
            }))}
            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            required
          />
          {formData.hero.backgroundImage && (
            <div className="mt-2 relative rounded-lg overflow-hidden h-40">
              <img
                src={formData.hero.backgroundImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Language Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex border-b">
            <button
              type="button"
              onClick={() => setActiveTab('fr')}
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'fr'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Français
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'en'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              English
            </button>
          </div>

          <div className="p-6">
            {/* French Content */}
            <div className={activeTab === 'fr' ? 'block' : 'hidden'}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre
                  </label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.hero.title.fr}
                      onChange={(e) => handleChange('hero', 'title', 'fr', e.target.value)}
                      className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sous-titre
                  </label>
                  <textarea
                    value={formData.hero.subtitle.fr}
                    onChange={(e) => handleChange('hero', 'subtitle', 'fr', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Texte du bouton
                  </label>
                  <input
                    type="text"
                    value={formData.hero.ctaText.fr}
                    onChange={(e) => handleChange('hero', 'ctaText', 'fr', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* English Content */}
            <div className={activeTab === 'en' ? 'block' : 'hidden'}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.hero.title.en}
                      onChange={(e) => handleChange('hero', 'title', 'en', e.target.value)}
                      className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle
                  </label>
                  <textarea
                    value={formData.hero.subtitle.en}
                    onChange={(e) => handleChange('hero', 'subtitle', 'en', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.hero.ctaText.en}
                    onChange={(e) => handleChange('hero', 'ctaText', 'en', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <ListPlus className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Section Produits Vedettes</h3>
        </div>

        {/* Language Tabs for Featured Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b">
            <button
              type="button"
              onClick={() => setActiveTab('fr')}
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'fr'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Français
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'en'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              English
            </button>
          </div>

          <div className="p-6">
            <div className={activeTab === 'fr' ? 'block' : 'hidden'}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={formData.featured.title.fr}
                    onChange={(e) => handleChange('featured', 'title', 'fr', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sous-titre
                  </label>
                  <textarea
                    value={formData.featured.subtitle.fr}
                    onChange={(e) => handleChange('featured', 'subtitle', 'fr', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>

            <div className={activeTab === 'en' ? 'block' : 'hidden'}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.featured.title.en}
                    onChange={(e) => handleChange('featured', 'title', 'en', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle
                  </label>
                  <textarea
                    value={formData.featured.subtitle.en}
                    onChange={(e) => handleChange('featured', 'subtitle', 'en', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Selection */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Sélection des produits</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map(product => (
              <label
                key={product.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  formData.featured.productIds.includes(product.id)
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.featured.productIds.includes(product.id)}
                  onChange={() => handleProductSelection(product.id)}
                  className="sr-only"
                />
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.translations.fr.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{product.translations.fr.name}</p>
                    <p className="text-sm text-gray-500">{product.price.toLocaleString()} FCFA</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <ListPlus className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Section Avis Clients</h3>
        </div>

        {/* Language Tabs for Reviews Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex border-b">
            <button
              type="button"
              onClick={() => setActiveTab('fr')}
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'fr'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Français
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`flex-1 px-6 py-3 text-sm font-medium ${
                activeTab === 'en'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              English
            </button>
          </div>

          <div className="p-6">
            <div className={activeTab === 'fr' ? 'block' : 'hidden'}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={formData.reviews.title.fr}
                    onChange={(e) => handleChange('reviews', 'title', 'fr', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sous-titre
                  </label>
                  <textarea
                    value={formData.reviews.subtitle.fr}
                    onChange={(e) => handleChange('reviews', 'subtitle', 'fr', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>

            <div className={activeTab === 'en' ? 'block' : 'hidden'}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.reviews.title.en}
                    onChange={(e) => handleChange('reviews', 'title', 'en', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle
                  </label>
                  <textarea
                    value={formData.reviews.subtitle.en}
                    onChange={(e) => handleChange('reviews', 'subtitle', 'en', e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Status */}
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
          Définir comme page d'accueil active
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
      >
        {isLoading ? (
          <>
            <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
            Enregistrement...
          </>
        ) : (
          'Enregistrer la page d\'accueil'
        )}
      </button>
    </form>
  );
}