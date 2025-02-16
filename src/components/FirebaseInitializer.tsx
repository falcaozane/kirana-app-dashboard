// src/components/FirebaseInitializer.tsx
'use client';

import { useEffect } from 'react';
import { getFirebaseAnalytics } from '@/firebase';
import { FirebaseProvider } from '@/context/FirebaseContext';

export default function FirebaseInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const analytics = getFirebaseAnalytics();
  }, []);

  return <FirebaseProvider>{children}</FirebaseProvider>;
}