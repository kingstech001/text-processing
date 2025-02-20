'use client';

import React from 'react';
import { ChatWindowProps } from '@/types/types';
import OutputArea from './OutputArea';
import InputArea from './InputArea';

export default function ChatWindow(props: ChatWindowProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Chat output area */}
      <div className="p-4 mb-4 h-[70vh] overflow-y-auto py-[30px]">
        <OutputArea 
          outputText={props.outputText}
          detectedLanguage={props.detectedLanguage}
          summary={props.summary}
          translation={props.translation}
          error={props.error}
        />
      </div>
      {/* Input area */}
      <InputArea
        inputText={props.inputText}
        setInputText={props.setInputText}
        handleSend={props.handleSend}
        outputText={props.outputText}
        detectedLanguage={props.detectedLanguage}
        selectedLanguage={props.selectedLanguage}
        setSelectedLanguage={props.setSelectedLanguage}
        handleSummarize={props.handleSummarize}
        handleTranslate={props.handleTranslate}
      />
    </div>
  );
}
