"use client"
import { getProviders, signIn } from "next-auth/react";
import Link from '@/node_modules/next/link';
import Image from 'next/image';
import React from 'react'
import { useRouter } from "next/navigation";



interface Props {
    link? : boolean ; 
    name : string ;
    w? : string ; 
    h? : string ;
    className? : string;
    href : string ;
    img? : string | any ;
    type? : 'kakao' | 'naver' | 'google';
}

function LinkClick({type,name,href,className,img}:Props) {
  const route = useRouter();
  const handleLogin = async (type:string) => {
    const result = await signIn(`${type}`, {
      redirect: true,
      callbackUrl: "/",
    });
  };

  

  return (
    <button onClick={()=>{if(type){handleLogin(type)} else {route.push(`/${href}`)}} } className={className+`${img && "rounded-full"}`} >
      {name && name}
      
      {img && <Image className='rounded-full w-full h-full' src={img} width={50} height={50} quality={100} alt="" />}
    </button>
  )
}

export default LinkClick;

