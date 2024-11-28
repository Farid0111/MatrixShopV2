import React, { useState, useEffect } from 'react';
import { Upload, Loader, Plus, Minus, Camera, Type, DollarSign, ListPlus } from 'lucide-react';
import { NewProduct, uploadProductImage } from '../services/productService';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductFormProps {
  initialData?: NewProduct;
  onSubmit: (data: NewProduct) => Promise<void>;
  isLoading: boolean;
}

export function ProductFormNew({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<NewProduct>({
    translations: {
      en: { name: '', description: '' },
      fr: { name: '', description: '' }
    },
    price: 0,
    originalPrice: 0,
    image: '',
    features: ['']
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPreviewUrl(initialData.image);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    language?: 'en' | 'fr',
    field?: 'name' | 'description'
  ) => {
    const { name, value } = e.target;

    if (language && field) {
      setFormData(prev => ({
        ...prev,
        translations: {
          ...prev.translations,
          [language]: {
            ...prev.translations[language],
            [field]: value
          }
        }
      }));
    } else if (name === 'price' || name === 'originalPrice') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? value : feature
      )
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile);
      }

      await onSubmit({
        ...formData,
        image: imageUrl
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Image Upload Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Camera className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Image du produit</h3>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group">
            {previewUrl ? (
              <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center bg-white">
                <Upload className="w-8 h-8 text-blue-300" />
              </div>
            )}
            <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Changer
              </div>
            </label>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">
              Formats acceptés: JPG, PNG. Taille maximale: 5MB
            </p>
            <p className="text-sm text-gray-600">
              Résolution recommandée: 1000x1000px
            </p>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
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
                  Nom du produit
                </label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.translations.fr.name}
                    onChange={(e) => handleChange(e, 'fr', 'name')}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Entrez le nom du produit"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.translations.fr.description}
                  onChange={(e) => handleChange(e, 'fr', 'description')}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  rows={4}
                  placeholder="Décrivez votre produit..."
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
                  Product Name
                </label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.translations.en.name}
                    onChange={(e) => handleChange(e, 'en', 'name')}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter product name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.translations.en.description}
                  onChange={(e) => handleChange(e, 'en', 'description')}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  rows={4}
                  placeholder="Describe your product..."
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Information */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Prix</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix de vente (FCFA)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                required
                min="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix original (FCFA)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                required
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ListPlus className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Caractéristiques</h3>
          </div>
          <button
            type="button"
            onClick={addFeature}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-purple-600 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Plus size={16} className="mr-2" />
            Ajouter
          </button>
        </div>
        <div className="space-y-3">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                placeholder="Caractéristique du produit"
                required
              />
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Minus size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
      >
        {isLoading ? (
          <>
            <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
            Traitement en cours...
          </>
        ) : (
          'Enregistrer le produit'
        )}
      </button>
    </form>
  );
}