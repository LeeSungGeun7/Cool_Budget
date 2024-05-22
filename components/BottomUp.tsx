"use client"
import { BottomState } from '@/atom/BottomState';
import React, {  memo } from 'react'
import { useRecoilState } from 'recoil';
import Create from './Create';



interface BottomProps {
    isOpen : boolean ; 
    children? : any;
} 



const BottomUp = memo(() => {
    BottomUp.displayName = 'BottomUp';
    
    const isOpen = useRecoilState(BottomState)


    if (isOpen) {
        return (
            <>
            <Create />
            </>
          )
            
    } else {
        return (
            <></>
        )
    }
  
})

export default BottomUp








interface Props {
    title : string ; 
    name : string ;
    type? : string ;
    label : string ;
    ref : any;
    checkComplete : ()=>void;
}















