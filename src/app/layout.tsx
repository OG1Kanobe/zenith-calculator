import type { Metadata } from 'next';
import { Space_Mono, Inter_Tight } from 'next/font/google';
import './globals.css';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
});

export const metadata: Metadata = {
  title: 'Zenith AI - Calculate Your Automation Savings',
  description: 'Discover how much money and time you can save by automating your manual tasks with Zenith AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} ${interTight.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
