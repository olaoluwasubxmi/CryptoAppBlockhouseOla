import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blockhouse Crypto Tracker Assigment App',
  description: 'Track cryptocurrency prices in real-time with Blockhouse',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
