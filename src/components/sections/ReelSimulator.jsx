import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp } from 'lucide-react';

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

const categories = ["All", "Nature", "Dark & Moody", "Urban", "Avengers", "Harry Potter", "Death Note", "Demon Slayer", "Prince of Persia", "Stranger Things", "Game of Thrones"];

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
          <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md">
            <Check size={12} strokeWidth={3} className="text-[#0c0c10]" />
          </div>
        </>
      )}
    </div>
  )
};

const ReelSimulator = () => {
  const containerRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  const handleCategoryExpand = (catId) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const handleToggle = (item) => {
    if (selectedImage?.id === item.id) {
      setSelectedImage(null);
    } else {
      setSelectedImage(item);
    }
  };

  const visibleData = activeCategory === 'All'
    ? vibeData
    : vibeData.filter(d => d.category === activeCategory);

  return (
    <section className="container mx-auto px-6 py-24 flex flex-col lg:flex-row-reverse items-center justify-center gap-16 lg:gap-24 overflow-hidden scroll-mt-10" id="feed" ref={containerRef}>

      {/* Right Side Content */}
      <div className="flex-1 text-center lg:text-left space-y-8 max-w-xl z-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold border border-indigo-100">
          <Sparkles size={16} /> Visual First
        </div>
        <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
          Choose a <br /><span className="text-gradient">Vibe</span>
        </h2>
        <p className="text-xl text-gray-500 font-medium">
          Set the perfect mood before posting your thoughts. Browse through curated aesthetics and pick a background that matches your energy.
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
          {/* Dynamic Island Mockup (Optional but keeps it feeling like a phone) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-3">
            <div className="w-2 h-2 bg-green-500 rounded-full opacity-0" />
            <div className="w-2 h-2 bg-white/20 rounded-full" />
          </div>

          {/* Top Navigation Bar */}
          <div className="pt-12 pb-3 px-4 flex items-center justify-between z-10 shrink-0">
            <button className="w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <h3 className="text-white font-medium text-[15px]">Choose a vibe</h3>
            <button className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 ${selectedImage ? 'bg-white border-white' : 'bg-transparent border-[1.5px] border-white/15'}`}>
              <Check size={18} strokeWidth={selectedImage ? 3 : 2} className={selectedImage ? 'text-[#0c0c10]' : 'text-white/30'} />
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
                      <VibeCard
                        item={section.items[0]}
                        isSelected={selectedImage?.id === section.items[0].id}
                        onToggle={handleToggle}
                        className="w-[118px] h-[196px] shrink-0"
                      />
                      <div className="flex flex-col gap-2 flex-1">
                        <VibeCard
                          item={section.items[1]}
                          isSelected={selectedImage?.id === section.items[1].id}
                          onToggle={handleToggle}
                          className="h-[94px]"
                        />
                        <VibeCard
                          item={section.items[2]}
                          isSelected={selectedImage?.id === section.items[2].id}
                          onToggle={handleToggle}
                          className="h-[94px]"
                        />
                      </div>
                    </div>
                  )}

                  {section.category === 'Dark & Moody' && (
                    <div className="grid grid-cols-3 gap-2">
                      {section.items.map(item => (
                        <VibeCard
                          key={item.id}
                          item={item}
                          isSelected={selectedImage?.id === item.id}
                          onToggle={handleToggle}
                          className="h-[168px]"
                        />
                      ))}
                    </div>
                  )}

                  {section.category === 'Abstract' && (
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-2 flex-1">
                        <VibeCard item={section.items[0]} isSelected={selectedImage?.id === section.items[0].id} onToggle={handleToggle} className="h-[116px]" />
                        <VibeCard item={section.items[1]} isSelected={selectedImage?.id === section.items[1].id} onToggle={handleToggle} className="h-[116px]" />
                      </div>
                      <VibeCard item={section.items[2]} isSelected={selectedImage?.id === section.items[2].id} onToggle={handleToggle} className="w-[130px] h-[240px] shrink-0" />
                    </div>
                  )}

                  {section.category === 'Minimal' && (
                    <div className="grid grid-cols-3 gap-2">
                      {section.items.map(item => (
                        <VibeCard key={item.id} item={item} isSelected={selectedImage?.id === item.id} onToggle={handleToggle} className="h-[128px]" />
                      ))}
                    </div>
                  )}

                  {section.category === 'Urban' && (
                    <div className="flex gap-2">
                      <VibeCard item={section.items[0]} isSelected={selectedImage?.id === section.items[0].id} onToggle={handleToggle} className="w-[130px] h-[200px] shrink-0" />
                      <div className="flex flex-col gap-2 flex-1">
                        <VibeCard item={section.items[1]} isSelected={selectedImage?.id === section.items[1].id} onToggle={handleToggle} className="h-[96px]" />
                        <VibeCard item={section.items[2]} isSelected={selectedImage?.id === section.items[2].id} onToggle={handleToggle} className="h-[96px]" />
                      </div>
                    </div>
                  )}

                  {section.category === 'Avengers' && (
                    <div className="flex gap-2">
                      <VibeCard item={section.items[0]} isSelected={selectedImage?.id === section.items[0].id} onToggle={handleToggle} className="w-[118px] h-[196px] shrink-0" />
                      <div className="flex flex-col gap-2 flex-1">
                        <VibeCard item={section.items[1]} isSelected={selectedImage?.id === section.items[1].id} onToggle={handleToggle} className="h-[94px]" />
                        <VibeCard item={section.items[2]} isSelected={selectedImage?.id === section.items[2].id} onToggle={handleToggle} className="h-[94px]" />
                      </div>
                    </div>
                  )}

                  {section.category === 'Harry Potter' && (
                    <div className="grid grid-cols-3 gap-2">
                      {section.items.map(item => (
                        <VibeCard key={item.id} item={item} isSelected={selectedImage?.id === item.id} onToggle={handleToggle} className="h-[168px]" />
                      ))}
                    </div>
                  )}

                  {section.category === 'Death Note' && (
                    <div className="grid grid-cols-3 gap-2">
                      {section.items.map(item => (
                        <VibeCard key={item.id} item={item} isSelected={selectedImage?.id === item.id} onToggle={handleToggle} className="h-[168px]" />
                      ))}
                    </div>
                  )}

                  {section.category === 'Demon Slayer' && (
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-2 flex-1">
                        <VibeCard item={section.items[0]} isSelected={selectedImage?.id === section.items[0].id} onToggle={handleToggle} className="h-[116px]" />
                        <VibeCard item={section.items[1]} isSelected={selectedImage?.id === section.items[1].id} onToggle={handleToggle} className="h-[116px]" />
                      </div>
                      <VibeCard item={section.items[2]} isSelected={selectedImage?.id === section.items[2].id} onToggle={handleToggle} className="w-[130px] h-[240px] shrink-0" />
                    </div>
                  )}

                  {section.category === 'Prince of Persia' && (
                    <div className="flex gap-2">
                      <VibeCard item={section.items[0]} isSelected={selectedImage?.id === section.items[0].id} onToggle={handleToggle} className="w-[130px] h-[200px] shrink-0" />
                      <div className="flex flex-col gap-2 flex-1">
                        <VibeCard item={section.items[1]} isSelected={selectedImage?.id === section.items[1].id} onToggle={handleToggle} className="h-[96px]" />
                        <VibeCard item={section.items[2]} isSelected={selectedImage?.id === section.items[2].id} onToggle={handleToggle} className="h-[96px]" />
                      </div>
                    </div>
                  )}

                  {section.category === 'Stranger Things' && (
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-2 flex-1">
                        <VibeCard item={section.items[0]} isSelected={selectedImage?.id === section.items[0].id} onToggle={handleToggle} className="h-[116px]" />
                        <VibeCard item={section.items[1]} isSelected={selectedImage?.id === section.items[1].id} onToggle={handleToggle} className="h-[116px]" />
                      </div>
                      <VibeCard item={section.items[2]} isSelected={selectedImage?.id === section.items[2].id} onToggle={handleToggle} className="w-[130px] h-[240px] shrink-0" />
                    </div>
                  )}

                  {section.category === 'Game of Thrones' && (
                    <div className="flex gap-2">
                      <VibeCard item={section.items[0]} isSelected={selectedImage?.id === section.items[0].id} onToggle={handleToggle} className="w-[118px] h-[196px] shrink-0" />
                      <div className="flex flex-col gap-2 flex-1">
                        <VibeCard item={section.items[1]} isSelected={selectedImage?.id === section.items[1].id} onToggle={handleToggle} className="h-[94px]" />
                        <VibeCard item={section.items[2]} isSelected={selectedImage?.id === section.items[2].id} onToggle={handleToggle} className="h-[94px]" />
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
                              isSelected={selectedImage?.id === item.id}
                              onToggle={handleToggle}
                              className="h-[120px]"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Dropdown Blur Overlay */}
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
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="border-t-[0.5px] border-white/10 px-4 pt-[10px] pb-[22px] flex items-center gap-3 shrink-0 bg-[#0c0c10]">
            <div
              className="w-[36px] h-[36px] rounded-lg border border-white/10 transition-all duration-300"
              style={{
                backgroundColor: selectedImage ? selectedImage.bg : 'transparent',
                opacity: selectedImage ? 1 : 0.3
              }}
            />
            <div className="flex flex-col flex-1 justify-center">
              <span className="text-[10px] text-white/35 leading-tight">Vibe</span>
              {selectedImage ? (
                <span className="text-[13px] font-medium text-white leading-tight mt-[2px]">{selectedImage.name}</span>
              ) : (
                <span className="text-[12px] text-white/30 italic leading-tight mt-[2px]">None selected</span>
              )}
            </div>
            <button className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${selectedImage ? 'bg-white border-white' : 'bg-transparent border-[1.5px] border-white/15'}`}>
              <Check size={18} strokeWidth={selectedImage ? 3 : 2} className={selectedImage ? 'text-[#0c0c10]' : 'text-white/30'} />
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ReelSimulator;
