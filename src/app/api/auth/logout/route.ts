import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/auth';

export async function POST() {
  try {
    clearSessionCookie();
    return NextResponse.json({ message: 'Çıkış yapıldı.' });
  } catch (error) {
    return NextResponse.json({ error: 'Çıkış yapılırken hata oluştu.' }, { status: 500 });
  }
}
