

import LinkClick from '@/components/LinkClick'
import LoginForm from '@/components/LoginForm';
import React from 'react'
import kakao from '/Users/sk/dev/Next/easy-balance/public/icon/kakaoLogin.png';
import naver from '/Users/sk/dev/Next/easy-balance/public/icon/NaverLogin.png';
import google from '/Users/sk/dev/Next/easy-balance/public/icon/googleLogin.png';
import Link from 'next/link';
interface FormData {
    id : string ; 
    password : string ;
}


function page() {

  

  return (
    <div className='flex h-screen justify-center items-center w-full bg-slate-100'>
        <div className='p-10 pt-0 flex justify-evenly items-center flex-col rounded-md  w-[80%] h-[90%] bg-white'>
            <div className='flex items-center w-full h-[40px]' >
                <span className='text-[2.0rem] font-bold'>로그인</span>
                <Link  href={"/register"} className='ml-auto text-[0.8rem]'>회원가입</Link>

            </div>
            <LoginForm/>
        
            <span className='w-full text-center text-[12px]'> 간편하게 SNS 로그인</span>
            
            <div className='w-full flex justify-evenly items-center'>
                  <LinkClick type='kakao' img={kakao} href='' name='' className='rounded-full w-[50px] h-[50px] bg-black' />
                  <LinkClick type='naver' img={naver} href='' name='' className='rounded-full w-[50px] h-[50px] bg-black' />
                  <LinkClick type='google' img={google} href='' name='' className='rounded-full w-[50px] h-[50px] bg-black' />
            </div>

        </div>
    </div>
  )
}

export default page




