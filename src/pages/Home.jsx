import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserMd, FaCalendarCheck, FaShieldAlt, FaClock } from 'react-icons/fa';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import AnimatedSection from '../components/common/AnimatedSection';
import Carousel from '../components/common/Carousel';

const Home = () => {
    // Carousel images for hero section
    const heroImages = [
        {
            url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=800&fit=crop',
            alt: 'Modern hospital facility',
            title: 'World-Class Healthcare',
            description: 'State-of-the-art medical facilities at your service'
        },
        {
            url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&h=800&fit=crop',
            alt: 'Doctor consultation',
            title: 'Expert Medical Care',
            description: 'Experienced doctors ready to help you'
        },
        {
            url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1920&h=800&fit=crop',
            alt: 'Medical technology',
            title: 'Advanced Technology',
            description: 'Latest medical equipment for accurate diagnosis'
        },
        {
            url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&h=800&fit=crop',
            alt: 'Patient care',
            title: 'Compassionate Care',
            description: 'Your health and comfort are our priority'
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section - Full Screen Carousel */}
            <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
                {/* Full-width Carousel */}
                <div className="absolute inset-0 w-full h-full">
                    <Carousel
                        images={heroImages}
                        autoPlay={true}
                        interval={4000}
                        showControls={true}
                        showIndicators={true}
                    />
                </div>

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10">
                    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                        <motion.div
                            className="max-w-2xl"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.h1
                                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Your Health, Our Priority
                            </motion.h1>
                            <motion.p
                                className="text-xl md:text-2xl mb-8 text-white/90"
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
                                    <Button variant="primary" size="lg" className="bg-primary-600 hover:bg-primary-700">
                                        Get Started
                                    </Button>
                                </Link>
                                <Link to="/doctors">
                                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                                        Find Doctors
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Animated floating elements */}
                <motion.div
                    className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl z-5"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
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
