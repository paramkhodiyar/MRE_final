import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { PropertyProvider } from '@/contexts/PropertyContext';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Maya Real Estate - Properties in Chhattisgarh',
  description: 'Find your dream property in Chhattisgarh with Maya Real Estate',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./icon.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <PropertyProvider>
            {children}
            <Toaster />
          </PropertyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}