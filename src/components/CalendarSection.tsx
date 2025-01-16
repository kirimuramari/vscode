import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import formatDate from "../utils/formatDate";

interface CalendarSectionProps {
    onDateSelect: (date: Date) => void;
    registeredDates: string[]; // 登録済みの日付リスト
}
const CalendarSection: React.FC<CalendarSectionProps> = ({ onDateSelect, registeredDates }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [value, setValue] = useState<Date | null>(null);
    const [today, setToday] = useState<Date | null>(null);
//Unhandled Runtime Error対策
useEffect(() => { 
    setToday(new Date());
}, []);
const isRegisteredDate = (date: Date) => {
    if (!Array.isArray(registeredDates) || !registeredDates) {
        return false;
    }
    const formattedDate = date.toISOString().split("T")[0];
    return registeredDates.includes(formattedDate); 
	console.log(formattedDate,registeredDates);
};

// 日付変更ハンドラー
const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date); // 親に選択した日付を渡す
};
    if (!today) {
        return <div>Loading...</div>; // プレースホルダー表示
    }

    return (
        <div className="w-1/4 bg-white p-4 shadow-md">
        <div className="calendar-section">
            <p className="mb-4 text-gray-700">{formatDate(today)}</p>
            <Calendar 
                onChange={(date: Date) => {
                    setValue(date);
                    onDateSelect(date);
                }}
                value={value}
                tileClassName={({ date }) =>
                    isRegisteredDate(date) ? "registered-date" : ""
                }
            />
            <style jsx>{`
                .registered-date {
                    background-color: rgba(255, 115, 0, 0.81) !important;
                    color: #000;
                }
            `}</style>
        </div>    
 </div>
    );
};
export default CalendarSection;