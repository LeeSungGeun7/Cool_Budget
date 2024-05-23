import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });
  const host = process.env.NODE_ENV === 'production' ? 'https://cool-budget.vercel.app' : 'http://localhost:3000' ; 


  const { pathname, origin } = req.nextUrl;

  // 로그인 페이지 경로
  const isLoginPage = req.nextUrl.pathname === '/login';
  const isRegister = req.nextUrl.pathname === '/register';
  const isChartPage = req.nextUrl.pathname === '/chart';
  const isMyPage = req.nextUrl.pathname === '/MyPage';
  const isTemp = req.nextUrl.pathname === '/temp';
  // 세션이 있고 로그인 페이지에 접근하려 할 경우

  if (session) {
    if(isLoginPage) {

      return NextResponse.redirect(`${origin}`);
    }
    if (isRegister) {

      return NextResponse.redirect(`${origin}`);
    }
  }
 
  
  
  if(!session) {
     if(isChartPage || isTemp || isMyPage) {
      return NextResponse.redirect(`${host}/login`);
     }
  }

  

  // 다른 페이지에 대한 처리는 여기에 추가할 수 있습니다.

  return NextResponse.next();
}

export const config = {
  matcher: ['/login','/chart','/temp','/MyPage','/register'],
};