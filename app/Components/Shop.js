/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
    ShoppingBag, Star, X, CheckCircle2,
    Sparkles, Heart, Crown, ToyBrick, Utensils, ChevronDown 
} from 'lucide-react';

// --- SHOP DATA ---
const shopProducts = [
    { id: 1, category: 'Accessories', title: 'Royal Gold Cat Collar', price: '24.99', rating: 5, description: 'Handcrafted gold-plated collar for your feline royalty. Includes a comfort-fit lining and a safety breakaway buckle.', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400' },
    { id: 2, category: 'Toys', title: 'Interactive Laser Chase', price: '19.50', rating: 4, description: 'Automatic 360-degree rotating laser toy that keeps your cat active and entertained for hours.', img: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=400' },
    { id: 3, category: 'Food', title: 'Organic Salmon Treats', price: '12.99', rating: 5, description: 'Grain-free, high-protein treats made from 100% wild-caught Alaskan salmon.', img: 'https://cdn.sefinek.net/images/animals/cat/cat-1401781-min.jpg' },
    { id: 4, category: 'Accessories', title: 'Luxury Velvet Bed', price: '89.99', rating: 5, description: 'Ultra-soft memory foam bed wrapped in premium crushed velvet. The ultimate nap experience.', img: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=400' },
    { id: 5, category: 'Toys', title: 'Natural Catnip Mouse', price: '8.00', rating: 4, description: 'Organic catnip-filled mouse made from durable jute fibers to satisfy scratching instincts.', img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=400' },
    { id: 6, category: 'Care', title: 'Self-Cleaning Groomer', price: '34.00', rating: 5, description: 'Gentle silicone bristles that remove loose fur while providing a soothing massage for your pet.', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400' },
];

const categories = [
    { name: "All", icon: Sparkles },
    { name: "Accessories", icon: Crown },
    { name: "Toys", icon: ToyBrick },
    { name: "Food", icon: Utensils },
    { name: "Care", icon: Heart },
];

// --- MODAL COMPONENT ---
function ProductModal({ product, onClose }) {
    if (!product) return null;

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-[#1a1a1a] border border-[#E5C082]/30 w-full max-w-4xl rounded-4xl overflow-hidden relative shadow-2xl"
            >
                <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-[#E5C082] hover:text-black transition-all">
                    <X size={24} />
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/2 aspect-square md:aspect-auto h-[300px] md:h-[500px] bg-gray-900 overflow-hidden">
                        <img src={product.img} alt={product.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                        <span className="text-[#E5C082] font-bold text-xs uppercase tracking-[0.2em] mb-4">{product.category}</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase leading-tight mb-4">{product.title}</h2>
                        
                        <div className="flex items-center gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} fill={i < product.rating ? "#E5C082" : "none"} className={i < product.rating ? "text-[#E5C082]" : "text-gray-600"} />
                            ))}
                            <span className="text-gray-500 text-sm ml-2">(Verified Paws)</span>
                        </div>

                        <p className="text-gray-400 leading-relaxed mb-8">{product.description}</p>

                        <div className="mt-auto">
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-tighter">Premium Price</p>
                                    <p className="text-4xl font-black text-[#E5C082]">${product.price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-500 flex items-center gap-1 text-sm font-bold">
                                        <CheckCircle2 size={16} /> In Stock
                                    </p>
                                    <p className="text-gray-500 text-xs">Ready for shipping</p>
                                </div>
                            </div>

                            <button className="w-full bg-[#E5C082] text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all transform active:scale-95 shadow-lg shadow-[#E5C082]/10">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Shop() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredProducts = useMemo(() => {
        if (activeCategory === "All") return shopProducts;
        return shopProducts.filter(item => item.category === activeCategory);
    }, [activeCategory]);

    const ActiveIcon = categories.find(c => c.name === activeCategory)?.icon || Sparkles;

    return (
        <section className="w-full bg-[#0a0a0a] min-h-screen py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* --- HEADER --- */}
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-4xl font-bold text-[#E5C082] flex items-center uppercase tracking-tighter">
                            Cat <span className="text-white ml-2 text-3xl">Shop</span>
                            <Image src="/Logo.png" alt="Logo" width={100} height={40} className="h-10 w-auto ml-4 opacity-80" />
                        </h2>
                        <p className="text-gray-400 mt-2 max-w-md text-sm">Premium essentials for your feline royalty. Handpicked with paws-itive vibes.</p>
                    </div>

                    <div className="relative z-40" ref={dropdownRef}>
                        <button 
                            onClick={() => {
                                setIsDropdownOpen(!isDropdownOpen);
                                if(!isDropdownOpen) new Audio('/select-sound.mp3').play().catch(()=>{});
                            }}
                            className="flex items-center gap-3 bg-black border-2 border-[#E5C082] text-[#E5C082] px-6 py-2 rounded-full font-bold min-w-[200px] justify-between transition-all hover:bg-[#E5C082]/10 shadow-lg"
                        >
                            <span className="flex items-center gap-2"><ActiveIcon size={18} /> {activeCategory}</span>
                            <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full mt-2 left-0 w-full bg-black border-2 border-[#E5C082] rounded-2xl overflow-hidden shadow-2xl">
                                    {categories.map((cat) => (
                                        <button 
                                            key={cat.name} 
                                            onClick={() => { 
                                                setActiveCategory(cat.name); 
                                                setIsDropdownOpen(false);
                                                new Audio('/select-sound.mp3').play().catch(()=>{});
                                            }} 
                                            className="flex items-center gap-3 w-full px-5 py-3 text-[#E5C082] hover:bg-[#E5C082] hover:text-black transition-colors font-bold text-left"
                                        >
                                            <cat.icon size={18} /> {cat.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* --- PRODUCT GRID --- */}
                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setSelectedProduct(product)}
                                className="group bg-[#1a1a1a] border border-white/5 rounded-3xl overflow-hidden hover:border-[#E5C082]/50 transition-all shadow-xl flex flex-col cursor-pointer"
                            >
                                <div className="relative aspect-4/5 overflow-hidden bg-gray-900">
                                    <img src={product.img} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[#E5C082] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#E5C082]/20 pointer-events-none">
                                        {product.category}
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6 flex flex-col flex-1">
                                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight mb-2 group-hover:text-[#E5C082] transition-colors line-clamp-2 uppercase">
                                        {product.title}
                                    </h3>
                                    
                                    <div className="mt-auto flex items-center justify-between gap-2">
                                        <span className="text-lg sm:text-xl font-black text-white">${product.price}</span>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevents double firing modal if clicking icon
                                                setSelectedProduct(product);
                                            }}
                                            className="bg-[#E5C082] text-black p-2 rounded-xl hover:bg-white hover:scale-110 active:scale-95 transition-all shadow-lg"
                                        >
                                            <ShoppingBag size={18} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* --- DETAILS MODAL --- */}
                <AnimatePresence>
                    {selectedProduct && (
                        <ProductModal 
                            product={selectedProduct} 
                            onClose={() => setSelectedProduct(null)} 
                        />
                    )}
                </AnimatePresence>

                {/* --- EMPTY STATE --- */}
                {filteredProducts.length === 0 && (
                    <div className="py-24 text-center">
                        <ShoppingBag size={60} className="text-[#E5C082] mx-auto opacity-20 mb-4" />
                        <h3 className="text-xl font-bold text-white uppercase">No products found</h3>
                        <p className="text-gray-500 mt-2">Try checking another category, meow!</p>
                    </div>
                )}
            </div>
        </section>
    );
}