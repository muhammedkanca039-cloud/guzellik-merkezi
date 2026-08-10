import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        service: true,
      },
      orderBy: [
        { date: 'desc' },
        { time: 'desc' },
      ],
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    return NextResponse.json({ error: 'Randevular yüklenirken hata oluştu.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, customerEmail, serviceId, date, time, notes } = body;

    if (!customerName || !customerPhone || !serviceId || !date || !time) {
      return NextResponse.json({ error: 'Lütfen zorunlu alanları doldurunuz.' }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        customerName,
        customerPhone,
        customerEmail: customerEmail || '',
        serviceId,
        date,
        time,
        notes: notes || '',
        status: 'Beklemede',
      },
      include: {
        service: true,
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error('Failed to create appointment:', error);
    return NextResponse.json({ error: 'Randevu oluşturulurken hata oluştu.' }, { status: 500 });
  }
}
