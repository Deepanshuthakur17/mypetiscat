"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 z-50 bg-dark/90 backdrop-blur-lg text-white border-b border-gold/20">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

                {/* LOGO */}
                <Link href="/" className="text-3xl font-bold text-gold tracking-wide">
                    <Image
                        src="/Logo.png"
                        alt="Company Logo"
                        width={200}
                        height={80}
                        className="h-16 w-auto"
                        loading= "eager"
                    />

                </Link>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex gap-8 text-lg">
                    <Link href="/" className="hover:text-[#E5C082]">Home</Link>
                    <Link href="/Blog" className="hover:text-[#E5C082]">Blog</Link>
                    <Link href="/Shop" className="hover:text-[#E5C082]">Shop</Link>
                    <Link href="/About" className="hover:text-[#E5C082]">About</Link>
                    <Link href="/contact" className="hover:text-[#E5C082]">Contact</Link>
                </div>

                {/* MOBILE TOGGLE BUTTON */}
                <button
                    className="md:hidden text-gold text-3xl"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle navigation menu"
                >
                    ☰
                </button>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden bg-brown p-4 flex flex-col gap-4 text-2xl text-center">
                    <Link href="/" className="hover:text-[#E5C082]" onClick={() => setOpen(false)}>Home</Link>
                    <Link href="/Blog" className="hover:text-[#E5C082]" onClick={() => setOpen(false)}>Blog</Link>
                    <Link href="/Shop" className="hover:text-[#E5C082]" onClick={() => setOpen(false)}>Shop</Link>
                    <Link href="/about" className="hover:text-[#E5C082]" onClick={() => setOpen(false)}>About</Link>
                    <Link href="/contact" className="hover:text-[#E5C082]" onClick={() => setOpen(false)}>Contact</Link>
                </div>
            )}
        </nav>
    );
}
