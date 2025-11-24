'use client';

import { motion } from "framer-motion";
import Image from "next/image";

// --- STATIC DATA FOR SHORTS ---
const catShorts = [
    { id: 1, youtubeId: 'YwGAPdgeUvg', title: 'Curious Cat Discovers a Mirror' },
    { id: 2, youtubeId: '6L2yi6uBheg', title: 'Curious Cat Discovers a Mirror' },
    { id: 3, youtubeId: '7mRROgcNU7A', title: 'Epic Fail: Cat vs. Cucumber' },
    // 🐈 You can add many more videos here, and the responsive design will handle them! 
    { id: 4, youtubeId: '7mRROgcNU7A', title: 'Owner Surprises Cat with New Toy' },
    { id: 5, youtubeId: 'o2Y9Q3Xk_F8', title: 'Cat Reacts to Scary Movie' },
    { id: 6, youtubeId: 'Q-0s8h1m6a0', title: 'Kitten Playing with Laser Pointer' },
    // ... add hundreds more if you like!
];

export default function Shorts() {
    // 1. 🗑️ REMOVED THE slice(0, 3) LIMIT. 
    // All items in catShorts will now be displayed.
    const displayedShorts = catShorts;

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-[#E5C082] mb-6 flex uppercase">
                    Shorts  <Image
                        src="/Logo.png"
                        alt="Company Logo"
                        width={200}
                        height={80}
                        className="h-16 w-auto -mt-4 ml-3"
                        loading="eager"
                    />
                </h2>

                <div
                    className="flex space-x-4 overflow-x-auto pb-4 
                                flex-nowrap snap-x snap-mandatory overscroll-x-contain"
                    style={{
                        WebkitOverflowScrolling: 'touch',
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                        cursor: 'grab',
                    }}
                >
                    {/* Maps over ALL items in the catShorts array */}
                    {displayedShorts.map((short) => (
                        <motion.div
                            key={short.id}
                            className="flex-shrink-0 rounded-xl border-4 border-[#E5C082] shadow-lg overflow-hidden 
                                       transition-shadow hover:shadow-2xl snap-center 
                                       w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: short.id * 0.1 }}
                        >
                            <div className="relative w-full aspect-[9/16]">
                                <iframe
                                    // NOTE: If you add many shorts, consider changing `autoplay=1` to `autoplay=0` 
                                    // to prevent too many videos from loading and playing at once, which can slow down the page.
                                    src={`https://www.youtube.com/embed/${short.youtubeId}?controls=0&autoplay=1&mute=1&loop=1&playlist=${short.youtubeId}`}
                                    title={short.title}
                                    frameBorder="0"
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}