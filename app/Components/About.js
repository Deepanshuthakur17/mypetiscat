"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import Image from "next/image";

export default function About() {
    const [isExpanded, setIsExpanded] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <section className="py-24 bg-dark text-white overflow-hidden" id="about">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* LEFT SIDE: IMAGE */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, x: -50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative top-6 z-10 rounded-2xl items-center flex justify-center overflow-hidden border-2 border-[#E5C082]/30 shadow-2xl bg-dark/50">
                            <Image 
                                src="/Logo.png"
                                alt="About Our Cat Hub"
                                width={500}
                                height={600}
                                className="object-cover p-8"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#E5C082] rounded-2xl -z-10" />
                        
                        <motion.div 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-15 text-4xl md:text-6xl opacity-50 select-none"
                        >
                            🐾 🐾 🐾🐾 🐾 🐾
                        </motion.div>
                    </motion.div>

                    {/* RIGHT SIDE: TEXT CONTENT */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <motion.div variants={itemVariants}>
                            <h2 className="text-[#E5C082] font-semibold tracking-widest uppercase text-sm">
                                Our Story
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-bold mt-2 leading-tight">
                                Dedicated to Every <span className="text-[#E5C082]">Purr</span> and Pounce
                            </h3>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed">
                            At My Pet Is Cat, we believe that life is simply better with a feline 
                            companion. What started as a small community of enthusiasts has grown 
                            into a global hub.
                        </motion.p>

                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 py-4">
                            <div className="border-l-2 border-[#E5C082] pl-4">
                                <h4 className="text-2xl font-bold">10k+</h4>
                                <p className="text-gray-500 text-sm">Happy Owners</p>
                            </div>
                            <div className="border-l-2 border-[#E5C082] pl-4">
                                <h4 className="text-2xl font-bold">500+</h4>
                                <p className="text-gray-500 text-sm">Care Guides</p>
                            </div>
                        </motion.div>

                        {/* EXPANDABLE SECTION */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="space-y-4 pt-2 border-t border-white/10 mt-4">
                                        <p className="text-gray-300 leading-relaxed italic">
                                            &quot;Our journey began with a single rescued tabby named Luna. 
                                            Today, we collaborate with veterinarians and behaviorists 
                                            worldwide to bring you scientifically-backed cat wisdom.&quot;
                                        </p>
                                        <ul className="text-gray-400 space-y-2 text-sm">
                                            <li>• Monthly Nutrition Workshops</li>
                                            <li>• Behavior Correction Training</li>
                                            <li>• Adoption Advocacy Programs</li>
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div variants={itemVariants} className="pt-4">
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="px-8 cursor-pointer py-3 bg-[#E5C082] text-black font-bold rounded-full hover:bg-white transition-all duration-300 shadow-lg active:scale-95"
                            >
                                {isExpanded ? "Show Less" : "Learn More"}
                            </button>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}