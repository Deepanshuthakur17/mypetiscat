"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Scale, ShoppingBag, Youtube, UserCheck, ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
    const terms = [
        {
            title: "Acceptance of Terms",
            icon: Scale,
            content: "By accessing 'My Pet Is Cat', you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services or content."
        },
        {
            title: "Content Usage",
            icon: Youtube,
            content: "Our cat shorts and articles are for personal, non-commercial use. You may not download, redistribute, or use our videos for commercial purposes without explicit written consent from the 'My Pet Is Cat' team."
        },
        {
            title: "User Conduct",
            icon: UserCheck,
            content: "When interacting with our community features, we expect 'paws-itive' behavior. Any form of harassment, spam, or inappropriate content regarding our feline friends or community members will result in an immediate ban."
        },
        {
            title: "Shop & Affiliates",
            icon: ShoppingBag,
            content: "Products viewed through our site may be fulfilled by third parties. We are not responsible for the quality, shipping, or returns of items purchased through external affiliate links."
        }
    ];

    return (
        <section className="min-h-screen bg-black text-white py-12 px-4 xs:px-6 sm:py-20 lg:px-8">
            <div className="max-w-4xl mx-auto">
                
                {/* BACK BUTTON */}
                <div className="flex justify-start mb-6 sm:mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-[#E5C082] hover:text-white transition-colors group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold text-sm sm:text-base uppercase tracking-wider">Back to Home</span>
                    </Link>
                </div>

                {/* HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 sm:mb-16 text-center md:text-left"
                >
                    <h1 className="text-3xl xs:text-4xl md:text-6xl font-bold mb-4 uppercase tracking-tighter leading-none">
                        Terms & <span className="text-[#E5C082]">Conditions</span>
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto md:mx-0 leading-relaxed">
                        The rules of the house. Please read these terms carefully to ensure a smooth and safe experience for you and your cat.
                    </p>
                    <div className="h-1 w-16 bg-[#E5C082] mt-6 mx-auto md:mx-0" />
                </motion.div>

                {/* TERMS BLOCKS */}
                <div className="grid gap-6 sm:gap-8">
                    {terms.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-900/40 border border-white/5 p-5 sm:p-8 rounded-2xl hover:border-[#E5C082]/40 transition-colors group"
                        >
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                                <div className="p-3 bg-[#E5C082]/10 rounded-xl text-[#E5C082] group-hover:bg-[#E5C082] group-hover:text-black transition-all duration-300 shrink-0">
                                    <item.icon size={22} className="sm:w-6 sm:h-6" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg sm:text-xl font-bold mb-2 text-white uppercase tracking-tight">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FINAL NOTE */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-12 sm:mt-20 pt-8 border-t border-white/10 text-center"
                >
                    <p className="text-gray-500 text-xs sm:text-sm">
                        Last Updated: February 2026. <br />
                        Questions about our terms? Contact us at <span className="text-[#E5C082] font-bold">legal@mypetiscat.com</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}