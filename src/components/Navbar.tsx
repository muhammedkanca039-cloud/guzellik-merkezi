'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Calendar, Menu, X, ShieldCheck, PhoneCall } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Hizmetlerimiz', href: '/hizmetler' },
    { name: 'Online Randevu', href: '/randevu' },
    { name: 'Yönetim Paneli', href: '/admin', isBadge: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-rose-100/60 py-3.5'
          : 'bg-gradient-to-b from-white/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 via-rose-500 to-gold-600 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-1">
                LUMIÈ RE <span className="text-rose-500 text-xs tracking-widest font-sans font-semibold block uppercase">Beauty & Spa</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-rose-600 font-semibold'
                      : 'text-gray-600 hover:text-rose-600'
                  }`}
                >
                  {link.isBadge && (
                    <ShieldCheck className="w-4 h-4 text-gold-600" />
                  )}
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-400 to-gold-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:08501234567"
              className="text-xs font-semibold text-gray-600 hover:text-rose-600 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
              <span>0850 123 45 67</span>
            </a>

            <Link
              href="/randevu"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 via-rose-600 to-gold-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-soft hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Randevu Al</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              aria-label="Menüyü aç/kapat"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-rose-100 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-rose-50 text-rose-600 font-bold border-l-4 border-rose-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.isBadge && <ShieldCheck className="w-4 h-4 text-gold-600" />}
                  {link.name}
                </div>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/randevu"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-gold-600 text-white font-semibold py-3 rounded-xl shadow-md"
            >
              <Calendar className="w-5 h-5" />
              <span>Hızlı Randevu Al</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
