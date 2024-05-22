"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'
import { useState } from 'react'

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading , setLoading] = useState(false);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const route = useRouter();
    async function handleLogin() {
    
        if (email.length > 1 && password.length > 1) {
        setLoading(true);    
       // const res = await Login(email,password);
        setLoading(false);    
 
        const res:any = await signIn('credentials',{
            email: email,
            password: password,
            redirect: false,
        })
        if (res?.ok === true ) {
            route.push('/')
        } else {
            alert("실패")
        }
    
        
    }   else if (email.length < 1) {
        if ( emailInput.current) {
            emailInput.current.focus()
        }
        }

        else  {
            if ( passwordInput.current) {
                passwordInput.current.focus()
            }   
        }
       
    }

    
  return (
    <>
            <div className='relative flex items-center w-full h-[40px]'>
                <span className='w-[30%] text-[0.9rem] '>이메일</span>
                <input ref={emailInput}
                 required maxLength={30} onChange={(e)=>{setEmail(e.target.value)}} className='focus:outline-none w-[70%] rounded-md p-2 ml-[-10px] ' type="email" placeholder='' />
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[black]"></span>
            </div>
            <div className='relative  flex items-center w-full h-[40px]'>
                <span className='w-[30%] text-[0.9rem] '>비밀번호</span>
                <input ref={passwordInput} maxLength={30} onKeyDown={(e)=>{if(e.keyCode==13){handleLogin()}}} onChange={(e)=>{setPassword(e.target.value)}} className='focus:outline-none w-[70%] p-2 ml-[-10px]' type="password" placeholder='' />
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[black]"></span>
            </div>
            <button disabled={loading} onClick={()=>{handleLogin()}} className='text-white bg-blue-400 rounded-xl w-full h-[50px]'>{loading ? "loading" : "로그인"}</button>
    </>
  )
}

export default LoginForm