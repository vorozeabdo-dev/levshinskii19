import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Polyfill window.storage as requested
const setupStorage = () => {
  const store: Record<string, string> = {};
  
  (window as any).storage = {
    get: async (key: string) => {
      // Simulate async delay
      return new Promise((resolve) => {
        setTimeout(() => {
           resolve({ value: store[key] || null });
        }, 100);
      });
    },
    set: async (key: string, value: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
           store[key] = value;
           resolve(true);
        }, 100);
      });
    }
  };
};

setupStorage();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);