"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Eye, Lock, FileText, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
    const sections = [
        {
            title: "Information We Collect",
            icon: Eye,
            content: "We collect information you provide directly to us, such as when you sign up for our newsletter, contact us via our form, or interact with our cat community features. This may include your name, email address, and any feline-related details you share."
        },
        {
            title: "How We Use Your Info",
            icon: FileText,
            content: "Your data helps us improve 'My Pet Is Cat'. We use it to send you the latest cat care tips, notify you of shop updates, and ensure our content remains relevant to your interests as a cat owner."
        },
        {
            title: "Data Security",
            icon: Lock,
            content: "We take the security of your personal information seriously. We implement industry-standard encryption and security measures to protect your 'paws-onal' data from unauthorized access or disclosure."
        },
        {
            title: "Third-Party Services",
            icon: ShieldCheck,
            content: "We do not sell your personal information. We may use trusted third-party services (like YouTube for our Shorts or analytics tools) that have their own privacy policies regarding how they handle data."
        }
    ];

    return (
        <section className="min-h-screen bg-black text-white py-12 px-4 xs:px-6 sm:py-20 lg:px-8">
            <div className="max-w-4xl mx-auto">
                
                {/* BACK BUTTON - Full width on tiny mobile */}
                <div className="flex justify-start mb-6 sm:mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-[#E5C082] hover:text-white transition-colors group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold text-sm sm:text-base uppercase tracking-wider">Back to Home</span>
                    </Link>
                </div>

                {/* HEADER - Center on mobile, left on desktop */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 sm:mb-16 text-center md:text-left"
                >
                    <h1 className="text-3xl xs:text-4xl md:text-6xl font-bold mb-4 uppercase tracking-tighter leading-none">
                        Privacy <span className="text-[#E5C082]">Policy</span>
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto md:mx-0 leading-relaxed">
                        At <span className="text-white font-semibold">My Pet Is Cat 🐾</span>, we value your privacy as much as a cat values its afternoon nap. 
                        This policy explains how we handle your data.
                    </p>
                    <div className="h-1 w-16 bg-[#E5C082] mt-6 mx-auto md:mx-0" />
                </motion.div>

                {/* POLICY SECTIONS - Stack layout with better mobile spacing */}
                <div className="grid gap-6 sm:gap-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-900/40 border border-white/5 p-5 sm:p-8 rounded-2xl hover:border-[#E5C082]/40 transition-colors group"
                        >
                            {/* Flex-col on tiny screens, Flex-row on sm+ */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                                <div className="p-3 bg-[#E5C082]/10 rounded-xl text-[#E5C082] group-hover:bg-[#E5C082] group-hover:text-black transition-all duration-300 shrink-0">
                                    <section.icon size={22} className="sm:w-6 sm:h-6" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg sm:text-xl font-bold mb-2 text-white uppercase tracking-tight">
                                        {section.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FOOTER INFO - Smaller text on mobile */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-12 sm:mt-20 pt-8 border-t border-white/10 text-center"
                >
                    <p className="text-gray-500 text-xs sm:text-sm">
                        Last Updated: February 2026. <br className="sm:hidden" />
                        Questions? Reach out: <span className="text-[#E5C082] font-bold block sm:inline mt-2 sm:mt-0">privacy@mypetiscat.com</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}