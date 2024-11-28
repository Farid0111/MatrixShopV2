import React, { useState } from 'react';
import { Plus, Loader } from 'lucide-react';
import { addProduct, NewProduct } from '../services/productService';
import { useLanguage } from '../contexts/LanguageContext';

export function AddProductForm() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
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
    } else if (name === 'image') {
      setFormData(prev => ({
        ...prev,
        image: value
      }));
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
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addProduct(formData);
      setSuccess(true);
      setFormData({
        translations: {
          en: { name: '', description: '' },
          fr: { name: '', description: '' }
        },
        price: 0,
        originalPrice: 0,
        image: '',
        features: ['']
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        {/* French Product Information */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Informations en Français</h3>
          <div className="space-y-4">
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
        </div>

        {/* English Product Information */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">English Information</h3>
          <div className="space-y-4">
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

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            URL de l'image
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
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
                    className="px-2 py-1 text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="text-green-600 text-sm">
          Produit ajouté avec succès !
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
            Ajout en cours...
          </>
        ) : (
          'Ajouter le produit'
        )}
      </button>
    </form>
  );
}