import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaUserMd,
    FaCalendarAlt,
    FaClock,
    FaFileAlt,
    FaCheckCircle,
    FaArrowLeft,
    FaArrowRight
} from 'react-icons/fa';
import doctorService from '../services/doctorService';
import appointmentService from '../services/appointmentService';
import DatePicker from '../components/common/DatePicker';
import TimeSlotPicker from '../components/common/TimeSlotPicker';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

const BookAppointment = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [currentStep, setCurrentStep] = useState(1);
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form data
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [formData, setFormData] = useState({
        reasonForVisit: '',
        symptoms: '',
        allergies: '',
        medications: '',
        notes: ''
    });

    const reasons = [
        'General Checkup',
        'Follow-up Visit',
        'New Symptoms',
        'Prescription Refill',
        'Test Results Review',
        'Other'
    ];

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/book-appointment/${doctorId}` } });
            return;
        }
        fetchDoctorDetails();
    }, [doctorId, isAuthenticated]);

    useEffect(() => {
        if (selectedDate) {
            fetchAvailableSlots();
        }
    }, [selectedDate]);

    const fetchDoctorDetails = async () => {
        try {
            setLoading(true);
            const response = await doctorService.getDoctorById(doctorId);
            setDoctor(response.data || response);
        } catch (error) {
            console.error('Error fetching doctor:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableSlots = async () => {
        try {
            setLoadingSlots(true);
            const dateStr = selectedDate.toISOString().split('T')[0];
            const response = await doctorService.getDoctorAvailability(doctorId, dateStr);

            // Mock slots if API doesn't return any
            const slots = response.data?.slots || response.slots || generateMockSlots();
            setAvailableSlots(slots);
        } catch (error) {
            console.error('Error fetching slots:', error);
            // Generate mock slots as fallback
            setAvailableSlots(generateMockSlots());
        } finally {
            setLoadingSlots(false);
        }
    };

    const generateMockSlots = () => {
        const slots = [];
        const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
        times.forEach(time => {
            const [hour, minute] = time.split(':');
            const endHour = parseInt(hour) + 1;
            slots.push({
                start_time: time,
                end_time: `${endHour.toString().padStart(2, '0')}:${minute}`,
                is_booked: Math.random() > 0.7 // 30% chance of being booked
            });
        });
        return slots;
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedSlot(null); // Reset slot when date changes
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const canProceedToStep2 = selectedDate && selectedSlot;
    const canProceedToStep3 = formData.reasonForVisit && formData.symptoms;

    const handleNext = () => {
        if (currentStep === 1 && canProceedToStep2) {
            setCurrentStep(2);
        } else if (currentStep === 2 && canProceedToStep3) {
            setCurrentStep(3);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            const appointmentData = {
                doctorId: doctorId,
                appointment_date: selectedDate.toISOString().split('T')[0],
                start_time: selectedSlot.start_time,
                end_time: selectedSlot.end_time,
                reason: formData.reasonForVisit,
                symptoms: formData.symptoms,
                allergies: formData.allergies,
                current_medications: formData.medications,
                notes: formData.notes
            };

            await appointmentService.bookAppointment(appointmentData);
            setCurrentStep(4); // Success step
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Failed to book appointment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const steps = [
        { number: 1, title: 'Date & Time', icon: FaCalendarAlt },
        { number: 2, title: 'Details', icon: FaFileAlt },
        { number: 3, title: 'Review', icon: FaCheckCircle }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader fullScreen />
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                <Card className="max-w-md text-center">
                    <p className="text-red-600 font-medium mb-4">Doctor not found</p>
                    <Button variant="primary" onClick={() => navigate('/doctors')}>
                        Back to Doctors
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <button
                        onClick={() => navigate(`/doctors/${doctorId}`)}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-4"
                    >
                        <FaArrowLeft />
                        Back to Doctor Profile
                    </button>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
                    <div className="flex items-center gap-3 text-gray-700">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <FaUserMd className="text-primary-600 text-xl" />
                        </div>
                        <div>
                            <p className="font-semibold">Dr. {doctor.firstName} {doctor.lastName}</p>
                            <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Progress Steps */}
                {currentStep !== 4 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => (
                                <React.Fragment key={step.number}>
                                    <div className="flex flex-col items-center flex-1">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step.number
                                                    ? 'bg-primary-600 text-white shadow-lg'
                                                    : 'bg-gray-200 text-gray-500'
                                                }`}
                                        >
                                            <step.icon className="text-xl" />
                                        </div>
                                        <p
                                            className={`mt-2 text-sm font-medium ${currentStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                                                }`}
                                        >
                                            {step.title}
                                        </p>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`flex-1 h-1 mx-2 transition-all duration-300 ${currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                                                }`}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    {/* Step 1: Date & Time Selection */}
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>

                                <div className="space-y-6">
                                    {/* Date Picker */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a Date</h3>
                                        <DatePicker
                                            selectedDate={selectedDate}
                                            onDateSelect={handleDateSelect}
                                            minDate={new Date()}
                                        />
                                    </div>

                                    {/* Time Slots */}
                                    {selectedDate && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Choose a Time Slot
                                            </h3>
                                            <TimeSlotPicker
                                                slots={availableSlots}
                                                selectedSlot={selectedSlot}
                                                onSlotSelect={handleSlotSelect}
                                                loading={loadingSlots}
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            </Card>

                            <div className="flex justify-end">
                                <Button
                                    variant="primary"
                                    onClick={handleNext}
                                    disabled={!canProceedToStep2}
                                    className="min-w-32"
                                >
                                    Next
                                    <FaArrowRight className="ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Appointment Details */}
                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointment Details</h2>

                                <div className="space-y-6">
                                    {/* Reason for Visit */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Reason for Visit <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="reasonForVisit"
                                            value={formData.reasonForVisit}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select a reason</option>
                                            {reasons.map(reason => (
                                                <option key={reason} value={reason}>{reason}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Symptoms */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Symptoms <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="symptoms"
                                            value={formData.symptoms}
                                            onChange={handleInputChange}
                                            rows="4"
                                            placeholder="Describe your symptoms in detail..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                            required
                                        />
                                    </div>

                                    {/* Allergies */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Allergies (if any)
                                        </label>
                                        <input
                                            type="text"
                                            name="allergies"
                                            value={formData.allergies}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Penicillin, Peanuts"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Current Medications */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Current Medications
                                        </label>
                                        <textarea
                                            name="medications"
                                            value={formData.medications}
                                            onChange={handleInputChange}
                                            rows="3"
                                            placeholder="List any medications you're currently taking..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                        />
                                    </div>

                                    {/* Additional Notes */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            rows="3"
                                            placeholder="Any other information you'd like to share..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                        />
                                    </div>
                                </div>
                            </Card>

                            <div className="flex justify-between">
                                <Button variant="outline" onClick={handleBack}>
                                    <FaArrowLeft className="mr-2" />
                                    Back
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleNext}
                                    disabled={!canProceedToStep3}
                                    className="min-w-32"
                                >
                                    Next
                                    <FaArrowRight className="ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Review & Confirm */}
                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Confirm</h2>

                                <div className="space-y-6">
                                    {/* Doctor Info */}
                                    <div className="pb-6 border-b border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Doctor</h3>
                                        <div className="flex items-center gap-3">
                                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                                                <FaUserMd className="text-primary-600 text-2xl" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    Dr. {doctor.firstName} {doctor.lastName}
                                                </p>
                                                <p className="text-gray-600">{doctor.specialization}</p>
                                                <p className="text-green-600 font-semibold">₹{doctor.consultationFee}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Appointment Time */}
                                    <div className="pb-6 border-b border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Appointment Time</h3>
                                        <div className="flex items-center gap-4 text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-primary-600" />
                                                <span className="font-medium">
                                                    {selectedDate.toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaClock className="text-primary-600" />
                                                <span className="font-medium">
                                                    {selectedSlot.start_time} - {selectedSlot.end_time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Appointment Details */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Details</h3>
                                        <div className="space-y-3 text-sm">
                                            <div>
                                                <p className="text-gray-600">Reason for Visit</p>
                                                <p className="font-medium text-gray-900">{formData.reasonForVisit}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Symptoms</p>
                                                <p className="font-medium text-gray-900">{formData.symptoms}</p>
                                            </div>
                                            {formData.allergies && (
                                                <div>
                                                    <p className="text-gray-600">Allergies</p>
                                                    <p className="font-medium text-gray-900">{formData.allergies}</p>
                                                </div>
                                            )}
                                            {formData.medications && (
                                                <div>
                                                    <p className="text-gray-600">Current Medications</p>
                                                    <p className="font-medium text-gray-900">{formData.medications}</p>
                                                </div>
                                            )}
                                            {formData.notes && (
                                                <div>
                                                    <p className="text-gray-600">Additional Notes</p>
                                                    <p className="font-medium text-gray-900">{formData.notes}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <div className="flex justify-between">
                                <Button variant="outline" onClick={handleBack} disabled={submitting}>
                                    <FaArrowLeft className="mr-2" />
                                    Back
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="min-w-40"
                                >
                                    {submitting ? 'Booking...' : 'Confirm Booking'}
                                    {!submitting && <FaCheckCircle className="ml-2" />}
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Success */}
                    {currentStep === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Card className="text-center py-12">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <FaCheckCircle className="text-green-600 text-5xl" />
                                </motion.div>

                                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                    Appointment Booked Successfully!
                                </h2>
                                <p className="text-gray-600 mb-2">
                                    Your appointment with Dr. {doctor.firstName} {doctor.lastName} has been confirmed.
                                </p>
                                <p className="text-gray-600 mb-8">
                                    You will receive a confirmation email shortly.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        variant="primary"
                                        onClick={() => navigate('/patient/appointments')}
                                    >
                                        View My Appointments
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate('/doctors')}
                                    >
                                        Book Another Appointment
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BookAppointment;
