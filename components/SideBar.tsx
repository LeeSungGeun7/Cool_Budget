"use client"
import React, { useState } from 'react'



function SideBar() {
    const [onoff,setOnOff] = useState(false);
  
    if (!onoff) {
        return (
        <>
           <button  onClick={()=>{setOnOff(true)}} className='bg-black absolute'></button> 
        </>
        )
    }
  return (
    <>
    <div className='w-[200px] h-full bg-slate-100'>
        <button onClick={()=>{setOnOff(false)}}>X</button>
    </div>
    </>
  )
}

export default SideBar