/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    X, ThumbsUp, Share2, ChevronDown,
    Grid, Sparkles, Heart, Laugh, Crown, Stethoscope, PawPrint, Play, Maximize, Minimize
} from 'lucide-react';

// --- DATA FOR LONG VIDEOS (16:9 Aspect Ratio) ---
const catLongVideos = [
    { id: 1, youtubeId: 'uLyfZ6LfYps', category: 'Cat Care', title: 'When Cats Meet Kids 😻 | Cutest Moments on Internet' },
    { id: 2, youtubeId: 'caODtOeidr0', category: 'Viral Cats', title: 'These Cats Will Make You Laugh Non-Stop 🤣 | Funniest Cat Moments Ever' },
    { id: 3, youtubeId: 'uLyfZ6LfYps', category: 'Funny Cats', title: 'Cats Reacting to Magic Tricks Compilation 2026' },
    { id: 4, youtubeId: 'caODtOeidr0', category: 'Cat Care', title: 'How to Brush Your Cat Teeth Without Getting Scratched' },
    { id: 5, youtubeId: 'uLyfZ6LfYps', category: 'Rich Cats', title: 'Touring a $10,000 Luxury Cat Mansion' },
    { id: 6, youtubeId: 'caODtOeidr0', category: 'Viral Cats', title: 'The Heartwarming Story of a Rescue Maine Coon' },
];

const categories = [
    { name: "All", icon: Sparkles },
    { name: "Cutest Cats", icon: Heart },
    { name: "Viral Cats", icon: Sparkles },
    { name: "Funny Cats", icon: Laugh },
    { name: "Cat Care", icon: Stethoscope },
    { name: "Rich Cats", icon: Crown },
];

// --- PAW LOADER ANIMATION ---
const PawLoader = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-30 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="text-[#E5C082]">
            <PawPrint size={64} fill="currentColor" />
        </motion.div>
    </div>
);

// --- ACTION BUTTON (matches Shorts.jsx style) ---
const ActionButton = ({ icon: Icon, label, onClick, filled }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center gap-1.5 text-[#E5C082] hover:text-white transition-colors group focus:outline-none"
    >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#E5C082] group-hover:bg-[#E5C082] group-hover:text-black transition-all ${filled ? 'bg-[#E5C082] text-black' : 'bg-transparent'}`}>
            <Icon size={22} strokeWidth={2.5} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
);

// ---------------------------------------------------------------------
//                            VIDEO MODAL (16:9)
// ---------------------------------------------------------------------

function VideoModal({ video, onClose }) {
    const [isLoading, setIsLoading] = useState(true);
    const [showLikeAlert, setShowLikeAlert] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [liked, setLiked] = useState(false);
    const containerRef = useRef(null);

    if (!video) return null;
    const videoUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

    // --- LIKE: plays meow sound then shows YouTube alert (same as Shorts) ---
    const handleLike = () => {
        new Audio('/cat-meow-For-Like-button.mp3').play().catch(() => { });
        setLiked(true);
        setShowLikeAlert(true);
    };

    // --- SHARE: copies link to clipboard ---
    // Uses modern Clipboard API where available (HTTPS), falls back to
    // execCommand for HTTP / older mobile browsers, then falls back to prompt().
    const handleShare = () => {
        const copyText = videoUrl;

        // Modern API (requires HTTPS or localhost)
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(copyText)
                .then(() => alert(`Link copied to clipboard:\n${copyText}`))
                .catch(() => fallbackCopy(copyText));
        } else {
            fallbackCopy(copyText);
        }
    };

    const fallbackCopy = (text) => {
        try {
            // Create a temporary textarea, select its content, and copy
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            // For iOS — need to set selection range manually
            textarea.setSelectionRange(0, text.length);
            const success = document.execCommand('copy');
            document.body.removeChild(textarea);
            if (success) {
                alert(`Link copied to clipboard:\n${text}`);
            } else {
                // Last resort: show prompt so user can copy manually
                window.prompt('Copy this link:', text);
            }
        } catch {
            window.prompt('Copy this link:', text);
        }
    };

    // --- FULLSCREEN: toggles native fullscreen + auto-rotates to landscape on mobile ---
    const handleFullscreen = useCallback(async () => {
        if (!containerRef.current) return;
        try {
            if (!document.fullscreenElement) {
                await containerRef.current.requestFullscreen();
                setIsFullscreen(true);
                // Lock to landscape on mobile devices that support the API
                if (screen.orientation && screen.orientation.lock) {
                    await screen.orientation.lock('landscape').catch(() => {
                        // Some browsers allow fullscreen but block orientation lock — ignore
                    });
                }
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
                // Unlock orientation so the phone can rotate freely again
                if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock();
                }
            }
        } catch {
            // Fallback: toggle CSS-based fullscreen if Fullscreen API is blocked
            setIsFullscreen(prev => !prev);
        }
    }, []);

    // Unlock orientation when fullscreen exits via Esc or system gesture
    useEffect(() => {
        const onFsChange = () => {
            const inFs = !!document.fullscreenElement;
            setIsFullscreen(inFs);
            if (!inFs && screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock();
            }
        };
        document.addEventListener('fullscreenchange', onFsChange);
        return () => document.removeEventListener('fullscreenchange', onFsChange);
    }, []);

    // Escape closes modal (unless in native fullscreen)
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') {
                if (showLikeAlert) { setShowLikeAlert(false); return; }
                if (!document.fullscreenElement) onClose();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [showLikeAlert, onClose]);

    return (
        <motion.div
            className="fixed inset-0 z-100 bg-black/95 flex flex-col items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-5 left-5 z-110 text-white p-3 rounded-full bg-gray-900/80 hover:bg-[#E5C082] hover:text-black transition-all"
            >
                <X size={28} />
            </button>

            {/* Video + side actions row */}
            <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-6">

                {/* Video container — this is what goes fullscreen */}
                <div
                    ref={containerRef}
                    className={`relative bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-300
                        ${isFullscreen ? 'w-screen h-screen rounded-none border-none' : 'w-full aspect-video'}
                    `}
                >
                    {isLoading && <PawLoader />}
                    <iframe
                        onLoad={() => setIsLoading(false)}
                        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        title={video.title}
                    />
                </div>

                {/* Side action buttons — hidden on small screens, shown on lg+ */}
                <div className="hidden lg:flex flex-col gap-6 items-center">
                    <ActionButton icon={ThumbsUp} label="Like" onClick={handleLike} filled={liked} />
                    <ActionButton icon={Share2} label="Share" onClick={handleShare} />
                    <ActionButton
                        icon={isFullscreen ? Minimize : Maximize}
                        label={isFullscreen ? "Exit" : "Full"}
                        onClick={handleFullscreen}
                    />
                </div>
            </div>

            {/* Bottom action bar — shown on mobile/tablet only */}
            <div className="flex lg:hidden items-center justify-center gap-10 mt-6">
                <ActionButton icon={ThumbsUp} label="Like" onClick={handleLike} filled={liked} />
                <ActionButton icon={Share2} label="Share" onClick={handleShare} />
                <ActionButton
                    icon={isFullscreen ? Minimize : Maximize}
                    label={isFullscreen ? "Exit" : "Fullscreen"}
                    onClick={handleFullscreen}
                />
            </div>

            {/* Video title below player */}
            <p className="mt-4 text-white/70 text-sm font-semibold text-center max-w-2xl line-clamp-1 px-4">
                {video.title}
            </p>

            {/* Like Alert — same flow as Shorts.jsx */}
            <AnimatePresence>
                {showLikeAlert && (
                    <motion.div
                        className="absolute z-120 p-6 bg-black border-2 border-[#E5C082] rounded-2xl shadow-2xl max-w-xs text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <h3 className="text-2xl font-bold text-[#E5C082] mb-4">Support the Creator!</h3>
                        <p className="text-sm text-gray-400 mb-5">
                            To <strong className="text-white">Like</strong>, <strong className="text-white">Subscribe</strong>, or <strong className="text-white">Comment</strong>, please visit the video directly on YouTube.
                        </p>
                        <a
                            href="https://youtube.com/@my_pet_is_cat?si=EbXLkg067jj33Oy9"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image src="/Logo.png" alt="Logo" width={160} height={60} className="h-12 w-auto mx-auto mb-3" loading="eager" />
                        </a>
                        <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-sm"
                        >
                            Go to YouTube
                        </a>
                        <button
                            onClick={() => setShowLikeAlert(false)}
                            className="mt-3 text-sm border-2 border-[#E5C082] rounded-full px-5 py-1 font-bold text-gray-400 hover:text-black hover:bg-[#E5C082] transition-all"
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ---------------------------------------------------------------------
//                         MAIN COMPONENT
// ---------------------------------------------------------------------

export default function LongVideos() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredVideos = useMemo(() => {
        if (activeCategory === "All") return catLongVideos;
        return catLongVideos.filter(v => v.category === activeCategory);
    }, [activeCategory]);

    const ActiveIcon = categories.find(c => c.name === activeCategory)?.icon || Sparkles;

    const VideoCard = ({ video }) => {
        const CategoryIcon = categories.find(c => c.name === video.category)?.icon || Sparkles;
        return (
            <motion.div
                onClick={() => setSelectedVideo(video)}
                onMouseEnter={() => setHoveredId(video.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group cursor-pointer flex flex-col"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            >
                <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-[#E5C082] transition-all shadow-lg">
                    <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-all">
                        <div className="w-14 h-14 bg-[#E5C082] rounded-full flex items-center justify-center text-black scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                            <Play size={28} fill="currentColor" />
                        </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/10">
                        <CategoryIcon size={12} className="text-[#E5C082]" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">{video.category}</span>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-white font-bold group-hover:text-[#E5C082] transition-colors line-clamp-2 leading-snug uppercase tracking-tight">
                        {video.title}
                    </h3>
                </div>
            </motion.div>
        );
    };

    return (
        <section className="w-full bg-black py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter flex items-center">
                            Cat Originals
                            <Image src="/Logo.png" alt="Logo" width={120} height={50} className="h-12 w-auto ml-4 -mt-1" loading="eager" />
                        </h2>
                        <div className="h-1 w-16 bg-[#E5C082] hidden xl:block" />
                    </div>

                    <div className="relative z-40 md:w-auto" ref={dropdownRef}>
                        <button
                            onClick={() => {
                                setIsDropdownOpen(!isDropdownOpen);
                                if (!isDropdownOpen) new Audio('/select-sound.mp3').play().catch(() => { });
                            }}
                            className="flex items-center gap-3 bg-black border-2 border-[#E5C082] text-[#E5C082] px-6 py-2 rounded-full font-bold min-w-[200px] justify-between transition-all hover:bg-[#E5C082]/10"
                        >
                            <span className="flex items-center gap-2"><ActiveIcon size={18} /> {activeCategory}</span>
                            <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full mt-2 left-0 w-full bg-black border-2 border-[#E5C082] rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.name}
                                            onClick={() => {
                                                setActiveCategory(cat.name);
                                                setIsDropdownOpen(false);
                                                new Audio('/select-sound.mp3').play().catch(() => { });
                                            }}
                                            className="flex items-center gap-3 w-full px-5 py-3 text-[#E5C082] hover:bg-[#E5C082] hover:text-black transition-colors font-bold text-left uppercase text-xs"
                                        >
                                            <cat.icon size={16} /> {cat.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>

                {filteredVideos.length === 0 && (
                    <div className="py-20 text-center">
                        <PawPrint size={64} className="text-gray-800 mx-auto mb-4" />
                        <p className="text-gray-500 font-bold uppercase tracking-widest">No long videos in this category yet, meow!</p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedVideo && (
                    <VideoModal
                        video={selectedVideo}
                        onClose={() => setSelectedVideo(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}