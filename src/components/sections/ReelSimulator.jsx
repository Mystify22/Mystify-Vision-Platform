import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp } from 'lucide-react';

const vibeData = [
  {
    category: "Nature",
    id: "nature",
    items: [
      { id: "nature-1", name: "Serene Mountain", bg: "#1e3a5f" },
      { id: "nature-2", name: "Valley Dusk", bg: "#1a3a2a" },
      { id: "nature-3", name: "Misty Forest", bg: "#2a2a1a" }
    ],
    extraItems: [
      { id: "nature-4", name: "Deep Lake", bg: "#152238" },
      { id: "nature-5", name: "Red Woods", bg: "#4a2e2b" },
      { id: "nature-6", name: "Golden Hour", bg: "#8a5a44" }
    ]
  },
  {
    category: "Dark & Moody",
    id: "dark-moody",
    items: [
      { id: "dark-1", name: "Mystic Aura", bg: "#2d1b4e" },
      { id: "dark-2", name: "Dark Matter", bg: "#1a1a3a" },
      { id: "dark-3", name: "Night Pulse", bg: "#3a1a2a" }
    ],
    extraItems: [
      { id: "dark-4", name: "Obsidian", bg: "#0d0d12" },
      { id: "dark-5", name: "Crimson Night", bg: "#300810" },
      { id: "dark-6", name: "Void", bg: "#1a1b26" }
    ]
  },
  {
    category: "Abstract",
    id: "abstract",
    items: [
      { id: "abstract-1", name: "Liquid Chrome", bg: "#3a1a2a" },
      { id: "abstract-2", name: "Warm Chaos", bg: "#3a2a1a" },
      { id: "abstract-3", name: "Blue Gradient", bg: "#1a2a3a" }
    ],
    extraItems: [
      { id: "abstract-4", name: "Neon Flux", bg: "#2a0845" },
      { id: "abstract-5", name: "Geometric", bg: "#112240" },
      { id: "abstract-6", name: "Fluid Ash", bg: "#2d3436" }
    ]
  },
  {
    category: "Minimal",
    id: "minimal",
    items: [
      { id: "minimal-1", name: "Pure White", bg: "#e8e4dc", isLight: true },
      { id: "minimal-2", name: "Lamp Light", bg: "#3d2b1f" },
      { id: "minimal-3", name: "Stone Cold", bg: "#1a1a3a" }
    ],
    extraItems: [
      { id: "minimal-4", name: "Soft Clay", bg: "#d4c5b9", isLight: true },
      { id: "minimal-5", name: "Graphite", bg: "#363636" },
      { id: "minimal-6", name: "Cream", bg: "#f5f5dc", isLight: true }
    ]
  },
  {
    category: "Urban",
    id: "urban",
    items: [
      { id: "urban-1", name: "City Lights", bg: "#1a2a3a" },
      { id: "urban-2", name: "Rooftop", bg: "#3d2b1f" },
      { id: "urban-3", name: "Subway", bg: "#2a2a1a" }
    ],
    extraItems: [
      { id: "urban-4", name: "Neon Signs", bg: "#3b0918" },
      { id: "urban-5", name: "Concrete", bg: "#4a4a4a" },
      { id: "urban-6", name: "Midnight Drive", bg: "#0a192f" }
    ]
  }
];

const categories = ["All", "Nature", "Dark & Moody", "Abstract", "Minimal", "Urban"];

const VibeCard = ({ item, isSelected, onToggle, className }) => {
  return (
    <div 
      onClick={() => onToggle(item)}
      className={`relative rounded-xl overflow-hidden cursor-pointer transition-transform active:scale-[0.98] ${className}`}
      style={{ backgroundColor: item.bg }}
    >
      <div 
        className="absolute inset-0" 
        style={{ 
          background: `linear-gradient(to top, rgba(0,0,0,${item.isLight ? '0.45' : '0.75'}) 0%, transparent 55%)` 
        }} 
      />
      <span className="absolute bottom-[9px] left-[10px] text-[11px] font-medium text-white">{item.name}</span>
      
      {isSelected && (
        <>
          <div className="absolute inset-0 rounded-xl border-2 border-white pointer-events-none" />
          <div className={`absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center ${item.isLight ? 'bg-[#0c0c10]' : 'bg-white'}`}>
             <Check size={12} strokeWidth={3} className={item.isLight ? 'text-white' : 'text-[#0c0c10]'} />
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
                        <VibeCard 
                          item={section.items[0]} 
                          isSelected={selectedImage?.id === section.items[0].id} 
                          onToggle={handleToggle}
                          className="h-[116px]" 
                        />
                        <VibeCard 
                          item={section.items[1]} 
                          isSelected={selectedImage?.id === section.items[1].id} 
                          onToggle={handleToggle}
                          className="h-[116px]" 
                        />
                      </div>
                      <VibeCard 
                        item={section.items[2]} 
                        isSelected={selectedImage?.id === section.items[2].id} 
                        onToggle={handleToggle}
                        className="w-[130px] h-[240px] shrink-0" 
                      />
                    </div>
                  )}

                  {section.category === 'Minimal' && (
                    <div className="grid grid-cols-3 gap-2">
                      {section.items.map(item => (
                        <VibeCard 
                          key={item.id}
                          item={item} 
                          isSelected={selectedImage?.id === item.id} 
                          onToggle={handleToggle}
                          className="h-[128px]" 
                        />
                      ))}
                    </div>
                  )}

                  {section.category === 'Urban' && (
                    <div className="flex gap-2">
                      <VibeCard 
                        item={section.items[0]} 
                        isSelected={selectedImage?.id === section.items[0].id} 
                        onToggle={handleToggle}
                        className="w-[130px] h-[200px] shrink-0" 
                      />
                      <div className="flex flex-col gap-2 flex-1">
                        <VibeCard 
                          item={section.items[1]} 
                          isSelected={selectedImage?.id === section.items[1].id} 
                          onToggle={handleToggle}
                          className="h-[96px]" 
                        />
                        <VibeCard 
                          item={section.items[2]} 
                          isSelected={selectedImage?.id === section.items[2].id} 
                          onToggle={handleToggle}
                          className="h-[96px]" 
                        />
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
