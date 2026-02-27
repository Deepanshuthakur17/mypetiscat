"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Shop", href: "/Shop" },
        { name: "About", href: "/About" },
        { name: "Contact", href: "/contact" },
    ];

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
                        loading="eager"
                    />
                </Link>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex gap-8 text-lg">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition-colors duration-200 hover:text-[#E5C082] ${
                                isActive(link.href) ? "text-[#E5C082] font-semibold" : "text-white"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* MOBILE TOGGLE BUTTON */}
                <button
                    className="md:hidden text-gold text-3xl"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle navigation menu"
                >
                    {open ? "✕" : "☰"}
                </button>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden bg-brown p-4 flex flex-col gap-4 text-2xl text-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={`hover:text-[#E5C082] ${
                                isActive(link.href) ? "text-[#E5C082]" : "text-white"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}