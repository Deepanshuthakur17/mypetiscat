"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, Info, ShieldAlert, BadgeHelp, ArrowLeft } from "lucide-react";

export default function Disclaimer() {
    const disclaimerItems = [
        {
            title: "Not Veterinary Advice",
            icon: ShieldAlert,
            content: "The content on 'My Pet Is Cat', including text, graphics, and videos, is for informational purposes only. It is not a substitute for professional veterinary advice, diagnosis, or treatment. Always seek the advice of your veterinarian with any questions regarding your cat's health."
        },
        {
            title: "Accuracy of Information",
            icon: Info,
            content: "While we strive to provide the most accurate and up-to-date feline information, we make no representations or warranties of any kind about the completeness, accuracy, or reliability of the information contained on this website."
        },
        {
            title: "External Links",
            icon: AlertTriangle,
            content: "Our website may contain links to external sites (like YouTube or partner shops). We do not control or guarantee the accuracy, relevance, or completeness of information on these external platforms."
        },
        {
            title: "Affiliate Disclosure",
            icon: BadgeHelp,
            content: "Some links on this site may be affiliate links. This means if you click on the link and purchase an item, we may receive a small commission at no extra cost to you, helping us keep the cat treats coming!"
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
                        Legal <span className="text-[#E5C082]">Disclaimer</span>
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto md:mx-0 leading-relaxed">
                        Please read this disclaimer carefully before using the <span className="text-white font-semibold">My Pet Is Cat 🐾</span> website. 
                        By using our site, you agree to these terms.
                    </p>
                    <div className="h-1 w-16 bg-[#E5C082] mt-6 mx-auto md:mx-0" />
                </motion.div>

                {/* DISCLAIMER BLOCKS */}
                <div className="grid gap-6 sm:gap-8">
                    {disclaimerItems.map((item, index) => (
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
                    <p className="text-gray-500 text-xs sm:text-sm italic">
                        Last Updated: February 2026. <br />
                        We reserve the right to modify this disclaimer at any time without prior notice.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}