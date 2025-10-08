// Global type declarations for window properties
declare global {
  interface Window {
    pageViewEventId?: string;
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

export {};
