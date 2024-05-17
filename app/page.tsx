"use client"
import Chart from '@/components/Chart';
import moment from 'moment';
import React, { Suspense, useState } from 'react';


const Div = () => {
  return(
    <>
      <div className="h-[100vh] w-full">
          cd
      </div>
    </>
  )
}



const Home = () => {
  const date = moment();

  const week = date.subtract(7,"day").format('YYYY-MM-DD');

  

  //const endMonth = date.add(1, 'month').format('YYYY-MM-01') ;



  const mt = moment();
  
  // startMonth.subtract(1,'month').format('YYYY-MM-01')

  const startMonth = moment(mt.format('YYYY-MM-01'))

  const [month,setMonth] = useState(startMonth);

  const [endMonth,setendMonth] = useState(month.clone().add(1,'month'))

  const handleMonth = (type:boolean) => {
    if (type) {
      const clone = month.clone().add(1 , 'month')
      if (clone){
        setMonth(clone);
        setendMonth(month.clone().add(2,'month'))
      }     
    } else {
      const clone = month.clone().subtract(1, 'month');
      setMonth(clone);
      setendMonth(month.clone().subtract(0,'month'))
    }
    
  }

    
  




  
  
  return (
    <div className=" w-full  h-screen flex justify-center items-center flex-col">
      <div className='relative flex justify-center items-center w-[100%] h-[35%]'>
        <button className='text-[30px] absolute right-20 w-[50px] h-[50px]' onClick={()=>{handleMonth(true)}}>+</button> 
        <button className='text-[30px] absolute left-20 w-[50px] h-[50px]' onClick={()=>{handleMonth(false)}}>-</button>
          {month.format('YYYY-MM')}
      </div>
     
        <Chart endMonth={endMonth} month={month} type="expense"/>
    </div>
  );
}
export default Home;





// "use client"
// import React, { Suspense, useState } from 'react'
// import { Chart as chart } from 'chart.js/auto';
// import { useEffect, useRef } from 'react';
// import { TransactionData } from "@/type/transaction/type";

// import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
// import {Doughnut} from "react-chartjs-2";
// import moment from 'moment';
// import { handleClientScriptLoad } from 'next/script';


// interface Data {
//   category : {
//     name : string ; 
//     type : string ;
//   } 
//   amount : number ;
//   description: string ;
//   date : Date;
// }


// ChartJS.register(ArcElement, Tooltip, Legend);






// function Chart() {
//   const fetchData = async (type?:string) => {
//     const data:any = await fetch('/api/budget',{
//      method:"POST",
//      headers: {'Content-Type' : 'application/json'},
//      body: JSON.stringify({
//         type: type
//      })
//      ,
//      cache : "force-cache" ,
//      next : { tags : ["transaction"]} 
//   } ,
        
//     );
//     const res:Data = await data.json();
//     setData(res);
//     return  res;  
//   }  
  
//   const [data,setData] = useState<any>([]);
  
//   const sum = () => {
//     console.log(data);
//     const sum = (data?.reduce((sum:number, transaction:any) => sum + transaction.amount, 0));
//     return sum 
//   }

//   const dict:Record<string,number> =  {}


//   const Options = {};
//   const labels = data?.map((data:Data)=>{ data.category.name in dict ? dict[data.category.name] += data.amount : dict[data.category.name] = data.amount }); 
//   const amounts = data?.map((data:Data)=>{return data.amount});
//   const Data = {
//     labels: Object.keys(dict) ,
//     datasets: [
//       {
//         data: Object.values(dict) ,
//         backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
//         borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
//       },
//     ],
//   };
  
//   const [type,setType] = useState("expense");


//   useEffect(()=>{
//     fetchData(type);
//     console.log(labels);
  
//   },[type])  

//   const date = moment();

//   const week = date.subtract(7,"day").format('YYYY-MM-DD');

  

//   const endMonth = date.add(1, 'month').format('YYYY-MM-01') ;



//   const startMonth = moment();
//   const [month,setMonth] = useState(startMonth);
  

//   const handleMonth = (type:boolean) => {
//     if (type) {
//       const clone = month.clone().add(1 , 'month')
//       if (clone){
//         setMonth(clone);
//       }     
//     } else {
//       const clone = month.clone().subtract(1, 'month');
//       setMonth(clone);
//     }
//   }

  
  

//   console.log(startMonth,endMonth);




//   const center = 'flex justify-center items-center'

  

//   return (
    
//     <div className='flex m-4 overflow-scroll flex-col justify-center items-center w-full h-screen' onClick={()=>{sum()}}>
//       <button className='w-[20px] h-[20px]' onClick={()=>{handleMonth(true)}}>+</button> 
//       <button className='w-[20px] h-[20px]' onClick={()=>{handleMonth(false)}}>-</button>
//       {month.format('YYYY-MM-DD')}
       

//         <div className={`${center} w-[50%] h-[25%]`}>
//             <button onClick={()=>{setType("expense")}} className='m-2'>지출</button>
//             <button onClick={()=>{setType("income")}} className='m-2'>수입</button>
//         </div>
//         {
//           labels && 
//           <div className='w-[50%] h-[50%]'>
//                <Doughnut  data={Data} options={Options}></Doughnut>
//           </div>

// }         
//           <div className={`${center} w-[50%] h-[20%]`}>
//               {/* {
//                 dict.map((e,idx)=>{
//                   return(
//                     <div key={idx}>{e}</div>
//                   )
//                 })
//               } */}
//           </div>
//       </div>

//   )
// }

// export default Chart