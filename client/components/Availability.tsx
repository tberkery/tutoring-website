import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useUser } from '@clerk/clerk-react';


const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const api = process.env.NEXT_PUBLIC_BACKEND_URL;

const TimeSlot = ({ intervalIndex, selectActive, isSelected, onToggle }) => {
    const borderClass = intervalIndex % 2 !== 0 ? "border-dashed" : "border-solid";
    const backgroundColor = isSelected ? "bg-green-200" : "bg-white"; // Toggle background based on selection
    return (
      <div
        className={`border-t border-black h-6 ${borderClass} ${backgroundColor} cursor-pointer`}
        onClick={() => onToggle(intervalIndex)}
      />
    );
};

const DayColumn = ({ day, selectActive, selections, onToggle }) => {
    const intervals = Array.from({ length: 48 }, (_, index) => index);
    
    return (
      <div className="flex flex-col border-y border-l border-black last:border-r">
        <div className="text-center font-bold">{day}</div>
        {intervals.map(interval => (
          <TimeSlot
            key={interval}
            intervalIndex={interval + daysOfWeek.indexOf(day) * 48} // Calculate global index based on day and local index
            selectActive={selectActive}
            isSelected={selections[interval + daysOfWeek.indexOf(day) * 48]}
            onToggle={onToggle}
          />
        ))}
      </div>
    );
};

const WeekGrid = ({ selectActive, selections, onToggle }) => {
    return (
        <div className="grid grid-cols-8"> 
            <HourLabels />
            {daysOfWeek.map((day, index) => (
                <DayColumn key={index} day={day} selectActive={selectActive} selections={selections} onToggle={onToggle} />
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
    const [selections, setSelections] = useState(new Array(336).fill(false));
    const { isLoaded, isSignedIn, user } = useUser();
    const [userId, setUserId] = useState('');

    const fetchData = async () => {
        if (!isLoaded || !isSignedIn) {
          return false;
        }
        const userInfo = await axios.get(`${api}/profiles/getByEmail/${user.primaryEmailAddress.toString()}`);
        console.log('UserInfo: ', userInfo.data.data[0])
        const userId = userInfo.data.data[0]._id;
        setUserId(userId);
    }

    useEffect(() => {
        fetchData();
    }, [api, user, isLoaded, isSignedIn]);





    const handleEditAvailability = () => {
        setSelect((prevSelect) => !prevSelect);
    };

    const toggleSelection = async (index) => {
        const newSelections = [...selections];
        newSelections[index] = !newSelections[index];
        setSelections(newSelections);

        const trueIndices = selections.reduce((acc, curr, index) => {
            if (curr) {
                acc.push(index);
            }
            return acc;
        }, []);
        console.log('trueIndices:....\n\n')
        console.log(trueIndices);



        const updateAvailabilityResponse = await axios.put(`${api}/profiles/availability/${userId}`, {
            availability: trueIndices
        });

        console.log(updateAvailabilityResponse);


    };

    return (
    <div className="p-5">
        <button onClick={handleEditAvailability} className="h-10 rounded bg-blue-600 p-2 my-2 text-white">
            {select ? 'Save' : 'Edit'}
        </button>
        <WeekGrid selectActive={select} selections={selections} onToggle={toggleSelection} />
    </div>
    );
};

export default Page;