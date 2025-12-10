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
        <section className="relative w-full min-h-[80vh] pt-20 bg-black overflow-hidden"> 

            <div className="container mx-auto h-full grid md:grid-cols-2">

                {/* COLUMN 1: TEXT AND CTA */}
                <motion.div
                    className="relative z-10 p-6 sm:p-10 md:p-16 flex flex-col justify-center text-left 
                                 text-white bg-black md:bg-transparent"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants} className="text-[#E5C082] mb-4 text-sm font-semibold flex items-center">
                        <PawPrint size={16} className="mr-2 fill-[#E5C082] stroke-none" />
                        Official Cat Content Hub
                    </motion.div>

                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-[#E5C082] max-w-lg leading-tight"
                        variants={itemVariants}
                    >
                        {heroContent.headline}
                    </motion.h1>

                    <motion.p
                        className="mt-4 text-base sm:text-lg lg:text-xl text-white max-w-lg font-light"
                        variants={itemVariants}
                    >
                        {heroContent.subtext}
                    </motion.p>

                    <motion.a
                        href={heroContent.ctaLink}
                        className="mt-8 self-start flex items-center space-x-3 px-6 py-3 
                                   bg-[#E5C082] text-gray-900 font-bold text-lg rounded-full 
                                   shadow-xl transition-all duration-300 hover:bg-[#D4AC63] hover:scale-[1.03]"
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

                {/* COLUMN 2: IMAGE (Desktop Only) - Motion Added */}
                <div className="hidden md:flex relative justify-center items-center p-8">
                    {/* MOTION EFFECT ADDED HERE: Subtle vertical floating loop */}
                    <motion.div
                        className="rounded-3xl shadow-[#E5C082] overflow-hidden shadow-2xl border-4 border-[#E5C082] 
                                     w-full max-w-sm max-h-[500px] aspect-4/5 flex items-center justify-center"
                        animate={{ y: [-10, 10, -10] }} // Float up and down
                        transition={{ 
                            duration: 8, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: 0.5 // Start slightly after text for visual flow
                        }}
                    >
                        <Image
                            src={heroContent.imageUrl}
                            alt="Adorable cat"
                            width={1000} 
                            height={1000} 
                            loading="eager"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

            </div>

            {/* Mobile Only Image Background Fallback */}
            <div className="absolute inset-0 md:hidden">
                <img
                    src={heroContent.imageUrl}
                    alt="Cat Hero Image"
                    className="w-full h-full object-cover object-center opacity-10"
                    loading="eager"
                />
            </div>

        </section>
    );
}