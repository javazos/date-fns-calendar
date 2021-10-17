import {format, isSameMonth, isSameDay } from 'date-fns'
import { takeMonth } from "../modules/calendar";
import React ,{useState} from "react";

function WeekNames() {
    function tCornerClassName(i){
        if (i === 0 ) return "rounded-tl-lg"
        if (i === 6 ) return "rounded-tr-lg"
    
    }
  return (
    <div className={"grid grid-cols-7"}>
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName, i) => (
        <div
          className={
            `bg-blue-200 h-16 w-16 flex items-center justify-center border border-blue-200 ${tCornerClassName(i)}`
          }
        >
          {dayName}
        </div>
      ))}
    </div>
  );
}
export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())
   
  const data = takeMonth(selectedDate)();

  function dayColor(day){
      if(!isSameMonth(day, selectedDate)) return "text-gray-400"
      if(isSameDay(day, selectedDate)) return "bg-pink-400"
  }
  
function bCornerClassName(wi, di){
    if(wi!==data.length-1) return

    if (di === 0 ) return "rounded-bl-lg"
    if (di === 6 ) return "rounded-br-lg"

}
  return (
    <div className={"bg-white box-border m-8 flex"}>
      <div className={"border rounded-xl"}>
          <h1 className='flex w-full items-center justify-center font-bold text-4xl mb-2 text-gray-800'>
              {format(selectedDate, 'MMMM')}  {format(selectedDate, 'yyyy')}
          </h1>
          <WeekNames/>
          {
              data.map(
                  (week, weekIndex) =>   <div className={"grid grid-cols-7"}> 
                             { week.map((day, dayIndex) => <div 
                             onClick={()=>setSelectedDate(day)}
                             className={`h-16 w-16 flex items-center justify-center border border-blue-200 ${dayColor(day)} ${bCornerClassName(weekIndex, dayIndex)}`}> {format(day,'dd')} </div> )} 
                            </div>
              )
          }
      </div>
    </div>
  );
}
