import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash, Home, PlusSquare, MessageCircle, User, Heart, Share2, VolumeX, X, Send, Clock, Bell, Plus, Ghost, Lock, Inbox, Wifi, Battery, Edit, ChevronRight, MoreHorizontal, ArrowRight, BellOff, Trash } from 'lucide-react';
import { vibeData, vibeCategories, musicData, musicCategories, moods, moodStyles, audiences, exploreRecentItems, exploreTrendingData, mockResultsCity, mockResultsRiya, exploreGridItems, mockConversationsData, moodColors } from './MockData';

const CreatePostScreen = ({
  thoughtText,
  setThoughtText,
  audienceIndex,
  setAudienceIndex,
  selectedMood,
  setSelectedMood,
  isAnonymous,
  setIsAnonymous,
  selectedVibe,
  selectedMusic,
  onAddVibe,
  onNext,
  onCancel
}) => {
  const [showPreview, setShowPreview] = React.useState(false);
  const editorRef = React.useRef(null);
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);

  const stripHtml = (html) => {
    if (typeof document === 'undefined') return '';
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || "").trim().replace(/\n/g, "");
  };

  const plainText = stripHtml(thoughtText);
  const charCount = plainText.length;

  const handleCommand = (command) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, null);
      checkFormatState();
    }
  };

  const checkFormatState = () => {
    if (typeof document !== 'undefined') {
      setIsBold(document.queryCommandState('bold'));
      setIsItalic(document.queryCommandState('italic'));
    }
  };

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== thoughtText) {
      editorRef.current.innerHTML = thoughtText;
    }
  }, [thoughtText]);
  const circumference = 62.8; // 2 * pi * 10
  const dashoffset = Math.max(0, circumference - (charCount / 280) * circumference);
  const isRed = (280 - charCount) <= 10;
  const showNumber = (280 - charCount) <= 40;

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
          <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2d1b4e] to-[#1a2a3a] flex items-center justify-center shrink-0 border border-white/5">
            <span className="text-[13px] font-medium text-white/70">A</span>
          </div>

          <div className="flex-1 flex flex-col min-w-0">
            {/* Audience Pill */}
            <button
              onClick={() => setAudienceIndex((audienceIndex + 1) % 3)}
              className="self-start rounded-[20px] px-[10px] py-[4px] pl-[8px] bg-white/5 border border-white/10 flex items-center gap-[5px] mb-[10px] hover:bg-white/10 transition-colors"
            >
              <div className="w-[7px] h-[7px] bg-white/80 rounded-full" />
              <span className="text-[11px] font-medium text-white/70">{audiences[audienceIndex]}</span>
              <ChevronDown size={10} className="text-white/40" />
            </button>

            {/* Text Input Box */}
            <div className="relative w-full h-[180px] bg-[rgba(255,255,255,0.03)] border border-white/5 rounded-2xl p-4 transition-colors focus-within:bg-[rgba(255,255,255,0.05)] focus-within:border-white/10 flex flex-col">
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
                  checkFormatState();
                }}
                onKeyUp={checkFormatState}
                onMouseUp={checkFormatState}
                className="w-full flex-1 bg-transparent border-none outline-none text-white text-[18px] font-normal leading-[1.55] caret-white whitespace-pre-wrap break-words focus:outline-none [&_a]:text-blue-400 [&_a]:underline overflow-y-auto [scrollbar-width:none]"
              />
            </div>
            <div className="h-4 mt-1 mb-2">
              {charCount === 0 && (
                <span className="text-[11px] text-white/20 block">Ask something.</span>
              )}
            </div>
          </div>
        </div>

        {/* Mood Tags */}
        <div className="px-4 pt-[10px] flex gap-[6px] overflow-x-auto [scrollbar-width:none]">
          {moods.map(mood => {
            const isSelected = selectedMood === mood;
            const style = moodStyles[mood];
            return (
              <button
                key={mood}
                onClick={() => setSelectedMood(isSelected ? null : mood)}
                className="px-[12px] py-[5px] rounded-[20px] text-[11px] font-medium shrink-0 transition-all duration-200 cursor-pointer"
                style={isSelected ? {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)'
                } : {
                  backgroundColor: 'transparent',
                  color: style.color,
                  border: `1px solid ${style.border}`
                }}
              >
                {mood}
              </button>
            );
          })}
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

        <div className="h-[0.5px] bg-[rgba(255,255,255,0.07)] mt-[14px]" />

        {/* Formatting Toolbar */}
        <div className="px-4 flex gap-[4px] items-center mt-2">
          <button
            onClick={() => handleCommand('bold')}
            className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors cursor-pointer border-none ${isBold ? 'bg-white/20 text-white' : 'bg-transparent text-white/45 hover:bg-white/10'}`}
          >
            <Bold size={18} strokeWidth={isBold ? 3 : 2} />
          </button>
          <button
            onClick={() => handleCommand('italic')}
            className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors cursor-pointer border-none ${isItalic ? 'bg-white/20 text-white' : 'bg-transparent text-white/45 hover:bg-white/10'}`}
          >
            <Italic size={18} strokeWidth={isItalic ? 3 : 2} />
          </button>
          <button className="w-[36px] h-[36px] rounded-full flex items-center justify-center hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer bg-transparent border-none">
            <Link size={18} className="text-white/45" strokeWidth={2} />
          </button>
          <div className="w-[1px] h-[20px] bg-[rgba(255,255,255,0.08)] mx-[4px]" />
          <button className="w-[36px] h-[36px] rounded-full flex items-center justify-center hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer bg-transparent border-none">
            <AtSign size={18} className="text-white/45" strokeWidth={2} />
          </button>
          <button className="w-[36px] h-[36px] rounded-full flex items-center justify-center hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer bg-transparent border-none">
            <Hash size={18} className="text-white/45" strokeWidth={2} />
          </button>

          <div className="flex-1" />

          {/* Character Ring */}
          <div className="w-[26px] h-[26px] relative flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 26 26" className="-rotate-90">
              <circle cx="13" cy="13" r="10" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle
                cx="13" cy="13" r="10"
                stroke={isRed ? "rgba(218,80,80,0.8)" : "rgba(255,255,255,0.5)"}
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.2s ease-out, stroke 0.2s ease-out' }}
              />
            </svg>
            {showNumber && (
              <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-medium ${isRed ? 'text-[rgba(218,80,80,0.9)]' : 'text-[rgba(255,255,255,0.5)]'}`}>
                {280 - charCount}
              </span>
            )}
          </div>
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
                onClick={(e) => { e.stopPropagation(); setShowPreview(false); }}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 cursor-pointer hover:bg-black/60 transition-colors"
              >
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Question Sticker */}
            <div className="absolute inset-0 flex items-center justify-center z-20 px-6 pointer-events-none">
              <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl p-5 rounded-3xl border border-white/40 shadow-2xl inline-flex flex-col items-center text-center w-full max-w-xs relative overflow-hidden pointer-events-auto">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <p className="text-white text-[18px] leading-relaxed font-medium tracking-tight drop-shadow-md">
                  {thoughtText ? (
                    <span dangerouslySetInnerHTML={{ __html: thoughtText }} className="[&_b]:font-black [&_i]:italic [&_a]:text-blue-300 [&_a]:underline" />
                  ) : (
                    "What's on your mind?"
                  )}
                </p>
                {selectedMood && (
                  <div className="w-full mt-5 flex justify-start">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 bg-black/20 px-2.5 py-1.5 rounded-sm border border-white/5 shadow-inner">
                      <div className="w-1 h-1 bg-white/30 rounded-full" />
                      {selectedMood}
                    </div>
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