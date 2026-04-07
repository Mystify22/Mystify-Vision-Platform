import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Share2, MessageCircle, Camera, Copy, Check, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

const CreateWidget = () => {
  const [question, setQuestion] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E0C3FC', '#8EC5FC', '#FF6F61', '#58CC02']
    });

    setIsSuccess(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('mystify.me/u/rajeev');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-6 py-24 flex justify-center">
      <motion.div 
        layout
        className="w-full max-w-2xl glass p-10 md:p-14 rounded-[3rem] relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="input-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-10"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-indigo-50">
                    <MessageSquare size={32} className="text-indigo-600" />
                </div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">What's on your mind?</h2>
                <p className="text-gray-500 font-medium">Create your anonymous prompt and watch the replies roll in.</p>
              </div>

              <form onSubmit={handleGenerate} className="space-y-8">
                <div className="relative group">
                  <textarea 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Tell me a secret..."
                    className="w-full h-44 p-6 bg-white border border-gray-200 rounded-3xl text-xl placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all resize-none shadow-sm"
                  />
                  <div className="absolute bottom-4 right-6 text-sm font-semibold text-gray-300">
                    {question.length}/140
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!question.trim()}
                  className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-xl bouncy-hover bouncy-tap shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                >
                  Generate Mystic Link <Send size={24} />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-10"
            >
              <div className="space-y-4 pt-4">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/20 border-4 border-white">
                  <Check size={48} className="text-white" strokeWidth={3} />
                </div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight mt-6">Link Generated!</h2>
                <p className="text-gray-500 font-medium text-lg">Your anonymous link is ready for your bio.</p>
              </div>

              <div className="bg-white p-4 rounded-full border border-gray-200 flex items-center justify-between gap-4 shadow-sm mx-auto max-w-sm">
               <code className="text-indigo-600 font-bold text-lg px-4 select-all flex-1 text-left truncate">mystify.me/u/rajeev</code>
               <button 
                onClick={handleCopy}
                className={`p-3 rounded-full bouncy-hover bouncy-tap flex items-center justify-center transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
               >
                 {copied ? <Check size={20} /> : <Copy size={20} />}
               </button>
              </div>

              <div className="space-y-6 pt-6 border-t border-gray-100">
                <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Share to Socials</p>
                <div className="flex justify-center gap-6">
                  {[
                    { icon: <Camera size={28} />, label: 'Instagram', color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' },
                    { icon: <MessageCircle size={28} />, label: 'WhatsApp', color: 'bg-[#25D366]' },
                    { icon: <Share2 size={28} />, label: 'More Options', color: 'bg-gray-800' }
                  ].map((social, i) => (
                    <motion.button 
                      key={i}
                      whileHover={{ y: -8, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-16 h-16 ${social.color} rounded-[1.5rem] flex items-center justify-center text-white shadow-lg`}
                      title={social.label}
                    >
                      {social.icon}
                    </motion.button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => { setIsSuccess(false); setQuestion(''); }}
                className="text-gray-500 font-bold hover:text-indigo-600 transition-colors pt-4"
              >
                Create another link
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CreateWidget;
