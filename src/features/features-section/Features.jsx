import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Zap, Smartphone } from 'lucide-react';
import './Features.css';

const Features = () => {
  const steps = [
    {
      title: "1. Share Your Link",
      desc: "Post your unique, anonymous Mystic Link on your Instagram Story or bio to start receiving secrets.",
      icon: <Share2 size={24} className="text-white" />,
      color: "bg-gray-900"
    },
    {
      title: "2. Receive Secrets",
      desc: "Friends and followers drop anonymous confessions, questions, and thoughts directly into your secure inbox.",
      icon: <Zap size={24} className="text-indigo-600" />,
      color: "bg-indigo-50"
    },
    {
      title: "3. Create Viral Reels",
      desc: "Transform the best replies into highly produced, aesthetic reels and share them instantly back to your socials.",
      icon: <Smartphone size={24} className="text-pink-600" />,
      color: "bg-pink-50"
    }
  ];

  return (
    <section className="container mx-auto px-6 py-24 scroll-mt-10 relative z-10" id="how-it-works">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">
          How it <span className="text-gradient">Works</span>
        </h2>
        <p className="text-gray-500 font-medium mt-4 text-lg">
          Three simple steps to start turning your anonymous interactions into viral moments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`col-span-1 ${step.color} p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm ${step.color.replace('50', '200').replace('900', '800')}`}>
              {step.icon}
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-2 ${step.color === 'bg-gray-900' ? 'text-white' : 'text-gray-900'}`}>
                {step.title}
              </h3>
              <p className={`font-medium leading-relaxed ${step.color === 'bg-gray-900' ? 'text-gray-400' : 'text-gray-500'}`}>
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
