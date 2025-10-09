// Global type declarations for window properties
declare global {
  interface Window {
    pageViewEventId?: string;
    fbq?: (action: string, event?: string, parameters?: Record<string, unknown>, options?: Record<string, unknown>) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    FB?: any; // Facebook SDK
  }
}

export {};
