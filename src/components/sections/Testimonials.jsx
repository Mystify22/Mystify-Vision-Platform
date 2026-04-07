import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  { text: "u ppl standing out from market", author: "@tech_guru" },
  { text: "it was amazing experience", author: "@anon_user_99" },
  { text: "Yeah really love it", author: "@sarah_smiles" },
  { text: "motion feature is really cool", author: "@design_junkie" },
  { text: "what i really loved it, me getting an idea of what will actually look good.", author: "@fashion_killa" },
  { text: "the apps concept is really good", author: "@startup_fan" },
  { text: "I'm already in love with mystify", author: "@mystik_dan" },
  { text: "Experience was good", author: "@shadow_ninja" },
  { text: "idea was really great thanks for bringing it", author: "@creator_x" },
  { text: "The experience is so smooth... what you have built is so much more fun", author: "@viral_king" },
];

const Testimonials = () => {
    // Duplicate the array to create a seamless infinite loop
    const marqueeItems = [...testimonials, ...testimonials];

    return (
        <section className="py-24 bg-white/40 border-y border-white/60 backdrop-blur-sm overflow-hidden relative z-10" id="testimonials">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">
                    What creators say about us
                </h2>
                <p className="text-gray-500 font-medium mt-4">Join thousands of users creating viral content daily.</p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fbfbfd] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#fbfbfd] to-transparent z-10 pointer-events-none" />
                
                <div className="flex animate-marquee group-hover:pause gap-6 whitespace-nowrap pl-6">
                    {marqueeItems.map((item, index) => (
                        <div 
                            key={index} 
                            className="glass-panel px-8 py-6 min-w-[320px] max-w-[400px] flex flex-col justify-between whitespace-normal shrink-0 transition-transform duration-300 hover:-translate-y-2"
                        >
                            <p className="text-gray-800 font-medium text-lg italic mb-4">"{item.text}"</p>
                            <p className="text-indigo-600 font-bold text-sm tracking-wide">{item.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
