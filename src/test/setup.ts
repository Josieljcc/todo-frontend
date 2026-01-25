import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import React from 'react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    pathname: '/',
    href: 'http://localhost:3000/',
  },
  writable: true,
});

// Mock matchMedia (used by animations/helpers)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// framer-motion: components use both `motion.div` and `motion(Component)`
vi.mock('framer-motion', () => {
  const wrap = (Comp: any) => {
    const Wrapped = React.forwardRef<any, any>(({ children, ...props }, ref) => {
      return React.createElement(Comp, { ...props, ref }, children);
    });
    Wrapped.displayName = `motion(${typeof Comp === 'string' ? Comp : Comp?.displayName || Comp?.name || 'Component'})`;
    return Wrapped;
  };

  const motionFn = ((Comp: any) => wrap(Comp)) as any;

  // Commonly used HTML tags
  for (const tag of [
    'div',
    'span',
    'p',
    'button',
    'section',
    'nav',
    'aside',
    'svg',
    'textarea',
    'input',
    'select',
    'form',
    'label',
  ] as const) {
    motionFn[tag] = wrap(tag);
  }

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    motion: motionFn,
  };
});
