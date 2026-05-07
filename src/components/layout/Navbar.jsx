import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 px-6 py-4 transition-all glass-nav">
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-md transition-colors flex-shrink-0">
            <span className="text-white font-bold text-xl leading-none">M</span>
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tight hidden sm:block">Mystify</span>
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 sm:gap-2 bg-indigo-50 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-indigo-100 shadow-sm transition-transform cursor-pointer"
          >
            <span className="text-[10px] xs:text-xs sm:text-sm font-bold text-indigo-600 whitespace-nowrap">
              Join Waitlist
            </span>
          </motion.div>

          <div className="flex items-center gap-1 sm:gap-2 bg-gray-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-gray-900 shadow-sm cursor-pointer hover:bg-gray-800 transition-colors">
            <span className="text-[10px] xs:text-xs sm:text-sm font-bold text-white whitespace-nowrap">
              Get Notified
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
