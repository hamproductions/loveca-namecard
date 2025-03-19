import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type * as Sentry from '@sentry/browser';

export const SentryContext = createContext<typeof Sentry | undefined>(undefined);

export function SentryProvider({ children }: { children: ReactNode }) {
  const [sentryInstance, setSentryInstance] = useState<typeof Sentry>();

  useEffect(() => {
    const initSentry = async () => {
      const sentry = await import('@sentry/browser');
      sentry.init({
        dsn: 'https://6d678704e23c40ba91a9c8eabd3d0374@error-tracking.ham-san.net/2'
      });
      setSentryInstance(sentry);
    };
    void initSentry();
  }, []);
  return <SentryContext.Provider value={sentryInstance}>{children}</SentryContext.Provider>;
}

export const useSentry = () => useContext(SentryContext);
