import LinkClick from '@/components/LinkClick'
import LoginForm from '@/components/LoginForm';
import React from 'react'

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
                  <LinkClick type='kakao' img={'https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/e695240c-9c41-4098-9724-4b741c70ca00/avatar'} href='' name='' className='rounded-full w-[50px] h-[50px] bg-black' />
                  <LinkClick type='naver' img={'https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/56360884-d9aa-4b35-ed7d-2bee05520600/avatar'} href='' name='' className='rounded-full w-[50px] h-[50px] bg-black' />
                  <LinkClick type='google' img={'https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/26a5d968-ed07-4cf8-1bd8-d5431da01c00/avatar'} href='' name='' className='rounded-full w-[50px] h-[50px] bg-black' />
            </div>

        </div>
    </div>
  )
}

export default page




