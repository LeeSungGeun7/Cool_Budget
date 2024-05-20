import Image from 'next/image'
import React from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import { HiCheck } from 'react-icons/hi'

function A({children}:any) {
  return (
    <div className='w-[full] relative'>
        {children}
        <BsPencilSquare className='text-[20px] text-black  absolute right-1 bottom-[1]'/>
        <HiCheck className='text-[20px] absolute right-[-20px] bottom-[1]'/>
        
    </div>
  )
}

export default A