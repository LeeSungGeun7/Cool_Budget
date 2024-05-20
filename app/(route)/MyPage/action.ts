"use server"

import { GET as GetAuth } from "@/app/api/auth/[...nextauth]/route"
import { Session } from "@/app/api/budget/route"
import request, { gql } from "graphql-request";


import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const masterURL = "https://ap-northeast-1.cdn.hygraph.com/content/clvj66z0n0s8608w0tjxa3o9f/master";

const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
const nicknameSchema = 
z
.string()
.min(2,"최소 2글자 이상입니다.")
.max(10,"최대 10글자입니다.")
.refine((value) => regex.test(value ?? ""), '한글,영문자,숫자만 포함 가능합니다.')
.refine(
  async (nickname) => {
    const isExist = await isExistNickname(nickname);
    return isExist;
  },
  {message : "이미 존재하는 닉네임 입니다."}
)


export interface userData  {
    usermodel:{
        nickName: string;
        email : string;
        password : string;
        userType: string;
        avatar: string;
    }
}




export const getUserData = async () => {
    const session:Session | null = await getServerSession(GetAuth)

    if (session) {
        const query = gql`
        query MyQuery {
            usermodel(where: { email:"${session.user.email}" }) {
              nickName
              email
              password
              userType
              avatar
            }
          }
        `;
        const res:userData = await request(masterURL,query);
        return res
    }

    else {
        console.log("세션이 없습니다.")
    }
}





export const isExistNickname = async (nickname:string) => {
    const session:Session | null = await getServerSession(GetAuth)
    if (session) {
    const query = gql`
    query MyQuery {
        usermodel(where: {nickName: "${nickname}"}) {
          id
        }
      }
    `
    const res:any = await request(masterURL,query)
    
    if (res.usermodel === null) {
        return true
    } else {
        return false
    }



    } else {
        NextResponse.json({message:"세션이 없는 사용자 입니다."})
    }
    
}


export const getChecknickname = async (prevState:any,form:FormData) => {
    const session:Session | null = await getServerSession(GetAuth)
    if (session) {
    const nickname = form.get('nickname')

    const r =  await nicknameSchema.safeParseAsync(nickname)

    if (!r.success) {
        return r.error.flatten()
    } else {
        const query = gql`
        mutation MyMutation {
            updateUsermodel(data: {nickName: "${nickname}"}, where: {email: "${session.user.email}"}) {
              id
            }
          }`;
        const res:any = await request(masterURL,query)
    
    if (res.updateUsermodel) {
    const qr =gql`
    mutation MyMutation {
        publishUsermodel(where: {email: "${session.user.email}"}) {
          id
        }
    }`;
     const res = await request(masterURL,qr);
     if (res) {
        revalidatePath("/MyPage");
       return { formErrors : null , success: true}
     }
    }   
        // NextResponse.json({message:"닉네임 변경 완료",ok:true})  
        
    }
    
}
 else {
NextResponse.json({message:"세션이 없는 사용자 입니다."})
 }
}