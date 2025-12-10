"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowBigUpDash, BoldIcon, ContactRound, Home, ShoppingCart } from "lucide-react";

export default function Footer() {

    const footerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <footer className="bg-[#070200] w-full text-gray-300 py-10">

            {/* Animated Grid */}
            <motion.div
                variants={footerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 p-4"
            >

                {/* Logo + Text */}
                <div>
                    <h2 className="text-[#C5A550] text-2xl font-bold">
                        <Link href="/">
                            <Image
                                src="/Logo.png"
                                alt="logo"
                                width={120}
                                height={50}
                                className="h-12 w-auto"
                            />
                        </Link>
                        <p className="mt-1">My Pet Is Cat 🐾</p>
                    </h2>
                    <p className="mt-1">Luxury Cat&#39;s shown with passion.</p>
                    <div className="flex flex-col justify-center items-center gap-4 mt-2 pr-25">

                        {/* Instagram Link */}
                        <a
                            href="https://www.instagram.com/my_pet_is_cat.17?igsh=YzljYTk1ODg3Zg=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex border-2 border-[#5A47D7] items-center justify-center gap-2 whitespace-nowrap text-base font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 bg-secondary text-secondary-foreground hover:text-[#000000] hover:bg-[#5A47D7] h-11 px-5 rounded-full w-full sm:w-auto"
                        >
                            {/* Instagram SVG Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram size-5">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                            </svg>
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
                            className="inline-flex border-2 border-[#FF0338] items-center justify-center gap-2 whitespace-nowrap text-base font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 bg-secondary text-secondary-foreground hover:text-[#000000] hover:bg-[#FF0338] h-11 px-5 rounded-full w-full sm:w-auto"
                        >
                            {/* Youtube SVG Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube size-5">
                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2h15a2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"></path>
                                <path d="m10 14.5 5-2.5-5-2.5v5Z"></path>
                            </svg>
                            Subscribe on Youtube
                            {/* Arrow Right SVG Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl text-[#C5A550] font-bold mb-2">Quick Links</h3>
                    <ul className="flex justify-center items-center gap-4 lg:gap-6 pt-2 lg:pt-4 lg:mr-14">
                        <Link href="/" className="hover:text-[#C5A550] transition-colors"><Home className="ml-2"/>Home</Link>
                        <Link href="/blog" className="hover:text-[#C5A550] transition-colors"><BoldIcon className="ml-2"/> Blog</Link>
                        <Link href="/Shop" className="hover:text-[#C5A550] transition-colors"><ShoppingCart className="ml-2"/> Shop</Link>
                        <Link href="/About" className="hover:text-[#C5A550] transition-colors"><ArrowBigUpDash className="ml-2"/> About Us</Link>
                        <Link href="/Contact" className="hover:text-[#C5A550] transition-colors"> <ContactRound className="ml-2"/> Contact</Link>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl text-[#C5A550] font-semibold mb-3">Contact</h3>
                    <p>Email: <a href="https://youtube.com/@my_pet_is_cat?si=X2Yoq0vrNQwQ_3eG"
                        target="_blank"
                        rel="noopener noreferrer">my.pet.is.cat.17@gmail.com</a></p>
                </div>

            </motion.div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-500">
                <p>
                    © {new Date().getFullYear()} <span className='uppercase'> <a href="https://youtube.com/@my_pet_is_cat?si=X2Yoq0vrNQwQ_3eG"
                        target="_blank"
                        rel="noopener noreferrer">@My_pet_is_cat</a></span> All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
