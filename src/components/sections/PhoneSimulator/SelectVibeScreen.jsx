import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash, Home, PlusSquare, MessageCircle, User, Heart, Share2, VolumeX, X, Send, Clock, Bell, Plus, Ghost, Lock, Inbox, Wifi, Battery, Edit, ChevronRight, MoreHorizontal, ArrowRight, BellOff, Trash } from 'lucide-react';
import { vibeData, vibeCategories, musicData, musicCategories, moods, moodStyles, audiences, exploreRecentItems, exploreTrendingData, mockResultsCity, mockResultsRiya, exploreGridItems, mockConversationsData, moodColors } from './MockData';

import VibeCard from './VibeCard';

const SelectVibeScreen = ({
  stepId,
  title,
  data,
  categories,
  selectedItem,
  onSelect,
  onNext,
  onBack,
  bottomLabel
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedCategories, setExpandedCategories] = useState({});

  const handleCategoryExpand = (catId) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const handleToggle = (item) => {
    if (selectedItem?.id === item.id) {
      onSelect(null);
    } else {
      onSelect(item);
    }
  };

  const visibleData = activeCategory === 'All'
    ? data
    : data.filter(d => d.category === activeCategory);

  return (
    <motion.div
      key={stepId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col font-sans"
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
        <h3 className="text-white font-medium text-[15px]">{title}</h3>
        <button
          onClick={() => selectedItem && onNext()}
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 ${selectedItem ? 'bg-[#FF4500] border-[#FF4500] cursor-pointer' : 'bg-transparent border-[1.5px] border-white/15 cursor-default'}`}
        >
          <Check size={18} strokeWidth={selectedItem ? 3 : 2} className={selectedItem ? 'text-white' : 'text-white/30'} />
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="w-full overflow-x-auto [scrollbar-width:none] shrink-0 mb-2">
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

      {/* Scrollable Image Grid */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] px-4 pb-4">
        <div className="flex flex-col gap-6">
          {visibleData.map(section => (
            <div key={section.id} className="flex flex-col relative pb-6">
              <h4 className="text-[10px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-[10px]">
                {section.category}
              </h4>

              {/* Standard 9:16 Layout for all categories */}
              <div className="grid grid-cols-3 gap-2">
                {section.items.map(item => (
                  <VibeCard key={item.id} item={item} isSelected={selectedItem?.id === item.id} onToggle={handleToggle} className="aspect-[9/16]" />
                ))}
              </div>

              {/* Expanded Items */}
              <AnimatePresence>
                {expandedCategories[section.id] && section.extraItems && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-2"
                  >
                    <div className="grid grid-cols-3 gap-2 pb-8">
                      {section.extraItems.map(item => (
                        <VibeCard
                          key={item.id}
                          item={item}
                          isSelected={selectedItem?.id === item.id}
                          onToggle={handleToggle}
                          className="aspect-[9/16]"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dropdown Blur Overlay */}
              {section.extraItems && (
                <div className={`absolute bottom-0 inset-x-0 flex items-end justify-center transition-all duration-300 pointer-events-none ${expandedCategories[section.id] ? 'h-10 bg-transparent pb-0' : 'h-24 bg-gradient-to-t from-[#0c0c10] via-[#0c0c10]/80 to-transparent pb-2 backdrop-blur-[1px]'}`}>
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
          className="w-[36px] h-[36px] rounded-lg border border-white/10 transition-all duration-300"
          style={{
            backgroundColor: selectedItem ? selectedItem.bg : 'transparent',
            opacity: selectedItem ? 1 : 0.3
          }}
        />
        <div className="flex flex-col flex-1 justify-center">
          <span className="text-[10px] text-white/35 leading-tight">{bottomLabel}</span>
          {selectedItem ? (
            <span className="text-[13px] font-medium text-white leading-tight mt-[2px]">{selectedItem.name}</span>
          ) : (
            <span className="text-[12px] text-white/30 italic leading-tight mt-[2px]">None selected</span>
          )}
        </div>
        <button
          onClick={() => selectedItem && onNext()}
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${selectedItem ? 'bg-[#FF4500] border-[#FF4500] cursor-pointer' : 'bg-transparent border-[1.5px] border-white/15 cursor-default'}`}
        >
          <Check size={18} strokeWidth={selectedItem ? 3 : 2} className={selectedItem ? 'text-white' : 'text-white/30'} />
        </button>
      </div>

    </motion.div>
  );
};
export default SelectVibeScreen;