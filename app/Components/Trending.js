'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const trendingPosts = [
    {
        id: 1,
        delay: 0,
        imgSrc: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
        imgAlt: "10 Heartwarming Cat Rescue Stories That Will Make You Cry",
        category: "Stories",
        date: "May 15, 2025",
        title: "10 Heartwarming Cat Rescue Stories That Will Make You Cry",
        excerpt: "These incredible rescue stories show the amazing bond between humans and cats. Prepare tissues!",
    },
    {
        id: 2,
        delay: 150,
        imgSrc: "/hero-cat-BBnHaAkR.jpg",
        imgAlt: "Understanding Your Cat's Mysterious Behavior: A Complete Guide",
        category: "Care Tips",
        date: "May 12, 2025",
        title: "Understanding Your Cat's Mysterious Behavior: A Complete Guide",
        excerpt: "Why does your cat knock things off tables? We decode the mysterious world of feline behavior.",
    },
    {
        id: 3,
        delay: 300,
        imgSrc: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800&q=80",
        imgAlt: "The Best Cat Toys of 2025: Tested and Approved by Real Cats",
        category: "Reviews",
        date: "May 10, 2025",
        title: "The Best Cat Toys of 2025: Tested and Approved by Real Cats",
        excerpt: "We asked 50 cats to test the latest toys. Here are the winners that kept them entertained for hours!",
    },
];

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-3 w-3">
        <path d="M8 2v4"></path>
        <path d="M16 2v4"></path>
        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
        <path d="M3 10h18"></path>
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform">
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
    </svg>
);

// Framer Motion Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            when: "beforeChildren",
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};


export default function Trending() {
    return (
        <section className="container py-5">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E5C082]">Trending Cat Moments 🔥</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto font-bold">The most heartwarming, hilarious, and viral cat stories from around the web</p>
            </div>
            
            {/* Applied motion.div for the grid container with staggering */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                
                {trendingPosts.map((post) => (
                    // Applied motion.div for each post card with item animation
                    <motion.div 
                        key={post.id} 
                        variants={itemVariants}
                    >
                        <article className="group bg-card rounded-2xl border-2 border-[#E5C082] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                            <Link className="block" href={`/blog/${post.id}`}>
                                <div className="aspect-16/10 overflow-hidden">
                                    <Image 
                                        src={post.imgSrc} 
                                        alt={post.imgAlt} 
                                        width={800}
                                        height={500}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>
                            </Link>
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">{post.category}</span>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <CalendarIcon />
                                        <time>{post.date}</time>
                                    </div>
                                </div>
                                <Link href={`/blog/${post.id}`}>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                                </Link>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                                <Link href={`/blog/${post.id}`} passHref>
                                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 hover:text-accent-foreground group/btn p-0 h-auto hover:bg-transparent">
                                        <span className="text-sm font-medium">Read More</span>
                                        <ArrowRightIcon />
                                    </button>
                                </Link>
                            </div>
                        </article>
                    </motion.div>
                ))}
                
            </motion.div>
            {/* View All Stories Link */}
            <div className="text-center mt-12">
                <Link 
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 border border-input bg-background hover:bg-[#E5C082] hover:text-[#000000] h-11 px-8 rounded-full" 
                    href="/blog"
                >
                    View All Stories
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                </Link>
            </div>
        </section>
    );
}