import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <div className="container mx-auto px-6 pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[90vh]">
      <div className="flex-1 text-center lg:text-left space-y-8 max-w-3xl mx-auto lg:mx-0 z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-800 px-5 py-2 rounded-full text-sm font-bold shadow-sm"
        >
          <Sparkles size={16} className="text-indigo-500" />
          <span>The next generation of anonymous social</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black text-gray-900 leading-[1.1] tracking-tight"
        >
          Anonymous <span className="text-gradient">Chat.</span><br />
          Transformed into Content.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto lg:mx-0"
        >
          The first platform where your secret interactions become viral reels. Express fearlessly, build your streak, and earn legendary status.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6"
        >
          <button className="bg-gray-900 border border-gray-700 text-white px-8 py-3 rounded-[1rem] bouncy-hover bouncy-tap flex items-center justify-center gap-3 shadow-xl shadow-gray-900/20 text-left min-w-[200px]">
             <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none mb-1">Download on the</span>
                <span className="text-lg font-black leading-none">App Store</span>
             </div>
          </button>
          <button className="bg-white border border-gray-200 text-gray-900 px-8 py-3 rounded-[1rem] bouncy-hover bouncy-tap flex items-center justify-center gap-3 shadow-md text-left min-w-[200px]">
             <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold leading-none mb-1">Get it on</span>
                <span className="text-lg font-black leading-none">Google Play</span>
             </div>
          </button>
        </motion.div>
      </div>

      <div className="flex-1 relative z-10 w-full max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="relative w-full aspect-[9/19] bg-black rounded-[3rem] border-[12px] border-gray-900 shadow-2xl overflow-hidden perspective-1000 ring-1 ring-white/10"
        >
          {/* Mock Mobile UI */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col justify-end p-6">
            
            {/* Reel Header */}
            <div className="absolute top-8 left-6 right-6 flex justify-between items-center text-white z-20">
              <span className="font-bold text-lg text-shadow-sm">For You</span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                 <Sparkles size={16} />
              </div>
            </div>

            {/* Content area */}
            <div className="relative z-10 space-y-4 mb-4">
               <motion.div 
                 initial={{ y: 50, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.6, duration: 0.5 }}
                 className="bg-white/20 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/40 shadow-lg"
               >
                 <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-neon-coral animate-pulse" />
                   Anonymous asked
                 </p>
                 <p className="text-white text-lg font-medium leading-snug">"What's one thing you're too afraid to tell anyone?"</p>
               </motion.div>
               
               <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full border-2 border-white/50 bg-gradient-to-tr from-yellow-400 to-pink-500 shadow-md" />
                 <div>
                   <p className="text-white font-bold leading-tight">@mystik_creator</p>
                   <p className="text-white/80 text-sm">Replying to anonymous</p>
                 </div>
               </div>
            </div>
            
            {/* Actions */}
            <div className="absolute right-4 bottom-1/4 space-y-6 z-20">
               {[1,2,3].map(i => (
                 <div key={i} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg"></div>
               ))}
            </div>

          </div>

          {/* iPhone Notch */}
          <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-30">
            <div className="w-1/3 h-full bg-gray-900 rounded-b-2xl"></div>
          </div>
        </motion.div>
        
        {/* Floating elements for 3D feel */}
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -top-10 -right-8 w-24 h-24 bg-white/60 backdrop-blur-2xl rounded-3xl border border-white shadow-xl flex items-center justify-center z-20"
        >
          <span className="text-3xl">🤫</span>
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-1/2 -left-12 w-20 h-20 bg-white/60 backdrop-blur-2xl rounded-full border border-white shadow-xl flex items-center justify-center z-20"
        >
          <span className="text-2xl text-indigo-500 font-black">10K</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
