/**
 * Dosya: src/components/ServiceCard.tsx
 * Bu dosya, Güzellik Merkezi uygulamasının bir parçasıdır.
 * Uygulama genelinde tekrar kullanılabilir UI (Arayüz) bileşenidir.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, Sparkles } from 'lucide-react';

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  imageUrl?: string | null;
  isActive?: boolean;
}

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-rose-100/70 shadow-sm hover:shadow-glow hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Service Image container */}
        <div className="relative h-56 w-full overflow-hidden bg-rose-50">
          <Image
            src={service.imageUrl || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'}
            alt={service.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-rose-700 text-xs font-semibold px-3 py-1 rounded-full border border-rose-100 shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-rose-500" />
            {service.category}
          </span>

          {/* Price Tag */}
          <div className="absolute bottom-4 right-4 bg-rose-600/90 backdrop-blur-md text-white text-base font-bold px-3.5 py-1 rounded-2xl shadow-md">
            ₺{service.price.toLocaleString('tr-TR')}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-gold-700 font-medium mb-2">
            <Clock className="w-3.5 h-3.5 text-gold-600" />
            <span>Ortalama {service.duration} Dakika</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
            {service.name}
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
            {service.description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 pb-6 pt-0">
        <Link
          href={`/randevu?serviceId=${service.id}`}
          className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-200 group-hover:bg-rose-600 group-hover:text-white border border-rose-100"
        >
          <Calendar className="w-4 h-4" />
          <span>Randevu Oluştur</span>
        </Link>
      </div>
    </div>
  );
}
