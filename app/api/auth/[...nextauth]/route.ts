import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
// 필요에 따라 Provider를 추가할 수 있습니다.



const handler = NextAuth({
    pages: {
        signIn: '/',
      },
      
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string, // 수정!!!!
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string , // 수정!!!!
    }),
    
  ],

  callbacks: {

    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },


});

export { handler as GET, handler as POST };


// 인프랩 