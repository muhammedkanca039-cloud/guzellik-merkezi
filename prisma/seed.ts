import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import path from 'path';

if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('file:.')) {
  const dbPath = path.resolve(process.cwd(), 'prisma', 'dev.db');
  process.env.DATABASE_URL = `file:${dbPath}`;
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  console.log('Seeding database with beauty center data...');

  // 1. Create or update default Admin user
  const adminPassword = hashPassword('admin123');
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@lumiere.com' },
    update: {},
    create: {
      name: 'Yönetici Elif Hanım',
      email: 'admin@lumiere.com',
      phone: '0850 123 45 67',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user ready:', adminUser.email);

  // 2. Create or update default Customer user
  const customerPassword = hashPassword('123456');
  const sampleCustomer = await prisma.user.upsert({
    where: { email: 'zeynep@example.com' },
    update: {},
    create: {
      name: 'Zeynep Yılmaz',
      email: 'zeynep@example.com',
      phone: '0532 123 45 67',
      password: customerPassword,
      role: 'CUSTOMER',
    },
  });
  console.log('Sample customer ready:', sampleCustomer.email);

  // 3. Seed services if database currently has 0 services
  const currentServiceCount = await prisma.service.count();

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
      description: 'Ritmik titreşimlerle kan dolaşımını hızlandırarak selülit görünümünü azaltan ve sıkılaşma sağlayan terapi.',
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

  if (currentServiceCount === 0) {
    console.log('No services found. Seeding initial 9 beauty services...');
    const createdServices = [];
    for (const s of servicesData) {
      const service = await prisma.service.create({ data: s });
      createdServices.push(service);
    }

    console.log(`Successfully created ${createdServices.length} services.`);

    // Create sample initial appointments
    await prisma.appointment.createMany({
      data: [
        {
          customerName: sampleCustomer.name,
          customerPhone: sampleCustomer.phone,
          customerEmail: sampleCustomer.email,
          serviceId: createdServices[0].id,
          userId: sampleCustomer.id,
          date: '2026-08-28',
          time: '11:00',
          notes: 'Hassas cilt yapısına sahip, bitkisel ürünler tercih ediliyor.',
          status: 'Onaylandı',
        },
        {
          customerName: 'Elif Kaya',
          customerPhone: '0544 987 65 43',
          customerEmail: 'elif.kaya@example.com',
          serviceId: createdServices[2].id,
          date: '2026-08-28',
          time: '14:30',
          notes: 'İlk seans randevusu.',
          status: 'Beklemede',
        },
      ],
    });
    console.log('Sample initial appointments created!');
  } else {
    console.log(`Database already has ${currentServiceCount} services. Skipping service seeding.`);
  }

  console.log('Database seeding process completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
