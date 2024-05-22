"use client"
import React, {  useState } from 'react'
import { useEffect } from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import moment from 'moment';


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

const center = 'flex justify-center items-center w-[33%]'
const List = ({data}:any) => {

  return (
    <>
    <div className='p-8 overflow-y-scroll flex-col  justify-center items-center w-full h-[100%]'>
    {
      data.map((item:Data,idx:number)=>{
        const { category , amount , description ,date} = item;
        const arr = ["월","화","수","목","금","토","일"]
        const dated = moment(date)
        const dateY = dated.day();
        const datedd = dated.format(`DD ${arr[dateY]}`);
        if( !category) {
          return(
            <div>{data}</div>
          )
        }
        return(
          <div key={idx} className=' mt-2 text-slate-800 flex items-center justify-evenly w-[100%] h-[50px] rounded-md bg-blue-50'>
            <div className={`${center} bg-blue-400 text-white rounded-lg  h-[85%] right-0 text-[12px] w-[10%]`}>{datedd+""}</div>
            <div className={`${center}`}>
            {category.name}
            </div>
            <div className={`${center} overflow-hidden`}>{description}</div>
            <div className={`${center}`}>{amount.toLocaleString('ko-KR') +" 원"}</div>
            
          
          </div>
        )
      })

} 
    </div>
    {
     data && data.length <= 0 &&
      <div className='absolute bottom-0 z-[-1] left-1/2 transform -translate-x-1/2 -translate-y-1/1  flex justify-center items-center w-full bg-slate-100 h-[200px]'>내역이 없어요 </div>
    }
    </>
  )
}
  
  

const Chart = React.memo(({month,type,endMonth}:Props) => {
    const [loading, setLoading] = useState(true);

    

    const fetchData = async (type?:string) => {
      setLoading(true)
      const data:any = await fetch('/api/budget',{
       method:"POST",
       headers: {'Content-Type' : 'application/json'},
       body: JSON.stringify({
          type: type,
          month : month,
          endMonth: endMonth
       })
       ,
       cache : "no-cache" ,
       next : { tags : ["transaction"]} 
    },

      );
      const res:Data = await data.json();
      setLoading(false)
      setData(res);
      return  res;  
    }

    
 
    // 데이터 상세여부 
    const [detailData,setDetailData] = useState(false);

    const [data,setData] = useState<any>([]);
    
   
  
  
    const Options = {};
    const dict:Record<string,number> =  {}
    const labels = data?.map((data:Data)=>{ data.category.name in dict ? dict[data.category.name] += data.amount : dict[data.category.name] = data.amount }); 
    const categoryName = data?.map((data:Data)=>{return data.description}); 
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

    const detailChartData = {
      labels: categoryName ,
      datasets: [
        {
          data: amounts ,
          backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
          borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
        },
      ],
    };

    const sortedArray = Object.entries(dict)
    .sort((a, b) => b[1] - a[1]) // 값을 기준으로 내림차순 정렬
    .map(([key, value]) => ({ [key]: value })); // 원하는 형식의 배열로 반환


    console.log("리렌더링");
    
    useEffect(()=>{
    fetchData(type);


    },[month,type])
    
  
    return (
      <>
      <button onClick={()=>{setDetailData(!detailData)}}>{detailData ?"상세 데이터" : "카테고리별 항목"}</button>
      <div className=' flex  p-4 overflow-scroll flex-col justify-center items-center w-full h-[100%]'>
          {
            !loading ? 
                 <Doughnut className='h-full w-full'  data={detailData? detailChartData : Data} options={Options}></Doughnut>
            :
            <Skeleton  circle className='z-[100] rounded-full w-[300px] h-[500px] 'width={300} height={300}></Skeleton>
             }      
        </div>
        <List  data={data}/>
        </> 
  
    )
  })
  
export default Chart;



// "use client"
// import React, { Suspense, use, useState } from 'react'
// import { useEffect, useRef } from 'react';
// import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
// import {Doughnut} from "react-chartjs-2";
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css'


// interface Data {
//     category : {
//       name : string ; 
//       type : string ;
//     } 
//     amount : number ;
//     description: string ;
//     date : Date;

//   }

  
  
  
//   ChartJS.register(ArcElement, Tooltip, Legend);
  
// interface Props {
//   type : string ;
//   month?: any
//   endMonth? : any
// }


// const List = ({data}:any) => {
//   console.log(data);
//   return (
//     <>
//     <div className='p-8 overflow-y-scroll flex-col  justify-center items-center w-full h-[100%]'>
//     {
//       data.map((item:Data)=>{
//         const { category , description} = item;
//         return(
//           <div className='mt-2 flex justify-center w-[100%] h-[200px] bg-red-50'>{category.name + description}</div>
//         )
//       })

// } 
//     </div>
//     {
//       data.length <= 0 &&
//       <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex justify-center items-center w-full bg-slate-100 h-[400px]'>내역이 없어요 </div>
//     }
//     </>
//   )
// }
  
  

// const Chart = ({month,type,endMonth}:Props) => {
//     const [loading, setLoading] = useState(true);
//     const fetchData = async (type?:string) => {
//       setLoading(true);
//       const data:any = await fetch('/api/budget',{
//        method:"POST",
//        headers: {'Content-Type' : 'application/json'},
//        body: JSON.stringify({
//           type: type,
//           month : month,
//           endMonth: endMonth
//        })
//        ,
//        cache : "force-cache" ,
//        next : { tags : ["transaction"]} 
//     },

//       );
//       const res:Data = await data.json();
//       setLoading(false);
//       setData(res);
//       return  res;  
//     }

    
//     const [data,setData] = useState<any>([]);
    
   
  
//     const dict:Record<string,number> =  {}
  
  
//     const Options = {};
//     const labels = data?.map((data:Data)=>{ data.category.name in dict ? dict[data.category.name] += data.amount : dict[data.category.name] = data.amount }); 
//     const amounts = data?.map((data:Data)=>{return data.amount});
//     const Data = {
//       labels: Object.keys(dict) ,
//       datasets: [
//         {
//           data: Object.values(dict) ,
//           backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
//           borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba"],
//         },
//       ],
//     };
    
    
//     useEffect(()=>{
//     fetchData(type);
//       console.log(labels);
    
//     },[type,month])  
    
  
//     return (
//       <>
//       <div className=' flex  p-4 overflow-scroll flex-col justify-center items-center w-full h-[100%]'>
//           {
//             !loading ? 
//             // <div className='w-[20%] h-[100%]'>
//                  <Doughnut className='h-full w-full'  data={Data} options={Options}></Doughnut>
//             // </div> 
//             :
//             <Skeleton  circle className='rounded-full w-[300px] h-[500px] 'width={300} height={300}></Skeleton>
//              }      
//         </div>
//         <List data={data}/>
//         </> 
  
//     )
//   }
  
// export default Chart;