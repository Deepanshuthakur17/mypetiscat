/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Home, ThumbsUp, Share2, ChevronUp, ChevronDown, Grid, List } from 'lucide-react';

// --- STATIC DATA FOR SHORTS ---
const catShorts = [
    { id: 1, youtubeId: 'YwGAPdgeUvg', title: 'Cat in a Red Dress 😻 | Cutest Fashion Model Ever! | #Shorts #MyPetIsCat' },
    { id: 2, youtubeId: '6L2yi6uBheg', title: 'Cat is Flexing Their Luxury Jewellery 💎🐱 | Rich Cat Vibes 😎 #Shorts #MyPetIsCat' },
    { id: 3, youtubeId: '7mRROgcNU7A', title: 'Cat in a Orange Dress 😻 | Cutest Fashion Model Ever! | #Shorts #MyPetIsCat' },
    { id: 4, youtubeId: 'LrzJpAxqkwQ', title: 'Cat in Black 😎 | The Coolest Fashion Icon Ever! | #Shorts #MyPetIsCat' },
    { id: 5, youtubeId: 'U8bgxbEceeI', title: 'Rich Boss Cat vs Normal Cat | Funny Cat Attitude 😎🐈💸 #Shorts #MyPetIsCat' },
    { id: 6, youtubeId: 'UdK0kulFKdk', title: 'Cat in a Green Dress 😻 | Cutest Fashion Model Ever! | #Shorts #MyPetIsCat' },
    { id: 7, youtubeId: '4Pdou41L7jc', title: 'Here The Real 👑 Queen | Royal Cat Attitude 💅🐱 | #Shorts #MyPetIsCat' },
    { id: 8, youtubeId: 'pt72uSBpvLY', title: 'Coolest Cat on Earth 😎 | Too Stylish to Handle! | #Shorts #MyPetIsCat' },
    { id: 9, youtubeId: 'xUXAeCwnIM4', title: 'When luxury meets cattitude 💅🐱#Shorts #MyPetIsCat' },
    { id: 10, youtubeId: 'OcyBVPDg1BE', title: '​G-WAGON Cat BOSS 💰 Drives Better Than You! 😂 #RichCat' },
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
//                            VIDEO MODAL
// ---------------------------------------------------------------------

/**
 * 🎬 Full-screen Video Modal Component (The 'Big Screen' View)
 */
function VideoModal({ shorts, selectedId, onClose }) {
    // ... (Modal logic remains unchanged)
    const initialIndex = shorts.findIndex(short => short.youtubeId === selectedId);
    const [currentIndex, setCurrentIndex] = useState(initialIndex > -1 ? initialIndex : 0);
    const currentShort = shorts[currentIndex];
    const scrollRef = useRef(null);
    const [showLikeAlert, setShowLikeAlert] = useState(false);

    // --- NAVIGATION LOGIC ---
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
        setShowLikeAlert(true);
    };

    const handleShareClick = () => {
        const shareUrl = `https://www.youtube.com/watch?v=${currentShort.youtubeId}`;
        navigator.clipboard.writeText(shareUrl)
            .then(() => alert(`Link copied to clipboard: ${shareUrl}`))
            .catch(() => alert('Could not copy link.'));
    };

    // Keyboard navigation (ArrowUp/ArrowDown/Escape)
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                goToNextVideo();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                goToPrevVideo();
            } else if (e.key === 'Escape') {
                if (showLikeAlert) {
                    setShowLikeAlert(false);
                } else {
                    onClose();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [goToNextVideo, goToPrevVideo, onClose, showLikeAlert]);

    // Auto-scroll on mount
    useEffect(() => {
        if (scrollRef.current) {
            const videoHeight = scrollRef.current.clientHeight;
            scrollRef.current.scrollTo({
                top: initialIndex * videoHeight,
                behavior: 'auto',
            });
        }
    }, [initialIndex]);

    // Handle scroll snapping
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

    // Positioning for the Up/Down arrows relative to the central video frame
    const navArrowOffset = '230px';
    const navGap = '110px';
    const videoUrl = `https://www.youtube.com/watch?v=${currentShort.youtubeId}`;


    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* --- TOP-LEFT EXIT BUTTON (Always visible for Back to Home) --- */}
            <button
                onClick={onClose}
                className="absolute top-4 left-4 z-50 text-white p-2 rounded-full bg-gray-900/70 hover:bg-gray-700 transition-colors"
                aria-label="Close Video Player and Go Home"
            >
                <X size={40} />
            </button>

            {/* --- PREVIOUS VIDEO BUTTON (UP) - Desktop Only, Outside Video Frame --- */}
            <button
                onClick={goToPrevVideo}
                disabled={isFirstVideo}
                style={{ right: `calc(50% - ${navArrowOffset})`, top: `calc(50% - ${navGap})` }}
                className={`absolute z-50 text-white p-3 rounded-full 
                            bg-gray-900/70 transition-opacity md:flex hidden
                            ${isFirstVideo ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-700'}`}
                aria-label="Previous Video"
            >
                <ChevronUp size={30} />
            </button>


            {/* --- SCROLLABLE VIDEO CONTAINER (Max 400px width) --- */}
            <div
                ref={scrollRef}
                // Hidden on ALL screens
                className="w-full h-full max-w-[400px] overflow-y-scroll snap-y snap-mandatory relative scrollbar-hide"
                onScroll={handleScroll}
            >
                {shorts.map((short, index) => {
                    const shouldLoad = index >= currentIndex - 1 && index <= currentIndex + 1;
                    const isCurrent = index === currentIndex;

                    // All videos in the modal should loop
                    const embedUrl = `https://www.youtube.com/embed/${short.youtubeId}?controls=${isCurrent ? 1 : 0}&autoplay=${isCurrent ? 1 : 0}&mute=${isCurrent ? 0 : 1}&modestbranding=1&loop=1&playlist=${short.youtubeId}`;

                    return (
                        <div
                            key={short.id}
                            className="w-full h-full shrink-0 snap-start relative bg-gray-900"
                        >
                            {shouldLoad ? (
                                <iframe
                                    src={embedUrl}
                                    title={short.title}
                                    frameBorder="0"
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white">
                                    <p>Loading next video...</p>
                                </div>
                            )}

                            {/* --- ACTION BUTTONS (Right Side) --- */}
                            {isCurrent && (
                                <div className="absolute bottom-5 right-3 p-2 z-10 flex flex-col space-y-8 top-80">
                                    {/* Like Button with Pop-up Handler */}
                                    <ShortsActionButton
                                        icon={ThumbsUp}
                                        label="Like"
                                        onClick={handleLikeClick}
                                    />

                                    {/* Share Button with functionality */}
                                    <ShortsActionButton
                                        icon={Share2}
                                        label="Share"
                                        onClick={handleShareClick}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* --- NEXT VIDEO BUTTON (DOWN) - Desktop Only, Outside Video Frame --- */}
            <button
                onClick={goToNextVideo}
                disabled={isLastVideo}
                style={{ right: `calc(50% - ${navArrowOffset})`, top: `calc(50% + 5px)` }}
                className={`absolute z-50 text-white p-3 cursor-pointer rounded-full 
                            bg-gray-900/70 transition-opacity md:flex hidden
                            ${isLastVideo ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-700'}`}
                aria-label="Next Video"
            >
                <ChevronDown size={30} />
            </button>


            {/* --- LIKE POP-UP / MODAL --- */}
            <AnimatePresence>
                {showLikeAlert && (
                    <motion.div
                        className="absolute z-50 p-6 bg-[#000000] rounded-lg shadow-2xl max-w-xs text-center mx-auto"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <h3 className="text-2xl font-bold text-[#E5C082] mb-4">Support the Creator!</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            To **Like**, **Subscribe**, or **Comment**, please visit the video directly on YouTube.
                        </p>
                        <a href="https://youtube.com/@my_pet_is_cat?si=EbXLkg067jj33Oy9" target="_blank" rel="noopener noreferrer">
                            <Image
                                src="/Logo.png"
                                alt="Company Logo"
                                width={200}
                                height={80}
                                className="h-16 w-auto ml-25 -mt-5"
                                loading="eager"
                            /></a>
                        <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setShowLikeAlert(false)}
                            className="block w-full py-2 mt-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
                        >
                            Go to YouTube
                        </a>
                        <button
                            onClick={() => setShowLikeAlert(false)}
                            className="mt-3 text-sm border-2 border-[#E5C082] rounded-full w-15 cursor-pointer font-bold text-gray-600 hover:text-[#000000] hover:bg-[#E5C082]"
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* --- HOME BUTTON ON WIDER SCREENS (OUTSIDE THE VIDEO FRAME) --- */}
            <button
                onClick={onClose}
                className="absolute top-5 right-4 mr-15 cursor-pointer hover:text-[#E5C082] z-50 text-white p-2 rounded-full bg-gray-900/70 hover:bg-gray-700 transition-colors hidden sm:block"
                aria-label="Back to Home"
            >
                <Home size={40} className="ml-1"/>
                <span className="font-bold">Home</span>
            </button>

        </motion.div>
    );
}

// ---------------------------------------------------------------------
//                        MAIN SHORTS COMPONENT
// ---------------------------------------------------------------------

/**
 * 🏠 Main Shorts Component (The Initial Preview List) 
 */
export default function Shorts() {
    // New state to control the view mode: 'preview' (horizontal) or 'grid' (all videos)
    const [viewMode, setViewMode] = useState('preview');
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    const openVideo = (youtubeId) => {
        setSelectedVideoId(youtubeId);
    };

    const closeVideo = () => {
        setSelectedVideoId(null);
    };

    // Helper component to render a single video card, used in both preview and grid
    const VideoCard = ({ short }) => {
        return (
            <motion.div
                key={short.id} // Retaining key for potential list optimization, but removing for Framer trigger purposes below
                onClick={() => openVideo(short.youtubeId)}
                onMouseEnter={() => setHoveredId(short.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="rounded-xl border-4 border-[#E5C082] shadow-lg overflow-hidden 
                            transition-shadow hover:shadow-2xl cursor-pointer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="relative w-full aspect-9/16">
                    {/* 1. Standard <img> for thumbnail */}
                    <img
                        src={`https://img.youtube.com/vi/${short.youtubeId}/hqdefault.jpg`}
                        alt={short.title}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                        style={{ opacity: hoveredId === short.id ? 0 : 1 }}
                    />

                    {/* 2. Muted iframe preview on hover (Seamless swap) */}
                    {hoveredId === short.id && (
                        <iframe
                            // Autoplay=1, Mute=1, Loop=1 for preview
                            src={`https://www.youtube.com/embed/${short.youtubeId}?controls=0&autoplay=1&mute=1&loop=1&playlist=${short.youtubeId}&disablekb=1&modestbranding=1`}
                            title={short.title}
                            frameBorder="0"
                            className="absolute inset-0 w-full h-full pointer-events-none opacity-100 transition-opacity duration-300"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    )}

                    {/* Title Overlay for Thumbnail */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-black/70 to-transparent text-white z-10">
                        <p className="text-sm font-semibold truncate">{short.title}</p>
                    </div>
                    <div className="absolute inset-0 bg-transparent z-20" aria-label={`Play ${short.title}`}></div>
                </div>
            </motion.div>
        );
    };

    // Define the single initial animation for the entire section
    const initialEntranceVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.05 } },
    };

    // Animation for individual items within the list/grid (optional, for subtle stagger)
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-[#E5C082] mb-6 flex uppercase">
                    Shorts
                    <Image
                        src="/Logo.png"
                        alt="Company Logo"
                        width={200}
                        height={80}
                        className="h-16 w-auto -mt-4 ml-3"
                        loading="eager"
                    />
                </h2>

                {/* --- HEADER BUTTONS (Switch View Mode) --- */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setViewMode(viewMode === 'preview' ? 'grid' : 'preview')}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#E5C082] text-black font-semibold rounded-lg hover:bg-[#D4AC63] transition-colors"
                    >
                        {viewMode === 'preview' ? (
                            <>
                                <Grid size={20} />
                                <span>View All</span>
                            </>
                        ) : (
                            <>
                                <List size={20} />
                                <span>Collapse View</span>
                            </>
                        )}
                    </button>
                </div>

                {/* --- CONDITIONAL RENDERING --- */}

                {viewMode === 'preview' ? (
                    // --- 1. HORIZONTAL PREVIEW LIST (Initial Load Animation) ---
                    <motion.div
                        key="preview-view" // Key triggers animation restart when viewMode changes to 'preview'
                        className="space-y-4"
                        initial="hidden"
                        animate="visible"
                        variants={initialEntranceVariants}
                    >
                        <div
                            // Hide scrollbar on MD+ screens (desktop), SHOW on small screens
                            className="flex space-x-4 overflow-x-auto pb-4 flex-nowrap snap-x snap-mandatory overscroll-x-contain md:scrollbar-hide"
                            style={{
                                WebkitOverflowScrolling: 'touch',
                                cursor: 'grab',
                            }}
                        >
                            {/* Display only the first 6 for a quick preview */}
                            {catShorts.slice(0, 6).map((short) => (
                                <motion.div // Individual stagger
                                    key={short.id}
                                    className="shrink-0 w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 snap-center"
                                    variants={itemVariants}
                                >
                                    <VideoCard short={short} />
                                </motion.div>
                            ))}

                            {/* --- VIEW ALL BUTTON (AT THE END OF SCROLL) --- */}
                            <motion.div
                                className="shrink-0 w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 snap-center flex items-center justify-center p-4"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className="h-full w-full border-4 border-dashed border-white/50 text-white/70 rounded-xl flex flex-col items-center justify-center p-6 bg-gray-800/50"
                                >
                                    <Grid size={48} />
                                    <span className="mt-3 text-lg font-bold">View All ({catShorts.length})</span>
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : (
                    // --- 2. RESPONSIVE GRID VIEW (View Change Animation) ---
                    <motion.div
                        key="grid-view" // Key triggers animation restart when viewMode changes to 'grid'
                        className="grid gap-4"
                        initial="hidden"
                        animate="visible"
                        variants={initialEntranceVariants}
                    >
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {catShorts.map((short) => (
                                <motion.div
                                    key={short.id}
                                    variants={itemVariants}
                                >
                                    <VideoCard short={short} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* --- Full-Screen Modal Display --- */}
            <AnimatePresence>
                {selectedVideoId && (
                    <VideoModal
                        shorts={catShorts}
                        selectedId={selectedVideoId}
                        onClose={closeVideo}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}