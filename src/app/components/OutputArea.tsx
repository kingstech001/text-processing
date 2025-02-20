'use client';

import React from 'react';
import { OutputAreaProps } from '@/types/types';

export default function OutputArea({
  outputText,
  detectedLanguage,
  summary,
  translation,
  error,
}: OutputAreaProps) {
  return (
    <div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {outputText && (
        <div className="mb-2">
          <p className="font-bold">Input:</p>
          <p>{outputText}</p>
          <p className="text-sm text-gray-500">Detected Language: {detectedLanguage}</p>
        </div>
      )}
      {summary && (
        <div className="mb-2">
          <p className="font-bold">Summary:</p>
          <p>{summary}</p>
        </div>
      )}
      {translation && (
        <div>
          <p className="font-bold">Translation:</p>
          <p>{translation}</p>
        </div>
      )}
    </div>
  );
}
