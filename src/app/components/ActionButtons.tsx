'use client';

import React from 'react';
import { ActionButtonsProps } from '@/types/types';

export default function ActionButtons({
  outputText,
  detectedLanguage,
  selectedLanguage,
  setSelectedLanguage,
  handleSummarize,
  handleTranslate,
}: ActionButtonsProps) {
  return (
    <div className="mt-4 flex items-center space-x-4">
      {/* Only render Summarize button if language is English and text length > 150 */}
      {detectedLanguage === 'en' && outputText.length > 150 && (
        <button 
          onClick={handleSummarize} 
          className="rounded-[20px] px-4 py-2 text-gray-500 border border-gray-300 hover:bg-gray-100">
          Summarize
        </button>
      )}
      <div className="flex items-center space-x-2">
        <select 
          value={selectedLanguage} 
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="p-2 border text-gray-500 border-gray-300 hover:bg-gray-100 rounded-[20px] focus:outline-none"
        >
          <option value="en">English (en)</option>
          <option value="pt">Portuguese (pt)</option>
          <option value="es">Spanish (es)</option>
          <option value="ru">Russian (ru)</option>
          <option value="tr">Turkish (tr)</option>
          <option value="fr">French (fr)</option>
        </select>
        <button 
          onClick={handleTranslate} 
          className="px-4 py-2 text-gray-500 border border-gray-300 hover:bg-gray-100 rounded-[20px]">
          Translate
        </button>
      </div>
    </div>
  );
}
