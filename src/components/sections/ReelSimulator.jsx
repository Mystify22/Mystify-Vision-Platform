import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, MessageCircle, Share2, Star, User, Sparkles } from 'lucide-react';

const ReelSimulator = () => {
  const containerRef = useRef(null);
  
  const reelData = [
    {
      question: "What's the deepest secret you've never told anyone?",
      answer: "I actually have a secret second family in another city... jk, I just eat pizza for breakfast everyday.",
      user: "mystik_dan",
      likes: "12.4K",
      comments: "842",
      shares: "1.2K",
      bgColor: "bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-700"
    },
    {
      question: "What's the most embarrassing thing you've done in public?",
      answer: "I waved back at someone who was waving to the person behind me. It's been 5 years and I'm still thinking about it.",
      user: "shadow_ninja",
      likes: "8.1K",
      comments: "321",
      shares: "450",
      bgColor: "bg-gradient-to-br from-rose-500 via-pink-600 to-orange-500"
    }
  ];

  return (
    <section className="container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 overflow-hidden scroll-mt-10" id="feed" ref={containerRef}>
        
        <div className="flex-1 text-center lg:text-left space-y-8 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-full text-sm font-bold border border-pink-100">
            <Sparkles size={16} /> Viral Potential
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
              See what's <br/><span className="text-gradient">Bubbling Up</span>
          </h2>
          <p className="text-xl text-gray-500 font-medium">
              Every reply holds the potential to go viral. The feed is curated by community streaks and genuine interactions.
          </p>

          <ul className="space-y-4 pt-6 text-left max-w-sm mx-auto lg:mx-0">
             {[
               { title: "Fluid Interactions", desc: "Swipe up to discover more secrets." },
               { title: "Rich Media", desc: "Replies are automatically converted into engaging visual formats." },
               { title: "Streak Boost", desc: "Top voted answers get a massive multiplier." }
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
        
        <div className="flex-1 w-full max-w-md mx-auto relative z-10 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-[340px] h-[720px] rounded-[3.5rem] border-[14px] border-black bg-black overflow-hidden shadow-2xl relative snap-y snap-mandatory ring-1 ring-gray-200"
            >
                {/* Dynamic Island Mockup */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-3">
                   <div className="w-2 h-2 bg-green-500 rounded-full opacity-0" /> {/* Camera indicator hidden */}
                   <div className="w-2 h-2 bg-white/20 rounded-full" />
                </div>

                {reelData.map((reel, i) => (
                    <div key={i} className={`w-full h-full snap-start relative flex flex-col justify-end p-5 ${reel.bgColor}`}>
                        
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                        <div className="relative z-10 space-y-5 pb-4">
                            
                            <motion.div 
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: false }}
                                className="bg-white/20 backdrop-blur-xl p-4 rounded-[1.5rem] border border-white/20 max-w-[85%] shadow-lg"
                            >
                                <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                    <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center"><User size={10} fill="currentColor" /></span>
                                    Anonymous
                                </p>
                                <p className="text-white font-medium leading-snug">{reel.question}</p>
                            </motion.div>

                            <motion.div 
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: false }}
                                className="bg-[#58CC02]/90 backdrop-blur-md p-4 rounded-[1.5rem] self-end border border-white/20 ml-auto max-w-[85%] shadow-lg"
                            >
                                <p className="text-white font-black text-xs mb-1">@{reel.user} replied</p>
                                <p className="text-white/95 leading-snug text-sm">{reel.answer}</p>
                            </motion.div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 shadow-sm" />
                                  <div>
                                    <p className="text-white font-bold text-sm leading-tight max-w-[120px] truncate">@{reel.user}</p>
                                    <p className="text-white/60 text-xs text-left">Original Sound</p>
                                  </div>
                              </div>
                              <button className="bg-white text-gray-900 text-xs px-4 py-2 rounded-full font-bold shadow-sm active:scale-95 transition-transform">Follow</button>
                            </div>
                        </div>

                        {/* Floating Action Buttons */}
                        <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center z-20">
                            <ActionButton 
                                icon={<Heart size={26} className="drop-shadow-sm" />}
                                activeIcon={<Heart size={26} fill="currentColor" className="text-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]" />} 
                                label={reel.likes} 
                                color="text-white hover:text-rose-400" 
                                activeColor="text-rose-500"
                            />
                            <ActionButton icon={<MessageCircle size={26} fill="currentColor" />} label={reel.comments} />
                            <ActionButton icon={<Share2 size={26} fill="currentColor" />} label={reel.shares} />
                            <ActionButton icon={<Star size={26} fill="#FFD700" />} color="text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    </section>
  );
};

const ActionButton = ({ icon, activeIcon, label, color = "text-white", activeColor }) => {
    const [isActive, setIsActive] = useState(false);
    
    return (
        <motion.button 
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => setIsActive(!isActive)}
            className={`flex flex-col items-center gap-1.5 transition-colors ${isActive && activeColor ? activeColor : color}`}
        >
            <div className={`drop-shadow-lg p-3 backdrop-blur-sm rounded-full transition-all duration-300 ${isActive && activeColor ? 'bg-rose-500/10' : 'bg-black/20'}`}>
                <motion.div
                    initial={false}
                    animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {isActive && activeIcon ? activeIcon : icon}
                </motion.div>
            </div>
            {label && (
                <span className="text-white text-[11px] font-bold drop-shadow-md text-shadow-sm">
                    {isActive && label.includes('K') ? (parseFloat(label) + 0.1).toFixed(1) + 'K' : 
                     isActive && !isNaN(label) ? parseInt(label) + 1 : label}
                </span>
            )}
        </motion.button>
    );
};

export default ReelSimulator;
