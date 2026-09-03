/**
 * Dosya: src/app/api/services/route.ts
 * Bu dosya, Güzellik Merkezi uygulamasının bir parçasıdır.
 * API uç noktası (endpoint) işlevlerini içerir. İstemci (client) tarafından gelen istekleri işler.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('all') === 'true';

    const services = await prisma.service.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ],
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return NextResponse.json({ error: 'Hizmetler yüklenirken bir hata oluştu.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, description, price, duration, imageUrl } = body;

    if (!name || !category || !price || !duration) {
      return NextResponse.json({ error: 'Lütfen gerekli tüm alanları doldurun.' }, { status: 400 });
    }

    const newService = await prisma.service.create({
      data: {
        name,
        category,
        description: description || '',
        price: parseFloat(price.toString()),
        duration: parseInt(duration.toString()),
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80',
        isActive: true,
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('Failed to create service:', error);
    return NextResponse.json({ error: 'Hizmet eklenirken bir hata oluştu.' }, { status: 500 });
  }
}
