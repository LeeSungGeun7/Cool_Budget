"use client"
import React, { Suspense, use, useState } from 'react'
import { useEffect, useRef } from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


interface Data {
    category : {
      name : string ; 
      type : string ;
    } 
    amount : number ;
    description: string ;
    date : Date;

  }

  
  
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
interface Props {
  type : string ;
  month?: any
  endMonth? : any
}


const List = ({data}:any) => {
  console.log(data);
  return (
    <>
    <div className='p-8 overflow-y-scroll flex-col  justify-center items-center w-full h-[100%]'>
    {
      data.map((item:Data)=>{
        const { category , description} = item;
        return(
          <div className='mt-2 flex justify-center w-[100%] h-[200px] bg-red-50'>{category.name + description}</div>
        )
      })

} 
    </div>
    {
      data.length <= 0 &&
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex justify-center items-center w-full bg-slate-100 h-[400px]'>내역이 없어요 </div>
    }
    </>
  )
}
  
  

const Chart = ({month,type,endMonth}:Props) => {
    const [loading, setLoading] = useState(true);
    const fetchData = async (type?:string) => {
      setLoading(true);
      const data:any = await fetch('/api/budget',{
       method:"POST",
       headers: {'Content-Type' : 'application/json'},
       body: JSON.stringify({
          type: type,
          month : month,
          endMonth: endMonth
       })
       ,
       cache : "force-cache" ,
       next : { tags : ["transaction"]} 
    },

      );
      const res:Data = await data.json();
      setLoading(false);
      setData(res);
      return  res;  
    }

    
    const [data,setData] = useState<any>([]);
    
   
  
    const dict:Record<string,number> =  {}
  
  
    const Options = {};
    const labels = data?.map((data:Data)=>{ data.category.name in dict ? dict[data.category.name] += data.amount : dict[data.category.name] = data.amount }); 
    const amounts = data?.map((data:Data)=>{return data.amount});
    const Data = {
      labels: Object.keys(dict) ,
      datasets: [
        {
          data: Object.values(dict) ,
          backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
          borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
        },
      ],
    };
    
    
    useEffect(()=>{
    fetchData(type);
      console.log(labels);
    
    },[type,month])  
    
  
    return (
      <>
      <div className=' flex  p-4 overflow-scroll flex-col justify-center items-center w-full h-[100%]'>
          {
            !loading ? 
            // <div className='w-[20%] h-[100%]'>
                 <Doughnut className='h-full w-full'  data={Data} options={Options}></Doughnut>
            // </div> 
            :
            <Skeleton  circle className='rounded-full w-[300px] h-[500px] 'width={300} height={300}></Skeleton>
             }      
        </div>
        <List data={data}/>
        </> 
  
    )
  }
  
export default Chart;