'use client'; // Required for Framer Motion

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion

export default function Hero() {
    // Animation variants for the whole container (to stagger the children)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger children for sequential appearance
            }
        }
    };

    // Animation variants for the individual text block (slide up)
    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };
    
    // Animation variants for the image block (scale up/fade in)
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } } // Delayed slightly after text
    };
    
    return (
        <section className="flex flex-col min-h-screen items-center mt-5 lg:mt-0 justify-center bg-black font-serif dark:bg-black">
            {/* Apply motion to the container that holds the two columns */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Triggers animation when 20% visible
                variants={containerVariants}
                className="container py-16 md:py-24"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column (Text Content) */}
                    <motion.div
                        variants={textVariants}
                        className="text-center lg:text-left"
                    >
                        {/* Tagline Badge */}
                        <div className="inline-flex items-center mx-auto lg:mx-0 gap-2 px-4 py-2 rounded-full bg-[#E5C082] text-[#000000] text-sm font-bold mb-6 shadow-sm shadow-[#E5C082]">
                            {/* Sparkles SVG Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles h-4 w-4">
                                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                                <path d="M20 3v4"></path>
                                <path d="M22 5h-4"></path>
                                <path d="M4 17v2"></path>
                                <path d="M5 18H3"></path>
                            </svg>
                            <span>Welcome to the Ultimate Cat Lovers Hub</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#E5C082]">My Pet Is Cat 🐾</h1>

                        {/* Subtext */}
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">Your daily dose of adorable cat moments, expert care tips, funny stories, and the best cat products—all in one purr-fect place!</p>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            {/* Explore Stories Link */}
                            <Link
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 bg-[#F28B69] text-[#000000] hover:bg-[#c77a60e2] h-11 px-8 rounded-full shadow-md hover:shadow-lg duration-200"
                                href="/blog"
                            >
                                Explore Stories
                                {/* Arrow Right SVG Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </Link>
                            <Link
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 border border-input text-white hover:bg-[#E5C082] hover:text-[#000000] h-11 px-8 rounded-full duration-200"
                                href="/shop"
                            >
                                Shop Cat Goodies
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Column (Hero Image) */}
                    <motion.div
                        variants={imageVariants}
                        className="mt-10 lg:mt-0"
                    >
                        <div className="rounded-3xl -mt-8 lg:-mt-0 overflow-hidden shadow-2xl border-4 border-[#E5C082]">
                            <Image
                                src="/hero-cat-BBnHaAkR.jpg"
                                alt="Adorable cat"
                                width={1000}
                                height={700}
                                loading="eager"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}