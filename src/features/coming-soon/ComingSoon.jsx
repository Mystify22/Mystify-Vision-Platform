import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const ComingSoon = () => {
  return (
    <section className="container mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center text-center min-h-[80vh] relative z-10" id="coming-soon">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2.5 rounded-full text-sm font-bold border border-indigo-100 mb-8"
      >
        <Sparkles size={16} className="animate-pulse" /> Now in Private Beta
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tight leading-[1.05] max-w-4xl mx-auto"
      >
        The Art of <br /><span className="text-gradient">Anonymity.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-gray-500 font-medium max-w-2xl mx-auto mt-6 leading-relaxed"
      >
        Discover a premium social experience where raw thoughts meet cinematic design. Turn your most intriguing secrets into visually stunning, shareable masterpieces. A new era of fearless expression is arriving soon on iOS and Android.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
      >
        <button className="bg-gray-900 border border-gray-700 text-white px-8 py-3 rounded-2xl bouncy-hover bouncy-tap flex items-center justify-center gap-3 shadow-xl shadow-gray-900/20 text-left min-w-[200px]">
          <div className="flex flex-col text-center">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none mb-1">Coming Soon on the</span>
            <span className="text-lg font-black leading-none">App Store</span>
          </div>
        </button>
        <button className="bg-white border border-gray-200 text-gray-900 px-8 py-3 rounded-2xl bouncy-hover bouncy-tap flex items-center justify-center gap-3 shadow-md text-left min-w-[200px]">
          <div className="flex flex-col text-center">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold leading-none mb-1">Coming Soon on</span>
            <span className="text-lg font-black leading-none">Google Play</span>
          </div>
        </button>
      </motion.div>
    </section>
  );
};

export default ComingSoon;
