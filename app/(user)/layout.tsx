import Banner from '@/components/Banner';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import '../../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Antonijo Galic',
  description: 'Fullstack software engineer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        <Banner />
        {children}
      </body>
    </html>
  );
}
