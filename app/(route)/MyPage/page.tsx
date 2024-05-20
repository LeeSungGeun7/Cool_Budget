"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { getChecknickname, getUserData, userData } from './action'
import { BsPencilSquare } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";
import A from './component/A';
import { LuPencilLine } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { useFormState } from 'react-dom';
import Pending from './component/Pending';


function page() {  
  const [userData,setUserData] = useState({
    email: "" , 
    nickname : "",
    avatar: ""

  });

  const res = async () => {
    const res = await getUserData();
    if (res)
    setUserData({...userData,
        nickname:res?.usermodel.nickName,
        email: res?.usermodel.email,
        avatar: res?.usermodel.avatar,
    });
  }

  const [change,setChange] = useState(false);

 
  const [state,action] = useFormState(getChecknickname,null)

  useEffect(()=>{
  res()  
  },[])  

  const nameInputRef = useRef<any>(null)
  const formRef = useRef<any>(null);


  useEffect(()=>{
  if (!state?.formErrors &&  state?.success === true) {
     res();
     setChange(false);
     
     alert("닉네임 변경완료");
  }
  },[state])


  return (
    <div className='flex flex-col justify-evenly items-center w-full bg-slate-50 h-screen'>
        <div className='flex justify-evenly h-[10%] w-[80%]'>
            <div>비밀번호설정</div>
            <div></div>
            <div>회원탈퇴</div>
        </div>
        
        
        <Image alt='' quality={100} width={100} height={100} src={userData.avatar} className='rounded-full w-[100px] h-[100px] bg-white'></Image>
    

        <div>
          { 
          change ?
          <form ref={formRef} action={action}
          className='flex flex-col items-center'>
            <div className='flex items-center'>
            <input defaultValue={userData.nickname} name='nickname' maxLength={10} ref={nameInputRef} type="text" className='text-center p-2 rounded-xl' />
            <Pending/>
            <MdCancel onClick={()=>{setChange(false);  }}/>
            </div>

            <div className='w-full'>{state?.formErrors && 
                state.formErrors[0]}
            </div>
        
          </form>

          :
          <div className='w-full flex justify-center items-center'>{userData.nickname+"" || "닉네임이 없습니다."}<LuPencilLine className='m-1' onClick={()=>{setChange(!change); nameInputRef?.current?.focus()}} /></div>      
          } 
        </div>
        


        {/* <input className='rounded-xl' type="text" /> */}
    </div>
  )
}

export default page