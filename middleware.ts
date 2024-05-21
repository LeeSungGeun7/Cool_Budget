import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  const { pathname, origin } = req.nextUrl;

  // 로그인 페이지 경로
  const isLoginPage = pathname === '/login';

  const isValid = pathname === '/chart'
  // 세션이 있고 로그인 페이지에 접근하려 할 경우
  if (session && isLoginPage) {
    return NextResponse.redirect(`${origin}`);
  }

  if (!session && isValid) {
    return NextResponse.redirect(`/login`);
  }

  // 다른 페이지에 대한 처리는 여기에 추가할 수 있습니다.

  return NextResponse.next();
}

export const config = {
  matcher: ['/login','/chart','/temp'],
};