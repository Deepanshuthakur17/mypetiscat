"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // 1. Import motion

export default function Contact() {
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        
        setTimeout(() => {
            setStatus("Message sent successfully! 🐾");
            e.target.reset();
        }, 2000);
    };

    // Animation variants for consistency
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-20 bg-dark text-white px-4 overflow-hidden" id="contact">
            <div className="max-w-4xl mx-auto">
                
                {/* HEADER ANIMATION */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    variants={fadeIn}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Get In <span className="text-[#E5C082]">Touch</span>
                    </h2>
                    <p className="text-gray-400">
                        Have questions about your feline friend? We&apos;d love to hear from you.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    
                    {/* LEFT SIDE: CONTACT INFO (Slides in from left) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-semibold text-[#E5C082] mb-2">Contact Info</h3>
                            <p className="text-gray-400">Reach out directly via email or follow our social paws.</p>
                        </div>
                        
                        <div className="flex items-center gap-4 group">
                            <div className="bg-[#E5C082]/10 p-3 rounded-lg text-[#E5C082] group-hover:bg-[#E5C082] group-hover:text-black transition-all duration-300">
                                📧
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Email us at</p>
                                <p className="font-medium">hello@mypetiscat.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="bg-[#E5C082]/10 p-3 rounded-lg text-[#E5C082] group-hover:bg-[#E5C082] group-hover:text-black transition-all duration-300">
                                📍
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Based in</p>
                                <p className="font-medium">Cat Lover Lane, NY</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE: CONTACT FORM (Slides in from right) */}
                    <motion.form 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        onSubmit={handleSubmit} 
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium mb-1">Your Name</label>
                            <input 
                                type="text" 
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-[#E5C082] transition-colors"
                                placeholder="Meowser Smith"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email Address</label>
                            <input 
                                type="email" 
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-[#E5C082] transition-colors"
                                placeholder="meow@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <textarea 
                                rows="4" 
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-[#E5C082] transition-colors resize-none"
                                placeholder="How can we help you and your cat?"
                            ></textarea>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-[#E5C082] text-black font-bold py-3 rounded-lg hover:bg-[#d4ae6f] transition-all"
                        >
                            Send Message
                        </motion.button>

                        {status && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-[#E5C082] mt-4 text-sm font-medium"
                            >
                                {status}
                            </motion.p>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
}