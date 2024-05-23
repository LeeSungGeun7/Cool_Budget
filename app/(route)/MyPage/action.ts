"use server"

import { authOptions, GET as GetAuth, User1 } from "@/app/api/auth/[...nextauth]/route"
import { Session } from "@/app/api/budget/route"
import { Image } from "@/type/login/type";
import { getOAuthProvider } from "@/util/getOAuthProvider";
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







export const getImageUrl = async () => {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v2/direct_upload`,
        {
            method:"POST",
            headers: {
                Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`
            },
        }
    )
    if (!response.ok) {
        throw new Error(JSON.stringify(await response.json()))
    } 
    const data = await response.json();
    return data.result.uploadURL;
}

export const postImageCloud = async (form:FormData) => {
    const imgUrl = await getImageUrl();
    console.log(form,imgUrl);
    const res = await fetch(`${imgUrl}`,{
        method:"POST",
        headers: {
            'Authorization' : `Bearer ${process.env.CLOUDFLARE_TOKEN as string}`
        },
        body: form
    })
    const response:Image = await res.json();
    return response.result.id;
}



export const changeUserAvatar = async (imgUrl : string) => {
     const session:Session | null = await getServerSession(GetAuth)
    if (session) {
    const query = gql`
    mutation MyMutation {
        updateUsermodel(data: {avatar: "${imgUrl}"}, where: {email: "${session.user.email}"}) {
          id
        }
      }`;   
    const id = await request(masterURL,query) 
    
    if (id) {
    const qr =gql`
    mutation MyMutation {
        publishUsermodel(where: {email: "${session.user.email}"}) {
          id
        }
    }`;
    await request(masterURL,qr);
    } 
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
        return
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


export async function deleteUser() {
    const session:User1 | null = await getServerSession(authOptions)
    const KAKAO_UNLINK_URI = "https://kapi.kakao.com/v1/user/unlink";

    const kakaoAdminKey = "17c37bfdcd18309ee75b12ade767f05c";
    const targetIdType = "user_id";
    const targetId = session?.user.id;
   
    
    const userType = getOAuthProvider(targetId,session?.email);

    if (userType === "kakao") {
      const kakao = await fetch(`${KAKAO_UNLINK_URI}?target_id_type=${targetIdType}&target_id=${targetId}`,
        {
          method:"POST",
          headers: {
            'Authorization': `KakaoAK ${kakaoAdminKey}`,
            "Content-Type" : "application/x-www-form-urlencoded",
            
          },
         });
       const rsp =  await kakao.json()
       console.log(JSON.stringify(rsp))
    }
    
    

    const query = gql`
    mutation MyMutation {
        deleteUsermodel(where: {email: "${session?.user.email}"}) {
          id
        }
      }      
    `;
    const res:{deleteUsermodel:{id:any}} = await request(masterURL,query);
    

    if (res.deleteUsermodel !== null){
        return true
    }
}