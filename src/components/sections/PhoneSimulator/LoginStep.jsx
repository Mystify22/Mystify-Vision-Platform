import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown } from 'lucide-react';
import logoImg from '../../../assets/avatar.png';
import SpeederLoader from './SpeederLoader';

const LoginStep = ({ onNext }) => {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'success'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const otpInputRef = useRef(null);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleOtpChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(val);
    setError('');

    if (val.length === 6) {
      verifyOtp(val);
    }
  };

  const verifyOtp = (code) => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      if (code === '123456') {
        onNext();
      } else {
        setIsLoading(false);
        setError('Incorrect code. Please try again.');
        setOtp('');
        if (otpInputRef.current) otpInputRef.current.focus();
      }
    }, 1000);
  };

  // Auto-focus OTP input when entering OTP step
  useEffect(() => {
    if (step === 'otp' && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [step]);

  return (
    <motion.div
      key="step-login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 flex flex-col bg-[#1A1A1B] font-sans text-white overflow-hidden"
    >
      {/* Top Header */}
      <div className="h-14 flex items-center justify-between px-4 shrink-0">
        {step === 'otp' && (
          <button
            onClick={() => {
               setStep('phone');
               setOtp('');
               setError('');
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors"
          >
             <ChevronLeft size={26} className="text-white" />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col px-6 pt-2">
        
        {/* Reddit Style Header */}
        <div className="mb-8">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-6 overflow-hidden">
            <img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold mb-2 tracking-tight">Log in to Mystify</h1>
          <p className="text-[12px] text-[rgba(255,255,255,0.6)] leading-relaxed mt-3">
            By continuing, you agree to our <span className="underline cursor-pointer hover:text-white">User Agreement</span> and <span className="underline cursor-pointer hover:text-white">Privacy Policy</span>.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'phone' && (
            <motion.form
              key="phone-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handlePhoneSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-4 py-4 bg-[#2A3236] hover:bg-[#343D42] rounded-full cursor-pointer transition-colors duration-200">
                    <span className="text-[14px]">🇮🇳</span>
                    <span className="text-[14px] font-semibold text-white tracking-wide">+91</span>
                    <ChevronDown size={14} className="text-[rgba(255,255,255,0.5)] ml-0.5" strokeWidth={3} />
                  </div>
                  <div className="flex-1 relative flex items-center bg-[#2A3236] focus-within:bg-[#343D42] border border-transparent focus-within:border-[rgba(255,255,255,0.2)] rounded-full overflow-hidden transition-colors duration-200">
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full bg-transparent border-none outline-none text-white text-[15px] px-5 py-4 placeholder:text-[rgba(255,255,255,0.5)] font-medium tracking-wide"
                      autoFocus
                    />
                  </div>
                </div>
                {error && <span className="text-[#ff4d4d] text-[12px] px-2 mt-1 font-medium">{error}</span>}
              </div>

              <button
                type="submit"
                disabled={phone.length < 10 || isLoading}
                className="w-full bg-[#FF4500] text-white font-bold text-[15px] py-4 rounded-full mt-4 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center h-[52px]"
              >
                {isLoading ? "Sending..." : "Continue"}
              </button>
            </motion.form>
          )}

          {step === 'otp' && (
            <motion.div
              key="otp-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6 w-full"
            >
              <div>
                <p className="text-[14px] text-[rgba(255,255,255,0.8)] mb-1">Enter the 6-digit code sent to</p>
                <p className="text-[15px] font-bold text-white tracking-wide">+91 {phone}</p>
              </div>

              <div className="flex flex-col relative">
                <input
                  ref={otpInputRef}
                  type="tel"
                  value={otp}
                  onChange={handleOtpChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10"
                  autoFocus
                />
                <div className="flex gap-[8px] w-full">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-[52px] rounded-xl border flex items-center justify-center text-xl font-bold transition-all duration-200 ${otp.length === i
                        ? 'border-[#FF4500] bg-[#2A3236]'
                        : otp.length > i
                          ? 'border-[rgba(255,255,255,0.3)] bg-[#2A3236]'
                          : 'border-transparent bg-[#2A3236]'
                        }`}
                    >
                      {otp[i] || ''}
                    </div>
                  ))}
                </div>
                {error && <span className="text-[#ff4d4d] text-[12px] mt-3 font-medium">{error}</span>}
              </div>

              <div className="mt-4">
                <button
                  className="text-[13px] font-bold text-[rgba(255,255,255,0.6)] hover:text-white transition-colors"
                  onClick={() => {
                    setOtp('');
                    setError('');
                    if (otpInputRef.current) otpInputRef.current.focus();
                  }}
                >
                  Resend Code
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {isLoading && <SpeederLoader />}
    </motion.div>
  );
};

export default LoginStep;