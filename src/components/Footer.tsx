/**
 * Dosya: src/components/Footer.tsx
 * Bu dosya, Güzellik Merkezi uygulamasının bir parçasıdır.
 * Uygulama genelinde tekrar kullanılabilir UI (Arayüz) bileşenidir.
 */

import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Phone, Mail, Clock, Instagram, Facebook, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-gold-600 flex items-center justify-center text-white shadow-glow">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                LUMIÈ RE <span className="text-rose-400 text-xs block font-sans uppercase font-semibold">Beauty & Spa</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Uzman kadromuz, son teknoloji cihazlarımız ve kişiye özel bakım protokollerimiz ile doğal güzelliğinizi ön plana çıkarıyoruz.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-rose-300 hover:bg-rose-600 hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-rose-300 hover:bg-rose-600 hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Hizmetlerimiz Col */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white border-b border-rose-900/40 pb-2">
              Hizmetlerimiz
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/hizmetler?cat=Cilt Bakımı" className="hover:text-rose-400 transition-colors">
                  Medikal Cilt Bakımı & Hydrafacial
                </Link>
              </li>
              <li>
                <Link href="/hizmetler?cat=Lazer Epilasyon" className="hover:text-rose-400 transition-colors">
                  Buz Başlıklı Diot Lazer Epilasyon
                </Link>
              </li>
              <li>
                <Link href="/hizmetler?cat=Kalıcı Makyaj" className="hover:text-rose-400 transition-colors">
                  Microblading Kaş & Dudak Renklendirme
                </Link>
              </li>
              <li>
                <Link href="/hizmetler?cat=Nail Art & Manikür" className="hover:text-rose-400 transition-colors">
                  Protez Tırnak & Medikal Manikür
                </Link>
              </li>
              <li>
                <Link href="/hizmetler?cat=Bölgesel İncelme" className="hover:text-rose-400 transition-colors">
                  G5 Bölgesel Selülit Terapisi
                </Link>
              </li>
            </ul>
          </div>

          {/* Çalışma Saatleri Col */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white border-b border-rose-900/40 pb-2">
              Çalışma Saatleri
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4 text-rose-400" /> Pazartesi - Cuma:
                </span>
                <span className="font-medium text-white">09:00 - 20:00</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4 text-rose-400" /> Cumartesi:
                </span>
                <span className="font-medium text-white">10:00 - 19:00</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4 text-rose-400" /> Pazar:
                </span>
                <span className="font-semibold text-rose-400">Kapalı</span>
              </li>
            </ul>
          </div>

          {/* İletişim Col */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white border-b border-rose-900/40 pb-2">
              İletişim & Adres
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">Nişantaşı Mah. Abdi İpekçi Cad. No:45/2 Şişli / İstanbul</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-gray-300">0850 123 45 67 / 0212 999 88 77</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-gray-300">info@lumiereguzellik.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Lumière Beauty & Spa. Tüm hakları saklıdır.</p>
          <p className="flex items-center gap-1">
            Güzellik & Estetik Deneyimi ile <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> Sevgiyle Tasarlandı.
          </p>
        </div>
      </div>
    </footer>
  );
}
