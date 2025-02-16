// src/app/layout.tsx
import FirebaseInitializer from '@/components/FirebaseInitializer';
import Layout from '@/components/Layout';
import './globals.css';

export const metadata = {
  title: 'Kirana',
  description: 'Analytics Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FirebaseInitializer>
        <Layout>{children}</Layout>
        </FirebaseInitializer>
      </body>
    </html>
  );
}