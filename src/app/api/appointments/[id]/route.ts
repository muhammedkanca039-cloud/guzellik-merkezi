/**
 * Dosya: src/app/api/appointments/[id]/route.ts
 * Bu dosya, Güzellik Merkezi uygulamasının bir parçasıdır.
 * API uç noktası (endpoint) işlevlerini içerir. İstemci (client) tarafından gelen istekleri işler.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!['Beklemede', 'Onaylandı', 'İptal'].includes(status)) {
      return NextResponse.json({ error: 'Geçersiz durum bilgisi.' }, { status: 400 });
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status },
      include: { service: true }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update appointment:', error);
    return NextResponse.json({ error: 'Randevu güncellenirken hata oluştu.' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.appointment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete appointment:', error);
    return NextResponse.json({ error: 'Randevu silinirken hata oluştu.' }, { status: 500 });
  }
}
