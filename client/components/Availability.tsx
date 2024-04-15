import React, { useEffect, useState } from 'react';

const TimeSlot = ({ intervalIndex, selectActive }) => {
    const [isSelected, setIsSelected] = useState(false);
  
    const handleMouseEnter = () => {
      if (selectActive) {
        setIsSelected(true);
      }
    };

    const borderClass = intervalIndex % 2 !== 0 ? "border-dashed" : "border-solid";
  
    return (
      <div
        onMouseEnter={handleMouseEnter}
        className={`border-t border-black h-6 ${isSelected ? 'bg-white' : ''} ${selectActive ? 'hover:bg-white' : ''} ${borderClass}`}
      />
    );
  };

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const DayColumn = ({ day, selectActive }) => {
    const intervals = Array.from({ length: 48 }, (_, index) => index);
    
    return (
      <div className="flex flex-col border-y border-l border-black last:border-r">
        <div className="text-center font-bold">{day}</div>
        {intervals.map(interval => (
          <TimeSlot
            key={interval}
            intervalIndex={interval}
            selectActive={selectActive}
          />
        ))}
      </div>
    );
  };

  const WeekGrid = ({ selectActive }) => { // Destructure selectActive directly from props
    return (
        <div className="grid grid-cols-8"> 
            <HourLabels />
            {daysOfWeek.map((day, index) => (
                <DayColumn key={index} day={day} selectActive={selectActive} />
            ))}
        </div>
    );
};

const HourLabels = () => {
    const hours = Array.from({ length: 24 }, (_, index) => `${index}:00`);
    
    return (
      <div className="flex flex-col justify-between h-full py-3">
        {hours.map((hour, index) => (
          <div key={index} className="text-right text-xs pr-2 h-12 leading-6 font-bold">{hour}</div>
        ))}
      </div>
    );
  };

const Page = () => {
    const [select, setSelect] = useState(false);
    const handleEditAvailability = () => {
        setSelect((prevSelect) => !prevSelect);
        console.log(select); // This will log the previous state due to the asynchronous nature of setSelect
      };

  return (
    <div className="p-5">
        <button onClick={handleEditAvailability} className="bg-black text-white">Edit Availability</button>
        <WeekGrid selectActive={select}/>
    </div>
  );
};

export default Page;
