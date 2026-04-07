import React from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Video, Code, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full relative bg-white border-t border-gray-100 pt-24 pb-12 overflow-hidden z-20">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[3rem] p-10 md:p-14 border border-indigo-100/50 shadow-sm">
          
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h3 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">Ready to <span className="text-gradient">Mystify?</span></h3>
            <p className="text-xl text-gray-600 max-w-md mx-auto lg:mx-0 font-medium">Join over 10,000+ creators bridging the gap between anonymity and virality.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
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
            </div>
          </div>

          <div className="hidden lg:flex w-64 h-64 relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-pink-400 rounded-full blur-[80px] opacity-40 mix-blend-multiply" />
             <div className="absolute inset-4 bg-white/50 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl flex items-center justify-center flex-col gap-2 transform rotate-12">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">🔥</div>
                 <span className="font-black text-gray-800">Streak +1</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 space-y-4 pr-8 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">M</span>
                    </div>
                    <span className="text-xl font-black text-gray-900">Mystify</span>
                </div>
                <p className="text-gray-500 font-medium max-w-xs mx-auto md:mx-0">Transforming how the world asks, answers, and creates viral content.</p>
            </div>
            
            <div className="text-center md:text-left">
                <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Platform</h4>
                <ul className="space-y-4 text-gray-500 font-medium">
                    <li><a href="#" className="hover:text-indigo-600 transition-colors">Features</a></li>
                    <li><a href="#" className="hover:text-indigo-600 transition-colors">Creators</a></li>
                    <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
                </ul>
            </div>
            <div className="text-center md:text-left">
                <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Legal</h4>
                <ul className="space-y-4 text-gray-500 font-medium">
                    <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
                </ul>
            </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between pt-8 border-t border-gray-100 gap-6">
            <p className="text-gray-400 font-medium text-sm">© 2026 Mystify Platform. All rights reserved.</p>
            <div className="flex gap-4">
                {[MessageSquare, Video, Code].map((Icon, i) => (
                    <motion.a 
                        key={i}
                        href="#" 
                        whileHover={{ y: -3, color: '#4F46E5', backgroundColor: '#EEF2FF' }}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 transition-colors"
                    >
                        <Icon size={18} />
                    </motion.a>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
