'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, Calendar, Menu, X, ShieldCheck, PhoneCall, User, LogIn, UserPlus, LogOut } from 'lucide-react';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    checkUserSession();
  }, [pathname]);

  const checkUserSession = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error('Session fetch error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const navLinks = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Hizmetlerimiz', href: '/hizmetler' },
    { name: 'Online Randevu', href: '/randevu' },
  ];

  if (user?.role === 'ADMIN') {
    navLinks.push({ name: 'Yönetim Paneli', href: '/admin' });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-rose-100/60 py-3.5'
          : 'bg-gradient-to-b from-white/95 via-white/80 to-transparent py-4'
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
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-1">
                LUMIÈ RE <span className="text-rose-500 text-[10px] tracking-widest font-sans font-semibold block uppercase">Beauty & Spa</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-rose-600 font-semibold'
                      : 'text-gray-700 hover:text-rose-600'
                  }`}
                >
                  {link.name === 'Yönetim Paneli' && (
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

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:08501234567"
              className="text-xs font-semibold text-gray-600 hover:text-rose-600 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
              <span>0850 123 45 67</span>
            </a>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profil"
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                    pathname === '/profil'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{user.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
                  title="Çıkış Yap"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/giris"
                  className="inline-flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-rose-600 px-3 py-2 rounded-full transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Giriş Yap</span>
                </Link>
                <Link
                  href="/kayit"
                  className="inline-flex items-center gap-1 text-xs font-bold bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-full transition-all shadow-sm"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Kayıt Ol</span>
                </Link>
              </div>
            )}

            <Link
              href="/randevu"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-500 via-rose-600 to-gold-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-soft hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Randevu Al</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
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
                className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-rose-50 text-rose-600 font-bold border-l-4 border-rose-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between px-2">
                <Link
                  href="/profil"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-sm font-bold text-rose-600"
                >
                  <User className="w-4 h-4" />
                  <span>Profilim ({user.name})</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-xs font-semibold text-gray-500 hover:text-rose-600"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/giris"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-1.5 bg-gray-100 text-gray-800 font-bold py-2.5 rounded-xl text-xs"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Giriş Yap</span>
                </Link>
                <Link
                  href="/kayit"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-1.5 bg-gray-900 text-white font-bold py-2.5 rounded-xl text-xs"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Kayıt Ol</span>
                </Link>
              </div>
            )}

            <Link
              href="/randevu"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-gold-600 text-white font-semibold py-3 rounded-xl shadow-md text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Hızlı Randevu Al</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
