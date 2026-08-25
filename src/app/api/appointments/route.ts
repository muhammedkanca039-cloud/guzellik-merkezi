import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, hashPassword } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const currentUser = await getCurrentUser();

    let whereClause: any = {};

    if (userId) {
      whereClause.userId = userId;
    } else if (currentUser && currentUser.role !== 'ADMIN') {
      whereClause.userId = currentUser.id;
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        service: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
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
      return NextResponse.json({ error: 'Lütfen gerekli tüm zorunlu alanları doldurunuz.' }, { status: 400 });
    }

    const cleanName = customerName.trim();
    const cleanPhone = customerPhone.trim();
    const cleanEmail = (customerEmail || '').trim().toLowerCase();

    // 1. Verify target service exists
    const serviceExists = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!serviceExists) {
      return NextResponse.json(
        { error: 'Seçilen hizmet sistemde bulunamadı. Lütfen tekrar bir hizmet seçiniz.' },
        { status: 400 }
      );
    }

    // 2. Check time slot conflict
    const existingConflict = await prisma.appointment.findFirst({
      where: {
        date,
        time,
        status: {
          in: ['Beklemede', 'Onaylandı'],
        },
      },
    });

    if (existingConflict) {
      return NextResponse.json(
        { error: 'Seçtiğiniz tarih ve saat dilimi daha önceden rezerve edilmiştir. Lütfen başka bir saat seçiniz.' },
        { status: 400 }
      );
    }

    // 3. User association & auto customer registration in DB
    let userIdToLink: string | null = null;
    const currentUser = await getCurrentUser();

    if (currentUser) {
      userIdToLink = currentUser.id;
    } else if (cleanEmail) {
      // Find or auto-register user record in User table
      let existingUser = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });

      if (!existingUser) {
        try {
          const defaultPassword = hashPassword('123456');
          existingUser = await prisma.user.create({
            data: {
              name: cleanName,
              email: cleanEmail,
              phone: cleanPhone,
              password: defaultPassword,
              role: 'CUSTOMER',
            },
          });
        } catch (userErr) {
          console.error('Auto user registration error:', userErr);
        }
      }

      if (existingUser) {
        userIdToLink = existingUser.id;
      }
    }

    // 4. Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        customerName: cleanName,
        customerPhone: cleanPhone,
        customerEmail: cleanEmail,
        serviceId,
        userId: userIdToLink,
        date,
        time,
        notes: (notes || '').trim(),
        status: 'Beklemede',
      },
      include: {
        service: true,
        user: true,
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error('Failed to create appointment:', error);
    return NextResponse.json(
      { error: 'Randevu kaydı oluşturulurken beklenmeyen bir veritabanı hatası oluştu.' },
      { status: 500 }
    );
  }
}
