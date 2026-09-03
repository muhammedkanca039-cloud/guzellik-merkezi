/**
 * Dosya: src/app/hizmetler/page.tsx
 * Bu dosya, Güzellik Merkezi uygulamasının bir parçasıdır.
 * Next.js App Router kullanılarak oluşturulmuş sayfa (UI) veya düzen (layout) bileşenidir.
 */

'use client';

import React, { useState, useEffect } from 'react';
import ServiceCard, { ServiceItem } from '@/components/ServiceCard';
import { Sparkles, Search, Filter, RefreshCw } from 'lucide-react';

const CATEGORIES = [
  'Tümü',
  'Cilt Bakımı',
  'Lazer Epilasyon',
  'Kalıcı Makyaj',
  'Nail Art & Manikür',
  'Bölgesel İncelme',
  'Masaj & Spa',
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Failed to load services:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === 'Tümü' || service.category === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 text-xs font-bold px-4 py-1.5 rounded-full border border-rose-100 shadow-sm">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>Profesyonel Güzellik & Estetik Kataloğu</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">
          Hizmetlerimiz ve Fiyat Listesi
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Kişiye özel hazırlanan medikal bakımlar, son teknoloji epilasyon çözümleri ve estetik uygulamalarımızı inceleyin.
        </p>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Hizmet veya bakım ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
            />
          </div>

          {/* Results Count */}
          <div className="text-xs sm:text-sm text-gray-500 font-medium">
            Toplam <span className="font-bold text-rose-600">{filteredServices.length}</span> hizmet listeleniyor
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-md scale-105'
                    : 'bg-rose-50/70 text-gray-700 hover:bg-rose-100 hover:text-rose-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-rose-600 space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin" />
          <p className="text-sm font-medium text-gray-600">Hizmetler yükleniyor...</p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-rose-100 p-8 space-y-3">
          <Filter className="w-12 h-12 text-rose-300 mx-auto" />
          <h3 className="text-lg font-bold text-gray-800">Aramanıza Uygun Hizmet Bulunamadı</h3>
          <p className="text-sm text-gray-500">
            Farklı bir kategori seçmeyi veya arama terimini değiştirmeyi deneyebilirsiniz.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Tümü');
              setSearchQuery('');
            }}
            className="mt-2 text-xs font-semibold text-rose-600 hover:underline"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
