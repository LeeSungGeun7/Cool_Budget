"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { changeUserAvatar, deleteUser, getChecknickname, getImageUrl, getUserData, postImageCloud, userData } from './action'
import { BsPencilSquare } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";
import A from './component/A';
import { LuPencilLine } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { useFormState } from 'react-dom';
import Pending from './component/Pending';
import { signOut } from 'next-auth/react';





function Page() {  
  const imgRef = useRef<any>(null);
    
  const [userData,setUserData] = useState({
    email: "" , 
    nickname : "",
    avatar: ""

  });

  const res = async () => {
    const res = await getUserData();
    if (res)
    setUserData({...userData,
        nickname:res?.usermodel.nickName || "닉네임이 없습니다." ,
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

//   const [image,setImage] = useState(userData.avatar);
  const saveImage = async () => {
   console.log("ddd");
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setUserData({...userData,avatar: reader.result as string})
    }
    console.log('iswork?');
    const form = new FormData()
    form.append('file', file , file.name)
    const id =  await postImageCloud(form);
    if (id) {
        await changeUserAvatar(`https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/${id}/avatar`)
    } 
  }

  

  const handleDeleteUser = async () => {
    const r = window.confirm('정말로 탈퇴 하시겠습니까?');
    if (r) {
      const res =  await deleteUser()
      if (res) {
        signOut();
      }
    }

  }

 
  return (
    <div className='flex flex-col justify-evenly items-center w-full bg-slate-50 h-screen'>
        <div className='flex justify-evenly h-[10%] w-[80%]'>
            <div onClick={()=>{getImageUrl()}}>비밀번호설정</div>
            <div></div>
            <div onClick={()=>{handleDeleteUser()}}>회원탈퇴</div>
        </div>
        
        
        <Image 
         onClick={()=>{imgRef.current.click()}} width={100} height={100} quality={100}   alt=''  src={userData.avatar !== null ? `${userData.avatar}` : "data:image/png;base64,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" } className='bg-auto rounded-full w-[100px] h-[100px] bg-white'>
        </Image>
        <input className='hidden' ref={imgRef} accept='image'  onChange={(e)=>{saveImage()}} type="file" name="" id="" />
    

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

export default Page