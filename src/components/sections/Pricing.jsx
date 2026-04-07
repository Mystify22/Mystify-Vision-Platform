import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <section className="container mx-auto px-6 py-24 scroll-mt-10 relative z-10" id="pricing">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">
          Simple <span className="text-gradient">Pricing</span>
        </h2>
        <p className="text-gray-500 font-medium mt-4 text-lg">
          Start for free, upgrade when you go viral.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Tier */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm flex flex-col"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Creator</h3>
            <p className="text-gray-500">Essential tools for everyone.</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-black text-gray-900">$0</span>
              <span className="text-gray-500 font-medium">/forever</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1">
            {["Unlimited anonymous links", "Basic themes (3)", "24-hour reply storage", "Community feed access"].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-green-600" />
                </div>
                {feature}
              </li>
            ))}
          </ul>
          
          <button className="w-full py-4 rounded-full border-2 border-gray-900 text-gray-900 font-bold text-lg bouncy-hover">
            Get Started
          </button>
        </motion.div>

        {/* Pro Tier */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl">
             <div className="w-32 h-32 bg-indigo-500 rounded-full" />
          </div>
          
          <div className="mb-8 relative z-10">
            <div className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-full mb-4">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Mystify Plus</h3>
            <p className="text-gray-400">For power creators & influencers.</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-black text-white">$4.99</span>
              <span className="text-gray-400 font-medium">/month</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1 relative z-10">
            {["Everything in Creator", "Unlock all premium themes", "Unlimited reply history", "Priority feed algorithm boost", "Custom mystify.me URL"].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-indigo-400" />
                </div>
                {feature}
              </li>
            ))}
          </ul>
          
          <button className="w-full py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg bouncy-hover shadow-lg shadow-indigo-500/20 relative z-10">
            Upgrade to Plus
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
