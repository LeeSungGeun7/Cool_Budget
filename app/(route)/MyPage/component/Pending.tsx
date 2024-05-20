"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { HiCheck } from 'react-icons/hi'


function Pending() {
    const route = useRouter();
  const status = useFormStatus()
  

  return (
    <>
    <button disabled={status.pending} type='submit' className='m-1'><HiCheck/></button>
    </>
  )
}

export default Pending