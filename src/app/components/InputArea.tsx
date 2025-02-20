'use client';

import React from 'react';
import { InputAreaProps } from '@/types/types';
import ActionButtons from './ActionButtons';
import { FaPaperPlane } from 'react-icons/fa';

export default function InputArea({
  inputText,
  setInputText,
  handleSend,
  outputText,
  detectedLanguage,
  selectedLanguage,
  setSelectedLanguage,
  handleSummarize,
  handleTranslate,
}: InputAreaProps) {
  return (
    <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-[40px] p-4">
      <div className="flex">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="flex-1 p-2 border-gray-300 rounded focus:outline-none resize-none"
        />
      </div>
      <div className="flex justify-between items-end mt-4">
        <ActionButtons
          outputText={outputText}
          detectedLanguage={detectedLanguage}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          handleSummarize={handleSummarize}
          handleTranslate={handleTranslate}
        />
        <button 
          onClick={() => {
            handleSend();
            setInputText('');
          }}
          className="p-2 text-white rounded-[20px] bg-black "
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
