// "use client"
// import Chart from '@/components/Chart';
// import moment from 'moment';
// import React, { Suspense, useCallback, useState } from 'react';


// const Div = () => {
//   return(
//     <>
//       <div className="h-[100vh] w-full">
//           cd
//       </div>
//     </>
//   )
// }



// const Home = React.memo(() => {
//   const date = moment();

//   const week = date.subtract(7,"day").format('YYYY-MM-DD');

  

//   //const endMonth = date.add(1, 'month').format('YYYY-MM-01') ;



//   const mt = moment();
  
//   // startMonth.subtract(1,'month').format('YYYY-MM-01')

//   const startMonth = moment(mt.format('YYYY-MM-01'))

//   const [month,setMonth] = useState(startMonth);

//   const [type , setType] = useState("expense");



//   const [endMonth,setendMonth] = useState(month.clone().add(1,'month'))

//   const handleMonth = (type:boolean) => {
//     if (type) {
//       const clone = month.clone().add(1 , 'month')
//       if (clone){
//         setMonth(clone);
//         setendMonth(month.clone().add(2,'month'))
//       }     
//     } else {
//       const clone = month.clone().subtract(1, 'month');
//       setMonth(clone);
//       setendMonth(month.clone().subtract(0,'month'))
//     }
    
//   }

//   const handleType =() => {
//     if (type === "expense") {
//       setType("income")
//     } else {
//       setType("expense")
//     }
//     console.log(type);
//   }
    
  
  
  
//   return (
//     <div className="relative w-full  h-screen flex justify-center items-center flex-col">
//       <button onClick={()=>{handleType()}} className='z-[1000] absolute left-6 top-8 bg-slate-200 rounded-xl h-[30px] w-[50px]'>{type ==="expense" ? "지출":"수입"}</button>
//       <div className='relative flex justify-center items-center w-[100%] h-[35%]'>
//         <button className='text-[30px] absolute right-[30%] w-[50px] h-[50px]' onClick={()=>{handleMonth(true)}}>+</button> 
//         <button className='text-[30px] absolute left-[30%] w-[50px] h-[50px]' onClick={()=>{handleMonth(false)}}>-</button>
//           {month.format('YYYY-MM')}
//       </div>
     
//         <Chart endMonth={endMonth} month={month} type={type}/>
//     </div>
//   );
// })
// export default Home;





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









"use client"
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


export const users = [
  {
    name: '메인페이지',
    designation: 'Founder, Algochurn',
    image: 'https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/91434b56-9194-48c9-62d8-25290d8fa400/medium',
    badge: 'Main',
  },
  {
    name: '차트',
    designation: "Founder, Sarah's Kitchen",
    image: 'https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/9d1a2e67-f2ae-4d7d-adc1-73659bbfef00/medium',
    badge: 'chart',
  },
  {
    name: '생성',
    designation: 'Founder, Algochurn',
    image: 'https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/d12d5f29-d7fa-4de7-f6fa-106c54fbba00/medium',
    badge: 'temp',
  },
  {
    name: '관리',
    designation: "Founder, Sarah's Kitchen",
    image: 'https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/e8bfb108-4105-4da1-2bb6-64a319088600/medium',
    badge: 'login',
  },
  // Rest of the users...
];

export const Scroll = () => {
  return (
    <div className="flex flex-col bg-white h-screen w-screen">
      <ScrollCore />
    </div>
  );
};
 const ScrollCore = () => {
  const { scrollYProgress } = useScroll();

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className=" h-[120vh] transform scale-[0.8] p-10 flex items-center justify-center relative ">
      <div
        className=" py-40 w-full relative"
        style={{
          perspective: '1000px',
        }}
      >
         <Header translate={translate} />
        <Card rotate={rotate} translate={translate} scale={scale} />
      </div>
    </div>
  );
};

export const Header = ({ translate }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      <h1 className="m-8 text-4xl font-semibold">
        Welcome <br />{' '}
        <span className="text-5xl lg:text-6xl  font-bold mt-1 leading-none">
           My Budget
        </span>
      </h1>
    </motion.div>
  );
};

export default ScrollCore;


export const Card = ({
  rotate,
  scale,
  translate,
}: {
  rotate: any;
  scale: any;
  translate: any;
}) => {
  const route = useRouter();
  return (
    <motion.div
      style={{
        rotateX: rotate, // rotate in X-axis
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className=" max-w-5xl -mt-12 mx-auto h-[40rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="bg-gray-100 h-full w-full rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden p-4">
        {users.map((user, idx) => (
          <motion.div
            key={`user-${idx}`}
            className="bg-white rounded-md cursor-pointer relative"
            style={{ translateY: translate }}
            whileHover={{
              boxShadow:
                '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            }}
          >
            <div onClick={()=>{if(user.badge ==="Main") return;route.push(`/${user.badge}`); }} className=" absolute top-2 right-2 rounded-full text-xs font-bold hover:bg-black hover:text-white bg-white px-2 py-1">
              {user.badge}
            </div>
            <motion.img
            
              drag 
              whileTap={{
                opacity: 1,
                scale: 1.05,
                boxShadow: "0px 5px 8px #222",
            }}
              whileDrag={{
                scale: 1.1, boxShadow: "0px 10px 16px #222"
              }}
              src={user.image}
              className="h-[90%] rounded-tr-md rounded-tl-md text-sm "
            />
            <div className="flex justify-center items-center p-2 ">
              <h1 className="font-semibold text-sm ">{user.name}</h1>
              {/* <h2 className=" text-gray-500 text-xs ">{user.designation}</h2> */}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};