'use client';

import React from 'react';
import { LAYOUT_MAPPINGS, LayoutMapping } from '@/lib/layout-mapping';

export default function LayoutMappingTable() {
  return (
    <div className="layout-mapping-table">
      <h2 className="text-2xl font-bold mb-4">📋 Site to Layout Mapping</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Site ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Site Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Layout Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Layout Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Theme
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Language
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {LAYOUT_MAPPINGS.map((mapping, index) => (
              <tr key={mapping.siteId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {mapping.siteId}
                  </code>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mapping.siteName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    mapping.layoutType === 'premium' ? 'bg-purple-100 text-purple-800' :
                    mapping.layoutType === '03' ? 'bg-blue-100 text-blue-800' :
                    mapping.layoutType === '04' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {mapping.layoutType}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {mapping.layoutName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                    {mapping.theme}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    mapping.language === 'vi' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {mapping.language.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {mapping.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">📁 Layout Files</h3>
          <ul className="space-y-2">
            {LAYOUT_MAPPINGS.map(mapping => (
              <li key={mapping.siteId} className="flex items-center">
                <code className="bg-white px-2 py-1 rounded text-xs mr-2">
                  {mapping.layoutFile}
                </code>
                <span className="text-sm text-gray-600">({mapping.siteId})</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🎨 Themes</h3>
          <div className="space-y-2">
            {['demoa1', 'demoa2', 'hoasen'].map(theme => {
              const sites = LAYOUT_MAPPINGS.filter(mapping => mapping.theme === theme);
              return (
                <div key={theme} className="flex items-center">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 mr-2">
                    {theme}
                  </span>
                  <span className="text-sm text-gray-600">
                    {sites.map(s => s.siteId).join(', ')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
