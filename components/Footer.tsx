"use client"
import useIsMobile from '@/use/useIsMobile';
import React from 'react'
import LinkClick from './LinkClick';
import { FaPlus } from "react-icons/fa6";

import { MdOutlineMail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { useRecoilState} from 'recoil';
import { BottomState } from '@/atom/BottomState';
import BottomUp from './BottomUp';



const Icon = ({children}:any) => {
  return(
    <>
      <div className='flex justify-center items-center m-2 w-[50px] h-[50px] rounded-full border-[1px] border-white bg-black text-white'>
        {children}
      </div>
    </>
  )
}



function Footer() {
  const isMobile = useIsMobile()
  
  
  const [bottomUp,setBottomUp] = useRecoilState(BottomState)


  const LinkComponent = ' w-[25%] h-[100%] flex justify-center items-center m-4'
  

  if (isMobile && !bottomUp) {
    return(
      <>
    <div className='relative text-white flex justify-evenly items-center w-full h-[70px] '>
        <LinkClick className={`${LinkComponent}`} href='' name='1' />
        <LinkClick className={`${LinkComponent}`} href='login' name='2' />
        <button onClick={()=>{setBottomUp(true);console.log(bottomUp)}} className='flex text-white items-center justify-center rounded-full  absolute  w-[50px] h-[50px] bg-black'><FaPlus/></button>
        <LinkClick className={`${LinkComponent}`} href='' name='3' />
        <LinkClick className={`${LinkComponent}`} href='' name='4' />
    </div>
    
    </>
    )
  } else if (isMobile && bottomUp) {
      return(
        // <div className='bottom-0 fixed w-full h-[500px] bg-white'>
        //   <BottomUp isOpen={bottomUp}/>
        // </div> 
        <BottomUp />
   
      )
  }  

  else {
  return (
    <div className='flex justify-center items-center w-full h-[200px] bg-black text-white'>
        <div className='flex justify-start items-center flex-col w-[50%] bg-black h-full'>
            <div className='flex justify-center items-center h-[50%]'>
                 <Icon ><MdOutlineMail/></Icon>
                 <Icon><FaInstagram/></Icon>
            </div>
            <div className='flex justify-center items-center h-[20%]'>
                <div className='m-2'>Info</div> 
                <div className='m-2'>Support</div>
                <div className='m-2'>Marketing</div>
            </div>
            <div className='text-slate-400'>@ 2024 Clarity Money</div>
        </div>
    </div>
  )
}
}

export default Footer