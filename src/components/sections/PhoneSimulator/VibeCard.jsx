import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash, Home, PlusSquare, MessageCircle, User, Heart, Share2, VolumeX, X, Send, Clock, Bell, Plus, Ghost, Lock, Inbox, Wifi, Battery, Edit, ChevronRight, MoreHorizontal, ArrowRight, BellOff, Trash } from 'lucide-react';
import { vibeData, vibeCategories, musicData, musicCategories, moods, moodStyles, audiences, exploreRecentItems, exploreTrendingData, mockResultsCity, mockResultsRiya, exploreGridItems, mockConversationsData, moodColors } from './MockData';

const VibeCard = ({ item, isSelected, onToggle, className }) => {
  return (
    <div
      onClick={() => onToggle(item)}
      className={`relative rounded-xl overflow-hidden cursor-pointer transition-transform active:scale-[0.98] ${className}`}
      style={{ backgroundColor: item.bg }}
    >
      {/* Real image layer */}
      {item.img && (
        <img
          src={item.img}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,${item.isLight ? '0.55' : '0.70'}) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)`
        }}
      />
      <span className="absolute bottom-[9px] left-[10px] text-[11px] font-semibold text-white drop-shadow-sm">{item.name}</span>

      {isSelected && (
        <>
          <div className="absolute inset-0 rounded-xl border-2 border-white pointer-events-none" />
          <div className={`absolute top-2 left-2 w-5 h-5 rounded-full ${item.isLight ? 'bg-[#0c0c10]' : 'bg-white'} flex items-center justify-center shadow-md`}>
            <Check size={12} strokeWidth={3} className={item.isLight ? 'text-white' : 'text-[#0c0c10]'} />
          </div>
        </>
      )}
    </div>
  )
};
export default VibeCard;