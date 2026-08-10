import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with beauty center data...');

  // Existing data cleaning if any
  await prisma.appointment.deleteMany({});
  await prisma.service.deleteMany({});

  const servicesData = [
    {
      name: 'Medikal Cilt Bakımı (Hydrafacial)',
      category: 'Cilt Bakımı',
      description: 'Cildin derinlemesine temizlenmesi, ölü hücrelerden arındırılması, hyaluronik asit ve vitamin serum desteği ile yenilenmesi işlemi.',
      price: 1250,
      duration: 60,
      imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
      isActive: true,
    },
    {
      name: 'Leke & Akne Protokolü',
      category: 'Cilt Bakımı',
      description: 'Özel leke açıcı asitler ve fototerapi yardımıyla güneş lekesi, sivilce izi ve ton eşitsizliklerini giderici özel bakım.',
      price: 1400,
      duration: 75,
      imageUrl: 'https://images.unsplash.com/photo-1512290900676-26c2a4d0b5ae?auto=format&fit=crop&w=800&q=80',
      isActive: true,
    },
    {
      name: 'Buz Başlıklı Diot Lazer (Tüm Vücut)',
      category: 'Lazer Epilasyon',
      description: 'Ağrısız ve acısız buz başlık teknolojisi ile her mevsim uygulanabilen kalıcı pürüzsüzlük seansı.',
      price: 2800,
      duration: 90,
      imageUrl: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80',
      isActive: true,
    },
    {
      name: 'Yüz & Boyun Lazer Epilasyon',
      category: 'Lazer Epilasyon',
      description: 'Hassas yüz ve boyun bölgesi tüyleri için özel dozajlı kalıcı epilasyon seansı.',
      price: 650,
      duration: 30,
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      isActive: true,
    },
    {
      name: 'Microblading Kaş Tasarımı',
      category: 'Kalıcı Makyaj',
      description: 'Altın oran ölçümü ile yüz tipinize en uygun doğal kıl tekniği kaş kontürü uygulaması.',
      price: 3200,
      duration: 120,
      imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
      isActive: true,
    },
    {
      name: 'Dudak Renklendirme (Lip Blush)',
      category: 'Kalıcı Makyaj',
      description: 'Solgun ve renksiz dudaklara canlılık veren doğal pigmentli kalıcı renklendirme işlemi.',
      price: 2900,
      duration: 90,
      imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
      isActive: true,
    },
    {
      name: 'Protez Tırnak & Medikal Manikür',
      category: 'Nail Art & Manikür',
      description: 'Jel veya akrilik protez tırnak uygulaması, kalıcı oje ve kuru manikür bakımı.',
      price: 850,
      duration: 90,
      imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
      isActive: true,
    },
    {
      name: 'G5 Bölgesel Selülit & İncelme Masajı',
      category: 'Bölgesel İncelme',
      description: 'Ritmik titreşimlerle kan dolaşımını hızlandıran, selülit görünümünü azaltan ve sıkılaşma sağlayan terapi.',
      price: 1100,
      duration: 45,
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
      isActive: true,
    },
    {
      name: 'Aromaterapi & Rahatlama Masajı',
      category: 'Masaj & Spa',
      description: 'Doğal esansiyel yağlarla tüm vücut kaslarını gevşeten, stresi azaltan huzur terapisi.',
      price: 1500,
      duration: 60,
      imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
      isActive: true,
    }
  ];

  const createdServices = [];
  for (const s of servicesData) {
    const service = await prisma.service.create({ data: s });
    createdServices.push(service);
  }

  console.log(`Created ${createdServices.length} services.`);

  // Create sample appointments
  const sampleAppointments = [
    {
      customerName: 'Zeynep Yılmaz',
      customerPhone: '0532 123 45 67',
      customerEmail: 'zeynep@example.com',
      serviceId: createdServices[0].id,
      date: '2026-08-12',
      time: '11:00',
      notes: 'Hassas cilt yapısına sahip, bitkisel ürünler tercih ediliyor.',
      status: 'Onaylandı',
    },
    {
      customerName: 'Elif Kaya',
      customerPhone: '0544 987 65 43',
      customerEmail: 'elif.kaya@example.com',
      serviceId: createdServices[2].id,
      date: '2026-08-12',
      time: '14:30',
      notes: 'İlk seans randevusu.',
      status: 'Beklemede',
    },
    {
      customerName: 'Selin Demir',
      customerPhone: '0555 444 33 22',
      customerEmail: 'selin@example.com',
      serviceId: createdServices[4].id,
      date: '2026-08-13',
      time: '16:00',
      notes: 'Ön kontrol yapıldı, onay bekliyor.',
      status: 'Beklemede',
    },
    {
      customerName: 'Merve Şahin',
      customerPhone: '0505 111 22 33',
      customerEmail: 'merve@example.com',
      serviceId: createdServices[6].id,
      date: '2026-08-10',
      time: '10:00',
      notes: 'French manikür isteği.',
      status: 'İptal',
    }
  ];

  for (const app of sampleAppointments) {
    await prisma.appointment.create({ data: app });
  }

  console.log('Sample appointments created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
