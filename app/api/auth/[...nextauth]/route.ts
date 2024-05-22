import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials"
import { Login } from '@/app/(route)/login/action';

// 필요에 따라 Provider를 추가할 수 있습니다.

import { User  } from "next-auth"
import { isExistUser, socialRegister } from '@/app/(route)/register/action';

interface CustomUser extends User {
  id: string
  email: string
  name: string
  // 추가적인 사용자 정보 필드
}


export interface Root {
  user: User1
  expires: string
}

export interface User1 {
  name: string
  email: string
  picture: string
  sub: string
  user: User2
  id: string
  image: string
  iat: number
  exp: number
  jti: string
}

export interface User2 {
  id: string
  email: string
}



const authOptions = {
    pages: {
        signIn: '/',
      },
  secret: process.env.NEXTAUTH_SECRET as string,    
  // session: {
  //   strategy: "jwt"
  // } ,   


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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials,req) {
        if (credentials) {
          const res = await Login(credentials?.email,credentials?.password)
          if (res === true) {
            return {
              email : credentials.email,
            } as CustomUser
          }
          else {
            return null
          }
        }
        return null
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.user = {
          id: user.id,
          email : user.email
        }
      
      }
      return { ...token, ...user };
    },

    async session({ session, token }:any) {

      session.user = token as any;

      await socialRegister(session.user.email,`${session.user.picture || "defalut"}`,"social")

      return session;
    },
    
  },


};

export const GET = NextAuth(authOptions)

export const POST = NextAuth(authOptions)

// 인프랩 