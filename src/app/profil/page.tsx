/**
 * Dosya: src/app/profil/page.tsx
 * Bu dosya, Güzellik Merkezi uygulamasının bir parçasıdır.
 * Next.js App Router kullanılarak oluşturulmuş sayfa (UI) veya düzen (layout) bileşenidir.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Calendar, Clock, Phone, Mail, LogOut, CheckCircle2, XCircle, AlertCircle, Sparkles, Plus } from 'lucide-react';
import { ServiceItem } from '@/components/ServiceCard';

interface UserAppointment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceId: string;
  service: ServiceItem;
  date: string;
  time: string;
  notes?: string | null;
  status: 'Beklemede' | 'Onaylandı' | 'İptal';
  createdAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [appointments, setAppointments] = useState<UserAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileAndAppointments();
  }, []);

  const fetchProfileAndAppointments = async () => {
    try {
      setLoading(true);
      const resMe = await fetch('/api/auth/me');
      const dataMe = await resMe.json();

      if (!dataMe.user) {
        router.push('/giris');
        return;
      }

      setUser(dataMe.user);

      const resApps = await fetch('/api/appointments');
      if (resApps.ok) {
        const dataApps = await resApps.json();
        setAppointments(dataApps);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500 font-medium">
        Profil ve randevu bilgileriniz yükleniyor...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 via-rose-500 to-gold-500 text-white flex items-center justify-center text-2xl font-bold shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lumière Danışanı</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              {user.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-rose-500" /> {user.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-rose-500" /> {user.phone}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href="/randevu"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-gold-600 text-white font-bold px-5 py-2.5 rounded-2xl shadow-sm hover:scale-105 transition-transform text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Randevu Al</span>
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-1.5 bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-rose-600 font-semibold px-4 py-2.5 rounded-2xl transition-colors text-xs sm:text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </div>

      {/* User Appointments List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-rose-500" />
            Randevularım ({appointments.length})
          </h2>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-rose-100 space-y-4 shadow-sm">
            <AlertCircle className="w-12 h-12 text-rose-300 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800">Henüz Kayıtlı Randevunuz Bulunmuyor</h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              Size özel bakımlarımızdan faydalanmak ve online yer ayırtmak için hemen ilk randevunuzu oluşturabilirsiniz.
            </p>
            <Link
              href="/randevu"
              className="inline-flex items-center gap-2 bg-rose-600 text-white font-bold px-6 py-3 rounded-full hover:bg-rose-700 transition-all text-xs sm:text-sm shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Hemen Randevu Oluştur</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                      {app.service?.category || 'Güzellik Bakımı'}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'Onaylandı'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'İptal'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status === 'Onaylandı' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {app.status === 'Beklemede' && <Clock className="w-3.5 h-3.5" />}
                      {app.status === 'İptal' && <XCircle className="w-3.5 h-3.5" />}
                      {app.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-gray-900 pt-1">
                    {app.service?.name}
                  </h3>

                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-rose-500" />
                      <span className="font-semibold text-gray-800">{app.date}</span>
                      <span>saat</span>
                      <span className="font-bold text-gray-900">{app.time}</span>
                    </div>

                    {app.notes && (
                      <div className="text-gray-500 italic pt-1">
                        Not: {app.notes}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Ücret</span>
                  <span className="font-bold text-rose-600 text-base">
                    ₺{app.service?.price?.toLocaleString('tr-TR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
