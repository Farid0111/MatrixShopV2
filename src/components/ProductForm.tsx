import React, { useState, useEffect } from 'react';
import { Upload, Loader, Plus, Minus } from 'lucide-react';
import { NewProduct, uploadProductImage } from '../services/productService';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductFormProps {
  initialData?: NewProduct;
  onSubmit: (data: NewProduct) => Promise<void>;
  isLoading: boolean;
}

export function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Image du produit
        </label>
        <div className="flex items-center space-x-4">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
          <label className="cursor-pointer flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <Upload className="w-6 h-6 text-gray-400" />
          </label>
        </div>
      </div>

      {/* French Product Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informations en Français</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom du produit
          </label>
          <input
            type="text"
            value={formData.translations.fr.name}
            onChange={(e) => handleChange(e, 'fr', 'name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={formData.translations.fr.description}
            onChange={(e) => handleChange(e, 'fr', 'description')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>
      </div>

      {/* English Product Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">English Information</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            value={formData.translations.en.name}
            onChange={(e) => handleChange(e, 'en', 'name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={formData.translations.en.description}
            onChange={(e) => handleChange(e, 'en', 'description')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>
      </div>

      {/* Price Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prix (FCFA)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prix original (FCFA)
          </label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
          />
        </div>
      </div>

      {/* Features */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Caractéristiques
          </label>
          <button
            type="button"
            onClick={addFeature}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={16} className="mr-1" />
            Ajouter
          </button>
        </div>
        <div className="space-y-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Caractéristique du produit"
                required
              />
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Minus size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <>
            <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Traitement en cours...
          </>
        ) : (
          'Enregistrer le produit'
        )}
      </button>
    </form>
  );
}