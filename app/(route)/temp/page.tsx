"use client"
import React, {forwardRef, memo ,useCallback,useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import MyCalendar from '@/components/MyCalendar';
import { useFormState , useFormStatus } from 'react-dom';
import { BsCalendar3 } from "react-icons/bs";
import { Check, ReFresh } from '@/public/icon/icon';
import { expense, profit } from '@/common/literal';
import { BudgetFormSend } from './action';
import debounce from 'lodash/debounce' 
import { useSession } from 'next-auth/react';
import moment from 'moment';





interface Props {
    title : string ; 
    name : string ;
    type? : string ;
    label : string ;
    ref : any;
    checkComplete : ()=>void;
}








const Input= memo(forwardRef<HTMLInputElement,Props>(({checkComplete,title,label,name,type}:Props,ref) => {

    return(
        <>
        <div className='ml-0 m-2 flex justify-center items-center w-full bg-white rounded-2xl h-[50px]'>
            <div className='w-[20%] font-bold'>{title}</div>
            <input onChange={checkComplete} ref={ref}
             className='focus:outline-none pl-6 w-[60%]' placeholder={label} type={type ? type : "text"} name={name} id="" />
        </div>
        </>
    )
}));


const Items = memo(({category,handleCategorySelect}:any) => {
    return(
    category.map((item:any,idx:number)=>{
        return(
            <div onClick={()=>{handleCategorySelect(item.name)}} className={` active:bg-slate-100   flex rounded-lg ${item.selected ? "bg-blue-400" :"bg-slate-100" } justify-center items-center w-[95%] h-[90%]`} key={idx}>
                {item.name}
            </div>
        )
    })
    )
});



const Page = memo(() => {
    const user = useSession()

    const [today, setToday] = useState(moment(new Date).format('YYYY-MM-DD'));

    
    const [type,setType] = useState(false);

    const [isOpen , setIsOpen] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    const ref1 = useRef<HTMLInputElement>(null);
    const ref2 = useRef<any>(null);

    const checkComplete= debounce(()=> {
        if (ref1.current)
        if (ref1?.current?.value?.length >= 1 && ref2?.current?.value?.length >= 1 ) {
            setIsOK(true);
        } else {
            setIsOK(false);
        }
        console.log(isOk);
    },300);



    useEffect(()=>{
        setIsOpen(false);
    },[today])

    useEffect(()=>{
        setCategory(type ? profit : expense)
    },[type])

    const [isOk , setIsOK] = useState(false);

   

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



    const [state , action] = useFormState(BudgetFormSend,null)
    
    const {pending,data}= useFormStatus()

    

  return (

    <motion.form 
    action={async (formData) => {
    const res = await BudgetFormSend(null,formData);
    if (res) {
        console.log(res);
    }
    setCategory(type ? profit : expense);
    formRef?.current?.reset();
    }} 
    ref={formRef}    
    drag="y"
    dragConstraints={{ top: 0, bottom: 0 }}
className={`fixed flex justify-evenly items-center bottom-0 flex-col rounded-t-3xl w-screen h-[90%] z-[500] border-[1px] bg-slate-100 border-slate-100`}
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
                {`${today}`}
                <BsCalendar3 onClick={()=>{setIsOpen(true)}} className='ml-4'/>
                <input  readOnly type="text" name="date" className='hidden' value={today+""} />
                <input  type="text" name="type" className={`${state?.fieldErrors.type} hidden`} value={type+""} readOnly />
                <input  readOnly type="text" name="category" className={`hidden`} value={category.length > 0 && category.filter((item: any) => item.selected).map((item: any) => item.name).join(', ')} />
                <input className='hidden' readOnly name="email" value={user.data?.user?.email+""} type="text" />
            </div>
            <div className='relative w-[90%] desktop:w-[50%]'>
               { isOpen && <MyCalendar today={today} setToday={setToday}/>}
            </div>
        <div className='h-[30%] flex flex-col justify-evenly p-4  w-[90%]'>
            <Input checkComplete={checkComplete} ref={ref1} label='ex) 병원' name="description" title='내용'/>
            <Input checkComplete={checkComplete} ref={ref2} type='number' name="amount" label='KRW' title='금액'/>
        </div>
            <div className={`${state?.fieldErrors.category && 'overflow-auto border-[2px] border-blue-500'} p-1  grid grid-rows-4 grid-cols-3  pl-3  items-center justify-evenly  mb-8 rounded-2xl w-[80%] h-[70%] bg-white`}>
                <Items category={category} handleCategorySelect={handleCategorySelect} />
            </div>
        <div className='p-8 flex-col rounded-t-xl h-[10%] w-full flex justify-evenly  items-center'>
            <div className='flex  justify-center w-full'>
                {isOk && category.length > 0 && category.find((e:any)=>e.selected === true) && 
                <button  disabled={!isOk && pending } type='submit' className={`${ isOk ?  "text-blue-500":"text-black"} w-[40px] h-[40px] mb-4`}>
                    <Check className='w-full h-full'/>
                </button>
                }
                {/* <ReFresh onClick={()=>{}} className=' w-[30px] h-[30px]'/> */}
            </div>
        </div>    
    </motion.form>
  )
})

export default Page;



