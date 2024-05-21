"use client"
import React, { memo ,useCallback,useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Calendar from 'react-calendar';
import MyCalendar from '@/components/MyCalendar';
import { useFormState } from 'react-dom';
import { BsCalendar3 } from "react-icons/bs";
import { Check, ReFresh } from '@/public/icon/icon';
import { expense, profit } from '@/common/literal';



interface BottomProps {
    isOpen : boolean ; 
    children? : any;
    setIsOpen : () => void
} 

interface Props {
    title : string ; 
    name : string ;
    type? : string ; 

}

const Input= memo(({title,name,type}:Props) => {
    
    return(
        <>
        <div className='ml-0 m-2 flex justify-center items-center w-full bg-white rounded-2xl h-[50px]'>
            <div className='w-[20%] font-bold'>{title}</div>
            <input  className='focus:outline-none pl-6 w-[60%]' placeholder={name} type={type ? type : "text"} name="" id="" />
        </div>
        </>
    )
});


const Items = memo(({category,handleCategorySelect}:any) => {
    return(
    category.map((item:any,idx:number)=>{
        return(
            <div onClick={()=>{handleCategorySelect(item.name)}} className={` active:bg-slate-100   flex rounded-lg ${item.selected ? "bg-blue-400" :"bg-slate-100" } justify-center items-center w-[80px] h-[50px]`} key={idx}>
                {item.name}
            </div>
        )
    })
    )
});

const BottomUp = memo(({isOpen,setIsOpen}:BottomProps) => {
    const [today, setToday] = useState(new Date()); 

    const [type,setType] = useState(false);

    const [isOpens , setIsOpens] = useState(false);

    const formRef = useRef(null);



    useEffect(()=>{
        setIsOpens(false);
    },[today])

    useEffect(()=>{
        setCategory(type ? profit : expense)
    },[type])

    const [category ,setCategory] = useState<any>(type ? profit : expense);

    const handleCategorySelect= (name:any) => {
        const newCategory = category.map((item: any) => {
            if (item.name === name) {
              return { ...item, selected: !item.selected };
            } else {
              return { ...item, selected: false };
            }
          });
          setCategory(newCategory);
    };

    if (isOpen) {
        return (
            <motion.form 
    ref={formRef}    
    drag="y"
    dragConstraints={{ top: 0, bottom: 0 }}
    className='fixed flex justify-evenly items-center bottom-0 flex-col rounded-t-3xl w-screen h-[90%] z-[500] border-[1px] bg-slate-100 border-slate-100 '
    initial={{y: '100%'}}
    animate={{ y: 0 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    >

        <div className='m-4 w-[150px] h-[40px] rounded-2xl bg-white' >
            <AnimatePresence>   
                    <motion.button
                    key={1} 
                    type="button"
                    transition={{damping:10 , duration:1, type:"spring"}}
                    onClick={()=>{setType(true)}} className={` rounded-full ${type ? "bg-black text-white": "bg-white"} w-[50%] h-full`}>Income</motion.button>
                    <motion.button
                    key={2}
                    type="button" 
                    onClick={()=>{setType(false)}} className={`rounded-full ${type ?  "bg-white": "bg-black text-white"}  w-[50%] h-full`}>Expense</motion.button>
            </AnimatePresence>
        </div>

        <div className='m-4 flex items-center'>
                {`${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`}
                <BsCalendar3 onClick={()=>{setIsOpens(true)}} className='ml-4'/>
            </div>
            <div className='relative w-[90%] desktop:w-[50%]'>
               { isOpens && <MyCalendar today={today} setToday={setToday}/>}
            </div>
        <div className='h-[30%] flex flex-col justify-evenly p-4  w-[90%]'>
            <Input  name='병원' title='내용'/>
            <Input  type='number' name='KRW' title='금액'/>
        </div>
            <div className=' grid grid-rows-3 grid-cols-3  pl-4  items-center justify-evenly  mb-8 rounded-2xl w-[80%] h-[70%] bg-white'>
                <Items category={category} handleCategorySelect={handleCategorySelect} />
            </div>
        <div className='p-8 flex-col rounded-t-xl h-[10%] w-full flex justify-evenly  items-center'>
            <div className='flex justify-between w-full'>
                <div onClick={()=>{setIsOpen}}>X</div>
                <Check className={`"text-black" w-[30px] h-[30px]`}/>
                <ReFresh onClick={()=>{}} className=' w-[30px] h-[30px]'/>
            </div>
        </div>    
    </motion.form>
  )
            
    } else {
        return (
            <></>
        )
    }
  
})

export default BottomUp