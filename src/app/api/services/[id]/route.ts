/**
 * Dosya: src/app/api/services/[id]/route.ts
 * Bu dosya, Güzellik Merkezi uygulamasının bir parçasıdır.
 * API uç noktası (endpoint) işlevlerini içerir. İstemci (client) tarafından gelen istekleri işler.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, category, description, price, duration, imageUrl, isActive } = body;

    const updated = await prisma.service.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(category && { category }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price: parseFloat(price.toString()) }),
        ...(duration !== undefined && { duration: parseInt(duration.toString()) }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update service:', error);
    return NextResponse.json({ error: 'Hizmet güncellenirken hata oluştu.' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete service:', error);
    return NextResponse.json({ error: 'Hizmet silinirken hata oluştu.' }, { status: 500 });
  }
}
