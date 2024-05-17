"use client"
import moment from 'moment';
import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 불러오기


function MyCalendar({setToday,today}:any) {
   const locale = 'fr-CA'; 
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-none w-full max-w-md mx-auto p-4">
        <Calendar locale='ko'  onChange={(date:any)=>{setToday(moment(date).format('YYYY-MM-DD'))}} value={moment(today, 'YYYY-MM-DD').toDate()} className=" border-none"
          formatDay={(locale, date) => moment(date).format("DD")}
          
        />
    </div>
  );
}

export default MyCalendar;

