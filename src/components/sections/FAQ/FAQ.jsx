import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "Is my identity completely anonymous?",
    answer: "Yes! We use advanced encryption to ensure that identity generation is purely deterministic to your session but never exposed to the person receiving your secret."
  },
  {
    id: 2,
    question: "How do streaks work on Mystify?",
    answer: "You earn streak points for every consecutive day you engage—whether that's asking a question or replying. Reaching a 30-day streak unlocks premium themes and platform badges."
  },
  {
    id: 3,
    question: "Can I delete a public reply?",
    answer: "Absolutely. As the creator of the link, you have full control over the reel. You can moderate, hide, or completely delete any replies on your personalized feed at any time."
  },
  {
    id: 4,
    question: "Is there a premium version?",
    answer: "Mystify is free to use. However, we're testing a 'Mystify Plus' tier for creators that offers advanced analytics, custom domain links, and verified profile checkmarks."
  },
  {
    id: 5,
    question: "How do I share my Mystic Link on Instagram?",
    answer: "Once generated, simply tap the 'Copy' button on your success screen. Open Instagram, swipe to add a Story, tap the unified 'Stickers' icon, and paste your link into the 'Link' sticker."
  }
];

const FAQAccordion = ({ item, isOpen, onClick }) => {
  return (
    <motion.div 
      className={`border border-gray-200 rounded-[1.5rem] overflow-hidden transition-colors ${isOpen ? 'bg-indigo-50/50' : 'bg-white hover:bg-gray-50'}`}
      initial={false}
    >
      <button 
        className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
        onClick={onClick}
      >
        <span className="font-bold text-gray-900 text-lg pr-4">{item.question}</span>
        <motion.div
           animate={{ rotate: isOpen ? 180 : 0 }}
           transition={{ duration: 0.3 }}
           className="w-10 h-10 rounded-full bg-indigo-100 flex flex-shrink-0 items-center justify-center"
        >
          <ChevronDown size={20} className="text-indigo-600" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-600 font-medium leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="container mx-auto px-6 py-24 scroll-mt-10 relative z-10" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 rounded-2xl mb-6 shadow-sm border border-purple-100">
            <HelpCircle className="text-purple-600" size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-500 font-medium mt-4 text-lg max-w-lg mx-auto">
            Everything you need to know about navigating the Mystify platform.
          </p>
        </div>

        <div className="space-y-4 relative">
            {/* Decorative background blurs inside max-w container */}
           <div className="absolute top-1/4 -left-12 w-32 h-32 bg-indigo-300/20 blur-[60px] rounded-full pointer-events-none" />
           <div className="absolute bottom-1/4 -right-12 w-32 h-32 bg-pink-300/20 blur-[60px] rounded-full pointer-events-none" />
           
          {faqData.map((item) => (
            <FAQAccordion 
              key={item.id} 
              item={item} 
              isOpen={openId === item.id} 
              onClick={() => toggleOpen(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
