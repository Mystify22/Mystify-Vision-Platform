import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, Archive, ArchiveRestore, Play,
  Heart, MessageSquare, Music,
  X, MoreVertical, Share2, Eye
} from 'lucide-react';

const INITIAL_ARCHIVED_REELS = [
  {
    id: "reel-1",
    title: "When words run out, let the flame speak for you.",
    mood: "Demon Slayer",
    views: "48.2K",
    likes: "3.4K",
    replies: 245,
    music: "Water Breathing · 18.2K vibes",
    img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325827/flux1-schnell_a-young-female-samurai-with-short_s4sxjw.png",
    archivedAt: "Archived 2d ago",
    originalDate: "20 Aug 2026"
  },
  {
    id: "reel-2",
    title: "Why do we feel more connected when it's dark outside?",
    mood: "Curious",
    views: "24.6K",
    likes: "1.8K",
    replies: 48,
    music: "Lofi Rain Beats · 34.1K vibes",
    img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325912/flux1-schnell_a-narrow-window-in-an-old-attic_u0t8uv.png",
    archivedAt: "Archived 3d ago",
    originalDate: "14 Aug 2026"
  },
  {
    id: "reel-3",
    title: "Rain tapping on glass while the rest of the world sleeps.",
    mood: "Focus",
    views: "62.1K",
    likes: "5.2K",
    replies: 412,
    music: "Midnight Coffee · 12.4K vibes",
    img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325913/flux1-schnell_an-old-wooden-desk-by-a-rain_ntcpa5.png",
    archivedAt: "Archived 5d ago",
    originalDate: "08 Aug 2026"
  },
  {
    id: "reel-4",
    title: "Does the city ever feel like an old friend who forgot you?",
    mood: "Nostalgic",
    views: "19.8K",
    likes: "1.2K",
    replies: 86,
    music: "Echoes of Summer · 8.9K vibes",
    img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325918/flux1-schnell_an-empty-wooden-swing-set-in-a-park_qs1z5n.png",
    archivedAt: "Archived 1w ago",
    originalDate: "28 Jul 2026"
  },
  {
    id: "reel-5",
    title: "Some moments fade before you realize they ever began.",
    mood: "Nature",
    views: "31.5K",
    likes: "2.9K",
    replies: 178,
    music: "Spring Breeze · 22.1K vibes",
    img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325913/flux1-schnell_a-cherry-blossom-tree-in-full-bloom_tuivgz.png",
    archivedAt: "Archived 1w ago",
    originalDate: "15 Jul 2026"
  },
  {
    id: "reel-6",
    title: "Too tired to speak, too awake to sleep.",
    mood: "Dark & Moody",
    views: "44.9K",
    likes: "4.1K",
    replies: 189,
    music: "Dark Matter · 6.5K vibes",
    img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325846/flux1-schnell_a-tired-high-school-boy-with-messy_qy3tat.png",
    archivedAt: "Archived 2w ago",
    originalDate: "01 Jul 2026"
  },
  {
    id: "reel-7",
    title: "Silence is just noise nobody taught you to hear.",
    mood: "Curious",
    views: "15.3K",
    likes: "940",
    replies: 62,
    music: "White Noise Symphony · 4.1K vibes",
    img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325917/flux1-schnell_an-empty-high-school-classroom-at_ehxheg.png",
    archivedAt: "Archived 2w ago",
    originalDate: "22 Jun 2026"
  },
  {
    id: "reel-8",
    title: "I deleted the paragraph and just sent 'ok'.",
    mood: "Vulnerable",
    views: "89.4K",
    likes: "9.6K",
    replies: 842,
    music: "Unspoken Words · 51.2K vibes",
    img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325923/flux1-schnell_a-ghostly-young-woman-with-waist_rxlhxo.png",
    archivedAt: "Archived 3w ago",
    originalDate: "19 Jun 2026"
  },
  {
    id: "reel-9",
    title: "Part of the journey is the end. I love you 3000.",
    mood: "Hopeful",
    views: "124K",
    likes: "14.2K",
    replies: 1205,
    music: "Hero's Theme · 98.4K vibes",
    img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325918/flux1-schnell_a-single-beam-of-golden-sunlight_cjbvub.png",
    archivedAt: "Archived 1mo ago",
    originalDate: "04 Jun 2026"
  }
];

const ArchiveScreen = ({ userProfileData, onBack }) => {
  const [archivedReels, setArchivedReels] = useState(INITIAL_ARCHIVED_REELS);
  const [selectedReel, setSelectedReel] = useState(null);
  const [activeMenuReelId, setActiveMenuReelId] = useState(null);

  const handleUnarchive = (reelId, e) => {
    if (e) e.stopPropagation();
    setArchivedReels(prev => prev.filter(r => r.id !== reelId));
    if (selectedReel?.id === reelId) {
      setSelectedReel(null);
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 220 }}
      className="absolute inset-0 z-[70] bg-[#0c0c10] flex flex-col font-sans overflow-hidden"
    >
      {/* Top Bar - Instagram Archive Style */}
      <div className="flex items-center justify-between px-[14px] py-[10px] border-b border-white/[0.08] bg-[#0c0c10] shrink-0 z-20">
        <button
          onClick={onBack}
          className="w-[32px] h-[32px] rounded-full bg-white/[0.07] hover:bg-white/[0.12] active:scale-95 flex items-center justify-center transition-all cursor-pointer text-white/80"
          title="Back to Settings"
        >
          <ChevronLeft size={17} />
        </button>

        <span className="text-[14px] font-bold text-white tracking-wide">Archived Reels</span>

        <div className="w-[32px]" />
      </div>

      {/* Main Single Page: 3-column 9:16 Instagram Reels Grid */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1 pb-10 relative">
        {/* Transparent backdrop to dismiss unarchive button on tap anywhere */}
        {activeMenuReelId && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenuReelId(null);
            }}
            className="fixed inset-0 z-20 cursor-default"
          />
        )}
        <AnimatePresence mode="popLayout">
          {archivedReels.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 px-4 text-center"
            >
              <div className="w-[56px] h-[56px] rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3">
                <Archive size={24} className="text-white/20" />
              </div>
              <h4 className="text-[13px] font-semibold text-white/80 mb-1">No archived reels</h4>
              <p className="text-[11px] text-white/40 max-w-[220px] leading-relaxed">
                Reels you archive from your profile will appear here in 9:16 format.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-3 gap-[2px]">
              {archivedReels.map((reel) => (
                <motion.div
                  key={reel.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedReel(reel)}
                  className="group relative aspect-[9/16] overflow-hidden bg-[#141418] cursor-pointer select-none"
                >
                  {/* Reel Cover Image (9:16 vertical ratio) */}
                  <img
                    src={reel.img}
                    alt={reel.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Top Subtle Vignette */}
                  <div className="absolute top-0 inset-x-0 h-[36px] bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

                  {/* Top-Right Area: 3-Dots or Unarchive Tab Button */}
                  <div className="absolute top-1.5 right-1.5 z-30 flex items-center">
                    {activeMenuReelId === reel.id ? (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.85, x: 4 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.85, x: 4 }}
                        transition={{ duration: 0.15 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnarchive(reel.id, e);
                          setActiveMenuReelId(null);
                        }}
                        className="h-[24px] px-2.5 rounded-[7px] bg-[#ff5a1a] hover:bg-[#ff6d33] active:scale-95 text-white font-semibold text-[10.5px] flex items-center justify-center shadow-[0_2px_12px_rgba(255,90,26,0.5)] border border-white/20 transition-all cursor-pointer whitespace-nowrap"
                        title="Unarchive to profile"
                      >
                        <span>Unarchive</span>
                      </motion.button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuReelId(reel.id);
                        }}
                        className="w-[22px] h-[22px] rounded-full bg-black/60 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/90 active:scale-95 transition-all opacity-85 group-hover:opacity-100"
                        title="Options"
                      >
                        <MoreVertical size={12} />
                      </button>
                    )}
                  </div>

                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Instagram Reel Preview & Unarchive Modal */}
      <AnimatePresence>
        {selectedReel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReel(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm z-[95]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 260 }}
              className="absolute bottom-0 inset-x-0 z-[96] bg-[#141418] rounded-t-[24px] border-t border-white/10 p-4 pb-6 flex flex-col max-h-[85vh] overflow-hidden"
            >
              <div className="w-[36px] h-[4px] bg-white/20 rounded-full mx-auto mb-3 shrink-0" />

              {/* Header */}
              <div className="flex items-center justify-between mb-3 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-white">
                    Archived Reel Preview
                  </span>
                  <span className="text-[9.5px] text-white/40 bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/5">
                    {selectedReel.archivedAt}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedReel(null)}
                  className="w-[28px] h-[28px] rounded-full bg-white/[0.06] flex items-center justify-center text-white/60 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              {/* 9:16 Reel Preview Card in Sheet */}
              <div className="relative aspect-[9/12] w-full max-w-[210px] mx-auto rounded-[18px] overflow-hidden bg-black border border-white/10 shadow-2xl mb-3 shrink-0">
                <img
                  src={selectedReel.img}
                  alt={selectedReel.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 flex flex-col justify-between p-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-black/60 backdrop-blur-md text-[9px] font-bold text-white px-2 py-0.5 rounded-full border border-white/10">
                      #{selectedReel.mood}
                    </span>
                    <span className="text-[9px] text-white/60">
                      {selectedReel.originalDate}
                    </span>
                  </div>

                  <div>
                    <p className="text-[11px] text-white font-medium leading-snug line-clamp-2 drop-shadow-md mb-1.5">
                      "{selectedReel.title}"
                    </p>
                    <div className="flex items-center justify-between text-[9.5px] text-white/80">
                      <span className="flex items-center gap-1">
                        <Play size={9} fill="white" /> {selectedReel.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={9} fill="#ff5a1a" className="text-[#ff5a1a]" /> {selectedReel.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sound info */}
              <div className="flex items-center gap-2 p-2.5 rounded-[12px] bg-white/[0.03] border border-white/5 mb-3 shrink-0 text-white/70 text-[11px]">
                <Music size={12} className="text-[#ff5a1a] shrink-0" />
                <span className="truncate">{selectedReel.music}</span>
              </div>

              {/* Primary Action: Unarchive to Profile */}
              <button
                onClick={() => handleUnarchive(selectedReel.id)}
                className="w-full h-[44px] rounded-[14px] bg-[#ff5a1a] hover:bg-[#ff6c30] text-white font-semibold text-[13px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#ff5a1a]/30 shrink-0"
              >
                <ArchiveRestore size={16} strokeWidth={2.4} />
                <span>Unarchive to Profile</span>
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedReel(null)}
                className="w-full h-[40px] mt-2 rounded-[14px] bg-white/[0.05] hover:bg-white/[0.08] text-white/60 font-medium text-[12.5px] active:scale-[0.98] transition-all cursor-pointer shrink-0"
              >
                Keep Archived
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default ArchiveScreen;
