import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Heart, MessageCircle, Share2, User, Volume2, VolumeX, Music } from 'lucide-react';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showMutePopup, setShowMutePopup] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    }
  }, [isMuted]);

  const toggleHeart = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const toggleMute = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setIsMuted(!isMuted);
    setShowMutePopup(true);
    setTimeout(() => setShowMutePopup(false), 900);
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (email) {
      setJoined(true);
      setEmail('');
    }
  };

  return (
    <div className="container mx-auto px-6 pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[90vh]">
      <div className="flex-1 text-center lg:text-left space-y-8 max-w-3xl mx-auto lg:mx-0 z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-800 px-5 py-2 rounded-full text-sm font-bold shadow-sm"
        >
          <Sparkles size={16} className="text-indigo-500" />
          <span>The next generation of anonymous social</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black text-gray-900 leading-[1.1] tracking-tight"
        >
          Anonymous <span className="text-gradient">Chat.</span><br />
          Transformed into Content.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto lg:mx-0"
        >
          The first platform where your secret interactions become viral reels. Express fearlessly, build your streak, and earn legendary status.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6"
        >
          <button className="bg-gray-900 border border-gray-700 text-white px-8 py-3 rounded-[1rem] bouncy-hover bouncy-tap flex items-center justify-center gap-3 shadow-xl shadow-gray-900/20 text-left min-w-[200px]">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none mb-1">Download on the</span>
              <span className="text-lg font-black leading-none">App Store</span>
            </div>
          </button>
          <button className="bg-white border border-gray-200 text-gray-900 px-8 py-3 rounded-[1rem] bouncy-hover bouncy-tap flex items-center justify-center gap-3 shadow-md text-left min-w-[200px]">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold leading-none mb-1">Get it on</span>
              <span className="text-lg font-black leading-none">Google Play</span>
            </div>
          </button>
        </motion.div>

        {/* Waitlist Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-md mx-auto lg:mx-0 pt-8"
        >
          {joined ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-3 text-green-700">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-bold">You're on the waitlist!</p>
                <p className="text-sm font-medium opacity-90">Bonus points & premium themes unlocked.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleJoin} className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-indigo-500" />
                <p className="text-sm font-bold text-gray-900 leading-tight">Join the Waitlist to unlock rewards!</p>
              </div>
              <p className="text-xs text-gray-500 font-medium mb-4 leading-snug">Add your name to automatically receive extra PTS and exclusive Premium Themes.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner text-sm font-medium bg-white"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors shadow-md shadow-indigo-600/20 text-sm whitespace-nowrap">
                  Join Waitlist
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      <div className="flex-1 relative z-10 w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="relative w-full aspect-[9/19] bg-black rounded-[3rem] border-[12px] border-gray-900 shadow-2xl overflow-hidden perspective-1000 ring-1 ring-white/10"
        >
          {/* Animated Mock Mobile UI Theme */}
          <motion.div
            animate={{ scale: [1.05, 1.15, 1.05], backgroundPosition: ['50% 50%', '60% 40%', '50% 50%'] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
            style={{ backgroundImage: `url('https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775192948/xkqtlmnohayyh1hx3e78.jpg')` }}
          />

          <audio 
            ref={audioRef}
            src="/sounds/music_for_video-forest-lullaby-110624.mp3"
            loop
          />

          <div
            className="absolute inset-0 flex flex-col justify-end p-5 pb-8 z-10 cursor-pointer"
            onClick={toggleMute}
          >
            {/* Center screen Mute/Unmute Popup */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={showMutePopup ? { scale: 1.2, opacity: 1 } : { scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-black/50 backdrop-blur-md p-4 rounded-full text-white/90 shadow-2xl"
              >
                {isMuted ? <VolumeX size={32} strokeWidth={1.5} /> : <Volume2 size={32} strokeWidth={1.5} />}
              </motion.div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-0 pointer-events-none" />

            {/* Reel Header */}
            <div className="absolute top-8 left-6 right-6 flex justify-between items-center text-white z-20">
              <span className="font-bold text-lg text-shadow-sm">For You</span>
              <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <Sparkles size={16} />
              </div>
            </div>

            {/* Content area */}
            <div className="relative z-20 w-full flex flex-col pr-12 space-y-4">
              {/* Question Sticker */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5, type: 'spring', bounce: 0.4 }}
                className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl p-4 sm:p-5 rounded-3xl rounded-bl-sm border border-white/40 shadow-xl inline-flex flex-col items-start text-left w-[90%] relative overflow-hidden mb-2"
              >
                {/* Shine effect */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                <div className="text-white/90 text-[9px] font-black uppercase tracking-widest mb-2 flex items-center gap-1.5 bg-black/20 pr-3 pl-1.5 py-1 rounded-full shadow-inner border border-white/10">
                  <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm shadow-sm">
                    <User size={8} className="text-white" strokeWidth={3} />
                  </div>
                  Secret Confession
                </div>
                <p className="text-white text-[15px] leading-snug font-black tracking-tight drop-shadow-md">"What's one thing you're too afraid to tell anyone?"</p>
              </motion.div>

              {/* Top Replies */}
              <div className="space-y-4 w-full">
                {/* Reply 1 */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="flex items-start gap-2.5 w-11/12"
                >
                  <div className="w-7 h-7 rounded-full border border-white/50 bg-gradient-to-tr from-yellow-400 to-pink-500 flex-shrink-0 shadow-md mt-1" />
                  <div className="bg-black/40 backdrop-blur-md px-3.5 py-2.5 rounded-2xl rounded-tl-sm border border-white/10 shadow-lg">
                    <p className="text-white/70 font-bold text-[9px] uppercase tracking-wide mb-0.5">@mystik_creator</p>
                    <p className="text-white text-xs leading-snug drop-shadow-sm">Honestly, I just let my phone ring and then text them "what's up?" 🤷‍♂️😂</p>
                  </div>
                </motion.div>

                {/* Reply 2 */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                  className="flex items-start gap-2.5 w-10/12 ml-6"
                >
                  <div className="w-6 h-6 rounded-full border border-white/30 bg-gradient-to-tr from-cyan-400 to-emerald-400 flex-shrink-0 shadow-md mt-1" />
                  <div className="bg-black/30 backdrop-blur-md px-3.5 py-2.5 rounded-xl rounded-tl-sm border border-white/10 shadow-sm">
                    <p className="text-white/70 font-bold text-[8px] uppercase tracking-wide mb-0.5">@sarah_vibes</p>
                    <p className="text-white text-[11px] leading-snug drop-shadow-sm">Same here! Thought I was the only one that did this. 👀</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Actions */}
            <div className="absolute right-4 bottom-1/4 space-y-6 z-20">
              <button onClick={toggleHeart} className="flex flex-col items-center gap-1 group relative z-50">
                <div className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center border shadow-lg transition-all duration-300 ${isLiked ? 'bg-rose-500/20 border-rose-500/30' : 'bg-black/40 border-white/20 group-hover:scale-110'}`}>
                  <motion.div
                    initial={false}
                    animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Heart size={24} className={`transition-colors duration-300 ${isLiked ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]' : 'text-white'}`} strokeWidth={isLiked ? 0 : 2} />
                  </motion.div>
                </div>
                <span className="text-white font-bold text-xs drop-shadow-md">{isLiked ? "12.1K" : "12K"}</span>
              </button>
              <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1 group relative z-50">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <span className="text-white font-bold text-xs">4.2K</span>
              </button>
              <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1 group relative z-50">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                  <Share2 size={24} className="text-white" />
                </div>
                <span className="text-white font-bold text-xs">Share</span>
              </button>



              {/* Spinning IG-style Audio CD */}
              <div className="relative pt-6 flex justify-center w-12 h-12 pointer-events-none mt-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="w-10 h-10 rounded-full border-[2px] border-white/20 bg-[#1a1a1a] flex items-center justify-center shadow-lg overflow-hidden relative shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  <Music size={12} className="text-white z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
                </motion.div>
                {/* floating music notes */}
                <motion.div
                  animate={{ y: [-5, -25], opacity: [0, 1, 0], scale: [0.8, 1.2], x: [0, -10] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  className="absolute bottom-6 left-0 text-white/80"
                >
                  <Music size={10} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* iPhone Notch */}
          <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-30">
            <div className="w-1/3 h-full bg-gray-900 rounded-b-2xl"></div>
          </div>
        </motion.div>

        {/* Floating elements for 3D feel */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -top-10 -right-8 w-24 h-24 bg-white/60 backdrop-blur-2xl rounded-3xl border border-white shadow-xl flex items-center justify-center z-20"
        >
          <span className="text-3xl">🤫</span>
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-1/2 -left-12 w-20 h-20 bg-white/60 backdrop-blur-2xl rounded-full border border-white shadow-xl flex items-center justify-center z-20"
        >
          <span className="text-2xl text-indigo-500 font-black">10K</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
