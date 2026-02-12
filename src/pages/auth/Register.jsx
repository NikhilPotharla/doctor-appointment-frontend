import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { FaUserMd, FaUser } from 'react-icons/fa';
import authService from '../../services/authService';

const Register = () => {
    const [userType, setUserType] = useState('patient'); // 'patient' or 'doctor'
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        // Doctor specific fields
        specialization: '',
        licenseNumber: '',
        experience: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.phone) newErrors.phone = 'Phone number is required';

        // Doctor specific validation
        if (userType === 'doctor') {
            if (!formData.specialization) newErrors.specialization = 'Specialization is required';
            if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
            if (!formData.experience) newErrors.experience = 'Experience is required';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const registrationData = {
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
            };

            if (userType === 'doctor') {
                registrationData.specialization = formData.specialization;
                registrationData.licenseNumber = formData.licenseNumber;
                registrationData.experienceYears = parseInt(formData.experience);
                await authService.registerDoctor(registrationData);
            } else {
                await authService.registerPatient(registrationData);
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            setErrors({ general: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-gray-600 mt-2">Join our healthcare community</p>
                </div>

                {/* User Type Selection */}
                <div className="flex gap-4 mb-8">
                    <button
                        type="button"
                        onClick={() => setUserType('patient')}
                        className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all ${userType === 'patient'
                                ? 'border-primary-600 bg-primary-50'
                                : 'border-gray-300 hover:border-primary-300'
                            }`}
                    >
                        <FaUser className={`mx-auto text-3xl mb-2 ${userType === 'patient' ? 'text-primary-600' : 'text-gray-400'}`} />
                        <p className={`font-semibold ${userType === 'patient' ? 'text-primary-600' : 'text-gray-600'}`}>
                            I'm a Patient
                        </p>
                    </button>
                    <button
                        type="button"
                        onClick={() => setUserType('doctor')}
                        className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all ${userType === 'doctor'
                                ? 'border-primary-600 bg-primary-50'
                                : 'border-gray-300 hover:border-primary-300'
                            }`}
                    >
                        <FaUserMd className={`mx-auto text-3xl mb-2 ${userType === 'doctor' ? 'text-primary-600' : 'text-gray-400'}`} />
                        <p className={`font-semibold ${userType === 'doctor' ? 'text-primary-600' : 'text-gray-600'}`}>
                            I'm a Doctor
                        </p>
                    </button>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        Registration successful! Redirecting to login...
                    </div>
                )}

                {/* Error Message */}
                {errors.general && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {errors.general}
                    </div>
                )}

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            error={errors.firstName}
                            required
                        />
                        <Input
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            error={errors.lastName}
                            required
                        />
                    </div>

                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        error={errors.email}
                        required
                    />

                    <Input
                        label="Phone Number"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 8900"
                        error={errors.phone}
                        required
                    />

                    {userType === 'doctor' && (
                        <>
                            <Input
                                label="Specialization"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                placeholder="e.g., Cardiologist, Dermatologist"
                                error={errors.specialization}
                                required
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="License Number"
                                    name="licenseNumber"
                                    value={formData.licenseNumber}
                                    onChange={handleChange}
                                    placeholder="MED123456"
                                    error={errors.licenseNumber}
                                    required
                                />
                                <Input
                                    label="Years of Experience"
                                    type="number"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    placeholder="5"
                                    error={errors.experience}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            error={errors.password}
                            required
                        />
                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            error={errors.confirmPassword}
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                            I agree to the{' '}
                            <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                                Terms and Conditions
                            </Link>
                        </label>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>

                {/* Login Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
