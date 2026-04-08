import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 px-6 py-4 transition-all glass-nav">
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-md group-hover:bg-indigo-600 transition-colors">
            <span className="text-white font-bold text-xl leading-none">M</span>
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tight">Mystify</span>
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-orange-50 to-red-50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border border-orange-200/50 shadow-sm transition-transform cursor-pointer"
          >
            <Flame className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-neon-coral flex-shrink-0 animate-pulse" fill="currentColor" />
            <span className="text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">
              30-Day<span className="hidden sm:inline"> Streak</span>
            </span>
          </motion.div>

          <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border border-yellow-200/50 shadow-sm cursor-pointer">
            <Trophy className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-yellow-500 flex-shrink-0" fill="currentColor" />
            <span className="text-xs sm:text-sm font-bold text-gray-800 whitespace-nowrap">
              1,000<span className="hidden sm:inline"> PTS</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
