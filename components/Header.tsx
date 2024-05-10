"use client"
import useIsMobile from '@/use/useIsMobile';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'








function Header() {
  const userIconRef = useRef<HTMLImageElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const route = useRouter();

  const handleOutsideClick = (event:any) => {  
    if (userIconRef.current) {
    
    
  const isClickInsideUserIcon = userIconRef.current?.contains(event.target);
  const isClickInsideMenu = menuRef.current?.contains(event.target);
  
    
    if (!isClickInsideUserIcon && !isClickInsideMenu) {
      setMenuVisible(false);
    }
  }
  };
  useEffect(() => {
    console.log("dd");
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

    const isMobile = useIsMobile();
    const { data : user } = useSession();
    const [menuVisible , setMenuVisible] = useState(false) 
    
   if (isMobile) {
     return (
        <></>
     )
   }
   else {
  return (
    <div className={`text-[14px] flex justify-between items-center w-full h-[70px] border-b-[0.5px] border-slate-300 bg-white text-black`}>

      <div className='p-1 m-4 flex justify-start items-center h-full w-[50%]'>
        <div onClick={()=>{route.push('/')}} className='flex justify-center items-center text-white rounded-full w-[60px] h-[90%] bg-black'>
          BETs
        </div>
        {/* <div className='w-[60px] m-4'> 베스트버겟 </div> */}
      </div>
      
      <div className='m-4 flex w-[100%] mob:w-[auto] justify-evenly items-center group relative'>
        <div className='text-black '>
          <Link className='m-2' href="">대시보드</Link>
          <Link className='m-2' href="">차트</Link>
          <Link className='m-2' href="">분석</Link>
        </div>
        { user?.user ? 
        <Image 
        ref={userIconRef}
        onClick={()=>{setMenuVisible(!menuVisible)}} className='group-hover:visible rounded-full m-2 w-[40px] h-[80%]' alt='' width={100} height={100}  src={`${user?.user?.image ? `${user?.user.image}` : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAWlBMVEXZ3OFveH/c3+RrdHtpcnlncXjIzNHS1tve4eaGjZTFyc96gonW2d7N0daUm6GssbeOlZuboqeyt728wcZ0fYShp614gYiKkZiRmZ63vMGCiZC/xMmYn6WgpqxjXxUbAAAFrElEQVR4nO2dW5uiMAyGJVQpAoIKzqjs//+bW2Qcz0pp2qZM3ouZ3bnie9KkSQ/pbMYwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDPNnAcXtPyaFnCXbZpXu6qjepatmm6i/TAiYLZqDEHEc9cSxEIdmMZuKJSHfpL/iLsRxusmnoBFm5U48yOsRuzJ8O8p99krfSWO2D9sfIane6TtprJKAzSi30aP/PfhjtA3WjNDMP+rrmDehWnE1TKCSuPL9qeNIP7ngBZH6/tgxpJ9d8EIcoMQvHYFK4pfvD9YEVnoClcRVUOFGlsN98IwoA5o0YKsvUEnchmPFpB4hMIrqxPeHDwW+dZ2wJ/4OxIiwHTrT3zMPZZyOG6Mdte9PH4RsxoSZHtGEEE/zcU7YE+e+P/8zsjFSGIARcwN9HeSNCKWJCZURS/LhNDO0YeZbwAdgaWZCZcQlbSPKtbHCNfFYYzpIyQ/ThakJlREXvkW8A0bUhfcI0tFUVgg2rCg7Yn4wFhhFB8qTfoEgMIoK3zJeA8uxleE1c8IzIuzNA40KNXvCCg2T0h7KqSkYVU6/Cglv1JjnbCeFhPM2VsgKA1D4D0XhP7oKpx9L/8B8uEHJaTaEFY7aVXtQSHj3YvqZ96xA8UPC1dPYrdFbaG+UotT4vkW8Q2ofwXgkXtGd8HEmRMrTYRdMEVYTKYdSlFBDO9DMIDVWmJI2IYIj0nbDzhGNbUjbDZVE0xnxQFzgX9jlTgxtSDuSdpilNbQTmh8WJpO+IL09+oPJHiLtvcNfCoNzbZRLwwvjj+6FcXCvY+yBDOLHMC6MPTZE/bDQFWOO6od2WH894jbCOhgLdsBKV6II60aJotWTKFrfH6zN0MuHPUFeQRx0gbQn1GukkFQD75CGexVYHt9e5O4R2TFIA/YA7A9Pmg1cjc/4sA+8SQbI5TqLn6pUf83WSxm2vg6Qs2VZZXHXF6OTevqp/pNV5XI2AX0nAGReHDdN+119pV/Vd9tsjkUuAx+eD4DS2Ynqf01MHMMwDMMwf4Quo4EL08pqVOqdJ8t92bQqK00PqcpM26bcL5N8Aom3slSy2LRpLeY/lcVP2aSqi7mo03azSAK2piooVNm0U4XS6wJYiJ0qovIQbankbdsXpe9jIdxuQxMJcGzrN7Z7tGXdHgMarTIvswHGuzdlVuZhLEnJotWWdxbZFvQ1QrGaG+xyz1cF7bEKRavhfU81ipawRsibwQv5bzRGDdXGrbB/2YpVD7EjeYtUFh9blWporOiFHLlBGKAX4mhDSyLkiAbsERUlb5THGtOAPXFNZ08KoxvGM+h0yBjca1YXGr1pIdHoNauLSP3vDkOR4bvghTjzneHAwkKMuZFYL7xKRDia/xmfp92cCPQpERC6Qg0h9jVQAaffzhA8hZtk50zhzs8dBa2W5GZ4aWiu37HbSKL7s5njjgGPx/kBYji6tGBHfHRrRZRr6Xq4vVsKmu8CYBB/OTSiLG3VS++YO3RFlOYQ+rhrJyEdzoQ3ClNHRsTpQjMGV51rcvdx9EztpC0mTkOvcThpA+aqZHoh0UEhBQhtZg0UVtYVuk/X7iRaT958ZDM3Cm1nNuY9140lWl618euFJ4WWPdHgnjYWdu97g8e58Exs9a6p6fMcOFhMbPxlpNfYzE4lRjs2cw72UrfCR+H7yNxarMFpwGqOvRau0vx5DhwyW8PUa1Vxja1HPnB66GJgq5mUNO82h4WlBRvTHleYWFkdhi2VQaqGqZVWw2ZPxuFi5wE6Qm5oyREdbvl+xsamsN81tntsrLnhvCGDhY23aHDePcDCxvsJGM9x4WGlOR+N2vCMhabfpEKplWDq7gDUMPCrYKOmnfjgtwGFIzGF6PsXtKZDGxMinfK3B78IprIKdQZ/NWr6CmklbTbSNp/nE54x/MzCf1KbVTlwOOGiAAAAAElFTkSuQmCC"}`} />
        : <Link className='flex justify-center items-center m-2 text-white rounded-sm bg-black h-[20px] w-[40px]' href={'/login'}>Login</Link>
        }
       
        {
          menuVisible &&
          <ul ref={menuRef} className='top-[60px] flex justify-evenly items-center flex-col rounded-lg  bg-slate-100 w-[90px] h-[auto] absolute  right-0'>
            <div onClick={()=>{signOut()}} className='flex justify-center items-center hover:text-blue-500 h-[30px]'>로그아웃</div>
            <li className='flex justify-center items-center  hover:text-blue-400 h-[30px]'>마이페이지</li>
            <li className='flex justify-center items-center  hover:text-blue-300 h-[30px]'>내 대시보드</li>
          </ul>
        }
       
      </div>
      

          
    </div>
  )
}
}

export default Header

