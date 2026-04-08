import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Sparkles, Smartphone, Share2, EyeOff } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Bank-Grade Anonymity",
      desc: "Our zero-knowledge architecture means even we don't know who is replying to your links.",
      icon: <EyeOff size={24} className="text-white" />,
      color: "bg-gray-900",
      colSpan: "col-span-1 md:col-span-2 lg:col-span-1"
    },
    {
      title: "Viral Algorithm",
      desc: "Good replies automatically get pushed to our Reel Simulator, giving creators insane reach.",
      icon: <Sparkles size={24} className="text-indigo-600" />,
      color: "bg-indigo-50",
      colSpan: "col-span-1"
    },
    {
      title: "Anti-Bully AI Filter",
      desc: "Harmful content is filtered instantly, keeping the platform fun.",
      icon: <Shield size={24} className="text-green-600" />,
      color: "bg-green-50",
      colSpan: "col-span-1"
    },
    {
      title: "Seamless IG Integration",
      desc: "One-click export exactly formatted for Instagram Stories.",
      icon: <Share2 size={24} className="text-pink-600" />,
      color: "bg-pink-50",
      colSpan: "col-span-1 md:col-span-2"
    },
    {
      title: "Instant Notifications",
      desc: "Get pinged the second a juicy secret drops in your inbox.",
      icon: <Zap size={24} className="text-yellow-600" />,
      color: "bg-yellow-50",
      colSpan: "col-span-1"
    }
  ];

  return (
    <section className="container mx-auto px-6 py-24 scroll-mt-10 relative z-10" id="features">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">
          Redefining <span className="text-gradient">Q&A</span>
        </h2>
        <p className="text-gray-500 font-medium mt-4 text-lg">
          We built Mystify with everything you need to create viral moments securely.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`${feature.colSpan} ${feature.color} p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm ${feature.color.replace('50', '200').replace('900', '800')}`}>
              {feature.icon}
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-2 ${feature.color === 'bg-gray-900' ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={`font-medium leading-relaxed ${feature.color === 'bg-gray-900' ? 'text-gray-400' : 'text-gray-500'}`}>
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
