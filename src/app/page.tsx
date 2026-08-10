import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Calendar, Award, ShieldCheck, HeartHandshake, Star, ArrowRight, CheckCircle2, Clock, MapPin, Phone } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { prisma } from '@/lib/prisma';

export const revalidate = 0; // Dynamic data

async function getFeaturedServices() {
  try {
    return await prisma.service.findMany({
      where: { isActive: true },
      take: 6,
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching featured services:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredServices = await getFeaturedServices();

  const stats = [
    { label: 'Mutlu Danışan', value: '12.000+', icon: HeartHandshake },
    { label: 'Yıllık Deneyim', value: '10+ Yıl', icon: Award },
    { label: 'Uzman Estetisyen', value: '14 Uzman', icon: ShieldCheck },
    { label: 'Memnuniyet Oranı', value: '%99.4', icon: Star },
  ];

  const testimonials = [
    {
      name: 'Ayşe Karahan',
      title: 'Medikal Cilt Bakımı Danışanı',
      comment: 'Hydrafacial seansından sonra cildim ışıl ışıl oldu. Çalışanların güler yüzü ve salonun hijyeni mükemmel!',
      rating: 5,
    },
    {
      name: 'Büşra Altın',
      title: 'Buz Lazer Danışanı',
      comment: 'Buz lazer uygulamasını kesinlikle tavsiye ediyorum. Neredeyse sıfır acı ve 3. seansta bile harika sonuç aldım.',
      rating: 5,
    },
    {
      name: 'Deniz Yılmaz',
      title: 'Microblading Danışanı',
      comment: 'Kaş tasarımı konusunda endişelerim vardı ama altın oran ölçümleriyle tam istediğim doğal görünümü yakaladılar.',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-hero-pattern pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-rose-100/80 text-rose-800 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border border-rose-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-rose-500 animate-spin" />
                <span>Yenilenmiş Cilt & Doğal Güzellik Deneyimi</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                Işıltınızı Ön Planı Çıkaracak <br />
                <span className="text-gradient-gold">Lüks Güzellik Bakımları</span>
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Uzman estetisyenlerimiz, son teknoloji FDA onaylı cihazlarımız ve kişiye özel organik ürün yelpazemizle ışıltınızı yeniden keşfedin.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/randevu"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-rose-500 via-rose-600 to-gold-600 text-white font-semibold text-base px-8 py-4 rounded-full shadow-glow hover:scale-105 active:scale-95 transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Hemen Randevu Al</span>
                </Link>

                <Link
                  href="/hizmetler"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-gray-800 font-semibold text-base px-7 py-4 rounded-full border border-rose-200 shadow-sm hover:bg-rose-50 hover:text-rose-600 transition-all"
                >
                  <span>Hizmetleri İncele</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Features list inline */}
              <div className="pt-6 border-t border-rose-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-gray-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Ücretsiz Cilt Analizi
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> FDA Onaylı Cihazlar
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> %100 Hijyenik Ortam
                </span>
              </div>
            </div>

            {/* Right Banner Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative h-[440px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1000&q=80"
                    alt="Güzellik Bakımı"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-rose-500 flex items-center justify-center text-white shrink-0">
                    <Star className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">4.9 / 5.0 Puan</div>
                    <div className="text-xs text-gray-600">Google & Danışan Yorumları</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-r from-rose-900 via-gray-900 to-rose-950 text-white rounded-3xl p-8 shadow-xl">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center p-4 border-r last:border-r-0 border-white/10">
                <Icon className="w-8 h-8 text-rose-400 mb-3" />
                <div className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-300">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-300 mt-1 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Öne Çıkan Bakımlarımız
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
            Sizin İçin Seçtiğimiz Popüler Hizmetler
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Cildinize ve vücudunuza en uygun profesyonel bakımları keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 bg-white text-rose-600 hover:text-rose-700 font-bold px-8 py-3.5 rounded-full border border-rose-200 shadow-sm hover:shadow-md transition-all"
          >
            <span>Tüm Hizmetleri ve Fiyatları Gör</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="bg-gradient-to-b from-rose-50/50 via-white to-rose-50/30 py-20 border-y border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80"
                alt="Neden Lumiere"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-100 px-3 py-1 rounded-full">
                Neden Lumière Beauty?
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
                Güzelliğinizi Güvenle Teslim Edebileceğiniz Uzman Adres
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Her danışanımızın cilt tipi ve estetik beklentileri farklıdır. Salonumuzda standart bakımlar yerine kişiselleştirilmiş protokoller sunuyoruz.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-rose-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">Steril & Medikal Hijyen</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Tek kullanımlık malzemeler ve medikal otoklav cihazlarında sterilize edilen ekipmanlar.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-rose-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">Sertifikalı Uzman Kadro</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Uluslararası akredite sertifikalara sahip deneyimli estetisyen kadrosu.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            Danışan Deneyimleri
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
            Sizden Gelen Mutlu Yorumlar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-1 text-gold-500">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-gold-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm italic leading-relaxed">
                "{t.comment}"
              </p>
              <div className="pt-4 border-t border-gray-100">
                <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                <div className="text-xs text-rose-600 font-medium">{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-gold-600 rounded-3xl p-10 md:p-16 text-white text-center space-y-6 shadow-glow relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Kendinize Hak Ettiğiniz Bakımı Hediye Edin
            </h2>
            <p className="text-rose-100 text-sm sm:text-base">
              Online randevu sistemimiz üzerinden dakikalar içinde istediğiniz gün ve saat için yerinizi ayırtabilirsiniz.
            </p>
            <div className="pt-4">
              <Link
                href="/randevu"
                className="inline-flex items-center gap-2 bg-white text-rose-700 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-rose-50 hover:scale-105 transition-all text-base"
              >
                <Calendar className="w-5 h-5 text-rose-600" />
                <span>Hemen Online Randevu Oluştur</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
