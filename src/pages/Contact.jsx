import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import AnimatedSection from '../components/common/AnimatedSection';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Carousel from '../components/common/Carousel';

const Contact = () => {
    // Hero carousel images
    const heroImages = [
        {
            url: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=800&fit=crop',
            alt: 'Customer support',
            title: 'Get In Touch',
            description: "We're here to help and answer any questions you might have"
        },
        {
            url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=800&fit=crop',
            alt: 'Communication',
            title: '24/7 Support',
            description: 'Our team is always ready to assist you'
        },
        {
            url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=800&fit=crop',
            alt: 'Healthcare consultation',
            title: 'Expert Assistance',
            description: 'Connect with our healthcare professionals'
        },
        {
            url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&h=800&fit=crop',
            alt: 'Team collaboration',
            title: 'We Listen',
            description: 'Your feedback helps us improve our services'
        }
    ];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setIsSubmitting(false);
    };

    const contactInfo = [
        {
            icon: FaPhone,
            title: 'Phone',
            details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
            color: 'bg-blue-100 text-blue-600'
        },
        {
            icon: FaEnvelope,
            title: 'Email',
            details: ['support@healthcare.com', 'appointments@healthcare.com'],
            color: 'bg-green-100 text-green-600'
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Address',
            details: ['123 Medical Center Drive', 'New York, NY 10001'],
            color: 'bg-purple-100 text-purple-600'
        },
        {
            icon: FaClock,
            title: 'Working Hours',
            details: ['Mon - Fri: 8:00 AM - 8:00 PM', 'Sat - Sun: 9:00 AM - 5:00 PM'],
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    const socialLinks = [
        { icon: FaFacebook, url: '#', color: 'hover:text-blue-600' },
        { icon: FaTwitter, url: '#', color: 'hover:text-sky-500' },
        { icon: FaInstagram, url: '#', color: 'hover:text-pink-600' },
        { icon: FaLinkedin, url: '#', color: 'hover:text-blue-700' }
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
                                Get In Touch
                            </motion.h1>
                            <motion.p
                                className="text-xl md:text-2xl text-white/90"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                We're here to help and answer any questions you might have
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => (
                            <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
                                <Card className="text-center h-full">
                                    <motion.div
                                        className={`inline-flex items-center justify-center w-16 h-16 ${info.color} rounded-full mb-4`}
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <info.icon className="text-2xl" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                                    {info.details.map((detail, idx) => (
                                        <p key={idx} className="text-gray-600">{detail}</p>
                                    ))}
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <AnimatedSection animation="fadeInLeft">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                                <p className="text-gray-600 mb-8">
                                    Fill out the form below and our team will get back to you within 24 hours.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <Input
                                            label="Full Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                        />
                                        <Input
                                            label="Phone"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            label="Subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Tell us more about your inquiry..."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        loading={isSubmitting}
                                        className="w-full"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </form>
                            </div>
                        </AnimatedSection>

                        {/* Map & Additional Info */}
                        <AnimatedSection animation="fadeInRight">
                            <div className="space-y-8">
                                {/* Map */}
                                <div className="bg-gray-200 rounded-2xl overflow-hidden h-80">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9476519598093!2d-73.99185368459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Office Location"
                                    />
                                </div>

                                {/* Emergency Contact */}
                                <Card className="bg-red-50 border-2 border-red-200">
                                    <h3 className="text-xl font-bold text-red-900 mb-3">Emergency Contact</h3>
                                    <p className="text-red-700 mb-4">
                                        For medical emergencies, please call our 24/7 hotline:
                                    </p>
                                    <a
                                        href="tel:911"
                                        className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                    >
                                        Call 911
                                    </a>
                                </Card>

                                {/* Social Media */}
                                <Card>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                                    <p className="text-gray-600 mb-4">Stay connected on social media</p>
                                    <div className="flex gap-4">
                                        {socialLinks.map((social, index) => (
                                            <motion.a
                                                key={index}
                                                href={social.url}
                                                className={`text-gray-400 ${social.color} transition-colors`}
                                                whileHover={{ scale: 1.2, y: -5 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <social.icon size={28} />
                                            </motion.a>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="fadeInUp" className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600">Quick answers to common questions</p>
                    </AnimatedSection>

                    <div className="space-y-4">
                        {[
                            {
                                q: 'What are your operating hours?',
                                a: 'We are open Monday to Friday from 8:00 AM to 8:00 PM, and weekends from 9:00 AM to 5:00 PM.'
                            },
                            {
                                q: 'Do you accept insurance?',
                                a: 'Yes, we accept most major insurance plans. Please contact us to verify your specific coverage.'
                            },
                            {
                                q: 'How do I book an appointment?',
                                a: 'You can book appointments online through our website, mobile app, or by calling our helpline.'
                            },
                            {
                                q: 'Do you offer telemedicine consultations?',
                                a: 'Yes, we offer virtual consultations for non-emergency cases. Book a video appointment through your patient portal.'
                            }
                        ].map((faq, index) => (
                            <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
                                <Card hover={false} className="cursor-pointer hover:shadow-xl transition-shadow">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                                    <p className="text-gray-600">{faq.a}</p>
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
