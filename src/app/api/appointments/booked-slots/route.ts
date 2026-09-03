/**
 * Dosya: src/app/api/appointments/booked-slots/route.ts
 * Bu dosya, Güzellik Merkezi uygulamasının bir parçasıdır.
 * API uç noktası (endpoint) işlevlerini içerir. İstemci (client) tarafından gelen istekleri işler.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ bookedSlots: [] });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        date,
        status: {
          in: ['Beklemede', 'Onaylandı'],
        },
      },
      select: {
        time: true,
      },
    });

    const bookedSlots = appointments.map((a) => a.time);

    return NextResponse.json({ bookedSlots });
  } catch (error) {
    console.error('Failed to fetch booked slots:', error);
    return NextResponse.json({ bookedSlots: [] });
  }
}
