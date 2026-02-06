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
  title: 'Zenith Digital - Calculate Your Automation Savings',
  description: 'Discover how much money and time you can save by automating your manual tasks with Zenith Digital.',
  icons: {
    icon: 'https://res.cloudinary.com/dj31nzvfa/image/upload/v1770326757/ZD_LogoMark_r3cb9n.png',
  },
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
