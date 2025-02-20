export interface ChatWindowProps {
    inputText: string;
    setInputText: (text: string) => void;
    outputText: string;
    detectedLanguage: string;
    summary: string;
    translation: string;
    error: string;
    selectedLanguage: string;
    setSelectedLanguage: (language: string) => void;
    handleSend: () => void;
    handleSummarize: () => void;
    handleTranslate: () => void;
  }
  
  export interface InputAreaProps {
    inputText: string;
    setInputText: (text: string) => void;
    handleSend: () => void;
    outputText: string;
    detectedLanguage: string;
    selectedLanguage: string;
    setSelectedLanguage: (language: string) => void;
    handleSummarize: () => void;
    handleTranslate: () => void;
  }
  
  
  export interface OutputAreaProps {
    outputText: string;
    detectedLanguage: string;
    summary: string;
    translation: string;
    error: string;
  }
  
  export interface ActionButtonsProps {
    outputText: string;
    detectedLanguage: string;
    selectedLanguage: string;
    setSelectedLanguage: (language: string) => void;
    handleSummarize: () => void;
    handleTranslate: () => void;
  }
  