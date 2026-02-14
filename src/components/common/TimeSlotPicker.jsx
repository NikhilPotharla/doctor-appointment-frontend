import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaCheck } from 'react-icons/fa';

const TimeSlotPicker = ({
    slots = [],
    selectedSlot,
    onSlotSelect,
    loading = false
}) => {
    const formatTime = (time) => {
        // Convert 24h format to 12h format
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const isSlotSelected = (slot) => {
        return selectedSlot &&
            selectedSlot.start_time === slot.start_time &&
            selectedSlot.end_time === slot.end_time;
    };

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[...Array(8)].map((_, index) => (
                    <div
                        key={index}
                        className="h-14 bg-gray-200 rounded-lg animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (slots.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <FaClock className="text-gray-400 text-4xl mx-auto mb-3" />
                <p className="text-gray-600 font-medium">No available slots for this date</p>
                <p className="text-gray-500 text-sm mt-1">Please select another date</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    Available Time Slots
                </h3>
                <span className="text-sm text-gray-600">
                    {slots.length} slot{slots.length !== 1 ? 's' : ''} available
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {slots.map((slot, index) => {
                    const selected = isSlotSelected(slot);
                    const disabled = slot.is_booked || false;

                    return (
                        <motion.button
                            key={index}
                            type="button"
                            onClick={() => !disabled && onSlotSelect(slot)}
                            disabled={disabled}
                            whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
                            whileTap={!disabled ? { scale: 0.95 } : {}}
                            className={`
                                relative p-4 rounded-lg border-2 transition-all duration-200
                                flex flex-col items-center justify-center gap-1
                                ${disabled
                                    ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
                                    : selected
                                        ? 'bg-primary-600 border-primary-600 text-white shadow-lg'
                                        : 'bg-white border-gray-200 hover:border-primary-400 hover:shadow-md'
                                }
                            `}
                        >
                            {selected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1"
                                >
                                    <FaCheck className="text-xs" />
                                </motion.div>
                            )}

                            <FaClock className={`text-sm ${selected ? 'text-white' : 'text-primary-600'}`} />

                            <div className={`text-sm font-semibold ${selected ? 'text-white' : 'text-gray-900'}`}>
                                {formatTime(slot.start_time)}
                            </div>

                            <div className={`text-xs ${selected ? 'text-primary-100' : 'text-gray-500'}`}>
                                {formatTime(slot.end_time)}
                            </div>

                            {disabled && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                                    <span className="text-xs font-semibold text-red-600">Booked</span>
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 text-xs text-gray-600 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-gray-200 bg-white"></div>
                    <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-primary-600 bg-primary-600"></div>
                    <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border-2 border-gray-200 bg-gray-100 opacity-50"></div>
                    <span>Booked</span>
                </div>
            </div>
        </div>
    );
};

export default TimeSlotPicker;
