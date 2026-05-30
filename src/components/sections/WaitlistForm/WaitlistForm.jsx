import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const WaitlistForm = () => {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Automatically reset back to the input form after 4 seconds of success state
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        handleReset();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  // Phone number clean input constraint (digits only)
  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 15) {
      setPhone(val);
      if (errorMsg) setErrorMsg('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) {
      setErrorMsg('Please enter number.');
      return;
    }
    if (phone.length < 7 || phone.length > 15) {
      setErrorMsg('Please enter a valid mobile number (7-15 digits).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "68f49b36-f340-4538-b290-414f89c64ac1",
          phone: phone
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitSuccess(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setErrorMsg(result.message || 'Failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setPhone('');
    setSubmitSuccess(false);
    setErrorMsg('');
  };

  return (
    <section className="container mx-auto px-6 py-2 relative z-10" id="waitlist">
      {/* Aligns waitlist card to the left bounds of the content grid */}
      <div className="max-w-5xl mx-auto flex justify-start">
        
        {/* Compact Glass Panel Card */}
        <motion.div
          layout
          className="glass-panel p-4 relative overflow-hidden shadow-lg border border-gray-100/80 rounded-xl max-w-sm w-full"
        >
          {/* Subtle Glow Ambient Elements */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-neon-coral/5 blur-[40px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-lavender/10 blur-[40px] rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="relative z-10"
              >
                <h3 className="text-sm font-black text-gray-900 tracking-tight mb-0.5">
                  Join the Beta Waitlist
                </h3>
                <p className="text-gray-400 font-semibold text-[10px] mb-3 leading-relaxed">
                  Mystify is launching soon. Enter your mobile number for early access.
                </p>

                <form onSubmit={handleSubmit} className="w-full">
                  <div className="flex flex-row items-center gap-2">
                    
                    {/* Phone Input Box */}
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                        <Phone size={12} className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Mobile number"
                        className="w-full h-10 pl-8 pr-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-bold text-xs text-gray-800 shadow-sm"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-10 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg font-bold text-xs bouncy-hover bouncy-tap shadow-md flex items-center justify-center shrink-0 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <RefreshCw className="animate-spin" size={12} />
                      ) : (
                        <>Join</>
                      )}
                    </button>
                  </div>

                  {/* Error Alerts */}
                  <AnimatePresence>
                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 font-bold text-[10px] mt-1.5 pl-0.5"
                      >
                        ⚠️ {errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            ) : (
              
              /* Simple success screen aligned horizontally */
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 relative z-10 py-1"
              >
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center border border-green-100 shrink-0">
                  <CheckCircle2 size={16} className="text-green-500" strokeWidth={2.5} />
                </div>
                <div className="text-left flex-1">
                  <h4 className="text-xs font-black text-gray-900 leading-tight">Spot Reserved! 🎉</h4>
                  <p className="text-gray-400 font-semibold text-[9px] leading-relaxed mt-0.5">
                    We will text you at <span className="font-bold text-gray-700">{phone}</span> when we launch.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistForm;
