"use client"
import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 불러오기

function MyCalendar({setToday,today}:any) {
    
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-none w-full max-w-md mx-auto p-4">
        <Calendar locale='ko'  onChange={setToday} value={today} className=" border-none"/>
    </div>
  );
}

export default MyCalendar;

