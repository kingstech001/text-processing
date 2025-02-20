// global.d.ts
export {};

declare global {
  interface Window {
    ai?: {
      languageDetector?: {
        capabilities: () => Promise<{ capabilities: string }>;
        create: (opts?: {
          monitor?: (monitorEvent: EventTarget) => void;
        }) => Promise<{
          detect: (text: string) => Promise<any>;
          ready?: Promise<void>;
        }>;
      };
      summarizer?: {
        summarize: (text: string) => Promise<string>;
      };
      translator?: {
        translate: (text: string, targetLang: string) => Promise<string>;
      };
    };
  }
}
