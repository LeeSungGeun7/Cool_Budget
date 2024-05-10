"use server"
import redis from "@/lib/redis";
import { request, gql  } from "graphql-request";
import {z} from 'zod';
import { redirect } from 'next/navigation';


const emailSchema = 
  z.string().email({message:"유효하지 않은 이메일 형식"})


const regex_pwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/

const passwordValidationSchema = z.object({
  password: z.string().regex(regex_pwd, "최소 8~30 글자 사이 영문자와 숫자를 포함해주세요"),
  passwordCheck: z.string(),
}).refine(
  (data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치 하지 않습니다.",
    path: ["passwordCheck","password"],
});


const formSchema = z.object({
  email : z.string().email({ message : "유효하지 않은 이메일형식"}).max(30 ,{message:"30 글자수 초과"}),
  emailcheck : z.string().optional() ,
  password: z.string().regex(regex_pwd ,"최소 8~30 글자 사이 영문자와 숫자를 포함해주세요"),
  passwordCheck : z.string(),
  nickname : z.string().min(2,{message:"최소 2글자 이상"}).max(10,{message:"최대 10글자 초과"}),
  codecheck : z.string().refine((value) => value === "true", {
    message: "이메일 인증이 완료되지 않았습니다.",
    path: ["email"],
  }),
}).refine(
  (data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치 하지 않습니다.",
    path: ["passwordCheck","password"],
})
;
const masterURL = "https://api-ap-northeast-1.hygraph.com/v2/clvj66z0n0s8608w0tjxa3o9f/master";

interface UserModel {
    id : string;
}

interface Data {
    usermodel : UserModel | null;
}




// 회원가입 폼제출 
export  async function createAccount(prevState:any ,formData: FormData) {

   const datas = {
      email : formData.get("email"),
      nickname : formData.get("nickname"),
      password : formData.get("password"),
      passwordCheck : formData.get("passwordCheck"),
      codecheck : formData.get("codecheck"),
   } 
    console.log(datas.codecheck);
    const result = formSchema.safeParse(datas);
    
      const nickNameResult = await isDuplicateNickName(datas.nickname+"")

    if (!nickNameResult) {
      result?.error?.addIssue({
        code: "custom",
        message: "닉네임 중복 입니다.",
        path: ["nickname"],
      });
    }
    
    
    

    if (!result.success) {
      return result.error.flatten()
    } else {
      const query = gql`
      mutation MyMutation {
        createUsermodel(data: {password: "${datas.password}", email: "${datas.email}", nickName: "${datas.nickname}"}) {
          id
        }
      }`; 
      const res = await request(masterURL,query);
      if (res) {
        redirect('/');
      }
      else {
        false
      }

    }
};


// 닉네임 중복 확인 
export async function isDuplicateNickName(nickName:string) {
  const query = gql`
  query Assets {
    usermodel(where: { nickName: "${nickName}" }) {
      id
    }
  }
  `;
  const data:Data = await request(masterURL,query);
  if (data?.usermodel === null) {
    return true
  } 
  return false
}


// 이메일 중복확인 
export async function isDuplicateEmail(email:string) {
  const result = emailSchema.safeParse(email);
  if (!result.success) {
    return "이메일 형식 오류";
  }
  const query = gql`
  query Assets {
    usermodel(where: { email: "${email}" }) {
      id
    }
  }
  `;
  const data:Data = await request(masterURL, query);
  if (data?.usermodel === null) {
    return true
  }

  return false 

}  


// 이메일 인증코드 확인 
export async function checkVerificationCode(email:string , verificationCode:string | number) {
  
  const code = await redis.get(email)

  if(code === verificationCode) {
      return true
  }
  return false 
}



// 이메일 인증코드 보내기
export async function sendVerificationCode(email:string) {


  const response = await fetch('http://localhost:3000/api/sendmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email}),
  });

  if (!response.ok) {
    throw new Error('Failed to send verification code');
  }
}


// 패스워드 confirm 
export async function checkPassword(formData : FormData) {
  const data = {
    password : formData.get("password"),
    passwordCheck : formData.get("passwordCheck"),
 }  
  
  const result = passwordValidationSchema.safeParse(data)
  if (!result.success) {
    return result.error.flatten();
  }
  return ;
}



