import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserMd, FaCalendarCheck, FaShieldAlt, FaClock } from 'react-icons/fa';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import AnimatedSection from '../components/common/AnimatedSection';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20 overflow-hidden">
                {/* Animated background elements */}
                <motion.div
                    className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.h1
                                className="text-5xl font-bold mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Your Health, Our Priority
                            </motion.h1>
                            <motion.p
                                className="text-xl mb-8 text-primary-100"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Book appointments with top doctors instantly. Quality healthcare at your fingertips.
                            </motion.p>
                            <motion.div
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <Link to="/register">
                                    <Button variant="secondary" size="lg">Get Started</Button>
                                </Link>
                                <Link to="/doctors">
                                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                                        Find Doctors
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="hidden md:block"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <motion.div
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600"
                                    alt="Healthcare"
                                    className="rounded-xl shadow-2xl"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                        <p className="text-xl text-gray-600">Experience healthcare like never before</p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <AnimatedSection animation="fadeInUp" delay={0.1}>
                            <Card className="text-center h-full">
                                <motion.div
                                    className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <FaUserMd className="text-primary-600 text-3xl" />
                                </motion.div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Doctors</h3>
                                <p className="text-gray-600">Connect with qualified and experienced healthcare professionals</p>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInUp" delay={0.2}>
                            <Card className="text-center h-full">
                                <motion.div
                                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <FaCalendarCheck className="text-green-600 text-3xl" />
                                </motion.div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
                                <p className="text-gray-600">Book appointments in just a few clicks, anytime, anywhere</p>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInUp" delay={0.3}>
                            <Card className="text-center h-full">
                                <motion.div
                                    className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <FaShieldAlt className="text-yellow-600 text-3xl" />
                                </motion.div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
                                <p className="text-gray-600">Your health data is protected with enterprise-grade security</p>
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInUp" delay={0.4}>
                            <Card className="text-center h-full">
                                <motion.div
                                    className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <FaClock className="text-purple-600 text-3xl" />
                                </motion.div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                                <p className="text-gray-600">Round-the-clock customer support for all your queries</p>
                            </Card>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600">Three simple steps to better health</p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <AnimatedSection animation="scaleUp" delay={0.1}>
                            <div className="text-center">
                                <motion.div
                                    className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    1
                                </motion.div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Search</h3>
                                <p className="text-gray-600">Find the right doctor based on specialization, location, and availability</p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="scaleUp" delay={0.2}>
                            <div className="text-center">
                                <motion.div
                                    className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    2
                                </motion.div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Book</h3>
                                <p className="text-gray-600">Choose a convenient time slot and book your appointment instantly</p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="scaleUp" delay={0.3}>
                            <div className="text-center">
                                <motion.div
                                    className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    3
                                </motion.div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Consult</h3>
                                <p className="text-gray-600">Meet your doctor online or visit the clinic for your consultation</p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <AnimatedSection animation="fadeInUp">
                <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h2
                            className="text-4xl font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Ready to Get Started?
                        </motion.h2>
                        <motion.p
                            className="text-xl mb-8 text-primary-100"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Join thousands of patients who trust us with their healthcare needs
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Link to="/register">
                                <Button variant="secondary" size="lg">Create Free Account</Button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </AnimatedSection>
        </div>
    );
};

export default Home;
