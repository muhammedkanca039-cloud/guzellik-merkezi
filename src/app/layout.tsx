import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Lumière Beauty & Spa | Güzellik Merkezi & Estetik Salonu',
  description: 'Lumière Güzellik Merkezi - Cilt Bakımı, Lazer Epilasyon, Kalıcı Makyaj, Protez Tırnak ve Bölgesel İncelme Hizmetleri. Online Randevunuzu Hemen Alın!',
  keywords: 'güzellik merkezi, cilt bakımı, hydrafacial, lazer epilasyon, microblading, protez tırnak, masaj, estetik salonu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className="min-h-screen flex flex-col justify-between bg-[#faf8f5] text-gray-800 antialiased">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
