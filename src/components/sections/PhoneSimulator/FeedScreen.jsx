import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Music, Volume2, Search, MessageCircle, Heart, Share2, VolumeX, X, Send, Bell, Plus, MoreHorizontal, Link, TrendingUp, Bookmark, Inbox, Check, EyeOff, AlertTriangle, Tag, Hash, User, Clock } from 'lucide-react';
import { initialHeroReels, mockNotifications, RANDOM_AVATARS, moodStyles, exploreRecentItems, exploreTrendingData, mockResultsCity, mockResultsRiya, exploreGridItems } from './MockData';
import userAvatar from '../../../assets/avatar.png';
const AgentMessageIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor" className={className}>
    {/* Hat Top */}
    <path d="M 27 35 L 43 35 L 41 20 L 29 20 Z" />
    <rect x="28" y="24" width="14" height="4" fill="#0c0c10" />
    {/* Hat Brim */}
    <path d="M 16 40 L 54 40 L 50 34 L 20 34 Z" />
    {/* Head */}
    <circle cx="35" cy="50" r="11" />
    {/* Body */}
    <path d="M 10 90 C 10 65, 20 62, 35 62 C 50 62, 60 65, 60 90 Z" />
    {/* Tie */}
    <path d="M 32 62 L 38 62 L 36 82 L 35 86 L 34 82 Z" fill="#0c0c10" />
    {/* Speech Bubble */}
    <path d="M 55 42 C 55 22, 95 22, 95 42 C 95 57, 80 60, 70 60 L 58 70 L 61 57 C 55 52, 55 47, 55 42 Z" />
    {/* Dashes */}
    <rect x="63" y="38" width="10" height="5" rx="2" fill="#0c0c10" />
    <rect x="77" y="38" width="10" height="5" rx="2" fill="#0c0c10" />
  </svg>
);



const getCommentCount = (reel) => {
  if (!reel || !reel.commentsList) return 0;
  let count = reel.commentsList.length;
  reel.commentsList.forEach(c => {
    if (c.replies) {
      count += c.replies.length;
    }
  });
  return count;
};

const RANDOM_USERNAMES = [
  "neon_dreamer", "shadow_walker", "velvet_mind", "cosmic_soul", "midnight_thinker",
  "silent_echo", "ghost_whisperer", "quantum_ghost", "lunar_vibe", "solar_pulse",
  "dusk_adventurer", "aurora_spark", "cipher_mind", "zen_coder", "abstract_heart",
  "starlight_chaser", "oblivion_gaze", "whispering_wind", "echo_location", "parallel_lines",
  "entropy_fan", "paradox_thinker", "mirage_seeker", "nebula_born", "solitude_seeker",
  "wild_resonance", "calm_chaos", "infinite_loop", "glitch_heart", "retro_spirit"
];

const RANDOM_COMMENT_TEXTS = [
  "This hit incredibly close to home. 🌌",
  "I've been thinking about this all week.",
  "Never thought about it this way, but it makes so much sense.",
  "Is it just me or does anyone else feel this deeply?",
  "This is the most relatable thing I've read today. 💯",
  "A perfect description of late-night thoughts.",
  "Absolutely beautiful. Thanks for sharing this anonymously.",
  "Sending good vibes to whoever wrote this! ✨",
  "Wow, this is so raw and honest.",
  "We are all connected by these invisible threads.",
  "Staring at the ceiling thinking about this now.",
  "Could not have said it better myself.",
  "An absolute masterpiece of a thought.",
  "It's comforting to know I'm not the only one feeling this way.",
  "This resonates on a whole different level. 🎧",
  "Simple yet so incredibly profound.",
  "Needed to hear this today. Thank you.",
  "Anon posts are the best part of this app.",
  "The mood and the soundtrack match perfectly.",
  "This is pure magic. ✨💫",
  "Mind-blown. Deep thoughts only.",
  "Such a cozy and reflective vibe.",
  "Honestly, same. Every single day.",
  "We need more real conversations like this.",
  "Is this a sign? Because it feels like one.",
  "A quiet truth in a loud world.",
  "Living for this aesthetic right now.",
  "This makes me want to pause and just breathe.",
  "Beautifully written. Hit me right in the feels.",
  "Let's protect this anonymous space."
];

const populateReelsComments = (reels) => {
  return reels.map((reel, rIdx) => {
    const list = reel.commentsList ? [...reel.commentsList] : [];
    let idCounter = 1000 + rIdx * 100;
    while (list.length < 30) {
      const uIndex = (list.length + rIdx) % RANDOM_USERNAMES.length;
      const tIndex = (list.length + rIdx * 3) % RANDOM_COMMENT_TEXTS.length;
      const avatarIndex = (list.length + rIdx * 2) % RANDOM_AVATARS.length;
      
      list.push({
        id: idCounter++,
        user: RANDOM_USERNAMES[uIndex],
        text: RANDOM_COMMENT_TEXTS[tIndex],
        likes: Math.floor(Math.random() * 200) + 5,
        time: `${Math.floor(Math.random() * 12) + 1}h`,
        avatarImage: RANDOM_AVATARS[avatarIndex],
        avatarFrom: "from-indigo-500",
        avatarTo: "to-purple-500"
      });
    }
    return { ...reel, commentsList: list };
  });
};

const getOverlayComments = (reel) => {
  if (!reel || !reel.commentsList || reel.commentsList.length === 0) return [];
  return reel.commentsList.slice(0, 2).map((comment, oIdx) => ({
    user: comment.user,
    text: comment.text,
    avatarImage: comment.avatarImage,
    from: comment.avatarFrom || "from-indigo-500",
    to: comment.avatarTo || "to-purple-500",
    size: oIdx === 0 ? "w-11/12" : "w-10/12 ml-4",
    padding: "px-3 py-2",
    margin: "mt-1",
    dot: oIdx === 0 ? "w-6 h-6" : "w-5 h-5"
  }));
};

const FeedScreen = ({ 
  initialMode = "feed", 
  initialPost = null, 
  onBackFromReels, 
  onInboxClick, 
  onNotificationsClick,
  onUserSelect,
  followedUsers = new Set(),
  onFollowToggle,
  onPostClick
}) => {
  // Existing state for Reels
  const [reelsData, setReelsData] = useState(() => {
    let baseReels = initialHeroReels;
    if (initialPost) {
      const foundIdx = initialHeroReels.findIndex(r => r.bgImage === initialPost.img);
      if (foundIdx === -1) {
        const newReel = {
          type: (initialPost.mood || "vibe").toUpperCase() + " VIBE",
          tags: [initialPost.mood ? initialPost.mood.toUpperCase() : "VIBE", "Explore", "Trending"],
          question: initialPost.text,
          avatarImage: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677830/mystify/avatar/toons/zrxwnpxmz51ya1ghq696.png",
          replies: [],
          commentsList: [],
          likes: (initialPost.replies ? (initialPost.replies * 0.15).toFixed(1) : "10.5"),
          comments: initialPost.replies ? String(initialPost.replies) : "1.2K",
          shares: initialPost.replies ? String(Math.floor(initialPost.replies * 0.4)) : "150",
          bgImage: initialPost.img || initialPost.bg,
          audioSrc: initialPost.audioSrc || "https://res.cloudinary.com/dyy8sqeh7/video/upload/v1780330318/suryanatta-whispers-in-the-broken-horizon-400833_mr0t3u.mp3"
        };
        baseReels = [newReel, ...initialHeroReels];
      }
    }
    return populateReelsComments(baseReels);
  });
  const [activeHeroReel, setActiveHeroReel] = useState(() => {
    if (initialPost) {
      const foundIdx = initialHeroReels.findIndex(r => r.bgImage === initialPost.img);
      return foundIdx !== -1 ? foundIdx : 0;
    }
    return 0;
  });
  const [isMuted, setIsMuted] = useState(true);
  const [showMutePopup, setShowMutePopup] = useState(false);
  const [isReelLiked, setIsReelLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});
  const [replyTo, setReplyTo] = useState(null);
  const [commentText, setCommentText] = useState("");
  const audioRef = useRef(null);

  // New State for Feed
  const [viewingReel, setViewingReel] = useState(initialMode === "reels");
  const [activeFeedIdx, setActiveFeedIdx] = useState(0);
  const [feedLikes, setFeedLikes] = useState({});
  const [feedSaved, setFeedSaved] = useState({});
  const [showMoreMenuIdx, setShowMoreMenuIdx] = useState(null);
  const [toastMessage] = useState("");
  const [showTagsForReelIdx, setShowTagsForReelIdx] = useState(null);
  const [showTagsForFeedIdx, setShowTagsForFeedIdx] = useState(null);
  const feedAudioRefs = useRef({});
  const postRefs = useRef({});
  const reelScrollRef = useRef(null);
  const feedScrollRef = useRef(null);

  // Reddit Search Integration States
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState('Questions');
  const [recentSearches, setRecentSearches] = useState(exploreRecentItems);
  const searchInputRef = useRef(null);

  // Scroll Header Auto-Hide States
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollTop = useRef(0);

  const handleScroll = (e) => {
    if (isSearchFocused) {
      setIsHeaderVisible(true);
      return;
    }
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop <= 10) {
      setIsHeaderVisible(true);
      lastScrollTop.current = scrollTop;
      return;
    }
    const diff = scrollTop - lastScrollTop.current;
    if (Math.abs(diff) < 5) return;

    if (scrollTop > lastScrollTop.current) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
    lastScrollTop.current = scrollTop;
  };

  const renderHighlightedText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ?
        <span key={i} style={{ color: '#FF4500' }}>{part}</span> :
        part
    );
  };

  const isSearchMatch = (text, query) => text && query && text.toLowerCase().includes(query.toLowerCase());
  const filteredPeople = mockResultsRiya.filter(item => isSearchMatch(item.handle, searchQuery) || isSearchMatch(item.name, searchQuery));

  const hasResults = (searchQuery.toLowerCase() === 'city' && activeResultTab === 'Questions') ||
    (activeResultTab === 'People' && filteredPeople.length > 0);

  const searchScreenState = isSearchFocused && searchQuery.length === 0 ? 'focused_empty'
    : searchQuery.length > 0 && hasResults ? 'results'
      : searchQuery.length > 0 && !hasResults ? 'no_results'
        : 'default';

  const handleRecentTap = (query) => {
    setSearchQuery(query);
    setIsSearchFocused(true);
  };

  const handleRemoveRecent = (e, id) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(item => item.id !== id));
  };

  // Scroll to active reel when opening Reel view or scroll back to post when returning to Feed
  useEffect(() => {
    if (viewingReel && reelScrollRef.current) {
      // Small delay to ensure layout is complete before scrolling
      setTimeout(() => {
        if (reelScrollRef.current) {
          reelScrollRef.current.scrollTop = activeHeroReel * reelScrollRef.current.clientHeight;
        }
      }, 50);
    } else if (!viewingReel && postRefs.current[activeHeroReel] && feedScrollRef.current) {
      // When returning to feed, safely scroll the internal container to the post
      setTimeout(() => {
        const postElement = postRefs.current[activeHeroReel];
        if (postElement && feedScrollRef.current) {
          // scroll to the offsetTop of the post element to prevent scrolling the parent website
          feedScrollRef.current.scrollTop = postElement.offsetTop;
        }
      }, 50);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewingReel]);

  // Intersection Observer for Feed
  useEffect(() => {
    if (viewingReel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveFeedIdx(Number(entry.target.dataset.idx));
            setShowTagsForFeedIdx(null);
          }
        });
      },
      { threshold: 0.6 }
    );

    const currentRefs = postRefs.current;
    Object.values(currentRefs).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [viewingReel, reelsData]);

  // Audio Playback Manager
  useEffect(() => {
    if (viewingReel) {
      // Pause all feed audio
      Object.values(feedAudioRefs.current).forEach((el) => {
        if (el) el.pause();
      });
      
      // Play hero reel audio
      if (audioRef.current && reelsData[activeHeroReel]?.audioSrc) {
        const currentSrc = audioRef.current.src;
        const targetSrc = reelsData[activeHeroReel]?.audioSrc;
        if (!currentSrc || currentSrc !== targetSrc) {
          audioRef.current.src = targetSrc;
        }
        if (!isMuted) {
          audioRef.current.play().catch(e => console.log('Audio error:', e));
        } else {
          audioRef.current.pause();
        }
      }
    } else {
      // Pause hero reel audio
      if (audioRef.current) audioRef.current.pause();

      // Play active feed audio
      Object.entries(feedAudioRefs.current).forEach(([idx, el]) => {
        if (!el) return;
        if (Number(idx) === activeFeedIdx && !isMuted) {
          el.play().catch(e => console.log('Feed audio error:', e));
        } else {
          el.pause();
        }
      });
    }
  }, [activeFeedIdx, isMuted, viewingReel, activeHeroReel, reelsData]);

  // Existing Reel Helpers
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    let userAvatarVal = null;
    let customUsername = "mystik_user";
    try {
      const saved = localStorage.getItem('mystify_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.avatarValue && parsed.avatarValue.startsWith('http')) {
          userAvatarVal = parsed.avatarValue;
        }
        if (parsed.username) {
          customUsername = parsed.username;
        }
      }
    } catch (err) {
      console.error(err);
    }

    const newComment = {
      id: Date.now(),
      user: customUsername,
      text: replyTo ? `@${replyTo.user} ${commentText}` : commentText,
      likes: 0,
      time: "Just now",
      avatarFrom: "from-indigo-500",
      avatarTo: "to-purple-500",
      avatarImage: userAvatarVal || userAvatar,
      replies: []
    };
    const updatedReels = [...reelsData];
    if (replyTo) {
      const commentIndex = updatedReels[activeHeroReel].commentsList.findIndex(c => c.id === replyTo.id);
      if (commentIndex !== -1) {
        if (!updatedReels[activeHeroReel].commentsList[commentIndex].replies) {
          updatedReels[activeHeroReel].commentsList[commentIndex].replies = [];
        }
        updatedReels[activeHeroReel].commentsList[commentIndex].replies.push(newComment);
      }
    } else {
      updatedReels[activeHeroReel].commentsList.unshift(newComment);
    }
    setReelsData(updatedReels);
    setCommentText("");
    setReplyTo(null);
  };

  const toggleCommentLike = (commentId) => {
    setCommentLikes(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const toggleReelHeart = (e) => {
    e.stopPropagation();
    setIsReelLiked(!isReelLiked);
  };

  const toggleMute = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setIsMuted(!isMuted);
    setShowMutePopup(true);
    setTimeout(() => setShowMutePopup(false), 900);
  };

  const handleShare = async (e, reel, idx) => {
    e.stopPropagation();
    if (idx !== undefined) {
      setActiveHeroReel(idx);
    }
    setShowSharePopup(true);
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    setShowSharePopup(false);
  };

  const handleSimulatedShare = (e, _platform) => {
    e.stopPropagation();
    setShowSharePopup(false);
  };

  const handleHeroScroll = (e) => {
    const idx = Math.round(e.target.scrollTop / e.target.clientHeight);
    if (idx !== activeHeroReel) {
      setActiveHeroReel(idx);
      setIsReelLiked(false);
      setShowTagsForReelIdx(null);
    }
  };


  if (viewingReel) {
    const isStandaloneReel = initialMode === "reels";
    return (
      <motion.div
        key="step-reel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className={`absolute inset-0 flex flex-col font-sans bg-[#0c0c10] text-white overflow-hidden pb-[64px] ${isStandaloneReel ? 'z-10' : 'z-[200]'}`}
      >
        {!isStandaloneReel && (
          <button 
            onClick={() => {
              setShowTagsForReelIdx(null);
              setShowTagsForFeedIdx(null);
              if (onBackFromReels) onBackFromReels();
              else setViewingReel(false);
            }}
            className="absolute top-6 left-4 z-[250] w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg"
          >
            <ChevronLeft size={24} className="text-white pr-0.5" />
          </button>
        )}

        <audio ref={audioRef} loop />

        {/* Center screen Mute/Unmute Popup */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[250]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={showMutePopup ? { scale: 1.2, opacity: 1 } : { scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-black/50 backdrop-blur-md p-4 rounded-full text-white/90 shadow-2xl"
          >
            {isMuted ? <VolumeX size={28} strokeWidth={1.5} /> : <Volume2 size={28} strokeWidth={1.5} />}
          </motion.div>
        </div>

        <motion.div
          ref={reelScrollRef}
          animate={{ height: showComments ? '45%' : '100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-y snap-mandatory cursor-pointer relative z-10"
          onScroll={handleHeroScroll}
          onClick={(e) => {
            if (showComments || showSharePopup || showTagsForReelIdx !== null) {
              setShowComments(false);
              setShowSharePopup(false);
              setShowTagsForReelIdx(null);
              setReplyTo(null);
            } else {
              toggleMute(e);
            }
          }}
        >
          {reelsData.map((reel, i) => (
            <div key={i} className="w-full h-full snap-start relative flex flex-col justify-end p-4 sm:p-5 pb-6 sm:pb-8 overflow-hidden z-10">
              <motion.div
                animate={{ scale: [1.05, 1.15, 1.05], backgroundPosition: ['50% 50%', '60% 40%', '50% 50%'] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
                style={{ backgroundImage: `url('${reel.bgImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-0 pointer-events-none" />

              <div className={`relative z-20 w-full flex flex-col pr-10 sm:pr-12 space-y-3 sm:space-y-4 transition-all duration-300 origin-bottom-left ${showComments ? 'scale-[0.80] sm:scale-[0.70] translate-y-2 sm:translate-y-4' : 'scale-100'}`}>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, type: 'spring', bounce: 0.4 }}
                  viewport={{ once: false }}
                  className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl p-3.5 sm:p-4 rounded-3xl rounded-bl-sm border border-white/40 shadow-xl inline-flex flex-col items-start text-left w-[95%] relative overflow-visible mb-1 pointer-events-auto cursor-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                  <div className="w-full flex items-center mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full border border-white/30 shadow-md overflow-hidden flex-shrink-0 bg-[#1c1c1e]">
                        <img src={reel.avatarImage || userAvatar} alt="DP" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-white/90 font-bold text-[11px] tracking-wide mt-[1px]">@mystik_user_{i+1}</span>
                    </div>
                  </div>

                  <p className="text-white text-[15px] sm:text-base leading-snug font-black tracking-tight drop-shadow-md w-full">{reel.question}</p>

                  <div className="w-full flex justify-end mt-2 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowTagsForReelIdx(showTagsForReelIdx === i ? null : i);
                      }}
                      className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 shadow-[0_0_6px_rgba(239,68,68,0.7)] hover:scale-125 transition-all cursor-pointer pointer-events-auto shrink-0 border border-white/20"
                    />

                    <AnimatePresence>
                      {showTagsForReelIdx === i && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          transition={{ type: "spring", damping: 15, stiffness: 200 }}
                          className="absolute bottom-8 right-0 z-[100] backdrop-blur-xl bg-[#1c1c1e]/95 border border-white/20 shadow-2xl p-1.5 rounded-xl flex flex-col gap-0.5 min-w-[110px] max-w-[160px] pointer-events-auto text-left"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {(reel.tags || [reel.type]).map((tag, tIdx) => (
                            <div
                              key={tIdx}
                              className="text-white/90 hover:text-white text-[10px] font-semibold py-1 px-2.5 rounded-lg hover:bg-white/10 transition-colors"
                            >
                              {tag}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <div className="space-y-3 sm:space-y-4 w-full">
                  {getOverlayComments(reel).map((reply, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + (idx * 0.2), duration: 0.4 }}
                      viewport={{ once: false }}
                      className={`flex items-start gap-2 ${reply.size} pointer-events-auto cursor-auto`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {reply.avatarImage ? (
                        <img src={reply.avatarImage} alt="DP" className={`${reply.dot} rounded-full border border-white/50 flex-shrink-0 shadow-md object-cover ${reply.margin}`} />
                      ) : (
                        <div className={`${reply.dot} rounded-full border border-white/50 bg-gradient-to-tr ${reply.from} ${reply.to} flex-shrink-0 shadow-md ${reply.margin}`} />
                      )}
                      <div className={`bg-black/40 backdrop-blur-md ${reply.padding} rounded-2xl rounded-tl-sm border border-white/10 shadow-lg min-w-[60%] flex flex-col`}>
                        <p className="text-white/70 font-bold text-[8px] uppercase tracking-wide mb-1">@{reply.user}</p>
                        <p className="text-white text-[10px] sm:text-[11px] leading-snug drop-shadow-sm">{reply.text}</p>
                        <div className="flex justify-end mt-1.5">
                          <button 
                            className="text-white/40 hover:text-white transition-colors text-[8px] font-bold uppercase tracking-wider"
                            onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className={`absolute right-3 sm:right-4 bottom-4 sm:bottom-6 space-y-4 sm:space-y-5 flex flex-col items-center z-20 transition-opacity duration-300 ${(showComments || showSharePopup) ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
                <button onClick={toggleReelHeart} className="flex flex-col items-center gap-1 group relative z-50">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full backdrop-blur-md flex items-center justify-center border shadow-lg transition-all duration-300 ${isReelLiked ? 'bg-rose-500/20 border-rose-500/30' : 'bg-black/40 border-white/20 group-hover:scale-110'}`}>
                    <motion.div initial={false} animate={{ scale: isReelLiked ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                      <Heart size={20} className={`transition-colors duration-300 ${isReelLiked ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]' : 'text-white'}`} strokeWidth={isReelLiked ? 0 : 2} />
                    </motion.div>
                  </div>
                  <span className="text-white font-bold text-[9px] sm:text-[10px] drop-shadow-md">{isReelLiked ? `${parseFloat(reel.likes) + 0.1}K` : `${reel.likes}K`}</span>
                </button>
                <button onClick={(e) => { e.stopPropagation(); setShowComments(true); }} className="flex flex-col items-center gap-1 group relative z-50">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <span className="text-white font-bold text-[9px] sm:text-[10px]">{getCommentCount(reel)}</span>
                </button>
                <button onClick={(e) => handleShare(e, reel)} className="flex flex-col items-center gap-1 group relative z-50">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                    <Share2 size={20} className="text-white" />
                  </div>
                  <span className="text-white font-bold text-[9px] sm:text-[10px]">{reel.shares}</span>
                </button>
                <div className="relative flex justify-center items-center w-10 h-10 pointer-events-none mt-2 sm:mt-4">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[2px] border-white/20 bg-[#1a1a1a] flex items-center justify-center shadow-lg overflow-hidden relative shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <Music size={10} className="text-white z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
                  </motion.div>
                  <motion.div animate={{ y: [-5, -20], opacity: [0, 1, 0], scale: [0.8, 1.2], x: [0, -8] }} transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }} className="absolute bottom-5 left-0 text-white/80">
                    <Music size={8} />
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-x-0 bottom-0 h-[55%] bg-[#1c1c1e] rounded-t-3xl rounded-b-[2.4rem] z-[100] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center px-4 py-3 border-b border-white/10 shrink-0">
                <div className="w-10 h-1 bg-white/20 rounded-full mb-3" />
                <div className="w-full flex items-center justify-between">
                  <div className="w-8" />
                  <span className="text-white text-sm font-bold">Comments <span className="text-white/50 text-xs font-normal">({getCommentCount(reelsData[activeHeroReel])})</span></span>
                  <div className="w-8" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {reelsData[activeHeroReel]?.commentsList?.map(comment => (
                  <div key={comment.id} className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      {comment.avatarImage ? (
                        <img src={comment.avatarImage} alt="DP" className="w-8 h-8 rounded-full object-cover shrink-0" />
                      ) : (
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${comment.avatarFrom} ${comment.avatarTo} shrink-0`} />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-white/70 font-bold text-xs">@{comment.user}</span>
                          <span className="text-white/40 text-[10px]">{comment.time}</span>
                        </div>
                        <p className="text-white/90 text-sm leading-snug mb-1.5">{comment.text}</p>
                        <div className="flex items-center gap-4 text-white/50 text-xs font-medium">
                          <button onClick={() => setReplyTo({ id: comment.id, user: comment.user })} className="hover:text-white transition-colors">Reply</button>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1 shrink-0 pt-2">
                        <button onClick={() => toggleCommentLike(comment.id)} className="transition-transform active:scale-90">
                          <Heart size={14} className={commentLikes[comment.id] ? "text-rose-500 fill-rose-500" : "text-white/50"} />
                        </button>
                        <span className="text-white/50 text-[10px]">{comment.likes + (commentLikes[comment.id] ? 1 : 0)}</span>
                      </div>
                    </div>
                    {comment.replies && comment.replies.map(reply => (
                      <div key={reply.id} className="flex gap-3 ml-11">
                        {reply.avatarImage ? (
                          <img src={reply.avatarImage} alt="DP" className="w-6 h-6 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${reply.avatarFrom} ${reply.avatarTo} shrink-0`} />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-white/70 font-bold text-[11px]">@{reply.user}</span>
                            <span className="text-white/40 text-[9px]">{reply.time}</span>
                          </div>
                          <p className="text-white/80 text-xs leading-snug mb-1.5">{reply.text}</p>
                          <div className="flex items-center gap-4 text-white/50 text-[10px] font-medium">
                            <button onClick={() => setReplyTo({ id: comment.id, user: reply.user })} className="hover:text-white transition-colors">Reply</button>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
                          <button onClick={() => toggleCommentLike(reply.id)} className="transition-transform active:scale-90">
                            <Heart size={12} className={commentLikes[reply.id] ? "text-rose-500 fill-rose-500" : "text-white/50"} />
                          </button>
                          <span className="text-white/50 text-[9px]">{reply.likes + (commentLikes[reply.id] ? 1 : 0)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="p-3 bg-[#1c1c1e] border-t border-white/10 shrink-0 mb-[64px]">
                {replyTo && (
                  <div className="flex justify-between items-center text-xs text-white/50 mb-2 px-1">
                    <span>Replying to <span className="text-white/80 font-bold">@{replyTo.user}</span></span>
                    <button onClick={() => setReplyTo(null)}><X size={12} /></button>
                  </div>
                )}
                <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex-shrink-0" />
                  <div className="flex-1 bg-white/10 rounded-full px-4 py-2 flex items-center border border-white/5 focus-within:border-[#FF4500]/50 transition-colors">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder={replyTo ? "Write a reply..." : "Add a comment..."}
                      className="bg-transparent text-white text-sm w-full focus:outline-none placeholder:text-white/40"
                    />
                    <button type="submit" disabled={!commentText.trim()} className="text-[#FF4500] disabled:opacity-50 ml-2">
                      <Send size={16} className={commentText.trim() ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"} />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSharePopup && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-x-0 bottom-0 bg-[#1c1c1e] rounded-b-[2.4rem] rounded-t-3xl z-[150] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto pb-[80px] pt-4 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center mb-4 px-2">
                <span className="text-white text-sm font-bold">Share to</span>
              </div>

              <div className="flex justify-around items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1 pb-4">
                <button onClick={handleCopyLink} className="flex flex-col items-center gap-2 min-w-[60px] group transition-transform active:scale-95">
                  <div className="w-[52px] h-[52px] rounded-full bg-gray-700/80 flex items-center justify-center text-white shadow-lg border border-white/10">
                    <Link size={22} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-white/80 text-[10px] font-medium">Copy Link</span>
                </button>
                <button onClick={(e) => handleSimulatedShare(e, "WhatsApp")} className="flex flex-col items-center gap-2 min-w-[60px] group transition-transform active:scale-95">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg border border-white/10">
                    <MessageCircle size={22} className="group-hover:scale-110 transition-transform fill-white" />
                  </div>
                  <span className="text-white/80 text-[10px] font-medium">WhatsApp</span>
                </button>
                <button onClick={(e) => handleSimulatedShare(e, "Instagram")} className="flex flex-col items-center gap-2 min-w-[60px] group transition-transform active:scale-95">
                  <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] flex items-center justify-center text-white shadow-lg border border-white/10">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform text-white">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-[10px] font-medium">Instagram</span>
                </button>
                <button onClick={(e) => handleSimulatedShare(e, "X.com")} className="flex flex-col items-center gap-2 min-w-[60px] group transition-transform active:scale-95">
                  <div className="w-[52px] h-[52px] rounded-full bg-black border border-white/20 flex items-center justify-center text-white shadow-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform text-white">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-[10px] font-medium">X.com</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
              className="absolute top-16 left-1/2 z-[300] bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-2xl pointer-events-none"
            >
              <Check size={14} className="text-[#FF4500]" strokeWidth={3} />
              <span className="text-white text-xs font-semibold tracking-wide">{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    );
  }

  return (
    <motion.div
      key="step-home-feed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col font-sans bg-[#0c0c10] text-white overflow-hidden pb-[64px]"
    >
      {/* Top Bar (Reddit-style Search Bar at Top - Collapsible on scroll) */}
      <div className={`flex items-center bg-[#0c0c10] px-3 gap-3 shrink-0 transition-all duration-300 ease-in-out border-b border-white/[0.08] ${
        isHeaderVisible ? 'h-[54px] opacity-100 pt-[12px] pb-[10px]' : 'h-0 opacity-0 overflow-hidden py-0 border-transparent'
      }`}>
        {/* Left/Center: Search input */}
        <div className="flex-1 bg-white/[0.05] border border-white/[0.08] focus-within:border-[#FF4500]/50 focus-within:bg-white/[0.08] rounded-xl p-[7px_12px] flex items-center gap-2 transition-all duration-200">
          <Search size={14} className="text-white/30 shrink-0" />
          <input
            type="text"
            ref={searchInputRef}
            className="flex-1 bg-transparent text-white text-[12.5px] outline-none placeholder:text-white/25"
            placeholder="Search questions, people, moods..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
          />
          {searchQuery.length > 0 && (
            <button onClick={() => setSearchQuery('')} className="shrink-0">
              <X size={12} className="text-white/30 hover:text-white/60 transition-colors" />
            </button>
          )}
        </div>

        {/* Right: Notifications Bell (only when search is NOT active/focused) */}
        {!isSearchFocused ? (
          <button 
            onClick={() => onNotificationsClick && onNotificationsClick()}
            className="w-8 h-8 rounded-full bg-white/[0.07] hover:bg-white/[0.12] active:scale-95 transition-all flex items-center justify-center relative shrink-0"
          >
            <Bell size={16} className="text-white" />
            {mockNotifications.filter(n => n.unread).length > 0 && (
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff5a1a] border-[1.5px] border-[#0c0c10] absolute top-1 right-1" />
            )}
          </button>
        ) : (
          /* Right: Cancel button (only when search is active/focused) */
          <button 
            onClick={() => {
              setSearchQuery('');
              setIsSearchFocused(false);
              if (searchInputRef.current) searchInputRef.current.blur();
            }} 
            className="text-[12px] text-white/50 hover:text-white/80 bg-transparent border-none shrink-0 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Main Scroll Content */}
      <div 
        ref={feedScrollRef}
        onScroll={handleScroll}
        onClick={() => setShowTagsForFeedIdx(null)}
        className="flex-1 overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {isSearchFocused ? (
          <div className="flex flex-col h-full bg-[#0c0c10]">
            {/* Search Tabs Selector (only when searching query) */}
            {searchQuery.length > 0 && (
              <div className="flex border-b border-[rgba(255,255,255,0.07)] mb-2 px-1 relative shrink-0">
                {['Questions', 'People', 'Moods', 'Vibes'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveResultTab(tab)}
                    className={`flex-1 py-2 text-[12px] font-medium transition-colors relative cursor-pointer ${activeResultTab === tab ? 'text-white' : 'text-white/35 hover:text-white/60'}`}
                  >
                    {tab}
                    {activeResultTab === tab && (
                      <motion.div layoutId="searchUnderline" className="absolute bottom-0 left-[15%] right-[15%] h-[2px] bg-[#FF4500] rounded-[1px]" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Scrollable results / explore items */}
            <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {searchScreenState === 'default' && (
                <div className="grid grid-cols-3 gap-[3px] auto-rows-[123px] grid-flow-dense pb-[10px] px-[6px] animate-fade-in pt-1">
                  {exploreGridItems.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => onPostClick && onPostClick(item)}
                      className="relative cursor-pointer active:scale-[0.98] transition-all duration-300 overflow-hidden shadow-lg"
                    >
                      <motion.div
                        animate={{ scale: [1.05, 1.15, 1.05], backgroundPosition: ['50% 50%', '60% 40%', '50% 50%'] }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear", delay: (index * 0.4) % 4 }}
                        className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
                        style={{ backgroundImage: `url(${item.img})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 z-10 pointer-events-none transition-colors duration-300" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 z-20 pointer-events-none" />

                      <div className="absolute bottom-0 left-0 p-2 w-full flex flex-col gap-[5px] z-20">
                        <p className="text-[11px] text-white/90 font-medium leading-[1.38] line-clamp-3 drop-shadow-md">{item.text}</p>
                      </div>

                      <div className="absolute top-1.5 right-1.5 text-[9.5px] text-white/70 bg-black/50 backdrop-blur-sm px-[5px] py-[1px] rounded-[5px] flex items-center gap-1 z-20">
                        <MessageCircle size={10} />
                        {item.replies}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchScreenState === 'focused_empty' && (
                <div className="flex flex-col animate-fade-in">
                  {recentSearches.length > 0 && (
                    <>
                      <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 py-2 mb-1">Recent searches</h3>
                      <div className="px-3 flex flex-col">
                        {recentSearches.map(item => (
                          <div key={item.id} onClick={() => handleRecentTap(item.text)} className="flex items-center gap-[9px] py-[7px] border-b border-[rgba(255,255,255,0.05)] cursor-pointer active:bg-white/5 transition-colors">
                            <div className="w-[30px] h-[30px] rounded-[8px] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center shrink-0">
                              {item.type === 'clock' ? <Clock size={14} className="text-white/40" /> : <User size={14} className="text-white/40" />}
                            </div>
                            <span className="flex-1 text-[11px] text-white/70 leading-[1.3]">{item.text}</span>
                            <button onClick={(e) => handleRemoveRecent(e, item.id)} className="p-1"><X size={14} className="text-white/20 hover:text-white/50" /></button>
                          </div>
                        ))}
                      </div>
                      <div className="h-[0.5px] bg-[rgba(255,255,255,0.07)] mx-3 my-[10px]" />
                    </>
                  )}

                  <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 mb-2 mt-1">Suggested</h3>
                  <div className="flex flex-wrap gap-[6px] px-3">
                    {["city life", "belonging", "isolation", "midnight", "nostalgia", "urban vibes"].map(keyword => (
                      <button
                        key={keyword}
                        onClick={() => handleRecentTap(keyword)}
                        className="px-[13px] py-[6px] rounded-[20px] border border-white/10 bg-white/5 text-[10px] font-medium text-white/70 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchScreenState === 'results' && activeResultTab === 'Questions' && (
                <div className="flex flex-col animate-fade-in">
                  <div className="flex flex-col">
                    {mockResultsCity.map((item, idx) => (
                      <div key={item.id} className="flex gap-[9px] py-2 px-3 border-b border-[rgba(255,255,255,0.05)] cursor-pointer active:bg-white/5 transition-colors" style={{ opacity: 1 - (idx * 0.15) }}>
                        <div className="w-[38px] h-[50px] rounded-[8px] shrink-0 relative overflow-hidden" style={{ backgroundColor: item.bg }}>
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                          <p className="text-[11px] font-medium text-white leading-[1.4] mb-[3px]">
                            {renderHighlightedText(item.question, searchQuery)}
                          </p>
                          <div className="flex items-center gap-[5px]">
                            <span className="text-[8px] px-[6px] py-[2px] rounded-[10px] border font-medium" style={{ borderColor: moodStyles[item.mood]?.border, color: moodStyles[item.mood]?.color }}>{item.mood}</span>
                            <span className="text-[9px] text-white/30">{item.answers} answers</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchScreenState === 'results' && activeResultTab === 'People' && (
                <div className="flex flex-col animate-fade-in">
                  <div className="flex flex-col">
                    {filteredPeople.map(item => {
                      const isFollowingUser = followedUsers.has(item.id);
                      return (
                        <div key={item.id} onClick={() => onUserSelect && onUserSelect(item.handle.replace('@', ''))} className="flex items-center gap-[9px] py-2 px-3 border-b border-[rgba(255,255,255,0.05)] cursor-pointer hover:bg-white/5 transition-colors">
                          {item.avatarImage ? (
                            <img src={item.avatarImage} alt={item.name} className="w-[36px] h-[36px] rounded-full shrink-0 object-cover border border-white/5" />
                          ) : (
                            <div className="w-[36px] h-[36px] rounded-full shrink-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 border border-white/5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-medium text-white mb-[1px] truncate">
                              {renderHighlightedText(item.handle, searchQuery)}
                            </p>
                            <p className="text-[10px] text-white/35 truncate">{item.name} • {item.followers} followers</p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); onFollowToggle && onFollowToggle(item.id); }}
                            className={`px-[12px] py-[4px] rounded-[20px] text-[10px] font-medium transition-colors shrink-0 ${isFollowingUser ? 'bg-transparent text-white/50 border border-white/15' : 'bg-[#FF4500] text-white border border-[#FF4500]'}`}
                          >
                            {isFollowingUser ? 'Following' : 'Follow'}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="h-[0.5px] bg-[rgba(255,255,255,0.07)] mx-3 my-[10px]" />
                  <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 mb-2">People you might know</h3>
                  <div className="flex flex-col">
                    {[
                      { id: 's1', name: 'Meera Talwar', handle: '@meera_t', followers: '1.1K' },
                      { id: 's2', name: 'Rohan Desai', handle: '@rohan_d', followers: '678' }
                    ].map(item => {
                      const isFollowingUser = followedUsers.has(item.id);
                      return (
                        <div key={item.id} onClick={() => onUserSelect && onUserSelect(item.handle.replace('@', ''))} className="flex items-center gap-[9px] py-2 px-3 border-b border-[rgba(255,255,255,0.05)] cursor-pointer hover:bg-white/5 transition-colors">
                          <div className="w-[36px] h-[36px] rounded-full shrink-0 bg-gradient-to-tr from-blue-500/30 to-green-500/30 border border-white/5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-medium text-white mb-[1px] truncate">{item.handle}</p>
                            <p className="text-[10px] text-white/35 truncate">{item.name} • {item.followers} followers</p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); onFollowToggle && onFollowToggle(item.id); }}
                            className={`px-[12px] py-[4px] rounded-[20px] text-[10px] font-medium transition-colors shrink-0 ${isFollowingUser ? 'bg-transparent text-white/50 border border-white/15' : 'bg-[#FF4500] text-white border border-[#FF4500]'}`}
                          >
                            {isFollowingUser ? 'Following' : 'Follow'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {searchScreenState === 'results' && activeResultTab === 'Questions' && (
                <div className="flex flex-col animate-fade-in">
                  <div className="flex flex-col">
                    {mockResultsCity.map((item, idx) => (
                      <div key={item.id} className="flex gap-[9px] py-2 px-3 border-b border-[rgba(255,255,255,0.05)] cursor-pointer active:bg-white/5 transition-colors" style={{ opacity: 1 - (idx * 0.15) }}>
                        <div className="w-[38px] h-[50px] rounded-[8px] shrink-0 relative overflow-hidden" style={{ backgroundColor: item.bg }}>
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                          <p className="text-[11px] font-medium text-white leading-[1.4] mb-[3px]">
                            {renderHighlightedText(item.question, searchQuery)}
                          </p>
                          <div className="flex items-center gap-[5px]">
                            <span className="text-[8px] px-[6px] py-[2px] rounded-[10px] border font-medium" style={{ borderColor: moodStyles[item.mood]?.border, color: moodStyles[item.mood]?.color }}>{item.mood}</span>
                            <span className="text-[9px] text-white/30">{item.answers} answers</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchScreenState === 'results' && activeResultTab === 'People' && (
                <div className="flex flex-col animate-fade-in">
                  <div className="flex flex-col">
                    {filteredPeople.map(item => {
                      const isFollowingUser = followedUsers.has(item.id);
                      return (
                        <div key={item.id} onClick={() => onUserSelect && onUserSelect(item.handle.replace('@', ''))} className="flex items-center gap-[9px] py-2 px-3 border-b border-[rgba(255,255,255,0.05)] cursor-pointer hover:bg-white/5 transition-colors">
                          {item.avatarImage ? (
                            <img src={item.avatarImage} alt={item.name} className="w-[36px] h-[36px] rounded-full shrink-0 object-cover border border-white/5" />
                          ) : (
                            <div className="w-[36px] h-[36px] rounded-full shrink-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 border border-white/5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-medium text-white mb-[1px] truncate">
                              {renderHighlightedText(item.handle, searchQuery)}
                            </p>
                            <p className="text-[10px] text-white/35 truncate">{item.name} • {item.followers} followers</p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); onFollowToggle && onFollowToggle(item.id); }}
                            className={`px-[12px] py-[4px] rounded-[20px] text-[10px] font-medium transition-colors shrink-0 ${isFollowingUser ? 'bg-transparent text-white/50 border border-white/15' : 'bg-[#FF4500] text-white border border-[#FF4500]'}`}
                          >
                            {isFollowingUser ? 'Following' : 'Follow'}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="h-[0.5px] bg-[rgba(255,255,255,0.07)] mx-3 my-[10px]" />
                  <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 mb-2">People you might know</h3>
                  <div className="flex flex-col">
                    {[
                      { id: 's1', name: 'Meera Talwar', handle: '@meera_t', followers: '1.1K' },
                      { id: 's2', name: 'Rohan Desai', handle: '@rohan_d', followers: '678' }
                    ].map(item => {
                      const isFollowingUser = followedUsers.has(item.id);
                      return (
                        <div key={item.id} onClick={() => onUserSelect && onUserSelect(item.handle.replace('@', ''))} className="flex items-center gap-[9px] py-2 px-3 border-b border-[rgba(255,255,255,0.05)] cursor-pointer hover:bg-white/5 transition-colors">
                          <div className="w-[36px] h-[36px] rounded-full shrink-0 bg-gradient-to-tr from-blue-500/30 to-green-500/30 border border-white/5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-medium text-white mb-[1px] truncate">{item.handle}</p>
                            <p className="text-[10px] text-white/35 truncate">{item.name} • {item.followers} followers</p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); onFollowToggle && onFollowToggle(item.id); }}
                            className={`px-[12px] py-[4px] rounded-[20px] text-[10px] font-medium transition-colors shrink-0 ${isFollowingUser ? 'bg-transparent text-white/50 border border-white/15' : 'bg-[#FF4500] text-white border border-[#FF4500]'}`}
                          >
                            {isFollowingUser ? 'Following' : 'Follow'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {searchScreenState === 'no_results' && (
                <div className="flex flex-col animate-fade-in pt-7">
                  <div className="flex flex-col items-center px-5 text-center mb-6">
                    <div className="w-[44px] h-[44px] rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mb-4">
                      <Search size={20} className="text-white/25" />
                    </div>
                    <h4 className="text-[13px] font-medium text-white mb-1">No results found</h4>
                    <p className="text-[11px] text-white/35 leading-[1.5]">Nothing matched "{searchQuery}". Try a different word, or browse moods below.</p>
                  </div>

                  <div className="h-[0.5px] bg-[rgba(255,255,255,0.07)] mx-3 mb-[12px]" />

                  <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 mb-2">Try searching for</h3>
                  <div className="flex flex-wrap gap-[6px] px-3 mb-6">
                    {["city", "trust", "loneliness", "healing", "home", "belonging"].map(keyword => (
                      <button
                        key={keyword}
                        onClick={() => handleRecentTap(keyword)}
                        className="px-[13px] py-[6px] rounded-[20px] border border-white/10 bg-white/5 text-[10px] font-medium text-white/70 hover:bg-white/10 transition-colors"
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>

                  <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 mb-[7px]">Trending instead</h3>
                  <div className="px-3 flex flex-col">
                    {exploreTrendingData.slice(0, 2).map((item) => (
                      <div key={item.id} className="flex gap-2 py-2 border-b border-[rgba(255,255,255,0.05)] cursor-pointer active:bg-white/5 transition-colors">
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="text-[11px] font-medium text-white leading-[1.4] mb-[2px] line-clamp-2">{item.question}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-white/30">{item.answers} answers • {item.mood}</span>
                          </div>
                        </div>
                        <div className="w-[40px] h-[52px] rounded-[7px] shrink-0 relative overflow-hidden" style={{ backgroundColor: item.bg }}>
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Default Posts List */
          <div className="flex flex-col pb-6">
            {reelsData.map((reel, idx) => (
                <div 
                  key={idx} 
                  ref={el => postRefs.current[idx] = el}
                  data-idx={idx}
                  className="w-full bg-[#0c0c10] border-b border-white/[0.07]"
                >
                  {/* Post Header */}
                  <div className="flex items-center gap-[10px] px-[14px] pt-[10px] pb-[8px]">
                    <div className="w-[36px] h-[36px] rounded-full shrink-0 flex items-center justify-center relative overflow-hidden bg-[#1a1a1a] border border-white/[0.08]">
                       {reel.avatarImage ? (
                         <img src={reel.avatarImage} alt={`@mystik_user_${idx+1}`} className="w-full h-full object-cover relative z-10" />
                       ) : (
                         <>
                           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600" />
                           <span className="relative text-[16px] leading-none">👤</span>
                         </>
                       )}
                    </div>
                    <div className="flex-1 flex flex-col">
                       <span className="text-[13px] font-medium text-white">@mystik_user_{idx+1}</span>
                       <div className="flex items-center gap-1 mt-0.5">
                         <span className="text-[10px] text-white/30">Just now</span>
                         <span className="text-[10px] text-white/30">·</span>
                         <span className="text-[9px] px-[7px] py-[1px] rounded-[10px] border border-white/20 text-white/70">
                           {reel.type}
                         </span>
                       </div>
                    </div>
                     <button 
                       className="text-white/30 hover:text-white transition-colors p-2 -mr-2 cursor-pointer" 
                       onClick={(e) => {
                         e.stopPropagation();
                         setActiveHeroReel(idx);
                         setShowMoreMenuIdx(idx);
                       }}
                     >
                       <MoreHorizontal size={18} />
                     </button>
                  </div>
                  
                  {/* Content Area */}
                  <div 
                    className="w-full relative pb-[100%] overflow-hidden bg-[#111] mt-1 cursor-pointer"
                    onClick={() => {
                      setActiveHeroReel(idx);
                      setViewingReel(true);
                    }}
                  >
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${reel.bgImage}')` }} />
                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute inset-x-0 bottom-3 px-3 flex flex-col items-start z-10 w-[85%] gap-2 pointer-events-none">
                      <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl p-3 sm:p-3.5 rounded-3xl rounded-bl-sm border border-white/40 shadow-xl inline-flex flex-col items-start text-left w-full relative overflow-visible pointer-events-auto cursor-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                        <p className="text-white text-[14px] sm:text-[15px] leading-snug font-black tracking-tight drop-shadow-md w-full">{reel.question}</p>
                        <div className="w-full flex justify-end mt-2 relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowTagsForFeedIdx(showTagsForFeedIdx === idx ? null : idx);
                            }}
                            className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 shadow-[0_0_6px_rgba(239,68,68,0.7)] hover:scale-125 transition-all cursor-pointer pointer-events-auto shrink-0 border border-white/20"
                          />

                          <AnimatePresence>
                            {showTagsForFeedIdx === idx && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                transition={{ type: "spring", damping: 15, stiffness: 200 }}
                                className="absolute bottom-8 right-0 z-[100] backdrop-blur-xl bg-[#1c1c1e]/95 border border-white/20 shadow-2xl p-1.5 rounded-xl flex flex-col gap-0.5 min-w-[110px] max-w-[160px] pointer-events-auto text-left"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {(reel.tags || [reel.type]).map((tag, tIdx) => (
                                  <div
                                    key={tIdx}
                                    className="text-white/90 hover:text-white text-[10px] font-semibold py-1 px-2.5 rounded-lg hover:bg-white/10 transition-colors"
                                  >
                                    {tag}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      
                      <div className="space-y-1.5 w-full pointer-events-auto cursor-auto" onClick={(e) => e.stopPropagation()}>
                        {reel.commentsList && reel.commentsList.slice(0, 2).map((comment, cidx) => (
                          <div key={cidx} className="flex items-start gap-1.5 origin-left">
                            {comment.avatarImage ? (
                              <img src={comment.avatarImage} alt="DP" className="w-5 h-5 rounded-full border border-white/50 flex-shrink-0 shadow-md object-cover mt-0" />
                            ) : (
                              <div className={`w-5 h-5 rounded-full border border-white/50 bg-gradient-to-tr ${comment.avatarFrom} ${comment.avatarTo} flex-shrink-0 shadow-md mt-0`} />
                            )}
                            <div className="bg-black/40 backdrop-blur-md p-1.5 px-2.5 rounded-2xl rounded-tl-sm border border-white/10 shadow-lg inline-block max-w-[90%]">
                              <p className="text-white/70 font-bold text-[8px] uppercase tracking-wide mb-px">@{comment.user}</p>
                              <p className="text-white text-[10px] leading-snug drop-shadow-sm line-clamp-1">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mute/Unmute Button overlay */}
                    <button 
                      onClick={toggleMute}
                      className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center bg-black/50 rounded-full backdrop-blur-sm border border-white/10 z-10 hover:bg-black/70 transition-colors"
                    >
                      {isMuted ? <VolumeX size={16} className="text-white" /> : <Volume2 size={16} className="text-white" />}
                    </button>
                    {reel.audioSrc && (
                      <audio 
                        ref={el => feedAudioRefs.current[idx] = el}
                        src={reel.audioSrc}
                        loop
                      />
                    )}
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-between px-[14px] py-[10px] pb-1">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 group" onClick={(e) => {
                          e.stopPropagation();
                          setActiveHeroReel(idx);
                          setShowComments(true);
                        }}>
                        <MessageCircle size={20} className="text-white/60" />
                        <span className="text-[12px] font-medium text-white/60">{getCommentCount(reel)}</span>
                      </button>
                      <button className="flex items-center gap-1.5 group" onClick={(e) => {
                          e.stopPropagation();
                          setFeedLikes(prev => ({ ...prev, [idx]: !prev[idx] }));
                        }}>
                        <Heart size={20} className={feedLikes[idx] ? "text-rose-500 fill-rose-500" : "text-white/60"} />
                        <span className="text-[12px] font-medium text-white/60">
                          {feedLikes[idx] ? `${parseFloat(reel.likes) + 0.1}` : reel.likes}
                        </span>
                      </button>
                      <button className="flex items-center gap-1.5 group" onClick={(e) => handleShare(e, reel, idx)}>
                        <Share2 size={20} className="text-white/60" />
                        <span className="text-[12px] font-medium text-white/60">{reel.shares}</span>
                      </button>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setFeedSaved(prev => ({ ...prev, [idx]: !prev[idx] })); }}>
                      <Bookmark size={20} className={feedSaved[idx] ? "text-white fill-white" : "text-white/60"} />
                    </button>
                  </div>
                  <div className="pb-3" />
                </div>
              ))}
            </div>
          )}
      </div>

      {/* Modal Backdrop for Feed */}
      <AnimatePresence>
        {(showComments || showSharePopup || showMoreMenuIdx !== null) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[90] bg-black/60 backdrop-blur-[2px]"
            onClick={(e) => {
              e.stopPropagation();
              setShowComments(false);
              setShowSharePopup(false);
              setShowMoreMenuIdx(null);
              setShowTagsForFeedIdx(null);
              setShowTagsForReelIdx(null);
              setReplyTo(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Post Options Drawer (3-dot menu) */}
      <AnimatePresence>
        {showMoreMenuIdx !== null && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 bg-[#1c1c1e] rounded-t-3xl rounded-b-[2.4rem] z-[100] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto pb-[80px] pt-4 px-4 border-t border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center shrink-0 mb-4">
              <div className="w-10 h-1 bg-white/20 rounded-full mb-3" />
              <span className="text-white text-sm font-bold">Post Options</span>
            </div>

            <div className="flex flex-col gap-2">
              {/* Ghost Mode Option */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMoreMenuIdx(null);
                }}
                className="flex items-center gap-4 w-full p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors border border-white/5 text-left group cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <EyeOff size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-xs">Ghost</h4>
                  <p className="text-white/40 text-[10px] mt-0.5">Block and hide this post and user footprint</p>
                </div>
              </button>

              {/* Report Option */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMoreMenuIdx(null);
                }}
                className="flex items-center gap-4 w-full p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors border border-white/5 active:scale-[0.98] text-left group"
              >
                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-xs">Report Content</h4>
                  <p className="text-white/40 text-[10px] mt-0.5">Flag inappropriate or rule-violating posts</p>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 h-[55%] bg-[#1c1c1e] rounded-t-3xl rounded-b-[2.4rem] z-[100] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center px-4 py-3 border-b border-white/10 shrink-0">
              <div className="w-10 h-1 bg-white/20 rounded-full mb-3" />
              <div className="w-full flex items-center justify-between">
                <div className="w-8" />
                <span className="text-white text-sm font-bold">Comments <span className="text-white/50 text-xs font-normal">({getCommentCount(reelsData[activeHeroReel])})</span></span>
                <div className="w-8" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {reelsData[activeHeroReel]?.commentsList?.map(comment => (
                <div key={comment.id} className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    {comment.avatarImage ? (
                      <img src={comment.avatarImage} alt="DP" className="w-8 h-8 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${comment.avatarFrom} ${comment.avatarTo} shrink-0`} />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white/70 font-bold text-xs">@{comment.user}</span>
                        <span className="text-white/40 text-[10px]">{comment.time}</span>
                      </div>
                      <p className="text-white/90 text-sm leading-snug mb-1.5">{comment.text}</p>
                      <div className="flex items-center gap-4 text-white/50 text-xs font-medium">
                        <button onClick={() => setReplyTo({ id: comment.id, user: comment.user })} className="hover:text-white transition-colors">Reply</button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 shrink-0 pt-2">
                      <button onClick={() => toggleCommentLike(comment.id)} className="transition-transform active:scale-90">
                        <Heart size={14} className={commentLikes[comment.id] ? "text-rose-500 fill-rose-500" : "text-white/50"} />
                      </button>
                      <span className="text-white/50 text-[10px]">{comment.likes + (commentLikes[comment.id] ? 1 : 0)}</span>
                    </div>
                  </div>
                  {comment.replies && comment.replies.map(reply => (
                    <div key={reply.id} className="flex gap-3 ml-11">
                      {reply.avatarImage ? (
                        <img src={reply.avatarImage} alt="DP" className="w-6 h-6 rounded-full object-cover shrink-0" />
                      ) : (
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${reply.avatarFrom} ${reply.avatarTo} shrink-0`} />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-white/70 font-bold text-[11px]">@{reply.user}</span>
                          <span className="text-white/40 text-[9px]">{reply.time}</span>
                        </div>
                        <p className="text-white/80 text-xs leading-snug mb-1.5">{reply.text}</p>
                        <div className="flex items-center gap-4 text-white/50 text-[10px] font-medium">
                          <button onClick={() => setReplyTo({ id: comment.id, user: reply.user })} className="hover:text-white transition-colors">Reply</button>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
                        <button onClick={() => toggleCommentLike(reply.id)} className="transition-transform active:scale-90">
                          <Heart size={12} className={commentLikes[reply.id] ? "text-rose-500 fill-rose-500" : "text-white/50"} />
                        </button>
                        <span className="text-white/50 text-[9px]">{reply.likes + (commentLikes[reply.id] ? 1 : 0)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="p-3 bg-[#1c1c1e] border-t border-white/10 shrink-0 mb-[64px]">
              {replyTo && (
                <div className="flex justify-between items-center text-xs text-white/50 mb-2 px-1">
                  <span>Replying to <span className="text-white/80 font-bold">@{replyTo.user}</span></span>
                  <button onClick={() => setReplyTo(null)}><X size={12} /></button>
                </div>
              )}
              <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex-shrink-0" />
                <div className="flex-1 bg-white/10 rounded-full px-4 py-2 flex items-center border border-white/5 focus-within:border-[#FF4500]/50 transition-colors">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={replyTo ? "Write a reply..." : "Add a comment..."}
                    className="bg-transparent text-white text-sm w-full focus:outline-none placeholder:text-white/40"
                  />
                  <button type="submit" disabled={!commentText.trim()} className="text-[#FF4500] disabled:opacity-50 ml-2">
                    <Send size={16} className={commentText.trim() ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSharePopup && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 bg-[#1c1c1e] rounded-b-[2.4rem] rounded-t-3xl z-[150] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto pb-[80px] pt-4 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center mb-4 px-2">
              <span className="text-white text-sm font-bold">Share to</span>
            </div>

            <div className="flex justify-around items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1 pb-4">
              <button onClick={handleCopyLink} className="flex flex-col items-center gap-2 min-w-[60px] group transition-transform active:scale-95">
                <div className="w-[52px] h-[52px] rounded-full bg-gray-700/80 flex items-center justify-center text-white shadow-lg border border-white/10">
                  <Link size={22} className="group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-white/80 text-[10px] font-medium">Copy Link</span>
              </button>
              <button onClick={(e) => handleSimulatedShare(e, "WhatsApp")} className="flex flex-col items-center gap-2 min-w-[60px] group transition-transform active:scale-95">
                <div className="w-[52px] h-[52px] rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg border border-white/10">
                  <MessageCircle size={22} className="group-hover:scale-110 transition-transform fill-white" />
                </div>
                <span className="text-white/80 text-[10px] font-medium">WhatsApp</span>
              </button>
              <button onClick={(e) => handleSimulatedShare(e, "Instagram")} className="flex flex-col items-center gap-2 min-w-[60px] group transition-transform active:scale-95">
                <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] flex items-center justify-center text-white shadow-lg border border-white/10">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform text-white">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <span className="text-white/80 text-[10px] font-medium">Instagram</span>
              </button>
              <button onClick={(e) => handleSimulatedShare(e, "X.com")} className="flex flex-col items-center gap-2 min-w-[60px] group transition-transform active:scale-95">
                <div className="w-[52px] h-[52px] rounded-full bg-black border border-white/20 flex items-center justify-center text-white shadow-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform text-white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span className="text-white/80 text-[10px] font-medium">X.com</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
            className="absolute top-16 left-1/2 z-[300] bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-2xl pointer-events-none"
          >
            <Check size={14} className="text-[#FF4500]" strokeWidth={3} />
            <span className="text-white text-xs font-semibold tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default FeedScreen;