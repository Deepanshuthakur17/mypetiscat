/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
    X, Home, ThumbsUp, Share2, ChevronUp, ChevronDown, 
    Grid, List, Sparkles, Heart, Laugh, Crown 
} from 'lucide-react';

// --- STATIC DATA FOR SHORTS ---
const catShorts = [
    { id: 1, youtubeId: 'YwGAPdgeUvg', category: 'Viral Cats', title: 'Cat in a Red Dress 😻 | Cutest Fashion Model Ever! | #Shorts #MyPetIsCat' },
    { id: 2, youtubeId: '6L2yi6uBheg', category: 'Rich Cats', title: 'Cat is Flexing Their Luxury Jewellery 💎🐱 | Rich Cat Vibes 😎 #Shorts #MyPetIsCat' },
    { id: 3, youtubeId: '7mRROgcNU7A', category: 'Viral Cats', title: 'Cat in a Orange Dress 😻 | Cutest Fashion Model Ever! | #Shorts #MyPetIsCat' },
    { id: 4, youtubeId: 'LrzJpAxqkwQ', category: 'Viral Cats', title: 'Cat in Black 😎 | The Coolest Fashion Icon Ever! | #Shorts #MyPetIsCat' },
    { id: 5, youtubeId: 'U8bgxbEceeI', category: 'Rich Cats', title: 'Rich Boss Cat vs Normal Cat | Funny Cat Attitude 😎🐈💸 #Shorts #MyPetIsCat' },
    { id: 6, youtubeId: 'UdK0kulFKdk', category: 'Viral Cats', title: 'Cat in a Green Dress 😻 | Cutest Fashion Model Ever! | #Shorts #MyPetIsCat' },
    { id: 7, youtubeId: '4Pdou41L7jc', category: 'Rich Cats', title: 'Here The Real 👑 Queen | Royal Cat Attitude 💅🐱 | #Shorts #MyPetIsCat' },
    { id: 8, youtubeId: 'pt72uSBpvLY', category: 'Funny Cats', title: 'Coolest Cat on Earth 😎 | Too Stylish to Handle! | #Shorts #MyPetIsCat' },
    { id: 9, youtubeId: 'xUXAeCwnIM4', category: 'Rich Cats', title: 'When luxury meets cattitude 💅🐱#Shorts #MyPetIsCat' },
    { id: 10, youtubeId: 'OcyBVPDg1BE', category: 'Rich Cats', title: '​G-WAGON Cat BOSS 💰 Drives Better Than You! 😂 #RichCat' },
];

const categories = [
    { name: "All", icon: Sparkles },
    { name: "Viral Cats", icon: Heart },
    { name: "Funny Cats", icon: Laugh },
    { name: "Cat Care", icon: List },
    { name: "Rich Cats", icon: Crown },
];

/**
 * 💡 Re-usable Button for the Action Bar
 */
const ShortsActionButton = ({ icon: Icon, label, onClick }) => (
    <button
        className="flex flex-col items-center p-2 text-black font-bold transition-colors cursor-pointer hover:text-[#E5C082] focus:outline-none"
        onClick={onClick}
    >
        <Icon size={28} strokeWidth={2.5} />
        <span className="text-xs font-semibold mt-1">{label}</span>
    </button>
);


// ---------------------------------------------------------------------
//                             VIDEO MODAL
// ---------------------------------------------------------------------

function VideoModal({ shorts, selectedId, onClose }) {
    const initialIndex = shorts.findIndex(short => short.youtubeId === selectedId);
    const [currentIndex, setCurrentIndex] = useState(initialIndex > -1 ? initialIndex : 0);
    const currentShort = shorts[currentIndex];
    const scrollRef = useRef(null);
    const [showLikeAlert, setShowLikeAlert] = useState(false);

    const totalShorts = shorts.length;
    const isFirstVideo = currentIndex === 0;
    const isLastVideo = currentIndex === totalShorts - 1;

    const performScroll = (index) => {
        if (scrollRef.current) {
            const videoHeight = scrollRef.current.clientHeight;
            scrollRef.current.scrollTo({
                top: index * videoHeight,
                behavior: 'smooth',
            });
        }
    }

    const goToNextVideo = useCallback(() => {
        if (!isLastVideo) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            performScroll(nextIndex);
            setShowLikeAlert(false);
        }
    }, [currentIndex, isLastVideo]);

    const goToPrevVideo = useCallback(() => {
        if (!isFirstVideo) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            performScroll(prevIndex);
            setShowLikeAlert(false);
        }
    }, [currentIndex, isFirstVideo]);

    const handleLikeClick = () => {
        new Audio('/cat-meow-For-Like-button.mp3').play().catch(() => {});
        setShowLikeAlert(true);
    };

    const handleShareClick = () => {
        const shareUrl = `https://www.youtube.com/watch?v=${currentShort.youtubeId}`;
        navigator.clipboard.writeText(shareUrl)
            .then(() => alert(`Link copied to clipboard: ${shareUrl}`))
            .catch(() => alert('Could not copy link.'));
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); goToNextVideo(); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); goToPrevVideo(); }
            else if (e.key === 'Escape') { if (showLikeAlert) { setShowLikeAlert(false); } else { onClose(); } }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [goToNextVideo, goToPrevVideo, onClose, showLikeAlert]);

    useEffect(() => {
        if (scrollRef.current) {
            const videoHeight = scrollRef.current.clientHeight;
            scrollRef.current.scrollTo({ top: initialIndex * videoHeight, behavior: 'auto' });
        }
    }, [initialIndex]);

    const handleScroll = (e) => {
        const container = e.currentTarget;
        const scrollPosition = container.scrollTop;
        const videoHeight = container.clientHeight;
        const newIndex = Math.round(scrollPosition / videoHeight);
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
            setShowLikeAlert(false);
        }
    };

    if (!currentShort) return null;
    const videoUrl = `https://www.youtube.com/watch?v=${currentShort.youtubeId}`;

    return (
        <motion.div className="fixed inset-0 z-50 bg-black flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={onClose} className="absolute top-4 left-4 z-50 text-white p-2 rounded-full bg-gray-900/70 hover:bg-gray-700 transition-colors"><X size={40} /></button>
            
            <button onClick={goToPrevVideo} disabled={isFirstVideo} style={{ right: `calc(50% - 230px)`, top: `calc(50% - 110px)` }} className={`absolute z-50 text-white p-3 rounded-full bg-gray-900/70 transition-opacity md:flex hidden ${isFirstVideo ? 'opacity-30' : 'hover:bg-gray-700'}`}><ChevronUp size={30} /></button>

            <div ref={scrollRef} className="w-full h-full max-w-[400px] overflow-y-scroll snap-y snap-mandatory relative scrollbar-hide" onScroll={handleScroll}>
                {shorts.map((short, index) => {
                    const isCurrent = index === currentIndex;
                    const embedUrl = `https://www.youtube.com/embed/${short.youtubeId}?controls=${isCurrent ? 1 : 0}&autoplay=${isCurrent ? 1 : 0}&mute=${isCurrent ? 0 : 1}&modestbranding=1&loop=1&playlist=${short.youtubeId}&playsinline=1`;
                    return (
                        <div key={short.id} className="w-full h-full shrink-0 snap-start relative bg-gray-900">
                            {index >= currentIndex - 1 && index <= currentIndex + 1 && (
                                <iframe src={embedUrl} title={short.title} frameBorder="0" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full" allowFullScreen />
                            )}
                            {isCurrent && (
                                <div className="absolute bottom-5 right-3 p-2 z-10 flex flex-col space-y-8 top-80">
                                    <ShortsActionButton icon={ThumbsUp} label="Like" onClick={handleLikeClick} />
                                    <ShortsActionButton icon={Share2} label="Share" onClick={handleShareClick} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <button onClick={goToNextVideo} disabled={isLastVideo} style={{ right: `calc(50% - 230px)`, top: `calc(50% + 5px)` }} className={`absolute z-50 text-white p-3 rounded-full bg-gray-900/70 transition-opacity md:flex hidden ${isLastVideo ? 'opacity-30' : 'hover:bg-gray-700'}`}><ChevronDown size={30} /></button>

            <AnimatePresence>
                {showLikeAlert && (
                    <motion.div className="absolute z-50 p-6 bg-[#000000] rounded-lg shadow-2xl max-w-xs text-center mx-auto" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                        <h3 className="text-2xl font-bold text-[#E5C082] mb-4">Support the Creator!</h3>
                        <p className="text-sm text-gray-600 mb-6">To **Like**, **Subscribe**, or **Comment**, please visit the video directly on YouTube.</p>
                        <a href="https://youtube.com/@my_pet_is_cat?si=EbXLkg067jj33Oy9" target="_blank" rel="noopener noreferrer"><Image src="/Logo.png" alt="Logo" width={200} height={80} className="h-16 w-auto ml-25 -mt-5" loading="eager" /></a>
                        <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="block w-full py-2 mt-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors text-center">Go to YouTube</a>
                        <button onClick={() => setShowLikeAlert(false)} className="mt-3 text-sm border-2 border-[#E5C082] rounded-full w-15 cursor-pointer font-bold text-gray-600 hover:text-[#000000] hover:bg-[#E5C082]">Close</button>
                    </motion.div>
                )}
            </AnimatePresence>

            <button onClick={onClose} className="absolute top-5 right-4 mr-15 cursor-pointer hover:text-[#E5C082] z-50 text-white p-2 rounded-full bg-gray-900/70 hover:bg-gray-700 transition-colors hidden sm:block">
                <Home size={40} className="ml-1"/><span className="font-bold">Home</span>
            </button>
        </motion.div>
    );
}

// ---------------------------------------------------------------------
//                         MAIN SHORTS COMPONENT
// ---------------------------------------------------------------------

export default function Shorts() {
    const [viewMode, setViewMode] = useState('preview');
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const openVideo = (youtubeId) => setSelectedVideoId(youtubeId);
    const closeVideo = () => setSelectedVideoId(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredShorts = useMemo(() => {
        if (activeCategory === "All") return catShorts;
        return catShorts.filter(short => short.category === activeCategory);
    }, [activeCategory]);

    const ActiveIcon = categories.find(c => c.name === activeCategory)?.icon || Sparkles;

    const VideoCard = ({ short }) => {
        const CategoryIcon = categories.find(c => c.name === short.category)?.icon || Sparkles;
        return (
            <motion.div
                key={short.id}
                onClick={() => openVideo(short.youtubeId)}
                onMouseEnter={() => setHoveredId(short.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="rounded-xl border-4 border-[#E5C082] shadow-lg overflow-hidden transition-shadow hover:shadow-2xl cursor-pointer"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
            >
                <div className="relative w-full aspect-9/16 bg-black">
                    <img src={`https://img.youtube.com/vi/${short.youtubeId}/hqdefault.jpg`} alt={short.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" style={{ opacity: hoveredId === short.id ? 0 : 1 }} />
                    {hoveredId === short.id && (
                        <iframe src={`https://www.youtube.com/embed/${short.youtubeId}?controls=0&autoplay=1&mute=1&loop=1&playlist=${short.youtubeId}&disablekb=1&modestbranding=1`} className="absolute inset-0 w-full h-full pointer-events-none opacity-100 transition-opacity duration-300" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent text-white z-10 pointer-events-none">
                        <p className="text-sm font-semibold truncate mb-1">{short.title}</p>
                        <div className="flex items-center gap-1.5 text-[#E5C082]">
                            <CategoryIcon size={14} />
                            <span className="text-[10px] uppercase font-bold tracking-widest">{short.category || 'Viral Cats'}</span>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-transparent z-20"></div>
                </div>
            </motion.div>
        );
    };

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h2 className="text-3xl font-bold text-[#E5C082] flex uppercase items-center">
                    Shorts
                    <Image src="/Logo.png" alt="Logo" width={120} height={50} className="h-16 w-auto ml-3 -mt-4" loading="eager" />
                </h2>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative z-40" ref={dropdownRef}>
                        <button onClick={() => { setIsDropdownOpen(!isDropdownOpen); if(!isDropdownOpen) new Audio('/select-sound.mp3').play().catch(()=>{}); }} className="flex items-center gap-3 bg-black border-2 border-[#E5C082] text-[#E5C082] px-6 py-2 rounded-full font-bold min-w-[180px] justify-between transition-all hover:bg-[#E5C082]/10 shadow-lg">
                            <span className="flex items-center gap-2"><ActiveIcon size={18} /> {activeCategory}</span>
                            <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full mt-2 left-0 w-full bg-black border-2 border-[#E5C082] rounded-2xl overflow-hidden shadow-2xl">
                                    {categories.map((cat) => (
                                        <button key={cat.name} onClick={() => { setActiveCategory(cat.name); setIsDropdownOpen(false); new Audio('/select-sound.mp3').play().catch(()=>{}); }} className="flex items-center gap-3 w-full px-5 py-3 text-[#E5C082] hover:bg-[#E5C082] hover:text-black transition-colors font-bold text-left"><cat.icon size={18} /> {cat.name}</button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button onClick={() => setViewMode(viewMode === 'preview' ? 'grid' : 'preview')} className="flex items-center gap-2 px-5 py-2 bg-[#E5C082] text-black rounded-full font-bold hover:bg-white transition-all transform active:scale-95 shadow-lg">
                        {viewMode === 'preview' ? <><Grid size={20} /> <span>View All</span></> : <><List size={20} /> <span>Collapse View</span></>}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={`${activeCategory}-${viewMode}`} className={viewMode === 'preview' ? "flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x overscroll-contain" : "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    {filteredShorts.map((short) => (
                        <div key={short.id} className={viewMode === 'preview' ? "shrink-0 w-1/2 md:w-1/4 snap-center" : ""}>
                            <VideoCard short={short} />
                        </div>
                    ))}
                    
                    {/* --- VIEW ALL BUTTON AT END OF HORIZONTAL LIST --- */}
                    {viewMode === 'preview' && (
                        <div className="shrink-0 w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 snap-center flex items-center justify-center p-4">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className="h-full w-full border-4 border-dashed border-white/50 text-white/70 rounded-xl flex flex-col items-center justify-center p-6 bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid-3x3"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M3 15h18"></path><path d="M9 3v18"></path><path d="M15 3v18"></path></svg>
                                <span className="mt-3 text-lg font-bold">View All ({filteredShorts.length})</span>
                            </button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {selectedVideoId && <VideoModal shorts={filteredShorts} selectedId={selectedVideoId} onClose={closeVideo} />}
            </AnimatePresence>
        </section>
    );
}