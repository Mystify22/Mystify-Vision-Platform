import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash, Home, PlusSquare, MessageCircle, User, Heart, Share2, VolumeX, X, Send, Clock, Bell, Plus, Ghost, Lock, Inbox, Wifi, Battery, Edit, ChevronRight, MoreHorizontal, ArrowRight, BellOff, Trash } from 'lucide-react';

const SelectMusicScreen = ({
  stepId,
  selectedVibe,
  selectedVibeCategory,
  data,
  categories,
  selectedMusic,
  onSelectMusic,
  onNext,
  onBack
}) => {
  const [activeCategory, setActiveCategory] = useState('For you');
  const [expandedCategories, setExpandedCategories] = useState({});

  const handleCategoryExpand = (catId) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  let visibleData = data;
  if (activeCategory === 'For you') {
    visibleData = data.filter(d => d.category === selectedVibeCategory);
    if (visibleData.length === 0) visibleData = [data[0]];
  } else if (activeCategory === 'Explore') {
    visibleData = data;
  } else if (activeCategory === 'Trending') {
    visibleData = [...data].reverse().slice(0, 4);
  } else if (activeCategory === 'Saved') {
    visibleData = data.slice(0, 2);
  }

  const renderMusicItem = (item, sectionCategory) => {
    const isSelected = selectedMusic?.id === item.id;
    return (
      <div
        key={item.id}
        onClick={() => onSelectMusic(isSelected ? null : item)}
        className={`relative flex items-center p-2 rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-white/5' : 'hover:bg-white/5'
          }`}
      >
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 mr-3"
          style={{ backgroundColor: item.bg }}
        >
          {isSelected ? (
            <div className="flex items-end justify-center gap-[2px] h-4 w-4">
              <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-white rounded-full" />
              <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 bg-white rounded-full" />
              <motion.div animate={{ height: [6, 14, 6] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1 bg-white rounded-full" />
            </div>
          ) : (
            <Play size={20} className="text-white/80 ml-1" fill="currentColor" />
          )}
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-[13px] font-semibold text-white mb-0.5">{item.name}</span>
          <span className="text-[11px] text-white/40">{item.category || sectionCategory} • {item.duration}</span>
        </div>
        <div className="flex items-center gap-3 pr-2">
          <Activity size={14} className={isSelected ? 'text-white' : 'text-white/20'} />
          {isSelected ? (
            <CircleDot size={18} className="text-white" />
          ) : (
            <Circle size={18} className="text-white/20" />
          )}
        </div>

        {/* Active Progress Bar Simulator */}
        {isSelected && (
          <div className="absolute bottom-0 left-[68px] right-[40px] h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 30, ease: "linear" }}
              className="h-full bg-white/80"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      key={stepId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col font-sans bg-[#0c0c10]"
    >
      {/* Dynamic Island Mockup */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-3">
        <div className="w-2 h-2 bg-green-500 rounded-full opacity-0" />
        <div className="w-2 h-2 bg-white/20 rounded-full" />
      </div>

      {/* Top Navigation Bar */}
      <div className="pt-12 pb-3 px-4 flex items-center justify-between z-10 shrink-0">
        <button
          onClick={onBack}
          className="w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-white font-medium text-[15px]">Add a sound</h3>
        <button
          onClick={() => selectedMusic && onNext()}
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 ${selectedMusic ? 'bg-[#FF4500] border-transparent cursor-pointer' : 'bg-transparent border-[1.5px] border-white/15 cursor-default'}`}
        >
          <Check size={18} strokeWidth={selectedMusic ? 2 : 2} className={selectedMusic ? 'text-white' : 'text-white/30'} />
        </button>
      </div>

      {/* Selected Image Banner */}
      <div className="flex items-center gap-3 py-2 px-4 shrink-0">
        <div
          className="w-12 h-16 rounded-md bg-white/10 overflow-hidden relative"
          style={{ backgroundColor: selectedVibe?.bg }}
        >
          {selectedVibe?.img && (
            <img src={selectedVibe.img} alt="vibe" className="absolute inset-0 w-full h-full object-cover" />
          )}
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-[10px] text-white/40 uppercase tracking-wide font-semibold mb-0.5">Your image</span>
          <span className="text-[14px] text-white font-medium">{selectedVibe?.name || "None"}</span>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <span className="text-[11px] text-white/50">{selectedMusic ? 'Sound selected' : 'No sound yet'}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-2 shrink-0">
        <div className="bg-white/10 rounded-xl h-9 flex items-center px-3 gap-2">
          <Search size={14} className="text-white/40" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-white text-[13px] w-full placeholder:text-white/40"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="w-full overflow-x-auto [scrollbar-width:none] shrink-0 mt-3 mb-2">
        <div className="flex gap-2 px-4 pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-[14px] py-[7px] text-[12px] font-medium transition-colors ${activeCategory === cat
                ? 'bg-[#FF4500] text-white'
                : 'bg-white/5 text-white/55 border border-white/10 hover:bg-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Audio List View */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] px-4 pb-4">
        <div className="flex flex-col gap-6">
          {visibleData.map(section => (
            <div key={section.id} className="flex flex-col relative pb-4">
              <h4 className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/30 mb-3 ml-1">
                {section.category}
              </h4>
              <div className="flex flex-col gap-1 relative z-0">
                {section.items.map(item => renderMusicItem(item, section.category))}

                {/* Expanded Items */}
                {activeCategory === 'For you' && section.extraItems ? (
                  section.extraItems.map(item => renderMusicItem(item, section.category))
                ) : (
                  <AnimatePresence>
                    {expandedCategories[section.id] && section.extraItems && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden flex flex-col gap-1"
                      >
                        {section.extraItems.map(item => renderMusicItem(item, section.category))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Dropdown Blur Overlay */}
              {section.extraItems && activeCategory !== 'For you' && (
                <div className={`absolute bottom-0 inset-x-0 flex items-end justify-center transition-all duration-300 pointer-events-none ${expandedCategories[section.id] ? 'h-10 bg-transparent pb-0 relative mt-2 z-10' : 'h-24 bg-gradient-to-t from-[#0c0c10] via-[#0c0c10]/80 to-transparent pb-2 backdrop-blur-[1px] z-10'}`}>
                  <button
                    onClick={() => handleCategoryExpand(section.id)}
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 pointer-events-auto shadow-lg hover:bg-white/20 transition-colors"
                  >
                    {expandedCategories[section.id] ? (
                      <ChevronUp size={16} className="text-white/80" />
                    ) : (
                      <ChevronDown size={16} className="text-white/80" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>



      {/* Bottom Strip */}
      <div className="px-4 pt-[10px] pb-[22px] flex items-center gap-3 shrink-0 bg-[#0c0c10]">
        <div
          className="w-[36px] h-[36px] rounded-lg border border-white/10 transition-all duration-300 flex items-center justify-center overflow-hidden bg-white/5"
        >
          {selectedMusic ? (
            <div className="w-full h-full" style={{ backgroundColor: selectedMusic.bg }} />
          ) : (
            <Music size={16} className="text-white/20" />
          )}
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <span className="text-[10px] text-white/35 leading-tight">Sound</span>
          {selectedMusic ? (
            <span className="text-[13px] font-medium text-white leading-tight mt-[2px]">{selectedMusic.name}</span>
          ) : (
            <span className="text-[12px] text-white/30 italic leading-tight mt-[2px]">None selected</span>
          )}
        </div>
        <button
          onClick={() => selectedMusic && onNext()}
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${selectedMusic ? 'bg-[#FF4500] border-[#FF4500] cursor-pointer' : 'bg-transparent border-[1.5px] border-white/15 cursor-default'}`}
        >
          <Check size={18} strokeWidth={selectedMusic ? 3 : 2} className={selectedMusic ? 'text-white' : 'text-white/30'} />
        </button>
      </div>

    </motion.div>
  );
};
export default SelectMusicScreen;