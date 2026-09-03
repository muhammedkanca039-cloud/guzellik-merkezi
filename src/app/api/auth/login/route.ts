/**
 * Dosya: src/app/api/auth/login/route.ts
 * Bu dosya, Güzellik Merkezi uygulamasının bir parçasıdır.
 * API uç noktası (endpoint) işlevlerini içerir. İstemci (client) tarafından gelen istekleri işler.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, setSessionCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * POST /api/auth/login
 * Kullanıcı girişi işlemini gerçekleştiren API uç noktası.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Gerekli alanların kontrolü
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Lütfen e-posta ve şifrenizi giriniz.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Kullanıcıyı veritabanında ara
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'E-posta adresi veya şifre hatalı.' },
        { status: 401 }
      );
    }

    // Şifrenin doğruluğunu kontrol et
    const isValid = verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'E-posta adresi veya şifre hatalı.' },
        { status: 401 }
      );
    }

    // Giriş başarılı ise 30 günlük oturum çerezini (cookie) ayarla
    setSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Başarı durumunda kullanıcı bilgilerini döndür
    return NextResponse.json({
      message: 'Giriş başarılı.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Giriş yapılırken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
