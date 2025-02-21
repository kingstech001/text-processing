'use client';

import { useState } from 'react';
import ChatWindow from './components/ChatWindow';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [summary, setSummary] = useState('');
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Client-side Chrome AI integration (with fallback)
  async function detectLanguageClient(text: string): Promise<string> {
    if (window.ai && window.ai.languageDetector) {
      try {
        const capabilities = await window.ai.languageDetector.capabilities();
        const canDetect = capabilities.capabilities;
        let detector;
        if (canDetect === 'no') {
          console.warn('The language detector isn’t usable.');
          return /^[\x00-\x7F]*$/.test(text) ? 'en' : 'es';
        }
        if (canDetect === 'readily') {
          detector = await window.ai.languageDetector.create();
        } else {
          detector = await window.ai.languageDetector.create({
            monitor(monitorEvent) {
              monitorEvent.addEventListener('downloadprogress', (e: Event) => {
                const progressEvent = e as ProgressEvent;
                console.log(`Downloaded ${progressEvent.loaded} of ${progressEvent.total} bytes.`);
              });
            },
          });
          await detector.ready;
        }
        const rawResults = await detector.detect(text);
        if (Array.isArray(rawResults) && rawResults.length > 0) {
          return rawResults[0].detectedLanguage;
        } else if (typeof rawResults === 'string') {
          return rawResults;
        } else {
          return 'unknown';
        }
      } catch (error) {
        console.error('Chrome API language detection failed', error);
        return 'error';
      }
    } else {
      return /^[\x00-\x7F]*$/.test(text) ? 'en' : 'es';
    }
  }

  async function summarizeTextClient(text: string): Promise<string> {
    if (window.ai && window.ai.summarizer) {
      try {
        const summary = await window.ai.summarizer.summarize(text);
        return summary;
      } catch (error) {
        console.error('Chrome API summarization failed', error);
        return 'error';
      }
    } else {
      return text.length > 100 ? text.substring(0, 100) + '...' : text;
    }
  }

  async function translateTextClient(text: string, targetLang: string): Promise<string> {
    if (window.ai && window.ai.translator && typeof window.ai.translator.translate === 'function') {
      try {
        const translation = await window.ai.translator.translate(text, targetLang);
        return translation;
      } catch (error) {
        console.error('Chrome API translation failed', error);
        return 'error';
      }
    } else {
      // Fallback if the translator API is not available.
      return `${text} [translated to ${targetLang}]`;
    }
  }

  // Handlers
  const handleSend = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text.');
      return;
    }
    setError('');
    setOutputText(inputText);
    setSummary('');
    setTranslation('');
    setDetectedLanguage('');
    const language = await detectLanguageClient(inputText);
    setDetectedLanguage(language);
  };

  const handleSummarize = async () => {
    if (detectedLanguage !== 'en') {
      setError('Summarization is only available for English text.');
      return;
    }
    const summaryResult = await summarizeTextClient(outputText);
    setSummary(summaryResult);
  };

  const handleTranslate = async () => {
    const translationResult = await translateTextClient(outputText, selectedLanguage);
    setTranslation(translationResult);
  };

  return (
    <div className="bg-white m-[4px]">
      <ChatWindow
        inputText={inputText}
        setInputText={setInputText}
        outputText={outputText}
        detectedLanguage={detectedLanguage}
        summary={summary}
        translation={translation}
        error={error}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        handleSend={handleSend}
        handleSummarize={handleSummarize}
        handleTranslate={handleTranslate}
      />
    </div>
  );
}
