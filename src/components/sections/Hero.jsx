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
  const [activeHeroReel, setActiveHeroReel] = useState(0);

  const heroReels = [
    {
      type: "Secret Confession",
      question: `"What's one thing you're too afraid to tell anyone?"`,
      replies: [
        { user: "mystik_creator", text: "Honestly, I just let my phone ring and then text them \"what's up?\" 🤷‍♂️😂", from: "from-yellow-400", to: "to-pink-500", size: "w-11/12", padding: "px-3 py-2", margin: "mt-1", dot: "w-6 h-6" },
        { user: "sarah_vibes", text: "Same here! Thought I was the only one that did this. 👀", from: "from-cyan-400", to: "to-emerald-400", size: "w-10/12 ml-4", padding: "px-3 py-2", margin: "mt-1", dot: "w-5 h-5" }
      ],
      likes: "12",
      comments: "4.2K",
      shares: "Share",
      bgImage: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775192948/xkqtlmnohayyh1hx3e78.jpg",
      audioSrc: "/sounds/music_for_video-forest-lullaby-110624.mp3"
    },
    {
      type: "Anime Debate",
      question: `"If you could live in any anime world, which one would it be?"`,
      replies: [
        { user: "otaku_warrior", text: "Definitely the One Piece world! I want to set sail and search for the ultimate treasure. 🏴‍☠️🍖", from: "from-red-500", to: "to-orange-500", size: "w-11/12", padding: "px-3 py-2", margin: "mt-1", dot: "w-6 h-6" },
        { user: "ninja_way", text: "Naruto universe! Learning jutsu and exploring the hidden leaf. 🦊🍥", from: "from-blue-400", to: "to-indigo-500", size: "w-10/12 ml-4", padding: "px-3 py-2", margin: "mt-1", dot: "w-5 h-5" }
      ],
      likes: "15.8",
      comments: "1.2K",
      shares: "890",
      bgImage: "https://res.cloudinary.com/dyy8sqeh7/image/upload/q_auto/f_auto/v1775745594/stable-diffusion-xl-base-10_wide-angle-shot_1_uvwwwe.png",
      audioSrc: "/sounds/desifreemusic-battle-rage-intense-fight-music-411019.mp3"
    },
    {
      type: "Productivity Flex",
      question: `"What's your most overpowered setup secret?"`,
      replies: [
        { user: "code_ninja", text: "Using AI to write my boilerplate. Saves me like 10 hours a week! 🚀💻", from: "from-purple-500", to: "to-indigo-600", size: "w-11/12", padding: "px-3.5 py-2.5", margin: "mt-1", dot: "w-7 h-7" },
        { user: "mac_addict", text: "Keyboard shortcuts for everything. If I touch the mouse, I lose. ⌨️🔥", from: "from-green-400", to: "to-emerald-500", size: "w-10/12 ml-6", padding: "px-3.5 py-2.5", margin: "mt-1", dot: "w-6 h-6" }
      ],
      likes: "24.5",
      comments: "3.1K",
      shares: "1.2K",
      bgImage: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775753291/mh5cum4ms0gl69ybwgal.jpg",
      audioSrc: "/sounds/monume-space-509492.mp3"
    },
    {
      type: "Zen Focus",
      question: `"What's your go-to sound for ultimate deep work?"`,
      replies: [
        { user: "chill_coder", text: "Ocean waves all day. Drowns out everything so I can just flow. 🌊🎧", from: "from-blue-500", to: "to-cyan-500", size: "w-11/12", padding: "px-3.5 py-2.5", margin: "mt-1", dot: "w-7 h-7" },
        { user: "lofi_girl", text: "Lofi hip hop beats to relax/study to. A classic. ☕📚", from: "from-amber-400", to: "to-orange-500", size: "w-10/12 ml-6", padding: "px-3.5 py-2.5", margin: "mt-1", dot: "w-6 h-6" }
      ],
      likes: "18.2",
      comments: "1.5K",
      shares: "920",
      bgImage: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775755724/kzmvlx75tsy2mngul5qu.jpg",
      audioSrc: "/sounds/desifreemusic-ocean-wave-loops-377890.mp3"
    },
    {
      type: "Weekend Vibes",
      question: `"What's your favorite way to unwind on a Saturday?"`,
      replies: [
        { user: "mall_rat", text: "Hitting the shops with friends! Love the energy of a busy mall. 🛍️✨", from: "from-pink-500", to: "to-rose-500", size: "w-11/12", padding: "px-3.5 py-2.5", margin: "mt-1", dot: "w-7 h-7" },
        { user: "coffee_lover", text: "Just people watching with an iced coffee. It's so peaceful in a weird way. ☕🚶", from: "from-fuchsia-400", to: "to-purple-500", size: "w-10/12 ml-6", padding: "px-3.5 py-2.5", margin: "mt-1", dot: "w-6 h-6" }
      ],
      likes: "21.4",
      comments: "2.8K",
      shares: "1.1K",
      bgImage: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775756562/muzhikhjcsxhens09720.jpg",
      audioSrc: "/sounds/gregorquendel_sounddesign-crowd-people-shopping-mall-ambience-138235.mp3"
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
        if (heroReels[activeHeroReel]?.audioSrc) {
            audioRef.current.src = heroReels[activeHeroReel].audioSrc;
            if (!isMuted) {
                audioRef.current.play().catch(e => console.log('Audio error:', e));
            } else {
                audioRef.current.pause();
            }
        }
    }
  }, [activeHeroReel, isMuted]);

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

  const handleHeroScroll = (e) => {
    const idx = Math.round(e.target.scrollTop / e.target.clientHeight);
    if(idx !== activeHeroReel) {
        setActiveHeroReel(idx);
        setIsLiked(false); // Reset like per reel if desired
    }
  };

  return (
    <div className="container mx-auto px-6 pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[90vh]">
      <div className="flex-1 text-center lg:text-left space-y-6 lg:space-y-8 max-w-2xl mx-auto lg:mx-0 z-10 lg:pl-4">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-800 px-4 mb-2 lg:px-5 py-2 rounded-full text-xs font-bold shadow-sm"
        >
          <Sparkles size={14} className="text-indigo-500" />
          <span>The next generation of anonymous social</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black text-gray-900 leading-[1.05] tracking-tight"
        >
          Anonymous <span className="text-gradient">Chat.</span><br />
          Transformed.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-500 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed"
        >
          The first platform where your secret interactions become viral reels. Express fearlessly, build your streak, and earn legendary status.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
        >
          <button className="bg-gray-900 border border-gray-700 text-white px-6 py-3 rounded-2xl bouncy-hover bouncy-tap flex items-center justify-center gap-3 shadow-xl shadow-gray-900/20 text-left min-w-[180px]">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold leading-none mb-1">Download on the</span>
              <span className="text-base font-black leading-none">App Store</span>
            </div>
          </button>
          <button className="bg-white border border-gray-200 text-gray-900 px-6 py-3 rounded-2xl bouncy-hover bouncy-tap flex items-center justify-center gap-3 shadow-md text-left min-w-[180px]">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold leading-none mb-1">Get it on</span>
              <span className="text-base font-black leading-none">Google Play</span>
            </div>
          </button>
        </motion.div>

        {/* Waitlist Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-md mx-auto lg:mx-0 pt-6"
        >
          {joined ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 text-green-700">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} className="text-green-600" />
              </div>
              <div>
                <p className="font-bold text-sm">You're on the waitlist!</p>
                <p className="text-xs font-medium opacity-90">Bonus points & premium themes unlocked.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleJoin} className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 shadow-sm text-left">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-indigo-500" />
                <p className="text-xs font-bold text-gray-900 leading-tight">Join Waitlist for rewards!</p>
              </div>
              <p className="text-[11px] text-gray-500 font-medium mb-3 leading-snug">Add your name to receive extra PTS and exclusive Themes.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="Enter email address"
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner text-sm font-medium bg-white"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl transition-colors shadow-md shadow-indigo-600/20 text-xs whitespace-nowrap">
                  Join Waitlist
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* Reduced-size Phone Container */}
      <div className="flex-1 z-10 w-full flex justify-center lg:justify-end py-8 lg:py-0 lg:pr-8">
        <div className="relative inline-block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="relative w-[340px] h-[680px] sm:w-[360px] sm:h-[720px] bg-black rounded-[3.5rem] border-[14px] border-gray-900 shadow-2xl ring-1 ring-white/10 shrink-0"
          >
          {/* iPhone Notch */}
          <div className="absolute top-0 inset-x-0 h-6 sm:h-7 flex justify-center z-50 pointer-events-none">
            <div className="w-1/3 h-full bg-gray-900 rounded-b-2xl"></div>
          </div>

          {/* Audio Engine */}
          <audio ref={audioRef} loop />

          {/* Center screen Mute/Unmute Popup */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
             <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={showMutePopup ? { scale: 1.2, opacity: 1 } : { scale: 1.5, opacity: 0 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="bg-black/50 backdrop-blur-md p-4 rounded-full text-white/90 shadow-2xl"
             >
               {isMuted ? <VolumeX size={28} strokeWidth={1.5} /> : <Volume2 size={28} strokeWidth={1.5} />}
             </motion.div>
          </div>

          <div 
             className="w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-y snap-mandatory rounded-[2.2rem] sm:rounded-[2.4rem] cursor-pointer relative"
             onScroll={handleHeroScroll}
             onClick={toggleMute}
          >
             {heroReels.map((reel, i) => (
                <div key={i} className="w-full h-full snap-start relative flex flex-col justify-end p-4 sm:p-5 pb-6 sm:pb-8 overflow-hidden z-10">
                   
                   {/* Animated Mock Mobile UI Theme */}
                   <motion.div
                     animate={{ scale: [1.05, 1.15, 1.05], backgroundPosition: ['50% 50%', '60% 40%', '50% 50%'] }}
                     transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                     className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
                     style={{ backgroundImage: `url('${reel.bgImage}')` }}
                   />

                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-0 pointer-events-none" />

                   {/* Reel Header */}
                   <div className="absolute top-8 left-5 right-5 flex justify-between items-center text-white z-20 pointer-events-none">
                     <span className="font-bold text-base sm:text-lg text-shadow-sm">For You</span>
                     <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                       <Sparkles size={14} />
                     </div>
                   </div>

                   {/* Content area */}
                   <div className="relative z-20 w-full flex flex-col pr-10 sm:pr-12 space-y-3 sm:space-y-4">
                     {/* Question Sticker */}
                     <motion.div
                       initial={{ x: -20, opacity: 0 }}
                       whileInView={{ x: 0, opacity: 1 }}
                       transition={{ delay: 0.2, duration: 0.5, type: 'spring', bounce: 0.4 }}
                       viewport={{ once: false }}
                       className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl p-3.5 sm:p-4 rounded-3xl rounded-bl-sm border border-white/40 shadow-xl inline-flex flex-col items-start text-left w-[95%] relative overflow-hidden mb-1 pointer-events-auto cursor-auto"
                       onClick={(e) => e.stopPropagation()}
                     >
                       <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                       <div className="text-white/90 text-[8px] font-black uppercase tracking-widest mb-1.5 flex items-center gap-1 bg-black/20 pr-2.5 pl-1.5 py-1 rounded-full shadow-inner border border-white/10">
                         <div className="w-3 h-3 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm shadow-sm">
                           <User size={7} className="text-white" strokeWidth={3} />
                         </div>
                         {reel.type}
                       </div>
                       <p className="text-white text-[15px] sm:text-base leading-snug font-black tracking-tight drop-shadow-md">{reel.question}</p>
                     </motion.div>

                     {/* Top Replies */}
                     <div className="space-y-3 sm:space-y-4 w-full">
                       {reel.replies.map((reply, idx) => (
                           <motion.div
                             key={idx}
                             initial={{ y: 20, opacity: 0 }}
                             whileInView={{ y: 0, opacity: 1 }}
                             transition={{ delay: 0.4 + (idx * 0.2), duration: 0.4 }}
                             viewport={{ once: false }}
                             className={`flex items-start gap-2 ${reply.size} pointer-events-auto cursor-auto`}
                             onClick={(e) => e.stopPropagation()}
                           >
                             <div className={`${reply.dot} rounded-full border border-white/50 bg-gradient-to-tr ${reply.from} ${reply.to} flex-shrink-0 shadow-md ${reply.margin}`} />
                             <div className={`bg-black/40 backdrop-blur-md ${reply.padding} rounded-2xl rounded-tl-sm border border-white/10 shadow-lg`}>
                               <p className="text-white/70 font-bold text-[8px] uppercase tracking-wide mb-px">@{reply.user}</p>
                               <p className="text-white text-[10px] sm:text-[11px] leading-snug drop-shadow-sm">{reply.text}</p>
                             </div>
                           </motion.div>
                       ))}
                     </div>
                   </div>

                   {/* Actions */}
                   <div className="absolute right-3 sm:right-4 bottom-1/4 space-y-4 sm:space-y-5 z-20 pointer-events-auto flex flex-col items-center">
                     <button onClick={toggleHeart} className="flex flex-col items-center gap-1 group relative z-50">
                       <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full backdrop-blur-md flex items-center justify-center border shadow-lg transition-all duration-300 ${isLiked ? 'bg-rose-500/20 border-rose-500/30' : 'bg-black/40 border-white/20 group-hover:scale-110'}`}>
                         <motion.div
                           initial={false}
                           animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
                           transition={{ duration: 0.3, ease: "easeInOut" }}
                         >
                           <Heart size={20} className={`transition-colors duration-300 ${isLiked ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]' : 'text-white'}`} strokeWidth={isLiked ? 0 : 2} />
                         </motion.div>
                       </div>
                       <span className="text-white font-bold text-[9px] sm:text-[10px] drop-shadow-md">{isLiked ? `${parseFloat(reel.likes)+0.1}K` : `${reel.likes}K`}</span>
                     </button>
                     <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1 group relative z-50">
                       <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                         <MessageCircle size={20} className="text-white" />
                       </div>
                       <span className="text-white font-bold text-[9px] sm:text-[10px]">{reel.comments}</span>
                     </button>
                     <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1 group relative z-50">
                       <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                         <Share2 size={20} className="text-white" />
                       </div>
                       <span className="text-white font-bold text-[9px] sm:text-[10px]">{reel.shares}</span>
                     </button>

                     {/* Spinning IG-style Audio CD */}
                     <div className="relative pt-4 sm:pt-6 flex justify-center w-10 h-10 pointer-events-none mt-2 sm:mt-4">
                       <motion.div
                         animate={{ rotate: 360 }}
                         transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                         className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[2px] border-white/20 bg-[#1a1a1a] flex items-center justify-center shadow-lg overflow-hidden relative shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                       >
                         <Music size={10} className="text-white z-10" />
                         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
                       </motion.div>
                       <motion.div
                         animate={{ y: [-5, -20], opacity: [0, 1, 0], scale: [0.8, 1.2], x: [0, -8] }}
                         transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                         className="absolute bottom-5 left-0 text-white/80"
                       >
                         <Music size={8} />
                       </motion.div>
                     </div>
                   </div>

                </div>
             ))}
          </div>

          </motion.div>

          {/* Floating elements for 3D feel relative to phone */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-4 -right-4 sm:top-0 sm:-right-8 w-16 h-16 sm:w-20 sm:h-20 bg-white/60 backdrop-blur-2xl rounded-3xl border border-white shadow-xl flex items-center justify-center z-20 pointer-events-none"
          >
            <span className="text-2xl sm:text-3xl">🤫</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute top-1/3 -left-6 sm:top-1/2 sm:-left-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/60 backdrop-blur-2xl rounded-full border border-white shadow-xl flex items-center justify-center z-20 pointer-events-none"
          >
            <span className="text-xl sm:text-2xl text-indigo-500 font-black">10K</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
