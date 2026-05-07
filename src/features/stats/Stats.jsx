import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';

const Stats = () => {
  const stats = [
    { label: "Active Users (Beta)", value: "12,500+", icon: <Users size={24} className="text-indigo-600" /> },
    { label: "Daily Active Users", value: "4,200", icon: <Activity size={24} className="text-pink-600" /> },
    { label: "TAM (Market Value)", value: "$14.5B", icon: <DollarSign size={24} className="text-green-600" /> },
    { label: "MoM Growth", value: "314%", icon: <TrendingUp size={24} className="text-blue-600" /> },
  ];

  return (
    <section className="container mx-auto px-6 py-24 scroll-mt-10 relative z-10" id="stats">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">
          By The <span className="text-gradient">Numbers</span>
        </h2>
        <p className="text-gray-500 font-medium mt-4 text-lg">
          Our early traction metrics prove strong product-market fit.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 shadow-inner border border-gray-100">
              {stat.icon}
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-2">{stat.value}</h3>
            <p className="text-gray-500 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
