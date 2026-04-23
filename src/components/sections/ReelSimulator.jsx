import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Lock, Coins, ArrowLeft, CheckCircle2 } from 'lucide-react';

const themeLibrary = {
  free: [
    {
      id: 'basic_abstract',
      name: 'Abstract',
      cover: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=80',
        'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&q=80'
      ]
    },
    {
      id: 'basic_nature',
      name: 'Nature',
      cover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80'
      ]
    },
    {
      id: 'basic_minimal',
      name: 'Minimal',
      cover: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&q=80',
        'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=400&q=80'
      ]
    },
    {
      id: 'basic_gradient',
      name: 'Gradient',
      cover: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80',
      images: [
        'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80'
      ]
    }
  ],
  pro: [
    {
      id: 'serene_mountain',
      name: 'Serene Mountain',
      cover: 'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775809661/flux1-schnell_serene-mountain-landscape-with_ybl5sn.png',
      price: 500,
      images: [
        'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775809661/flux1-schnell_serene-mountain-landscape-with_ybl5sn.png'
      ]
    },
    {
      id: 'mystic_aura',
      name: 'Mystic Aura',
      cover: 'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775745717/a4xtdnqfyjnrsdzevsai.jpg',
      price: 300,
      images: [
        'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775745717/a4xtdnqfyjnrsdzevsai.jpg'
      ]
    },
    {
      id: 'dark_matter',
      name: 'Dark Matter',
      cover: 'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1774609814/hofk45sailjjpwmgutlq.jpg',
      price: 400,
      images: [
        'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1774609814/hofk45sailjjpwmgutlq.jpg'
      ]
    },
    {
      id: 'golden_dusk',
      name: 'Golden Dusk',
      cover: 'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775226824/mdtt09bxffsy5gkeycjf.jpg',
      price: 600,
      images: [
        'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775226824/mdtt09bxffsy5gkeycjf.jpg'
      ]
    }
  ]
};

const ReelSimulator = () => {
  const containerRef = useRef(null);
  
  const [selectedTheme, setSelectedTheme] = useState('https://res.cloudinary.com/dyy8sqeh7/image/upload/v1776715534/stable-diffusion-xl-base-10_wide-angle-shot_3_m9y7vl.png');
  const [activeTab, setActiveTab] = useState('free');
  const [activeCategory, setActiveCategory] = useState(null);
  const [userCoins, setUserCoins] = useState(1000);
  const [unlockedProThemes, setUnlockedProThemes] = useState([]);

  const handleBuyTheme = (category) => {
    if (userCoins >= category.price) {
      setUserCoins(prev => prev - category.price);
      setUnlockedProThemes(prev => [...prev, category.id]);
    } else {
      alert("Not enough PTS!");
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const applyTheme = (imgUrl) => {
    setSelectedTheme(imgUrl);
  };

  return (
    <section className="container mx-auto px-6 py-24 flex flex-col lg:flex-row-reverse items-center justify-center gap-16 lg:gap-24 overflow-hidden scroll-mt-10" id="feed" ref={containerRef}>
        
        {/* Right Side Content */}
        <div className="flex-1 text-center lg:text-left space-y-8 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-full text-sm font-bold border border-pink-100">
            <Sparkles size={16} /> Question Themes
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
              Select Your <br/><span className="text-gradient">Aesthetic</span>
          </h2>
          <p className="text-xl text-gray-500 font-medium">
              When you create a question, customize it with a unique theme. Use the phone on the left to browse and select the perfect visual vibe for your question!
          </p>

          <ul className="space-y-4 pt-6 text-left max-w-sm mx-auto lg:mx-0">
             {[
               { title: "Categorized Themes", desc: "Choose from Spooky Vibes, Cyberpunk, Minimalist, and more." },
               { title: "Pro Unlocks", desc: "Spend your points to unlock exclusive premium backgrounds." },
               { title: "Personalized Drops", desc: "Your selected theme will be applied to your question when it hits the feed." }
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
              className="w-[340px] h-[720px] rounded-[3.5rem] border-[14px] border-black bg-[#121212] overflow-hidden shadow-2xl relative ring-1 ring-gray-200 flex flex-col"
            >
                {/* Dynamic Island Mockup */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-3">
                   <div className="w-2 h-2 bg-green-500 rounded-full opacity-0" />
                   <div className="w-2 h-2 bg-white/20 rounded-full" />
                </div>

                {/* Theme Selector Header */}
                <div className="pt-12 pb-4 px-5 flex flex-col gap-4 bg-[#1c1c1e] border-b border-white/10 z-10 shrink-0">
                    <div className="flex items-center justify-between">
                        {activeCategory ? (
                            <button onClick={() => setActiveCategory(null)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                                <ArrowLeft size={16} />
                            </button>
                        ) : (
                            <div className="w-8" />
                        )}
                        <h3 className="text-white font-bold text-lg">{activeCategory ? activeCategory.name : 'Theme Gallery'}</h3>
                        <div className="flex items-center gap-1.5 bg-yellow-500/20 text-yellow-500 px-3 py-1.5 rounded-full text-xs font-bold border border-yellow-500/30">
                            <Coins size={12} /> {userCoins}
                        </div>
                    </div>

                    {!activeCategory && (
                        <div className="flex gap-6 pt-2 border-b border-white/10 relative">
                            <button 
                                onClick={() => setActiveTab('free')}
                                className={`pb-3 text-sm font-bold transition-colors relative z-10 ${activeTab === 'free' ? 'text-indigo-400' : 'text-white/50 hover:text-white/80'}`}
                            >
                                Free
                                {activeTab === 'free' && (
                                    <motion.div layoutId="phoneTabIndicator" className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-500 rounded-t-full" />
                                )}
                            </button>
                            <button 
                                onClick={() => setActiveTab('pro')}
                                className={`pb-3 text-sm font-bold transition-colors relative z-10 flex items-center gap-1.5 ${activeTab === 'pro' ? 'text-indigo-400' : 'text-white/50 hover:text-white/80'}`}
                            >
                                Pro <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">PRO</span>
                                {activeTab === 'pro' && (
                                    <motion.div layoutId="phoneTabIndicator" className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-500 rounded-t-full" />
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative">
                    <AnimatePresence mode="wait">
                        {!activeCategory ? (
                            <motion.div 
                                key="categories"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-5 grid grid-cols-2 gap-4 pb-10"
                            >
                                {themeLibrary[activeTab].map(category => {
                                    const isPro = activeTab === 'pro';
                                    const isUnlocked = isPro ? unlockedProThemes.includes(category.id) : true;

                                    return (
                                        <div 
                                            key={category.id} 
                                            onClick={() => handleCategoryClick(category)}
                                            className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-white/10 bg-black active:scale-95 transition-transform"
                                        >
                                            <img src={category.cover} alt={category.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                            
                                            <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col text-left">
                                                <span className="text-white font-bold text-sm drop-shadow-md">{category.name}</span>
                                                {isPro && !isUnlocked && (
                                                    <span className="text-yellow-400 text-[10px] font-bold flex items-center gap-1 mt-1 bg-black/40 w-fit px-2 py-0.5 rounded-full backdrop-blur-sm border border-yellow-500/20"><Lock size={10} /> {category.price}</span>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="details"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="h-full flex flex-col p-5"
                            >
                                {activeTab === 'pro' && !unlockedProThemes.includes(activeCategory.id) ? (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                                        <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500 border border-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                                            <Lock size={32} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-white text-2xl tracking-tight">Unlock {activeCategory.name}</h4>
                                            <p className="text-white/50 text-sm mt-3 max-w-[220px] mx-auto leading-relaxed">Get exclusive access to premium animated and static backgrounds for your questions.</p>
                                        </div>
                                        <button 
                                            onClick={() => handleBuyTheme(activeCategory)}
                                            className="bg-white hover:bg-gray-200 text-black px-8 py-3.5 rounded-full text-sm font-bold shadow-xl flex items-center gap-2 transition-transform active:scale-95 mt-8 w-full justify-center"
                                        >
                                            <Coins size={18} className="text-yellow-600" /> Unlock for {activeCategory.price} PTS
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4 pb-10">
                                        {activeCategory.images.map((img, idx) => (
                                            <div 
                                                key={idx}
                                                onClick={() => applyTheme(img)}
                                                className={`relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group border-[3px] transition-all active:scale-95 ${selectedTheme === img ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'border-transparent hover:border-white/20'}`}
                                            >
                                                <img src={img} alt={`${activeCategory.name} ${idx}`} className="w-full h-full object-cover" />
                                                <div className={`absolute inset-0 bg-indigo-500/20 transition-opacity ${selectedTheme === img ? 'opacity-100' : 'opacity-0'}`} />
                                                {selectedTheme === img && (
                                                    <div className="absolute top-3 right-3 bg-indigo-500 text-white p-1.5 rounded-full shadow-lg">
                                                        <CheckCircle2 size={16} fill="white" className="text-indigo-500" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    </section>
  );
};

export default ReelSimulator;
