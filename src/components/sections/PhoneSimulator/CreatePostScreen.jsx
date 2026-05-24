import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash, Home, PlusSquare, MessageCircle, User, Heart, Share2, VolumeX, X, Send, Clock, Bell, Plus, Ghost, Lock, Inbox, Wifi, Battery, Edit, ChevronRight, MoreHorizontal, ArrowRight, BellOff, Trash } from 'lucide-react';
import { vibeData, vibeCategories, musicData, musicCategories, moods, moodStyles, exploreRecentItems, exploreTrendingData, mockResultsCity, mockResultsRiya, exploreGridItems, mockConversationsData, moodColors } from './MockData';

const AVAILABLE_MOODS = [
  'Curious', 'Vulnerable', 'Frustrated', 'Hopeful', 'Nostalgic',
  'Lonely', 'Anxious', 'Excited', 'Grateful', 'Angry', 'Peaceful',
  'Bored', 'Confused', 'Energetic', 'Restless', 'Empowered', 'Dreamy',
  'Melancholy', 'Spooky', 'Quiet', 'Stressed', 'Insecure', 'Rebellious'
];

const getMoodStyle = (moodName, moodStyles) => {
  if (!moodName) return { border: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' };
  if (moodStyles && moodStyles[moodName]) return moodStyles[moodName];

  // Deterministic pastel color based on string hash
  let hash = 0;
  for (let i = 0; i < moodName.length; i++) {
    hash = moodName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return {
    border: 'rgba(255, 255, 255, 0.1)',
    color: `hsla(${hue}, 75%, 75%, 0.9)`,
    customBorder: `hsla(${hue}, 60%, 65%, 0.4)`
  };
};

const CreatePostScreen = ({
  thoughtText,
  setThoughtText,
  selectedMoods = [],
  setSelectedMoods,
  isAnonymous,
  setIsAnonymous,
  selectedVibe,
  selectedMusic,
  onAddVibe,
  onNext,
  onCancel,
  userProfileData
}) => {
  const [showPreview, setShowPreview] = React.useState(false);
  const [showPreviewTags, setShowPreviewTags] = React.useState(false);
  const editorRef = React.useRef(null);

  const [moodSearchQuery, setMoodSearchQuery] = React.useState('');

  const allPossibleMoods = Array.from(new Set([
    ...moods,
    ...AVAILABLE_MOODS
  ]));

  const filteredMoods = moodSearchQuery.trim() === ''
    ? moods
    : allPossibleMoods.filter(mood =>
      mood.toLowerCase().includes(moodSearchQuery.trim().toLowerCase())
    );

  const stripHtml = (html) => {
    if (typeof document === 'undefined') return '';
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || "").trim().replace(/\n/g, "");
  };

  const plainText = stripHtml(thoughtText);
  const charCount = plainText.length;

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== thoughtText) {
      editorRef.current.innerHTML = thoughtText;
    }
  }, [thoughtText]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col font-sans bg-[#0c0c10] text-white"
    >
      {/* Top Nav */}
      <div className="pt-12 pb-3 px-4 flex items-center justify-between shrink-0">
        <button onClick={onCancel} className="text-[14px] text-white/45 bg-transparent border-none p-0 focus:outline-none hover:text-white/60 transition-colors cursor-pointer">Cancel</button>
        <button
          onClick={() => charCount >= 3 && onNext()}
          disabled={charCount < 3}
          className={`px-[18px] py-[7px] rounded-[20px] text-[13px] font-semibold transition-opacity duration-200 ${charCount >= 3 ? 'opacity-100 bg-[#FF4500] text-white cursor-pointer hover:bg-[#ff5722]' : 'opacity-35 bg-[#FF4500] text-white cursor-not-allowed'}`}
        >
          {selectedVibe && selectedMusic ? 'Post' : 'Next →'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto [scrollbar-width:none]">
        {/* Avatar + Compose Area */}
        <div className="px-4 flex gap-3 items-start mt-2">
          {/* Avatar */}
          <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2d1b4e] to-[#1a2a3a] flex items-center justify-center shrink-0 border border-white/5 overflow-hidden">
            {userProfileData?.avatarValue?.startsWith('http') ? (
              <img src={userProfileData.avatarValue} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[13px] font-medium text-white/70">{userProfileData?.avatarValue || '✦'}</span>
            )}
          </div>

          <div className="flex-1 flex flex-col min-w-0">
            {/* Text Input Box */}
            <div className="relative w-full h-[240px] bg-[rgba(255,255,255,0.03)] border border-white/5 rounded-2xl p-4 transition-colors focus-within:bg-[rgba(255,255,255,0.05)] focus-within:border-white/10 flex flex-col">
              {charCount === 0 && thoughtText === '' && (
                <div className="absolute top-4 left-4 text-white/20 text-[18px] pointer-events-none">
                  What's on your mind?
                </div>
              )}
              <div
                ref={editorRef}
                contentEditable
                onInput={(e) => {
                  setThoughtText(e.currentTarget.innerHTML);
                }}
                className="w-full flex-1 bg-transparent border-none outline-none text-white text-[18px] font-normal leading-[1.55] caret-white whitespace-pre-wrap break-words focus:outline-none [&_a]:text-blue-400 [&_a]:underline overflow-y-auto [scrollbar-width:none]"
              />
            </div>
          </div>
        </div>

        {/* Mood Tags & Search Section */}
        <div className="px-4 pt-[10px] flex flex-col gap-2 shrink-0">
          {/* Row 1: Suggested Tags */}
          <div className="flex gap-[6px] overflow-x-auto [scrollbar-width:none] py-1 items-center w-full">
            {filteredMoods.length > 0 ? (
              filteredMoods.map(mood => {
                const isSelected = selectedMoods.includes(mood);
                const style = getMoodStyle(mood, moodStyles);
                const borderStyle = style.customBorder || style.border;
                return (
                  <button
                    key={mood}
                    onClick={() => setSelectedMoods(prev => prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood])}
                    className="px-[12px] py-[5px] rounded-[20px] text-[11px] font-medium shrink-0 transition-all duration-200 cursor-pointer"
                    style={isSelected ? {
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      color: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.2)'
                    } : {
                      backgroundColor: 'transparent',
                      color: style.color,
                      border: `1px solid ${borderStyle}`
                    }}
                  >
                    {mood}
                  </button>
                );
              })
            ) : (
              <span className="text-[11px] text-white/30 italic px-2 py-0.5 whitespace-nowrap shrink-0">No tags found</span>
            )}
          </div>

          {/* Row 2: Permanent Search Bar */}
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md shadow-inner rounded-[20px] px-3 py-1 h-[29px] w-full">
            <Search size={12} className="text-white/40 shrink-0" />
            <input
              type="text"
              placeholder="Search mood tags..."
              value={moodSearchQuery}
              onChange={(e) => setMoodSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[12px] text-white placeholder-white/30 flex-1 p-0 focus:ring-0 focus:outline-none min-w-0"
            />
            {moodSearchQuery && (
              <button
                onClick={() => setMoodSearchQuery('')}
                className="text-white/40 hover:text-white/70 p-0 bg-transparent border-none focus:outline-none cursor-pointer flex items-center justify-center shrink-0"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Vibe Preview Strip */}
        <div className="mx-4 mt-3 p-[10px] px-[12px] rounded-[14px] border border-white/10 bg-[rgba(255,255,255,0.03)] flex gap-[10px] items-center">
          {/* Thumb */}
          <div
            onClick={() => {
              if (selectedVibe && selectedMusic) setShowPreview(true);
            }}
            className={`w-[36px] h-[48px] rounded-[7px] shrink-0 overflow-hidden relative ${selectedVibe && selectedMusic ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            style={{ backgroundColor: selectedVibe ? selectedVibe.bg : '#1a2a3a' }}
          >
            {selectedVibe?.img && <img src={selectedVibe.img} alt="vibe" className="absolute inset-0 w-full h-full object-cover" />}
          </div>

          <div className="flex-1 flex flex-col justify-center gap-[3px]">
            <div className="flex items-center gap-[6px]">
              <div className="w-[5px] h-[5px] rounded-full bg-[#4a8fd4]" />
              <span className="text-[11px] text-white/45 truncate">{selectedVibe ? selectedVibe.name : 'No image yet'}</span>
            </div>
            <div className="flex items-center gap-[6px] mt-[3px]">
              <div className="w-[5px] h-[5px] rounded-full bg-[#9f7fda]" />
              <span className="text-[11px] text-white/45 truncate">{selectedMusic ? selectedMusic.name : 'No sound yet'}</span>
            </div>
          </div>

          <button
            onClick={onAddVibe}
            className={`px-[10px] py-[4px] rounded-[20px] text-[11px] font-medium whitespace-nowrap transition-colors border cursor-pointer ${selectedVibe && selectedMusic ? 'bg-transparent border-white/5 text-white/30 hover:bg-white/5' : 'bg-[rgba(255,255,255,0.07)] border-white/10 text-white/55 hover:bg-[rgba(255,255,255,0.1)]'}`}
          >
            {selectedVibe && selectedMusic ? 'Vibe set ✓' : 'Add vibe →'}
          </button>
        </div>



        {/* Bottom Area */}
        <div className="border-t-[0.5px] border-[rgba(255,255,255,0.07)] px-4 pt-[10px] pb-[24px] mt-[12px] flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <div
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`w-[36px] h-[20px] rounded-[20px] relative cursor-pointer transition-colors duration-200 ${isAnonymous ? 'bg-[rgba(255,255,255,0.35)]' : 'bg-[rgba(255,255,255,0.1)]'}`}
            >
              <motion.div
                animate={{ left: isAnonymous ? 18 : 2 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[2px] w-[16px] h-[16px] bg-white rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] text-white/40 leading-tight mb-[2px]">Post anonymously</span>
              <span className="text-[11px] text-white/20 leading-tight">Others won't see your name</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reel Preview Overlay */}
      <AnimatePresence>
        {showPreview && selectedVibe && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-[#0c0c10] overflow-hidden"
            onClick={() => setShowPreviewTags(false)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${selectedVibe.img}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

            {/* Header / Close button */}
            <div className="absolute top-12 left-5 right-5 flex justify-between items-center text-white z-50 pointer-events-auto">
              <span className="font-bold text-base shadow-sm">Preview</span>
              <button
                onClick={(e) => { e.stopPropagation(); setShowPreview(false); setShowPreviewTags(false); }}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 cursor-pointer hover:bg-black/60 transition-colors"
              >
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Question Sticker */}
            <div className="absolute inset-0 flex items-center justify-center z-20 px-6 pointer-events-none">
              <div
                className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl p-5 rounded-3xl rounded-bl-sm border border-white/40 shadow-2xl inline-flex flex-col items-start text-left w-full max-w-xs relative overflow-visible pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <p className="text-white text-[16px] leading-snug font-black tracking-tight drop-shadow-md w-full">
                  {thoughtText ? (
                    <span dangerouslySetInnerHTML={{ __html: thoughtText }} className="[&_b]:font-black [&_i]:italic [&_a]:text-blue-300 [&_a]:underline" />
                  ) : (
                    "What's on your mind?"
                  )}
                </p>
                {selectedMoods && selectedMoods.length > 0 && (
                  <div className="w-full flex justify-end mt-2.5 relative pointer-events-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPreviewTags(!showPreviewTags);
                      }}
                      className="text-white/90 text-[8px] font-black uppercase tracking-widest flex items-center gap-1 bg-black/30 hover:bg-white/20 active:scale-95 transition-all pr-2.5 pl-1.5 py-[3px] rounded-full shadow-inner border border-white/20 shrink-0 cursor-pointer"
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm shadow-sm">
                        <Sparkles size={8} className="text-white" strokeWidth={3} />
                      </div>
                      <span className="mt-[1px] text-[8px]">Vibes</span>
                      {selectedMoods.length > 1 && (
                        <span className="ml-1 text-[7px] bg-[#FF4500] text-white px-1.5 py-[0.5px] rounded-full font-black tracking-normal shadow-sm">+{selectedMoods.length - 1}</span>
                      )}
                    </button>

                    <AnimatePresence>
                      {showPreviewTags && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          transition={{ type: "spring", damping: 15, stiffness: 200 }}
                          className="absolute bottom-8 right-0 z-[100] backdrop-blur-xl bg-[#1c1c1e]/95 border border-white/20 shadow-2xl p-1.5 rounded-xl flex flex-col gap-0.5 min-w-[110px] max-w-[160px] pointer-events-auto text-left"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {selectedMoods.map((tag, tIdx) => (
                            <div
                              key={tIdx}
                              className="text-white/90 hover:text-white text-[10px] font-semibold py-1 px-2.5 rounded-lg hover:bg-white/10 transition-colors"
                            >
                              {tag}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="absolute right-4 bottom-8 flex flex-col items-center z-20">
              {/* Spinning CD */}
              <div className="relative flex justify-center w-12 h-12 pointer-events-none">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-11 h-11 rounded-full border-[2px] border-white/20 bg-[#1a1a1a] flex items-center justify-center shadow-lg overflow-hidden relative">
                  <Music size={14} className="text-white z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
                </motion.div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default CreatePostScreen;