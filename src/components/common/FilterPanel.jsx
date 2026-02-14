import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import Button from './Button';

const FilterPanel = ({
    filters,
    onFilterChange,
    onClearFilters,
    onApplyFilters
}) => {
    const [expandedSections, setExpandedSections] = useState(
        filters.reduce((acc, filter) => ({ ...acc, [filter.id]: true }), {})
    );

    const toggleSection = (filterId) => {
        setExpandedSections(prev => ({
            ...prev,
            [filterId]: !prev[filterId]
        }));
    };

    const handleCheckboxChange = (filterId, optionValue) => {
        onFilterChange(filterId, optionValue);
    };

    const handleRangeChange = (filterId, value) => {
        onFilterChange(filterId, value);
    };

    const renderFilterContent = (filter) => {
        switch (filter.type) {
            case 'checkbox':
                return (
                    <div className="space-y-2">
                        {filter.options.map(option => (
                            <label
                                key={option.value}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    checked={filter.selected?.includes(option.value) || false}
                                    onChange={() => handleCheckboxChange(filter.id, option.value)}
                                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <span className="text-sm text-gray-700 group-hover:text-primary-600 transition-colors">
                                    {option.label}
                                    {option.count !== undefined && (
                                        <span className="text-gray-400 ml-1">({option.count})</span>
                                    )}
                                </span>
                            </label>
                        ))}
                    </div>
                );

            case 'radio':
                return (
                    <div className="space-y-2">
                        {filter.options.map(option => (
                            <label
                                key={option.value}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <input
                                    type="radio"
                                    name={filter.id}
                                    checked={filter.selected === option.value}
                                    onChange={() => handleCheckboxChange(filter.id, option.value)}
                                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                                />
                                <span className="text-sm text-gray-700 group-hover:text-primary-600 transition-colors">
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                );

            case 'range':
                return (
                    <div className="space-y-3">
                        <input
                            type="range"
                            min={filter.min}
                            max={filter.max}
                            step={filter.step || 1}
                            value={filter.selected || filter.min}
                            onChange={(e) => handleRangeChange(filter.id, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>{filter.formatValue ? filter.formatValue(filter.min) : filter.min}</span>
                            <span className="font-semibold text-primary-600">
                                {filter.formatValue ? filter.formatValue(filter.selected || filter.min) : (filter.selected || filter.min)}
                            </span>
                            <span>{filter.formatValue ? filter.formatValue(filter.max) : filter.max}</span>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const hasActiveFilters = filters.some(filter => {
        if (filter.type === 'checkbox') {
            return filter.selected && filter.selected.length > 0;
        }
        if (filter.type === 'radio') {
            return filter.selected !== undefined && filter.selected !== null;
        }
        if (filter.type === 'range') {
            return filter.selected !== undefined && filter.selected !== filter.min;
        }
        return false;
    });

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                    {hasActiveFilters && (
                        <motion.button
                            onClick={onClearFilters}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                            <FaTimes className="text-xs" />
                            Clear All
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Filter Sections */}
            <div className="divide-y divide-gray-200">
                {filters.map(filter => (
                    <div key={filter.id} className="p-4">
                        <button
                            onClick={() => toggleSection(filter.id)}
                            className="w-full flex items-center justify-between mb-3 group"
                        >
                            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                {filter.label}
                            </h4>
                            <motion.div
                                animate={{ rotate: expandedSections[filter.id] ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FaChevronDown className="text-gray-400 text-sm" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {expandedSections[filter.id] && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    {renderFilterContent(filter)}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* Apply Button */}
            {onApplyFilters && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <Button
                        variant="primary"
                        className="w-full"
                        onClick={onApplyFilters}
                    >
                        Apply Filters
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FilterPanel;
