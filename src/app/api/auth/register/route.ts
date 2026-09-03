/**
 * Dosya: src/app/api/auth/register/route.ts
 * Bu dosya, Güzellik Merkezi uygulamasının bir parçasıdır.
 * API uç noktası (endpoint) işlevlerini içerir. İstemci (client) tarafından gelen istekleri işler.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, setSessionCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, password } = body;

    // Basic Validation
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'Lütfen ad, soyad, e-posta, telefon ve şifre alanlarını eksiksiz doldurunuz.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Şifreniz en az 6 karakter olmalıdır.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Lütfen geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi ile zaten kayıtlı bir hesap bulunmaktadır. Giriş yapmayı deneyebilirsiniz.' },
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(password);

    // Create User in DB
    const newUser = await prisma.user.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        password: hashedPassword,
        role: 'CUSTOMER',
      },
    });

    // Set 30-day session cookie
    setSessionCookie({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    return NextResponse.json(
      {
        message: 'Kayıt başarıyla tamamlandı.',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Kayıt oluşturulurken sunucuda bir hata meydana geldi.' },
      { status: 500 }
    );
  }
}
