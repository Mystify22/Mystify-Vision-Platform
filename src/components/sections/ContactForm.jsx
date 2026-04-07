import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, User, MessageSquare } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate network request
    setTimeout(() => setIsSubmitted(true), 600);
  };

  return (
    <section className="container mx-auto px-6 py-24 scroll-mt-10 relative z-10" id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-6 shadow-sm border border-indigo-100">
            <Mail className="text-indigo-600" size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-gray-500 font-medium mt-4 text-lg max-w-lg mx-auto">
            Have a question, partnership idea, or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        <motion.div 
          layout
          className="glass-panel p-8 md:p-12 relative overflow-hidden shadow-xl shadow-indigo-100/40"
        >
          {/* Decorative blur */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-300/30 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-300/30 blur-[80px] rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit} 
                className="space-y-6 relative z-10"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe" 
                        className="w-full pl-11 pr-4 py-4 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-400" />
                      </div>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com" 
                        className="w-full pl-11 pr-4 py-4 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                  <div className="relative">
                    <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                      <MessageSquare size={18} className="text-gray-400" />
                    </div>
                    <textarea 
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      placeholder="How can we help you?" 
                      rows={5}
                      className="w-full pl-11 pr-4 py-4 bg-white/80 border border-gray-200 rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-sm resize-none"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full font-bold text-lg bouncy-hover bouncy-tap shadow-xl shadow-gray-900/20 flex items-center justify-center gap-3 ml-auto"
                  >
                    Send Message <Send size={20} />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center relative z-10"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner border border-green-200">
                  <CheckCircle2 size={48} className="text-green-500" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3">Message Sent!</h3>
                <p className="text-gray-500 font-medium max-w-md mx-auto mb-8">
                  Thanks for reaching out, {formData.name.split(' ')[0]}. We've received your message and will get back to you shortly.
                </p>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="px-8 py-3 bg-white border border-gray-200 text-gray-800 rounded-full font-bold bouncy-hover bouncy-tap shadow-sm"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
