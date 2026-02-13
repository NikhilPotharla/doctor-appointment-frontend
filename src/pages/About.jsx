import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaUsers, FaAward, FaShieldAlt, FaUserMd, FaLinkedin, FaTwitter } from 'react-icons/fa';
import AnimatedSection from '../components/common/AnimatedSection';
import Card from '../components/common/Card';
import Carousel from '../components/common/Carousel';

const About = () => {
    // Hero carousel images
    const heroImages = [
        {
            url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&h=800&fit=crop',
            alt: 'Medical team collaboration',
            title: 'About HealthCare',
            description: 'Transforming healthcare through innovation, compassion, and excellence'
        },
        {
            url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&h=800&fit=crop',
            alt: 'Healthcare professionals',
            title: 'Our Mission',
            description: 'Providing accessible, high-quality healthcare for everyone'
        },
        {
            url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1920&h=800&fit=crop',
            alt: 'Modern medical facility',
            title: 'Excellence in Care',
            description: 'State-of-the-art facilities and expert medical professionals'
        },
        {
            url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&h=800&fit=crop',
            alt: 'Patient care',
            title: 'Patient-Centered',
            description: 'Your health and well-being are our top priority'
        }
    ];

    const stats = [
        { icon: FaUsers, value: '50,000+', label: 'Happy Patients' },
        { icon: FaUserMd, value: '500+', label: 'Expert Doctors' },
        { icon: FaAward, value: '15+', label: 'Years Experience' },
        { icon: FaHeart, value: '99%', label: 'Satisfaction Rate' }
    ];

    const team = [
        {
            name: 'Dr. Sarah Johnson',
            role: 'Chief Medical Officer',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
            bio: 'Leading healthcare innovation with 20+ years of experience',
            linkedin: '#',
            twitter: '#'
        },
        {
            name: 'Dr. Michael Chen',
            role: 'Head of Cardiology',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
            bio: 'Renowned cardiologist specializing in preventive care',
            linkedin: '#',
            twitter: '#'
        },
        {
            name: 'Dr. Emily Rodriguez',
            role: 'Pediatrics Specialist',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
            bio: 'Dedicated to providing compassionate care for children',
            linkedin: '#',
            twitter: '#'
        },
        {
            name: 'Dr. James Wilson',
            role: 'Chief Technology Officer',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
            bio: 'Pioneering digital health solutions and telemedicine',
            linkedin: '#',
            twitter: '#'
        }
    ];

    const values = [
        {
            icon: FaHeart,
            title: 'Patient-Centered Care',
            description: 'Your health and well-being are at the heart of everything we do. We prioritize personalized treatment plans.'
        },
        {
            icon: FaShieldAlt,
            title: 'Trust & Privacy',
            description: 'We maintain the highest standards of confidentiality and data security to protect your sensitive information.'
        },
        {
            icon: FaAward,
            title: 'Excellence',
            description: 'Our team of board-certified doctors brings decades of combined experience and expertise.'
        },
        {
            icon: FaUsers,
            title: 'Community',
            description: 'We believe in building lasting relationships with our patients and serving our community with dedication.'
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
                        interval={5000}
                        showControls={true}
                        showIndicators={true}
                    />
                </div>

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10">
                    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                        <motion.div
                            className="max-w-3xl"
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
                                About HealthCare
                            </motion.h1>
                            <motion.p
                                className="text-xl md:text-2xl text-white/90 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Transforming healthcare through innovation, compassion, and excellence
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <AnimatedSection key={index} animation="scaleUp" delay={index * 0.1}>
                                <div className="text-center">
                                    <motion.div
                                        className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4"
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <stat.icon className="text-primary-600 text-2xl" />
                                    </motion.div>
                                    <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                                    <p className="text-gray-600">{stat.label}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <AnimatedSection animation="fadeInLeft">
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    To provide accessible, high-quality healthcare services that empower individuals to take control of their health. We leverage cutting-edge technology to connect patients with the best medical professionals, making healthcare convenient, efficient, and personalized.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInRight">
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    To revolutionize healthcare delivery by creating a seamless ecosystem where technology and compassionate care converge. We envision a future where every individual has instant access to world-class medical expertise, regardless of location or circumstance.
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-xl text-gray-600">The principles that guide everything we do</p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
                                <Card className="text-center h-full">
                                    <motion.div
                                        className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4"
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <value.icon className="text-primary-600 text-2xl" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
                        <p className="text-xl text-gray-600">Dedicated professionals committed to your health</p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <AnimatedSection key={index} animation="scaleUp" delay={index * 0.1}>
                                <motion.div
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg"
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                        <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                                        <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                                        <div className="flex gap-3">
                                            <motion.a
                                                href={member.linkedin}
                                                className="text-gray-400 hover:text-primary-600"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <FaLinkedin size={20} />
                                            </motion.a>
                                            <motion.a
                                                href={member.twitter}
                                                className="text-gray-400 hover:text-primary-600"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <FaTwitter size={20} />
                                            </motion.a>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <AnimatedSection animation="fadeInUp">
                <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold mb-4">Ready to Experience Better Healthcare?</h2>
                        <p className="text-xl mb-8 text-primary-100">
                            Join thousands of patients who trust us with their health
                        </p>
                        <motion.a
                            href="/register"
                            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started Today
                        </motion.a>
                    </div>
                </section>
            </AnimatedSection>
        </div>
    );
};

export default About;
