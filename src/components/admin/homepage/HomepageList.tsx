import React from 'react';
import { Edit, Check } from 'lucide-react';
import { HomepageContent } from '../../../types/homepage';
import { useLanguage } from '../../../contexts/LanguageContext';

interface HomepageListProps {
  homepages: HomepageContent[];
  onEdit: (homepage: HomepageContent) => void;
  onActivate: (homepage: HomepageContent) => void;
}

export function HomepageList({ homepages, onEdit, onActivate }: HomepageListProps) {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {homepages.map((homepage) => (
            <tr key={homepage.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {homepage.isActive ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    Draft
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {homepage.hero.title[language]}
                </div>
                <div className="text-sm text-gray-500">
                  {homepage.hero.subtitle[language]}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {homepage.updatedAt?.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(homepage)}
                  className="text-blue-600 hover:text-blue-900 mx-2"
                  title="Edit homepage"
                >
                  <Edit size={18} />
                </button>
                {!homepage.isActive && (
                  <button
                    onClick={() => onActivate({ ...homepage, isActive: true })}
                    className="text-green-600 hover:text-green-900 mx-2"
                    title="Set as active"
                  >
                    <Check size={18} />
                  </button>
                )}
              </td>
            </tr>
          ))}
          {homepages.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                No homepages created yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}