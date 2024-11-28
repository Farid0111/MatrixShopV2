import React, { useState } from 'react';
import { Bell, Globe, Shield, CreditCard, Mail, Phone, Save, Loader } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface SettingsSection {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

interface GeneralSettings {
  storeName: string;
  storeDescription: string;
  contactEmail: string;
  contactPhone: string;
  defaultLanguage: string;
  currency: string;
}

export function Settings() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    storeName: 'Matrix Shop',
    storeDescription: '',
    contactEmail: '',
    contactPhone: '',
    defaultLanguage: 'en',
    currency: 'fcfa'
  });
  
  const sections: SettingsSection[] = [
    {
      id: 'general',
      icon: Globe,
      title: 'General Settings',
      description: 'Basic store configuration and preferences'
    },
    {
      id: 'notifications',
      icon: Bell,
      title: 'Notifications',
      description: 'Manage email and push notifications'
    },
    {
      id: 'security',
      icon: Shield,
      title: 'Security',
      description: 'Security settings and authentication'
    },
    {
      id: 'payments',
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Configure payment options and currencies'
    }
  ];

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveGeneralSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saved settings:', generalSettings);
      // Show success message or notification here
    } catch (error) {
      console.error('Error saving settings:', error);
      // Show error message or notification here
    } finally {
      setIsSaving(false);
    }
  };

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            {/* Store Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Store Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    value={generalSettings.storeName}
                    onChange={handleGeneralSettingsChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Matrix Shop"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store Description
                  </label>
                  <textarea
                    name="storeDescription"
                    value={generalSettings.storeDescription}
                    onChange={handleGeneralSettingsChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Your store description..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="contactEmail"
                        value={generalSettings.contactEmail}
                        onChange={handleGeneralSettingsChange}
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="contact@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="contactPhone"
                        value={generalSettings.contactPhone}
                        onChange={handleGeneralSettingsChange}
                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Settings */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Regional Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Language
                    </label>
                    <select
                      name="defaultLanguage"
                      value={generalSettings.defaultLanguage}
                      onChange={handleGeneralSettingsChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={generalSettings.currency}
                      onChange={handleGeneralSettingsChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="fcfa">FCFA</option>
                      <option value="usd">USD</option>
                      <option value="eur">EUR</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveGeneralSettings}
                disabled={isSaving}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Order Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications for new orders</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Low Stock Alerts</p>
                  <p className="text-sm text-gray-500">Get notified when products are running low</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Marketing Updates</p>
                  <p className="text-sm text-gray-500">Receive marketing tips and updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Update Password
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Enable 2FA</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Accept cash payments upon delivery</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Mobile Money</p>
                  <p className="text-sm text-gray-500">Accept mobile money payments</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Bank Transfer</p>
                  <p className="text-sm text-gray-500">Accept bank transfer payments</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-64">
        <nav className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">{section.title}</p>
                  <p className="text-xs text-gray-500">{section.description}</p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1">
        {renderSettingsContent()}
      </div>
    </div>
  );
}