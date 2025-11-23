'use client';

import { motion } from 'framer-motion';

export default function Social() {
    return (
        <section className="container py-16">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-linear-to-r from-[#E5C082] to-[#ae8845e9] lg:ml-8 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#000000]">Join the Cat Lovers Community! 🐱</h2>
                <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">Follow us on Instagram for daily doses of cuteness, behind-the-scenes moments, and exclusive content from @My.pet.is.cat.17</p>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4"> 
                
                    {/* Instagram Link */}
                    <a 
                        href="https://www.instagram.com/my_pet_is_cat.17?igsh=YzljYTk1ODg3Zg==" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex border-2 border-[#5A47D7] items-center justify-center gap-2 whitespace-nowrap text-lg font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 bg-secondary text-secondary-foreground hover:text-[#000000] hover:bg-[#5A47D7] h-11 px-8 rounded-full w-full sm:w-auto"
                    >
                        Follow on Instagram
                        {/* Arrow Right SVG Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </a>
                    
                    {/* Youtube Link */}
                    <a 
                        href="https://youtube.com/@my_pet_is_cat?si=X2Yoq0vrNQwQ_3eG" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex border-2 border-[#FF0338] items-center justify-center gap-2 whitespace-nowrap text-lg font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 bg-secondary text-secondary-foreground hover:text-[#000000] hover:bg-[#FF0338] h-11 px-8 rounded-full w-full sm:w-auto"
                    >
                        Subscribe on Youtube
                        {/* Arrow Right SVG Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
            </motion.div>
        </section>
    );
}