import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search } from 'lucide-react';

const vibeData = [
  {
    category: "Nature",
    id: "nature",
    items: [
      { id: "nature-1", name: "Serene Mountain", bg: "#1e3a5f", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&fit=crop" },
      { id: "nature-2", name: "Valley Dusk",    bg: "#1a3a2a", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80&fit=crop" },
      { id: "nature-3", name: "Misty Forest",   bg: "#2a2a1a", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "nature-4", name: "Deep Lake",    bg: "#152238", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80&fit=crop" },
      { id: "nature-5", name: "Red Woods",    bg: "#4a2e2b", img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=400&q=80&fit=crop" },
      { id: "nature-6", name: "Golden Hour",  bg: "#8a5a44", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Dark & Moody",
    id: "dark-moody",
    items: [
      { id: "dark-1", name: "Mystic Aura",  bg: "#2d1b4e", img: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80&fit=crop" },
      { id: "dark-2", name: "Dark Matter",  bg: "#1a1a3a", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80&fit=crop" },
      { id: "dark-3", name: "Night Pulse",  bg: "#3a1a2a", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "dark-4", name: "Obsidian",      bg: "#0d0d12", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80&fit=crop" },
      { id: "dark-5", name: "Crimson Night", bg: "#300810", img: "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=400&q=80&fit=crop" },
      { id: "dark-6", name: "Void",          bg: "#1a1b26", img: "https://images.unsplash.com/photo-1464061884559-3d0c2b65c2b1?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Avengers",
    id: "avengers",
    items: [
      { id: "av-1", name: "Iron Man",    bg: "#8b0000", img: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=400&q=80&fit=crop" },
      { id: "av-2", name: "Storm",       bg: "#1a1a2e", img: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80&fit=crop" },
      { id: "av-3", name: "Infinity",   bg: "#4b0082", img: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "av-4", name: "Shield",     bg: "#00008b", img: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&q=80&fit=crop" },
      { id: "av-5", name: "Snap",       bg: "#2c2c54", img: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=80&fit=crop" },
      { id: "av-6", name: "Assemble",   bg: "#1a0a00", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Harry Potter",
    id: "harry-potter",
    items: [
      { id: "hp-1", name: "Hogwarts",          bg: "#1a1a2e", img: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=400&q=80&fit=crop" },
      { id: "hp-2", name: "Dark Arts",         bg: "#2d1b4e", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80&fit=crop" },
      { id: "hp-3", name: "Magic Library",     bg: "#1c0a00", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "hp-4", name: "Platform 9¾",       bg: "#1a2a3a", img: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&q=80&fit=crop" },
      { id: "hp-5", name: "Patronus",          bg: "#0a1628", img: "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=400&q=80&fit=crop" },
      { id: "hp-6", name: "Forbidden Forest",  bg: "#0d1f0d", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Death Note",
    id: "death-note",
    items: [
      { id: "dn-1", name: "The Notebook",   bg: "#0d0d0d", img: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=400&q=80&fit=crop" },
      { id: "dn-2", name: "Shinigami",      bg: "#1a0a0a", img: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=400&q=80&fit=crop" },
      { id: "dn-3", name: "L vs Kira",      bg: "#0a0a1a", img: "https://images.unsplash.com/photo-1464061884559-3d0c2b65c2b1?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "dn-4", name: "Near",         bg: "#1a1a1a", img: "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=400&q=80&fit=crop" },
      { id: "dn-5", name: "Kira",         bg: "#200000", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80&fit=crop" },
      { id: "dn-6", name: "Shadows",      bg: "#0d0d12", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Demon Slayer",
    id: "demon-slayer",
    items: [
      { id: "ds-1", name: "Flame Hashira",    bg: "#8b1a00", img: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&q=80&fit=crop" },
      { id: "ds-2", name: "Cherry Blossom",   bg: "#3d1a2a", img: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&q=80&fit=crop" },
      { id: "ds-3", name: "Wisteria Moon",    bg: "#1a0a2a", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "ds-4", name: "Thunder Breath",   bg: "#0a0a3a", img: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80&fit=crop" },
      { id: "ds-5", name: "Sunrise",          bg: "#5a2a1a", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80&fit=crop" },
      { id: "ds-6", name: "Infinity Castle",  bg: "#1a1a3a", img: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Prince of Persia",
    id: "prince-of-persia",
    items: [
      { id: "pop-1", name: "Sand Dunes",     bg: "#8b6914", img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80&fit=crop" },
      { id: "pop-2", name: "Ancient Palace", bg: "#5a3a1a", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80&fit=crop" },
      { id: "pop-3", name: "Desert Storm",   bg: "#6b4a1a", img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "pop-4", name: "Oasis",          bg: "#1a3a2a", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80&fit=crop" },
      { id: "pop-5", name: "Sands of Time",  bg: "#7a5a1a", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80&fit=crop" },
      { id: "pop-6", name: "Mirage",         bg: "#4a3a1a", img: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Stranger Things",
    id: "stranger-things",
    items: [
      { id: "st-1", name: "Upside Down",   bg: "#1a0a1a", img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&q=80&fit=crop" },
      { id: "st-2", name: "Hawkins Lab",   bg: "#0a1a1a", img: "https://images.unsplash.com/photo-1553949285-1196ce81deda?w=400&q=80&fit=crop" },
      { id: "st-3", name: "Neon 80s",      bg: "#0a0a1a", img: "https://images.unsplash.com/photo-1545033131-485ea67fd7c3?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "st-4", name: "The Void",      bg: "#0d0d0d", img: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80&fit=crop" },
      { id: "st-5", name: "Demogorgon",   bg: "#1a0a0a", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80&fit=crop" },
      { id: "st-6", name: "Portal",        bg: "#1a1a00", img: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Game of Thrones",
    id: "game-of-thrones",
    items: [
      { id: "got-1", name: "Winterfell",    bg: "#1a1a2e", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&fit=crop" },
      { id: "got-2", name: "Dragon Fire",   bg: "#5a0000", img: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&q=80&fit=crop" },
      { id: "got-3", name: "The Wall",      bg: "#1e2d3a", img: "https://images.unsplash.com/photo-1517525822813-9980d1813ce2?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "got-4", name: "Iron Throne",   bg: "#2a1a0a", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80&fit=crop" },
      { id: "got-5", name: "King's Landing",bg: "#3a2a1a", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80&fit=crop" },
      { id: "got-6", name: "Night King",    bg: "#0d1a2a", img: "https://images.unsplash.com/photo-1464061884559-3d0c2b65c2b1?w=400&q=80&fit=crop" }
    ]
  }
];

const vibeCategories = ["All", "Nature", "Dark & Moody", "Urban", "Avengers", "Harry Potter", "Death Note", "Demon Slayer", "Prince of Persia", "Stranger Things", "Game of Thrones"];

const musicData = [
  {
    category: "Nature",
    id: "nature-music",
    items: [ { id: "nm-1", name: "Serene Mountain", duration: "2:34", bg: "#1e3a5f" }, { id: "nm-2", name: "Valley Dusk", duration: "3:12", bg: "#1a3a2a" } ],
    extraItems: [ { id: "nm-3", name: "Misty Forest", duration: "3:45", bg: "#2a2a1a" }, { id: "nm-4", name: "River Flow", duration: "2:50", bg: "#3a2a3a" } ]
  },
  {
    category: "Dark & Moody",
    id: "dark-moody-music",
    items: [ { id: "dm-1", name: "Mystic Aura", duration: "4:05", bg: "#2d1b4e" }, { id: "dm-2", name: "Dark Matter", duration: "3:47", bg: "#1a1a3a" } ],
    extraItems: [ { id: "dm-3", name: "Night Pulse", duration: "6:15", bg: "#3a1a2a" }, { id: "dm-4", name: "Shadow Walk", duration: "4:30", bg: "#1a1a2a" } ]
  },
  {
    category: "Urban",
    id: "urban-music",
    items: [ { id: "ur-1", name: "City Lights", duration: "2:58", bg: "#1a2a3a" }, { id: "ur-2", name: "Rooftop", duration: "3:22", bg: "#3d2b1f" } ],
    extraItems: [ { id: "ur-3", name: "Subway", duration: "3:10", bg: "#2a2a1a" }, { id: "ur-4", name: "Street Beat", duration: "2:45", bg: "#1a1a1a" } ]
  },
  {
    category: "Avengers",
    id: "avengers-music",
    items: [ { id: "av-1", name: "Hero's Theme", duration: "3:45", bg: "#8b0000" }, { id: "av-2", name: "Assemble", duration: "4:12", bg: "#1a1a2e" } ],
    extraItems: [ { id: "av-3", name: "Endgame", duration: "5:30", bg: "#4b0082" }, { id: "av-4", name: "Infinity", duration: "2:55", bg: "#00008b" } ]
  },
  {
    category: "Harry Potter",
    id: "hp-music",
    items: [ { id: "hp-1", name: "Hedwig's Flight", duration: "3:10", bg: "#1a1a2e" }, { id: "hp-2", name: "Magic Wand", duration: "2:45", bg: "#2d1b4e" } ],
    extraItems: [ { id: "hp-3", name: "Dark Arts", duration: "4:20", bg: "#1c0a00" }, { id: "hp-4", name: "Hogwarts", duration: "3:50", bg: "#1a2a3a" } ]
  },
  {
    category: "Death Note",
    id: "dn-music",
    items: [ { id: "dn-1", name: "Kira's Theme", duration: "3:15", bg: "#0d0d0d" }, { id: "dn-2", name: "L's Theme", duration: "2:50", bg: "#1a0a0a" } ],
    extraItems: [ { id: "dn-3", name: "Shinigami", duration: "4:10", bg: "#0a0a1a" }, { id: "dn-4", name: "Justice", duration: "3:25", bg: "#1a1a1a" } ]
  },
  {
    category: "Demon Slayer",
    id: "ds-music",
    items: [ { id: "ds-1", name: "Water Breathing", duration: "3:30", bg: "#8b1a00" }, { id: "ds-2", name: "Hinokami", duration: "4:05", bg: "#3d1a2a" } ],
    extraItems: [ { id: "ds-3", name: "Mugen Train", duration: "5:15", bg: "#1a0a2a" }, { id: "ds-4", name: "Hashira", duration: "2:40", bg: "#0a0a3a" } ]
  },
  {
    category: "Prince of Persia",
    id: "pop-music",
    items: [ { id: "pop-1", name: "Sands of Time", duration: "3:40", bg: "#8b6914" }, { id: "pop-2", name: "Warrior Within", duration: "4:20", bg: "#5a3a1a" } ],
    extraItems: [ { id: "pop-3", name: "Two Thrones", duration: "3:55", bg: "#6b4a1a" }, { id: "pop-4", name: "Desert Winds", duration: "2:50", bg: "#1a3a2a" } ]
  },
  {
    category: "Stranger Things",
    id: "st-music",
    items: [ { id: "st-1", name: "Upside Down", duration: "3:25", bg: "#1a0a1a" }, { id: "st-2", name: "Synth Wave", duration: "2:55", bg: "#0a1a1a" } ],
    extraItems: [ { id: "st-3", name: "Hawkins", duration: "4:10", bg: "#0a0a1a" }, { id: "st-4", name: "Demogorgon", duration: "3:40", bg: "#0d0d0d" } ]
  },
  {
    category: "Game of Thrones",
    id: "got-music",
    items: [ { id: "got-1", name: "Main Title", duration: "2:50", bg: "#1a1a2e" }, { id: "got-2", name: "Winter is Here", duration: "3:45", bg: "#5a0000" } ],
    extraItems: [ { id: "got-3", name: "Rains of Castamere", duration: "4:20", bg: "#1e2d3a" }, { id: "got-4", name: "Dragonstone", duration: "3:15", bg: "#2a1a0a" } ]
  }
];

const musicCategories = ["For you", "Explore", "Trending", "Saved"];

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

const SelectorStep = ({
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
      transition={{ duration: 0.3 }}
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
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 ${selectedItem ? 'bg-white border-white cursor-pointer' : 'bg-transparent border-[1.5px] border-white/15 cursor-default'}`}
        >
          <Check size={18} strokeWidth={selectedItem ? 3 : 2} className={selectedItem ? 'text-[#0c0c10]' : 'text-white/30'} />
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="w-full overflow-x-auto [scrollbar-width:none] shrink-0 mb-2">
        <div className="flex gap-2 px-4 pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-[14px] py-[7px] text-[12px] font-medium transition-colors ${
                activeCategory === cat 
                  ? 'bg-white text-[#0c0c10]' 
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
              
              {/* Custom Layouts based on category */}
              {section.category === 'Nature' && (
                <div className="flex gap-2">
                  <VibeCard item={section.items[0]} isSelected={selectedItem?.id === section.items[0].id} onToggle={handleToggle} className="w-[118px] h-[196px] shrink-0" />
                  <div className="flex flex-col gap-2 flex-1">
                    <VibeCard item={section.items[1]} isSelected={selectedItem?.id === section.items[1].id} onToggle={handleToggle} className="h-[94px]" />
                    <VibeCard item={section.items[2]} isSelected={selectedItem?.id === section.items[2].id} onToggle={handleToggle} className="h-[94px]" />
                  </div>
                </div>
              )}

              {section.category === 'Dark & Moody' && (
                <div className="grid grid-cols-3 gap-2">
                  {section.items.map(item => (
                    <VibeCard key={item.id} item={item} isSelected={selectedItem?.id === item.id} onToggle={handleToggle} className="h-[168px]" />
                  ))}
                </div>
              )}

              {section.category === 'Urban' && (
                <div className="flex gap-2">
                  <VibeCard item={section.items[0]} isSelected={selectedItem?.id === section.items[0].id} onToggle={handleToggle} className="w-[130px] h-[200px] shrink-0" />
                  <div className="flex flex-col gap-2 flex-1">
                    <VibeCard item={section.items[1]} isSelected={selectedItem?.id === section.items[1].id} onToggle={handleToggle} className="h-[96px]" />
                    <VibeCard item={section.items[2]} isSelected={selectedItem?.id === section.items[2].id} onToggle={handleToggle} className="h-[96px]" />
                  </div>
                </div>
              )}

              {section.category === 'Avengers' && (
                <div className="flex gap-2">
                  <VibeCard item={section.items[0]} isSelected={selectedItem?.id === section.items[0].id} onToggle={handleToggle} className="w-[118px] h-[196px] shrink-0" />
                  <div className="flex flex-col gap-2 flex-1">
                    <VibeCard item={section.items[1]} isSelected={selectedItem?.id === section.items[1].id} onToggle={handleToggle} className="h-[94px]" />
                    <VibeCard item={section.items[2]} isSelected={selectedItem?.id === section.items[2].id} onToggle={handleToggle} className="h-[94px]" />
                  </div>
                </div>
              )}

              {section.category === 'Harry Potter' && (
                <div className="grid grid-cols-3 gap-2">
                  {section.items.map(item => (
                    <VibeCard key={item.id} item={item} isSelected={selectedItem?.id === item.id} onToggle={handleToggle} className="h-[168px]" />
                  ))}
                </div>
              )}

              {section.category === 'Death Note' && (
                <div className="grid grid-cols-3 gap-2">
                  {section.items.map(item => (
                    <VibeCard key={item.id} item={item} isSelected={selectedItem?.id === item.id} onToggle={handleToggle} className="h-[168px]" />
                  ))}
                </div>
              )}

              {section.category === 'Demon Slayer' && (
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2 flex-1">
                    <VibeCard item={section.items[0]} isSelected={selectedItem?.id === section.items[0].id} onToggle={handleToggle} className="h-[116px]" />
                    <VibeCard item={section.items[1]} isSelected={selectedItem?.id === section.items[1].id} onToggle={handleToggle} className="h-[116px]" />
                  </div>
                  <VibeCard item={section.items[2]} isSelected={selectedItem?.id === section.items[2].id} onToggle={handleToggle} className="w-[130px] h-[240px] shrink-0" />
                </div>
              )}

              {section.category === 'Prince of Persia' && (
                <div className="flex gap-2">
                  <VibeCard item={section.items[0]} isSelected={selectedItem?.id === section.items[0].id} onToggle={handleToggle} className="w-[130px] h-[200px] shrink-0" />
                  <div className="flex flex-col gap-2 flex-1">
                    <VibeCard item={section.items[1]} isSelected={selectedItem?.id === section.items[1].id} onToggle={handleToggle} className="h-[96px]" />
                    <VibeCard item={section.items[2]} isSelected={selectedItem?.id === section.items[2].id} onToggle={handleToggle} className="h-[96px]" />
                  </div>
                </div>
              )}

              {section.category === 'Stranger Things' && (
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2 flex-1">
                    <VibeCard item={section.items[0]} isSelected={selectedItem?.id === section.items[0].id} onToggle={handleToggle} className="h-[116px]" />
                    <VibeCard item={section.items[1]} isSelected={selectedItem?.id === section.items[1].id} onToggle={handleToggle} className="h-[116px]" />
                  </div>
                  <VibeCard item={section.items[2]} isSelected={selectedItem?.id === section.items[2].id} onToggle={handleToggle} className="w-[130px] h-[240px] shrink-0" />
                </div>
              )}

              {section.category === 'Game of Thrones' && (
                <div className="flex gap-2">
                  <VibeCard item={section.items[0]} isSelected={selectedItem?.id === section.items[0].id} onToggle={handleToggle} className="w-[118px] h-[196px] shrink-0" />
                  <div className="flex flex-col gap-2 flex-1">
                    <VibeCard item={section.items[1]} isSelected={selectedItem?.id === section.items[1].id} onToggle={handleToggle} className="h-[94px]" />
                    <VibeCard item={section.items[2]} isSelected={selectedItem?.id === section.items[2].id} onToggle={handleToggle} className="h-[94px]" />
                  </div>
                </div>
              )}

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
                          className="h-[120px]" 
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
      <div className="border-t-[0.5px] border-white/10 px-4 pt-[10px] pb-[22px] flex items-center gap-3 shrink-0 bg-[#0c0c10]">
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
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${selectedItem ? 'bg-white border-white cursor-pointer' : 'bg-transparent border-[1.5px] border-white/15 cursor-default'}`}
        >
          <Check size={18} strokeWidth={selectedItem ? 3 : 2} className={selectedItem ? 'text-[#0c0c10]' : 'text-white/30'} />
        </button>
      </div>

    </motion.div>
  );
};

const MusicStep = ({
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
        className={`relative flex items-center p-2 rounded-xl cursor-pointer transition-colors ${
          isSelected ? 'bg-white/5' : 'hover:bg-white/5'
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
      transition={{ duration: 0.3 }}
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
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 ${selectedMusic ? 'bg-white/10 border-transparent cursor-pointer' : 'bg-transparent border-[1.5px] border-white/15 cursor-default'}`}
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
              className={`whitespace-nowrap rounded-full px-[14px] py-[7px] text-[12px] font-medium transition-colors ${
                activeCategory === cat 
                  ? 'bg-white text-[#0c0c10]' 
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
              </div>

              {/* Dropdown Blur Overlay */}
              {section.extraItems && (
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

      {/* Volume Control */}
      <div className="px-6 py-4 flex items-center gap-3 shrink-0">
        <Volume1 size={14} className="text-white/40" />
        <div className="flex-1 h-1 bg-white/10 rounded-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-white rounded-full">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow" />
          </div>
        </div>
        <Volume2 size={14} className="text-white/40" />
      </div>

      {/* Bottom Strip */}
      <div className="border-t-[0.5px] border-white/10 px-4 pt-[10px] pb-[22px] flex items-center gap-3 shrink-0 bg-[#0c0c10]">
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
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${selectedMusic ? 'bg-white cursor-pointer' : 'bg-transparent border-[1.5px] border-white/15 cursor-default'}`}
        >
          <Check size={18} strokeWidth={selectedMusic ? 3 : 2} className={selectedMusic ? 'text-[#0c0c10]' : 'text-white/30'} />
        </button>
      </div>

    </motion.div>
  );
};

const ReelSimulator = () => {
  const containerRef = useRef(null);

  const [step, setStep] = useState(1);
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState(null);

  return (
    <section className="container mx-auto px-6 py-24 flex flex-col lg:flex-row-reverse items-center justify-center gap-16 lg:gap-24 overflow-hidden scroll-mt-10" id="feed" ref={containerRef}>

      {/* Right Side Content */}
      <div className="flex-1 text-center lg:text-left space-y-8 max-w-xl z-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold border border-indigo-100">
          <Sparkles size={16} /> Visual First
        </div>
        <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] h-[140px] md:h-auto">
          {step === 1 ? (
            <>Choose a <br /><span className="text-gradient">Vibe</span></>
          ) : (
            <>Select your <br /><span className="text-gradient">Soundtrack</span></>
          )}
        </h2>
        <p className="text-xl text-gray-500 font-medium h-[80px]">
          {step === 1 
            ? "Set the perfect mood before posting your thoughts. Browse through curated aesthetics and pick a background that matches your energy."
            : "Layer a soundscape to complete the experience. From serene nature to dark electronic beats, choose the perfect track."
          }
        </p>

        <ul className="space-y-4 pt-6 text-left max-w-sm mx-auto lg:mx-0">
          {[
            { title: "Immersive Selection", desc: "A dark, focused interface that lets the imagery speak for itself." },
            { title: "Categorized Themes", desc: "Quickly filter by Nature, Dark & Moody, Minimal, and more." },
            { title: "Seamless Creation", desc: "Select a vibe and you're ready to share your anonymous thoughts with the world." }
          ].map((item, i) => (
            <li key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-1">
                <div className="w-3 h-3 bg-indigo-500 rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Left Side - Dedicated Theme Selector Phone */}
      <div className="flex-1 w-full max-w-md mx-auto relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-[340px] h-[720px] rounded-[3.5rem] border-[14px] border-black bg-[#0c0c10] overflow-hidden shadow-2xl relative ring-1 ring-gray-200 flex flex-col font-sans"
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <SelectorStep
                key="step-vibe"
                stepId={1}
                title="Choose a vibe"
                data={vibeData}
                categories={vibeCategories}
                selectedItem={selectedVibe}
                onSelect={setSelectedVibe}
                onNext={() => setStep(2)}
                onBack={() => {}}
                bottomLabel="Vibe"
              />
            )}
            {step === 2 && (
              <MusicStep
                key="step-music"
                stepId={2}
                selectedVibe={selectedVibe}
                selectedVibeCategory={vibeData.find(s => s.items.some(i => i.id === selectedVibe?.id) || s.extraItems?.some(i => i.id === selectedVibe?.id))?.category}
                data={musicData}
                categories={musicCategories}
                selectedMusic={selectedMusic}
                onSelectMusic={setSelectedMusic}
                onNext={() => console.log(`Ready to post!\nVibe: ${selectedVibe?.name}\nMusic: ${selectedMusic?.name}`)}
                onBack={() => setStep(1)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ReelSimulator;
