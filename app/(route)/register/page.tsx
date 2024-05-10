
import SignUpForm from '@/components/SignUpForm';
// import React from 'react'



interface InputProps {
    name : string ;
    type : string ;
    
}

function DoubleCheck() {
    return (
        <button className='bg-black rounded-md w-[50px] h-[50px] text-white'>
            중복확인
        </button>
    )
}


function Input({name , type}:InputProps) {
    return(
        <input maxLength={30} className='focus:outline-none w-[100%] border-slate-100 border-2 border-b-black bg-slate-100 p-2' type={type} name={name} />
    )
    
}


function page() {


  return (
    <div className='flex justify-center items-center w-full h-screen'>
        <div className='flex-col bg-slate-100 flex justify-evenly items-center w-[100%] h-[100%]'>
            <div className='font-bold text-[1.4rem]'>회원가입</div>
            <SignUpForm/>
        </div>
    </div>
  )
}

export default page
