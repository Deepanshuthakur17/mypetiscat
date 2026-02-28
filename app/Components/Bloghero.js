/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';
import Image from 'next/image';

const heroContent = {
    headline: "The Purr-fect Source for Everything Cat",
    subtext: "From hilarious memes to expert health tips, dive into the world of our elegant feline overlords.",
    ctaText: "Read the Latest Blogs",
    ctaLink: "/blogs",
    imageUrl: "/hero-cat-BBnHaAkR.jpg",
};

export default function BlogHero() {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.8,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 15 } },
    };

    return (
        <section className="relative w-full min-h-[90vh] md:min-h-[80vh] pt-20 bg-black overflow-hidden flex items-center"> 

            <div className="container mx-auto h-full grid grid-cols-1 md:grid-cols-2 items-center relative z-20">

                {/* COLUMN 1: TEXT AND CTA */}
                <motion.div
                    className="p-6 sm:p-10 md:p-16 flex flex-col justify-center text-left text-white"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants} className="text-[#E5C082] mb-4 text-xs sm:text-sm font-semibold flex items-center">
                        <PawPrint size={16} className="mr-2 fill-[#E5C082] stroke-none" />
                        Official Cat Content Hub
                    </motion.div>

                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E5C082] max-w-lg leading-[1.1]"
                        variants={itemVariants}
                    >
                        {heroContent.headline}
                    </motion.h1>

                    <motion.p
                        className="mt-6 text-base sm:text-lg lg:text-xl text-gray-300 max-w-lg font-light leading-relaxed"
                        variants={itemVariants}
                    >
                        {heroContent.subtext}
                    </motion.p>

                    <motion.a
                        href={heroContent.ctaLink}
                        className="mt-8 self-start flex items-center space-x-3 px-8 py-4 
                                   bg-[#E5C082] text-gray-900 font-bold text-base sm:text-lg rounded-full 
                                   shadow-xl transition-all duration-300 hover:bg-[#D4AC63] hover:scale-[1.05] active:scale-95"
                        variants={itemVariants}
                    >
                        <motion.span
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="p-1"
                        >
                            <PawPrint size={20} className="transform" />
                        </motion.span>
                        <span>{heroContent.ctaText}</span>
                    </motion.a>
                </motion.div>

                {/* COLUMN 2: IMAGE (Visible on Tablet and Desktop) */}
                <div className="hidden md:flex relative justify-center items-center p-8">
                    <motion.div
                        className="rounded-3xl shadow-[#E5C082]/20 overflow-hidden shadow-2xl border-4 border-[#E5C082] 
                                     w-full max-w-sm aspect-4/5 flex items-center justify-center bg-zinc-900"
                        animate={{ y: [-10, 10, -10] }} 
                        transition={{ 
                            duration: 6, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                        }}
                    >
                        <Image
                            src={heroContent.imageUrl}
                            alt="Adorable cat"
                            width={800} 
                            height={1000} 
                            priority
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Mobile/Small Tablet Image Background Overlay */}
            <div className="absolute inset-0 md:hidden z-10">
                <img
                    src={heroContent.imageUrl}
                    alt="Cat Hero Image Background"
                    className="w-full h-full object-cover object-center opacity-25"
                />
                {/* Gradient overlay to ensure text readability on mobile */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/20" />
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -right-20 w-64 h-64 bg-[#E5C082] rounded-full blur-[120px] opacity-10 pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-[#E5C082] rounded-full blur-[120px] opacity-10 pointer-events-none" />

        </section>
    );
}