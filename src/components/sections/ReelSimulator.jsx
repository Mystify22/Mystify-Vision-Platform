import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash } from 'lucide-react';

const vibeData = [
  {
    category: "Nature",
    id: "nature",
    items: [
      { id: "nature-1", name: "Serene Mountain", bg: "#1e3a5f", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&fit=crop" },
      { id: "nature-2", name: "Valley Dusk", bg: "#1a3a2a", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80&fit=crop" },
      { id: "nature-3", name: "Misty Forest", bg: "#2a2a1a", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "nature-4", name: "Deep Lake", bg: "#152238", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80&fit=crop" },
      { id: "nature-5", name: "Red Woods", bg: "#4a2e2b", img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=400&q=80&fit=crop" },
      { id: "nature-6", name: "Golden Hour", bg: "#8a5a44", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Dark & Moody",
    id: "dark-moody",
    items: [
      { id: "dark-1", name: "Mystic Aura", bg: "#2d1b4e", img: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80&fit=crop" },
      { id: "dark-2", name: "Dark Matter", bg: "#1a1a3a", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80&fit=crop" },
      { id: "dark-3", name: "Night Pulse", bg: "#3a1a2a", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "dark-4", name: "Obsidian", bg: "#0d0d12", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80&fit=crop" },
      { id: "dark-5", name: "Crimson Night", bg: "#300810", img: "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=400&q=80&fit=crop" },
      { id: "dark-6", name: "Void", bg: "#1a1b26", img: "https://images.unsplash.com/photo-1464061884559-3d0c2b65c2b1?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Avengers",
    id: "avengers",
    items: [
      { id: "av-1", name: "Iron Man", bg: "#8b0000", img: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=400&q=80&fit=crop" },
      { id: "av-2", name: "Storm", bg: "#1a1a2e", img: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80&fit=crop" },
      { id: "av-3", name: "Infinity", bg: "#4b0082", img: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "av-4", name: "Shield", bg: "#00008b", img: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&q=80&fit=crop" },
      { id: "av-5", name: "Snap", bg: "#2c2c54", img: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=80&fit=crop" },
      { id: "av-6", name: "Assemble", bg: "#1a0a00", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Harry Potter",
    id: "harry-potter",
    items: [
      { id: "hp-1", name: "Hogwarts", bg: "#1a1a2e", img: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=400&q=80&fit=crop" },
      { id: "hp-2", name: "Dark Arts", bg: "#2d1b4e", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80&fit=crop" },
      { id: "hp-3", name: "Magic Library", bg: "#1c0a00", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "hp-4", name: "Platform 9¾", bg: "#1a2a3a", img: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&q=80&fit=crop" },
      { id: "hp-5", name: "Patronus", bg: "#0a1628", img: "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=400&q=80&fit=crop" },
      { id: "hp-6", name: "Forbidden Forest", bg: "#0d1f0d", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Death Note",
    id: "death-note",
    items: [
      { id: "dn-1", name: "The Notebook", bg: "#0d0d0d", img: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=400&q=80&fit=crop" },
      { id: "dn-2", name: "Shinigami", bg: "#1a0a0a", img: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=400&q=80&fit=crop" },
      { id: "dn-3", name: "L vs Kira", bg: "#0a0a1a", img: "https://images.unsplash.com/photo-1464061884559-3d0c2b65c2b1?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "dn-4", name: "Near", bg: "#1a1a1a", img: "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=400&q=80&fit=crop" },
      { id: "dn-5", name: "Kira", bg: "#200000", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80&fit=crop" },
      { id: "dn-6", name: "Shadows", bg: "#0d0d12", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Demon Slayer",
    id: "demon-slayer",
    items: [
      { id: "ds-1", name: "Flame Hashira", bg: "#8b1a00", img: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&q=80&fit=crop" },
      { id: "ds-2", name: "Cherry Blossom", bg: "#3d1a2a", img: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&q=80&fit=crop" },
      { id: "ds-3", name: "Wisteria Moon", bg: "#1a0a2a", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "ds-4", name: "Thunder Breath", bg: "#0a0a3a", img: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80&fit=crop" },
      { id: "ds-5", name: "Sunrise", bg: "#5a2a1a", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80&fit=crop" },
      { id: "ds-6", name: "Infinity Castle", bg: "#1a1a3a", img: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Prince of Persia",
    id: "prince-of-persia",
    items: [
      { id: "pop-1", name: "Sand Dunes", bg: "#8b6914", img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80&fit=crop" },
      { id: "pop-2", name: "Ancient Palace", bg: "#5a3a1a", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80&fit=crop" },
      { id: "pop-3", name: "Desert Storm", bg: "#6b4a1a", img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "pop-4", name: "Oasis", bg: "#1a3a2a", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80&fit=crop" },
      { id: "pop-5", name: "Sands of Time", bg: "#7a5a1a", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80&fit=crop" },
      { id: "pop-6", name: "Mirage", bg: "#4a3a1a", img: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Stranger Things",
    id: "stranger-things",
    items: [
      { id: "st-1", name: "Upside Down", bg: "#1a0a1a", img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&q=80&fit=crop" },
      { id: "st-2", name: "Hawkins Lab", bg: "#0a1a1a", img: "https://images.unsplash.com/photo-1553949285-1196ce81deda?w=400&q=80&fit=crop" },
      { id: "st-3", name: "Neon 80s", bg: "#0a0a1a", img: "https://images.unsplash.com/photo-1545033131-485ea67fd7c3?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "st-4", name: "The Void", bg: "#0d0d0d", img: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80&fit=crop" },
      { id: "st-5", name: "Demogorgon", bg: "#1a0a0a", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80&fit=crop" },
      { id: "st-6", name: "Portal", bg: "#1a1a00", img: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Game of Thrones",
    id: "game-of-thrones",
    items: [
      { id: "got-1", name: "Winterfell", bg: "#1a1a2e", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&fit=crop" },
      { id: "got-2", name: "Dragon Fire", bg: "#5a0000", img: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&q=80&fit=crop" },
      { id: "got-3", name: "The Wall", bg: "#1e2d3a", img: "https://images.unsplash.com/photo-1517525822813-9980d1813ce2?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "got-4", name: "Iron Throne", bg: "#2a1a0a", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80&fit=crop" },
      { id: "got-5", name: "King's Landing", bg: "#3a2a1a", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80&fit=crop" },
      { id: "got-6", name: "Night King", bg: "#0d1a2a", img: "https://images.unsplash.com/photo-1464061884559-3d0c2b65c2b1?w=400&q=80&fit=crop" }
    ]
  }
];

const vibeCategories = ["All", "Nature", "Dark & Moody", "Urban", "Avengers", "Harry Potter", "Death Note", "Demon Slayer", "Prince of Persia", "Stranger Things", "Game of Thrones"];

const musicData = [
  {
    category: "Nature",
    id: "nature-music",
    items: [{ id: "nm-1", name: "Serene Mountain", duration: "2:34", bg: "#1e3a5f" }, { id: "nm-2", name: "Valley Dusk", duration: "3:12", bg: "#1a3a2a" }],
    extraItems: [{ id: "nm-3", name: "Misty Forest", duration: "3:45", bg: "#2a2a1a" }, { id: "nm-4", name: "River Flow", duration: "2:50", bg: "#3a2a3a" }]
  },
  {
    category: "Dark & Moody",
    id: "dark-moody-music",
    items: [{ id: "dm-1", name: "Mystic Aura", duration: "4:05", bg: "#2d1b4e" }, { id: "dm-2", name: "Dark Matter", duration: "3:47", bg: "#1a1a3a" }],
    extraItems: [{ id: "dm-3", name: "Night Pulse", duration: "6:15", bg: "#3a1a2a" }, { id: "dm-4", name: "Shadow Walk", duration: "4:30", bg: "#1a1a2a" }]
  },
  {
    category: "Urban",
    id: "urban-music",
    items: [{ id: "ur-1", name: "City Lights", duration: "2:58", bg: "#1a2a3a" }, { id: "ur-2", name: "Rooftop", duration: "3:22", bg: "#3d2b1f" }],
    extraItems: [{ id: "ur-3", name: "Subway", duration: "3:10", bg: "#2a2a1a" }, { id: "ur-4", name: "Street Beat", duration: "2:45", bg: "#1a1a1a" }]
  },
  {
    category: "Avengers",
    id: "avengers-music",
    items: [{ id: "av-1", name: "Hero's Theme", duration: "3:45", bg: "#8b0000" }, { id: "av-2", name: "Assemble", duration: "4:12", bg: "#1a1a2e" }],
    extraItems: [{ id: "av-3", name: "Endgame", duration: "5:30", bg: "#4b0082" }, { id: "av-4", name: "Infinity", duration: "2:55", bg: "#00008b" }]
  },
  {
    category: "Harry Potter",
    id: "hp-music",
    items: [{ id: "hp-1", name: "Hedwig's Flight", duration: "3:10", bg: "#1a1a2e" }, { id: "hp-2", name: "Magic Wand", duration: "2:45", bg: "#2d1b4e" }],
    extraItems: [{ id: "hp-3", name: "Dark Arts", duration: "4:20", bg: "#1c0a00" }, { id: "hp-4", name: "Hogwarts", duration: "3:50", bg: "#1a2a3a" }]
  },
  {
    category: "Death Note",
    id: "dn-music",
    items: [{ id: "dn-1", name: "Kira's Theme", duration: "3:15", bg: "#0d0d0d" }, { id: "dn-2", name: "L's Theme", duration: "2:50", bg: "#1a0a0a" }],
    extraItems: [{ id: "dn-3", name: "Shinigami", duration: "4:10", bg: "#0a0a1a" }, { id: "dn-4", name: "Justice", duration: "3:25", bg: "#1a1a1a" }]
  },
  {
    category: "Demon Slayer",
    id: "ds-music",
    items: [{ id: "ds-1", name: "Water Breathing", duration: "3:30", bg: "#8b1a00" }, { id: "ds-2", name: "Hinokami", duration: "4:05", bg: "#3d1a2a" }],
    extraItems: [{ id: "ds-3", name: "Mugen Train", duration: "5:15", bg: "#1a0a2a" }, { id: "ds-4", name: "Hashira", duration: "2:40", bg: "#0a0a3a" }]
  },
  {
    category: "Prince of Persia",
    id: "pop-music",
    items: [{ id: "pop-1", name: "Sands of Time", duration: "3:40", bg: "#8b6914" }, { id: "pop-2", name: "Warrior Within", duration: "4:20", bg: "#5a3a1a" }],
    extraItems: [{ id: "pop-3", name: "Two Thrones", duration: "3:55", bg: "#6b4a1a" }, { id: "pop-4", name: "Desert Winds", duration: "2:50", bg: "#1a3a2a" }]
  },
  {
    category: "Stranger Things",
    id: "st-music",
    items: [{ id: "st-1", name: "Upside Down", duration: "3:25", bg: "#1a0a1a" }, { id: "st-2", name: "Synth Wave", duration: "2:55", bg: "#0a1a1a" }],
    extraItems: [{ id: "st-3", name: "Hawkins", duration: "4:10", bg: "#0a0a1a" }, { id: "st-4", name: "Demogorgon", duration: "3:40", bg: "#0d0d0d" }]
  },
  {
    category: "Game of Thrones",
    id: "got-music",
    items: [{ id: "got-1", name: "Main Title", duration: "2:50", bg: "#1a1a2e" }, { id: "got-2", name: "Winter is Here", duration: "3:45", bg: "#5a0000" }],
    extraItems: [{ id: "got-3", name: "Rains of Castamere", duration: "4:20", bg: "#1e2d3a" }, { id: "got-4", name: "Dragonstone", duration: "3:15", bg: "#2a1a0a" }]
  }
];

const musicCategories = ["For you", "Explore", "Trending", "Saved"];

const moods = ['Curious', 'Vulnerable', 'Frustrated', 'Hopeful', 'Nostalgic'];
const moodStyles = {
  Curious: { border: 'rgba(77,144,215,0.4)', color: 'rgba(77,144,215,0.9)' },
  Vulnerable: { border: 'rgba(159,127,218,0.4)', color: 'rgba(159,127,218,0.9)' },
  Frustrated: { border: 'rgba(218,127,127,0.4)', color: 'rgba(218,127,127,0.9)' },
  Hopeful: { border: 'rgba(127,218,159,0.4)', color: 'rgba(127,218,159,0.9)' },
  Nostalgic: { border: 'rgba(218,184,127,0.4)', color: 'rgba(218,184,127,0.9)' },
};

const audiences = ['Everyone', 'Followers', 'Close friends'];

const ComposeStep = ({
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
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col font-sans bg-[#0c0c10] text-white"
    >
      {/* Top Nav */}
      <div className="pt-12 pb-3 px-4 flex items-center justify-between shrink-0">
        <button onClick={onCancel} className="text-[14px] text-white/45 bg-transparent border-none p-0 focus:outline-none hover:text-white/60 transition-colors cursor-pointer">Cancel</button>
        <button
          onClick={() => charCount >= 3 && onNext()}
          disabled={charCount < 3}
          className={`px-[18px] py-[7px] rounded-[20px] text-[13px] font-semibold transition-opacity duration-200 ${charCount >= 3 ? 'opacity-100 bg-white text-[#0c0c10] cursor-pointer hover:bg-gray-200' : 'opacity-35 bg-white text-[#0c0c10] cursor-not-allowed'}`}
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
              className={`whitespace-nowrap rounded-full px-[14px] py-[7px] text-[12px] font-medium transition-colors ${activeCategory === cat
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
              className={`whitespace-nowrap rounded-full px-[14px] py-[7px] text-[12px] font-medium transition-colors ${activeCategory === cat
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

const LoginStep = ({ onNext }) => {
  React.useEffect(() => {
    window.showScreen = (step) => {
      if (step === 1 || step === 'compose') onNext();
    };

    if (!document.getElementById('login-styles')) {
      const style = document.createElement('style');
      style.id = 'login-styles';
      style.innerHTML = `
        .otp-box {
          flex: 1;
          height: 48px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 500;
          color: #fff;
          transition: border-color 0.15s, background 0.15s;
          user-select: none;
        }
        .otp-box.active {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.4);
          position: relative;
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .otp-box.active::after {
          content: "";
          position: absolute;
          width: 2px;
          height: 22px;
          background-color: #fff;
          animation: blinkCursor 1s step-end infinite;
          border-radius: 2px;
        }
        .otp-box.filled {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.2);
        }
        .otp-box.err {
          border-color: rgba(218,80,80,0.6);
          background: rgba(218,80,80,0.06);
          color: rgba(218,80,80,0.9);
        }
        .otp-box.ok {
          border-color: rgba(78,175,107,0.4);
        }

        @keyframes conffall {
          0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
        }
        @keyframes loginShake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-5px); }
          40%     { transform: translateX(5px); }
          60%     { transform: translateX(-3px); }
          80%     { transform: translateX(3px); }
        }
        .do-shake {
          animation: loginShake 0.35s ease;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    if (!document.getElementById('login-script')) {
      const script = document.createElement('script');
      script.id = 'login-script';
      script.innerHTML = `
        (function() {

        var loginPhone = '';
        var loginOtp = '';
        var loginAttempts = 0;
        var loginResendSecs = 30;
        var loginResendInterval = null;
        var loginBlinkInterval = null;
        var loginCatState = 'idle';
        var loginTailInterval = null;
        var countries = [
          { flag:'🇮🇳', code:'+91' },
          { flag:'🇺🇸', code:'+1'  },
          { flag:'🇬🇧', code:'+44' },
          { flag:'🇦🇪', code:'+971'}
        ];
        var countryIdx = 0;

        function lq(id) { return document.getElementById(id); }

        /* ── INIT ── */
        window.loginInit = function() {
          loginSetCatState('idle');
          setTimeout(function(){ loginWagTail(1); }, 800);
          loginStartBlink();
        };

        window.loginCleanup = function() {
          if (loginResendInterval) clearInterval(loginResendInterval);
          if (loginBlinkInterval) clearInterval(loginBlinkInterval);
          if (loginTailInterval) clearInterval(loginTailInterval);
        };

        /* ── COUNTRY CYCLE ── */
        window.cycleCountry = function() {
          countryIdx = (countryIdx + 1) % countries.length;
          if(lq('countryFlag')) lq('countryFlag').textContent = countries[countryIdx].flag;
          if(lq('countryCode')) lq('countryCode').textContent  = countries[countryIdx].code;
        };

        /* ── PHONE INPUT ── */
        window.onPhoneInput = function() {
          var raw = lq('phoneInput').value.replace(/\\D/g,'');
          loginPhone = raw;
          lq('phoneErr').style.display = 'none';
          loginSetPhoneBorder('focused');
          var btn = lq('sendOtpBtn');
          if (raw.length >= 10) {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
          } else {
            btn.style.opacity = '0.3';
            btn.style.pointerEvents = 'none';
          }
          loginSetCatState('looking');
        };

        window.onPhoneFocus = function() {
          loginSetPhoneBorder('focused');
          loginSetCatState('looking');
        };

        window.onPhoneBlur = function() {
          if (loginPhone.length > 0 && loginPhone.length < 10) {
            loginSetPhoneBorder('error');
            lq('phoneErr').style.display = 'flex';
            loginSetCatState('sad');
          } else if (loginPhone.length >= 10) {
            loginSetPhoneBorder('success');
          } else {
            loginSetPhoneBorder('default');
          }
        };

        function loginSetPhoneBorder(state) {
          var row = lq('phoneRow');
          var map = {
            default: 'rgba(255,255,255,0.1)',
            focused: 'rgba(255,255,255,0.3)',
            error:   'rgba(218,80,80,0.6)',
            success: 'rgba(78,175,107,0.5)'
          };
          var bgMap = {
            error: 'rgba(218,80,80,0.05)'
          };
          row.style.borderColor = map[state] || map.default;
          row.style.background  = bgMap[state] || 'rgba(255,255,255,0.05)';
        }

        /* ── SEND OTP ── */
        window.sendOtp = function() {
          if (loginPhone.length < 10) {
            lq('phoneErr').style.display = 'flex';
            loginSetPhoneBorder('error');
            loginShakeEl('phoneRow');
            loginSetCatState('sad');
            return;
          }
          var btn = lq('sendOtpBtn');
          btn.innerHTML = '<div style="width:14px;height:14px;border:2px solid rgba(0,0,0,0.15);border-top-color:#0c0c10;border-radius:50%;animation:spin 0.7s linear infinite;"></div> Sending...';
          btn.style.opacity = '0.7';
          btn.style.pointerEvents = 'none';
          loginSetCatState('hiding');
          setTimeout(function() {
            loginShowSubStep('B');
            var masked = countries[countryIdx].code + ' ' + loginPhone.slice(0,5) + ' •••••';
            lq('maskedNum').textContent = 'Sent to ' + masked + ' via SMS';
            loginSetCatState('peeking');
            loginStartResendTimer();
            focusOtp();
          }, 300);
        };

        /* ── OTP INPUT ── */
        window.focusOtp = function() { if(lq('otpHidden')) lq('otpHidden').focus(); };

        window.onOtpInput = function() {
          var raw = lq('otpHidden').value.toString().replace(/\\D/g,'').slice(0,6);
          lq('otpHidden').value = raw;
          loginOtp = raw;
          for (var i = 0; i < 6; i++) {
            var b = lq('ob' + i);
            b.className = 'otp-box';
            b.textContent = '';
            if (i < raw.length) { b.classList.add('filled'); b.textContent = '•'; }
            if (i === raw.length) { b.classList.add('active'); }
          }
          lq('otpErr').style.display = 'none';
          var vBtn = lq('verifyBtn');
          if (raw.length === 6) {
            vBtn.style.opacity = '1';
            vBtn.style.pointerEvents = 'auto';
          } else {
            vBtn.style.opacity = '0.3';
            vBtn.style.pointerEvents = 'none';
          }
          loginSetCatState(raw.length > 0 ? 'covering' : 'peeking');
        };

        window.onOtpKey = function(e) {
          if (e.key === 'Enter' && loginOtp.length === 6) verifyOtp();
        };

        /* ── VERIFY OTP ── */
        window.verifyOtp = function() {
          if (loginOtp.length < 6) return;
          var btn = lq('verifyBtn');
          btn.innerHTML = '<div style="width:14px;height:14px;border:2px solid rgba(0,0,0,0.15);border-top-color:#0c0c10;border-radius:50%;animation:spin 0.7s linear infinite;"></div> Verifying...';
          btn.style.opacity = '0.7';
          btn.style.pointerEvents = 'none';

          setTimeout(function() {
            if (loginOtp === '482901') {
              for (var i=0;i<6;i++) { lq('ob'+i).className='otp-box ok'; }
              loginSetCatState('success');
              setTimeout(function() {
                loginShowSubStep('C');
                setTimeout(function() { if(lq('redirBar')) lq('redirBar').style.width = '100%'; }, 50);
                setTimeout(function() { loginGoToApp(); }, 600);
              }, 300);
            } else {
              loginAttempts++;
              for (var i=0;i<6;i++) { lq('ob'+i).className='otp-box err'; }
              loginShakeEl('otpBoxRow');
              var msg = loginAttempts >= 3
                ? 'Too many attempts. Request a new code.'
                : 'Incorrect code. ' + (3 - loginAttempts) + ' attempt' + (loginAttempts < 2 ? 's' : '') + ' remaining.';
              lq('otpErrTxt').textContent = msg;
              lq('otpErr').style.display = 'flex';
              loginSetCatState('shocked');
              btn.innerHTML = 'Verify';
              btn.style.opacity = loginOtp.length === 6 ? '1' : '0.3';
              btn.style.pointerEvents = loginOtp.length === 6 ? 'auto' : 'none';
              if (loginAttempts >= 3) { loginClearOtp(); loginAttempts = 0; }
            }
          }, 300);
        };

        function loginClearOtp() {
          lq('otpHidden').value = '';
          loginOtp = '';
          for (var i=0;i<6;i++) { var b=lq('ob'+i); b.className='otp-box'; b.textContent=''; }
          lq('verifyBtn').style.opacity = '0.3';
          lq('verifyBtn').style.pointerEvents = 'none';
        }

        /* ── RESEND ── */
        window.resendOtp = function() {
          loginClearOtp();
          lq('otpErr').style.display = 'none';
          loginAttempts = 0;
          loginStartResendTimer();
          loginSetCatState('peeking');
          focusOtp();
        };

        function loginStartResendTimer() {
          loginResendSecs = 30;
          lq('resendBtn').style.color = 'rgba(255,255,255,0.25)';
          lq('resendBtn').style.pointerEvents = 'none';
          if (loginResendInterval) clearInterval(loginResendInterval);
          loginResendInterval = setInterval(function() {
            loginResendSecs--;
            var m = Math.floor(loginResendSecs/60);
            var s = loginResendSecs % 60;
            if(lq('resendTimer')) lq('resendTimer').textContent = loginResendSecs > 0
              ? 'Resend in ' + m + ':' + (s<10?'0':'') + s
              : 'Code expired';
            if (loginResendSecs <= 0) {
              clearInterval(loginResendInterval);
              if(lq('resendBtn')) {
                lq('resendBtn').style.color = 'rgba(255,255,255,0.6)';
                lq('resendBtn').style.pointerEvents = 'auto';
              }
            }
          }, 1000);
        }

        /* ── BACK ── */
        window.goBackToPhone = function() {
          loginShowSubStep('A');
          loginClearOtp();
          lq('otpErr').style.display = 'none';
          lq('sendOtpBtn').innerHTML = 'Send OTP';
          lq('sendOtpBtn').style.opacity = loginPhone.length >= 10 ? '1' : '0.3';
          lq('sendOtpBtn').style.pointerEvents = loginPhone.length >= 10 ? 'auto' : 'none';
          if (loginResendInterval) clearInterval(loginResendInterval);
          loginSetCatState('idle');
        };

        /* ── SUB-STEP VISIBILITY ── */
        function loginShowSubStep(step) {
          if(lq('loginStepA')) lq('loginStepA').style.display = step === 'A' ? 'block' : 'none';
          if(lq('loginStepB')) lq('loginStepB').style.display = step === 'B' ? 'block' : 'none';
          if(lq('loginStepC')) lq('loginStepC').style.display = step === 'C' ? 'flex'  : 'none';
        }

        /* ── GO TO APP (after login) ── */
        function loginGoToApp() {
          if (window.showScreen) {
            window.showScreen(1); 
          }
        }

        /* ── SHAKE UTILITY ── */
        function loginShakeEl(id) {
          var el = lq(id);
          if(!el) return;
          el.classList.remove('do-shake');
          void el.offsetWidth;
          el.classList.add('do-shake');
          setTimeout(function(){ el.classList.remove('do-shake'); }, 400);
        }

        /* ── CAT STATE MACHINE ── */
        function loginSetCatState(state) {
          loginCatState = state;
          var cl = lq('coverLeft');
          var cr = lq('coverRight');
          var cl_show = (state === 'hiding' || state === 'covering');
          if(cl) cl.style.display = cl_show ? 'block' : 'none';
          if(cr) cr.style.display = cl_show ? 'block' : 'none';
          if (loginBlinkInterval) clearInterval(loginBlinkInterval);
          if (state === 'idle' || state === 'peeking' || state === 'success') {
            loginStartBlink();
          }
          if (state === 'peeking') { loginWagTail(1); }
          if (state === 'success') {
            loginWagTail(8);
            loginShowHeart();
            loginShowConfetti();
            if(lq('catPaw')) lq('catPaw').style.display = 'block';
            setTimeout(function(){ if(lq('catPaw')) lq('catPaw').style.display='none'; }, 2000);
          }
        }

        /* ── BLINK ── */
        function loginStartBlink() {
          loginBlinkInterval = setInterval(loginBlinkOnce, 2800 + Math.random()*2000);
        }
        function loginBlinkOnce() {
          if(lq('blinkLeft')) lq('blinkLeft').style.display  = 'block';
          if(lq('blinkRight')) lq('blinkRight').style.display = 'block';
          setTimeout(function(){
            if(lq('blinkLeft')) lq('blinkLeft').style.display  = 'none';
            if(lq('blinkRight')) lq('blinkRight').style.display = 'none';
          }, 120);
        }

        /* ── WAG TAIL ── */
        function loginWagTail(cycles) {
          if (loginTailInterval) clearInterval(loginTailInterval);
          var count = 0, max = cycles * 2;
          loginTailInterval = setInterval(function() {
            count++;
            if(lq('catTail')) lq('catTail').style.transform = count % 2 === 0 ? 'rotate(15deg)' : 'rotate(-15deg)';
            if (count >= max) {
              clearInterval(loginTailInterval);
              if(lq('catTail')) lq('catTail').style.transform = 'rotate(0deg)';
            }
          }, 140);
        }

        /* ── HEART FLOAT ── */
        function loginShowHeart() {
          var h = lq('catHeart');
          if(!h) return;
          h.style.display   = 'block';
          h.style.opacity   = '1';
          h.style.transform = 'translateY(0px)';
          var start = null;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / 1200, 1);
            h.style.opacity   = p < 0.5 ? (p*2).toFixed(2) : ((1-p)*2).toFixed(2);
            h.style.transform = 'translateY(' + (-p*12) + 'px)';
            if (p < 1) requestAnimationFrame(step);
            else { h.style.display='none'; h.style.opacity='0'; }
          }
          requestAnimationFrame(step);
        }

        /* ── CAT PAT (tap the cat) ── */
        window.catPat = function() {
          loginShowHeart();
          loginBlinkOnce();
          loginWagTail(1);
        };

        /* ── CONFETTI ── */
        function loginShowConfetti() {
          var wrap = lq('confettiWrap');
          if(!wrap) return;
          wrap.innerHTML = '';
          var colors = ['#d4f56a','#e8a0a8','#a0c8e8','#f0c070','#a8e8c0','#e8a0f0'];
          for (var i = 0; i < 14; i++) {
            var d = document.createElement('div');
            var size = 5 + Math.random()*4;
            d.style.cssText = [
              'position:absolute',
              'width:'+size+'px',
              'height:'+size+'px',
              'border-radius:50%',
              'background:'+colors[i%colors.length],
              'left:'+(10+Math.random()*160)+'px',
              'top:0px',
              'opacity:0',
              'animation:conffall '+(0.8+Math.random()*0.6)+'s '+(Math.random()*0.4)+'s ease-out forwards'
            ].join(';');
            wrap.appendChild(d);
          }
        }

        })();
      `;
      document.body.appendChild(script);
    }

    // Call init when component mounts
    if (window.loginInit) {
      window.loginInit();
    }

    return () => {
      if (window.loginCleanup) {
        window.loginCleanup();
      }
    };
  }, [onNext]);

  return (
    <motion.div
      key="step-login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col font-sans"
      dangerouslySetInnerHTML={{
        __html: `
        <div id="screen-login" style="background:#0c0c10; height:100%; overflow-y:auto; padding:20px 16px 24px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <!-- CAT SVG -->
          <div id="catWrap" style="position:relative; margin-bottom:16px;">
            <svg id="catSvg" viewBox="0 0 120 120" width="100" height="100" style="cursor:pointer; display:block;" onclick="catPat()">

              <!-- TAIL -->
              <g id="catTail" style="transform-origin:30px 95px; transform:rotate(0deg);">
                <path d="M30 95 Q10 85 15 70 Q20 55 35 60" fill="none" stroke="#c8a882" stroke-width="9" stroke-linecap="round"/>
              </g>

              <!-- BODY -->
              <ellipse cx="60" cy="80" rx="32" ry="28" fill="#d4b896"/>
              <ellipse cx="60" cy="80" rx="20" ry="18" fill="#f0dcc8"/>

              <!-- EARS -->
              <g id="catLeftEar" style="transform-origin:38px 52px;">
                <path d="M38 52 L28 30 L52 44 Z" fill="#d4b896"/>
                <path d="M38 52 L33 38 L48 47 Z" fill="#e8a0a8"/>
              </g>
              <g id="catRightEar" style="transform-origin:82px 52px;">
                <path d="M82 52 L92 30 L68 44 Z" fill="#d4b896"/>
                <path d="M82 52 L87 38 L72 47 Z" fill="#e8a0a8"/>
              </g>

              <!-- HEAD -->
              <ellipse cx="60" cy="68" rx="28" ry="22" fill="#d4b896"/>
              <ellipse cx="60" cy="68" rx="18" ry="14" fill="#f0dcc8"/>

              <!-- LEFT EYE -->
              <g id="catEyeLeft">
                <ellipse cx="47" cy="63" rx="7" ry="7.5" fill="#2a1a0a"/>
                <ellipse cx="47" cy="63" rx="5" ry="5.5" fill="#1a0a00"/>
                <circle cx="50" cy="60" r="2" fill="white" opacity="0.9"/>
                <ellipse id="blinkLeft" cx="47" cy="63" rx="7" ry="0.5" fill="#d4b896" style="display:none;"/>
              </g>

              <!-- RIGHT EYE -->
              <g id="catEyeRight">
                <ellipse cx="73" cy="63" rx="7" ry="7.5" fill="#2a1a0a"/>
                <ellipse cx="73" cy="63" rx="5" ry="5.5" fill="#1a0a00"/>
                <circle cx="76" cy="60" r="2" fill="white" opacity="0.9"/>
                <ellipse id="blinkRight" cx="73" cy="63" rx="7" ry="0.5" fill="#d4b896" style="display:none;"/>
              </g>

              <!-- EYE COVERS (paws over eyes) -->
              <path id="coverLeft" d="M34 54 Q47 48 60 54 Q47 70 34 54Z" fill="#b89070" style="display:none;"/>
              <path id="coverRight" d="M60 54 Q73 48 86 54 Q73 70 60 54Z" fill="#b89070" style="display:none;"/>

              <!-- NOSE -->
              <ellipse cx="60" cy="74" rx="5" ry="3.5" fill="#e8a0a8"/>

              <!-- MOUTH -->
              <path d="M60 77.5 Q53 82 48 80" fill="none" stroke="#8a6050" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M60 77.5 Q67 82 72 80" fill="none" stroke="#8a6050" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M60 77.5 L60 80" fill="none" stroke="#8a6050" stroke-width="1.3" stroke-linecap="round"/>

              <!-- WHISKERS -->
              <line x1="45" y1="72" x2="22" y2="67" stroke="#8a6050" stroke-width="1" opacity="0.6"/>
              <line x1="45" y1="74" x2="22" y2="74" stroke="#8a6050" stroke-width="1" opacity="0.6"/>
              <line x1="45" y1="76" x2="22" y2="81" stroke="#8a6050" stroke-width="1" opacity="0.6"/>
              <line x1="75" y1="72" x2="98" y2="67" stroke="#8a6050" stroke-width="1" opacity="0.6"/>
              <line x1="75" y1="74" x2="98" y2="74" stroke="#8a6050" stroke-width="1" opacity="0.6"/>
              <line x1="75" y1="76" x2="98" y2="81" stroke="#8a6050" stroke-width="1" opacity="0.6"/>

              <!-- PAW (success state) -->
              <g id="catPaw" style="display:none; transform-origin:28px 95px;">
                <ellipse cx="28" cy="95" rx="10" ry="7" fill="#d4b896"/>
                <ellipse cx="24" cy="97" rx="4" ry="3" fill="#f0dcc8"/>
                <ellipse cx="32" cy="97" rx="4" ry="3" fill="#f0dcc8"/>
              </g>

              <!-- HEART (floating, pat/success) -->
              <text id="catHeart" x="60" y="30" text-anchor="middle" font-size="16" fill="#e8a0a8" style="display:none; opacity:0;">♥</text>

            </svg>

            <!-- CONFETTI CONTAINER -->
            <div id="confettiWrap" style="position:absolute; top:0; left:50%; transform:translateX(-50%); width:180px; height:60px; pointer-events:none; overflow:visible;"></div>
          </div>

          <!-- SUB-STEP A: PHONE ENTRY -->
          <div id="loginStepA" style="width:100%;">
            <div style="font-size:17px; font-weight:500; color:#fff; text-align:center; margin-bottom:4px; font-family:'DM Serif Display', Georgia, serif;">What's your number?</div>
            <div style="font-size:12px; color:rgba(255,255,255,0.35); text-align:center; margin-bottom:18px; line-height:1.5;">No passwords, ever. The cat will verify you.</div>

            <div style="font-size:9px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:6px;">Phone number</div>

            <div id="phoneRow" style="display:flex; align-items:center; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; overflow:hidden; height:46px; transition:border-color 0.2s, background 0.2s;">
              <div style="display:flex; align-items:center; gap:4px; padding:0 10px; height:100%; border-right:1px solid rgba(255,255,255,0.07); flex-shrink:0; cursor:pointer;" onclick="cycleCountry()">
                <span id="countryFlag" style="font-size:14px;">🇮🇳</span>
                <span id="countryCode" style="font-size:12px; color:rgba(255,255,255,0.55);">+91</span>
                <span style="border-left:3px solid transparent; border-right:3px solid transparent; border-top:4px solid rgba(255,255,255,0.35); margin-left:2px;"></span>
              </div>
              <input id="phoneInput" type="tel" placeholder="98765 43210" maxlength="12"
                style="flex:1; background:transparent; border:none; outline:none; font-size:14px; color:#fff; padding:0 12px; height:100%; font-family:inherit;"
                oninput="onPhoneInput()"
                onfocus="onPhoneFocus()"
                onblur="onPhoneBlur()"
              />
            </div>

            <div id="phoneErr" style="display:none; align-items:center; gap:5px; margin-top:6px;">
              <div style="width:5px; height:5px; border-radius:50%; background:rgba(218,80,80,0.8); flex-shrink:0;"></div>
              <span style="font-size:11px; color:rgba(218,80,80,0.85);">Enter a valid 10-digit mobile number</span>
            </div>

            <button id="sendOtpBtn" onclick="sendOtp()"
              style="width:100%; height:46px; border-radius:12px; border:none; background:#fff; color:#0c0c10; font-size:14px; font-weight:500; cursor:pointer; margin-top:16px; opacity:0.3; pointer-events:none; display:flex; align-items:center; justify-content:center; gap:8px; font-family:inherit; transition:opacity 0.15s;">
              Send OTP
            </button>

            <div style="margin-top:14px; text-align:center; font-size:11px; color:rgba(255,255,255,0.18); line-height:1.6;">
              By continuing you agree to our
              <span style="color:rgba(255,255,255,0.4); text-decoration:underline; cursor:pointer;">Terms</span> &
              <span style="color:rgba(255,255,255,0.4); text-decoration:underline; cursor:pointer;">Privacy</span>
            </div>
          </div>

          <!-- SUB-STEP B: OTP ENTRY -->
          <div id="loginStepB" style="width:100%; display:none;">
            <div style="display:flex; align-items:center; gap:5px; margin-bottom:16px; cursor:pointer;" onclick="goBackToPhone()">
              <div style="width:9px; height:9px; border-left:1.5px solid rgba(255,255,255,0.4); border-bottom:1.5px solid rgba(255,255,255,0.4); transform:rotate(45deg); margin-left:3px;"></div>
              <span style="font-size:12px; color:rgba(255,255,255,0.4);">Change number</span>
            </div>

            <div style="font-size:17px; font-weight:500; color:#fff; margin-bottom:4px; font-family:'DM Serif Display', Georgia, serif;">Enter the code</div>
            <div id="maskedNum" style="font-size:12px; color:rgba(255,255,255,0.4); margin-bottom:18px; line-height:1.5;"></div>

            <input id="otpHidden" type="number" maxlength="6"
              style="position:absolute; opacity:0; width:1px; height:1px; pointer-events:none;"
              oninput="onOtpInput()"
              onkeydown="onOtpKey(event)"
            />

            <div id="otpBoxRow" style="display:flex; gap:6px; margin-bottom:8px; cursor:pointer;" onclick="focusOtp()">
              <div class="otp-box" id="ob0"></div>
              <div class="otp-box" id="ob1"></div>
              <div class="otp-box" id="ob2"></div>
              <div class="otp-box" id="ob3"></div>
              <div class="otp-box" id="ob4"></div>
              <div class="otp-box" id="ob5"></div>
            </div>

            <div id="otpErr" style="display:none; align-items:center; gap:5px; margin-bottom:8px;">
              <div style="width:5px; height:5px; border-radius:50%; background:rgba(218,80,80,0.8); flex-shrink:0;"></div>
              <span id="otpErrTxt" style="font-size:11px; color:rgba(218,80,80,0.85);"></span>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <span id="resendTimer" style="font-size:11px; color:rgba(255,255,255,0.25);">Resend in 0:30</span>
              <span id="resendBtn" style="font-size:11px; color:rgba(255,255,255,0.25); text-decoration:underline; cursor:pointer; pointer-events:none;" onclick="resendOtp()">Resend OTP</span>
            </div>

            <button id="verifyBtn" onclick="verifyOtp()"
              style="width:100%; height:46px; border-radius:12px; border:none; background:#fff; color:#0c0c10; font-size:14px; font-weight:500; cursor:pointer; opacity:0.3; pointer-events:none; display:flex; align-items:center; justify-content:center; gap:8px; font-family:inherit; transition:opacity 0.15s;">
              Verify
            </button>

            <div style="margin-top:10px; text-align:center; font-size:10px; color:rgba(255,255,255,0.2);">Hint: the code is <span style="color:rgba(255,255,255,0.4);">482901</span></div>
          </div>

          <!-- SUB-STEP C: SUCCESS -->
          <div id="loginStepC" style="width:100%; display:none; flex-direction:column; align-items:center; text-align:center; padding:8px 0;">
            <div style="width:52px; height:52px; border-radius:50%; background:rgba(78,175,107,0.1); border:1.5px solid rgba(78,175,107,0.3); display:flex; align-items:center; justify-content:center; margin-bottom:14px;">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <polyline points="4,11 9,16 18,6" stroke="rgba(78,175,107,0.9)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div style="font-size:18px; font-weight:500; color:#fff; margin-bottom:6px; font-family:'DM Serif Display', Georgia, serif;">You're in 🎉</div>
            <div style="font-size:12px; color:rgba(255,255,255,0.35); margin-bottom:20px; line-height:1.5;">Welcome to Vibe. The cat approves.</div>
            <div style="width:100%; height:3px; background:rgba(255,255,255,0.07); border-radius:2px; overflow:hidden; margin-bottom:6px;">
              <div id="redirBar" style="height:100%; width:0%; background:rgba(212,245,106,0.6); border-radius:2px; transition:width 0.6s linear;"></div>
            </div>
            <div style="font-size:10px; color:rgba(255,255,255,0.25);">Taking you to your first post...</div>
          </div>

        </div>
      `}}
    />
  );
};

const ReelSimulator = () => {
  const containerRef = useRef(null);

  const [step, setStep] = useState(0);
  const [thoughtText, setThoughtText] = useState("");
  const [audienceIndex, setAudienceIndex] = useState(0);
  const [selectedMood, setSelectedMood] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
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
            {step === 0 && (
              <LoginStep
                key="step-login"
                onNext={() => setStep(1)}
              />
            )}
            {step === 1 && (
              <ComposeStep
                key="step-compose"
                thoughtText={thoughtText}
                setThoughtText={setThoughtText}
                audienceIndex={audienceIndex}
                setAudienceIndex={setAudienceIndex}
                selectedMood={selectedMood}
                setSelectedMood={setSelectedMood}
                isAnonymous={isAnonymous}
                setIsAnonymous={setIsAnonymous}
                selectedVibe={selectedVibe}
                selectedMusic={selectedMusic}
                onAddVibe={() => setStep(2)}
                onNext={() => {
                  if (selectedVibe && selectedMusic) {
                    console.log("Posting...", { thoughtText, audienceIndex, selectedMood, isAnonymous, selectedVibe, selectedMusic });
                  } else {
                    setStep(2);
                  }
                }}
                onCancel={() => {
                  setThoughtText("");
                  setSelectedVibe(null);
                  setSelectedMusic(null);
                }}
              />
            )}
            {step === 2 && (
              <SelectorStep
                key="step-vibe"
                stepId={2}
                title="Choose a vibe"
                data={vibeData}
                categories={vibeCategories}
                selectedItem={selectedVibe}
                onSelect={setSelectedVibe}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
                bottomLabel="Vibe"
              />
            )}
            {step === 3 && (
              <MusicStep
                key="step-music"
                stepId={3}
                selectedVibe={selectedVibe}
                selectedVibeCategory={vibeData.find(s => s.items.some(i => i.id === selectedVibe?.id) || s.extraItems?.some(i => i.id === selectedVibe?.id))?.category}
                data={musicData}
                categories={musicCategories}
                selectedMusic={selectedMusic}
                onSelectMusic={setSelectedMusic}
                onNext={() => setStep(1)}
                onBack={() => setStep(2)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ReelSimulator;
