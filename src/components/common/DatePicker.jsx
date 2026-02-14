import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DatePicker = ({ selectedDate, onDateSelect, minDate = new Date(), disabledDates = [] }) => {
    const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

    const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    ).getDay();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const isDateDisabled = (date) => {
        const dateStr = date.toDateString();
        const minDateStr = minDate.toDateString();

        if (date < minDate && dateStr !== minDateStr) return true;

        return disabledDates.some(disabledDate =>
            disabledDate.toDateString() === dateStr
        );
    };

    const isDateSelected = (date) => {
        return selectedDate && date.toDateString() === selectedDate.toDateString();
    };

    const handleDateClick = (day) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        if (!isDateDisabled(date)) {
            onDateSelect(date);
        }
    };

    const renderDays = () => {
        const days = [];

        // Empty cells for days before month starts
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const disabled = isDateDisabled(date);
            const selected = isDateSelected(date);
            const isToday = date.toDateString() === new Date().toDateString();

            days.push(
                <motion.button
                    key={day}
                    type="button"
                    onClick={() => handleDateClick(day)}
                    disabled={disabled}
                    whileHover={!disabled ? { scale: 1.1 } : {}}
                    whileTap={!disabled ? { scale: 0.95 } : {}}
                    className={`
                        p-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${disabled
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'hover:bg-primary-50 cursor-pointer'
                        }
                        ${selected
                            ? 'bg-primary-600 text-white hover:bg-primary-700'
                            : 'text-gray-700'
                        }
                        ${isToday && !selected
                            ? 'border-2 border-primary-600'
                            : ''
                        }
                    `}
                >
                    {day}
                </motion.button>
            );
        }

        return days;
    };

    const canGoPrevious = () => {
        const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
        const minMonthYear = new Date(minDate.getFullYear(), minDate.getMonth());
        return prevMonth >= minMonthYear;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <motion.button
                    type="button"
                    onClick={previousMonth}
                    disabled={!canGoPrevious()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-lg transition-colors ${canGoPrevious()
                            ? 'hover:bg-gray-100 text-gray-700'
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                >
                    <FaChevronLeft />
                </motion.button>

                <h3 className="text-lg font-bold text-gray-900">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>

                <motion.button
                    type="button"
                    onClick={nextMonth}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                >
                    <FaChevronRight />
                </motion.button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-600 p-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {renderDays()}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded border-2 border-primary-600"></div>
                    <span className="text-gray-600">Today</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-primary-600"></div>
                    <span className="text-gray-600">Selected</span>
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
