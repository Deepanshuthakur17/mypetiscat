'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Catweek() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { 
                staggerChildren: 0.15,
            } 
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={containerVariants}
            className="bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12 shadow-lg"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                <motion.div 
                    variants={itemVariants}
                    className="border-2 border-[#E5C082] rounded-2xl text-center pt-2"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E5C082] text-[#000000] text-sm font-bold mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color="red" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart h-4 w-4 fill-current">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                        <span>Cat of the Week</span>
                    </div>
                    
                    {/* Title and Excerpt */}
                    <h3 className="text-3xl font-bold mb-4 text-[#E5C082]">Meet Whiskers! 🎉</h3>
                    <p className="text-muted-foreground mb-6">This adorable 3-month-old tabby kitten stole our hearts with their playful antics and endless curiosity. Whiskers was rescued from a local shelter and is now living their best life with a loving family. Their favorite activities include chasing feather toys, napping in sunbeams, and giving headbutts to anyone who will accept them!</p>
                    
                    {/* Action Link */}
                    <Link 
                        className="inline-flex items-center border-2 border-[#E5C082] justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-full" 
                        href="/blog"
                    >
                        Read Their Story
                    </Link>
                </motion.div>
                
                {/* Image - apply item motion for smooth entry */}
                <motion.div 
                    variants={itemVariants}
                    className="rounded-2xl overflow-hidden shadow-xl"
                >
                    <Image 
                        src="/cat-of-week-CfpdruWc.jpg" 
                        alt="Cat of the week - Whiskers" 
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}