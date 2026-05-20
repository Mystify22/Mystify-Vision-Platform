import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Music, Volume2, Search, MessageCircle, Heart, Share2, VolumeX, X, Send, Bell, Plus, MoreHorizontal, Link, TrendingUp, Bookmark, Inbox, Check, EyeOff, AlertTriangle } from 'lucide-react';
import { initialHeroReels } from './MockData';
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

const moodStylesMapping = {
  Curious: { border: 'border-[#4d90d7]/40', text: 'text-[#4d90d7]/90' },
  Vulnerable: { border: 'border-[#9f7fda]/40', text: 'text-[#9f7fda]/90' },
  Frustrated: { border: 'border-[#da7f7f]/40', text: 'text-[#da7f7f]/90' },
  Hopeful: { border: 'border-[#7fda9f]/40', text: 'text-[#7fda9f]/90' },
  Nostalgic: { border: 'border-[#dab87f]/40', text: 'text-[#dab87f]/90' },
};

const FeedScreen = ({ initialMode = "feed", onBackFromReels, onInboxClick }) => {
  // Existing state for Reels
  const [reelsData, setReelsData] = useState(initialHeroReels);
  const [activeHeroReel, setActiveHeroReel] = useState(0);
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
  const [toastMessage, setToastMessage] = useState("");
  const feedAudioRefs = useRef({});
  const postRefs = useRef({});
  const reelScrollRef = useRef(null);
  const feedScrollRef = useRef(null);

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
  }, [viewingReel]);

  // Intersection Observer for Feed
  useEffect(() => {
    if (viewingReel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveFeedIdx(Number(entry.target.dataset.idx));
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
    const newComment = {
      id: Date.now(),
      user: "mystik_user",
      text: replyTo ? `@${replyTo.user} ${commentText}` : commentText,
      likes: 0,
      time: "Just now",
      avatarFrom: "from-indigo-500",
      avatarTo: "to-purple-500",
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
    const shareUrl = `https://mystify.me/post/${reelsData[activeHeroReel]?.id || activeHeroReel}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setToastMessage("Link copied to clipboard!");
      setShowSharePopup(false);
      setTimeout(() => setToastMessage(""), 2000);
    }).catch(err => {
      console.error("Clipboard copy failed: ", err);
      setToastMessage("Link copied!");
      setShowSharePopup(false);
      setTimeout(() => setToastMessage(""), 2000);
    });
  };

  const handleSimulatedShare = (e, platform) => {
    e.stopPropagation();
    setToastMessage(`Shared to ${platform}!`);
    setShowSharePopup(false);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleHeroScroll = (e) => {
    const idx = Math.round(e.target.scrollTop / e.target.clientHeight);
    if (idx !== activeHeroReel) {
      setActiveHeroReel(idx);
      setIsReelLiked(false);
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
            if (showComments || showSharePopup) {
              setShowComments(false);
              setShowSharePopup(false);
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
                  className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl p-3.5 sm:p-4 rounded-3xl rounded-bl-sm border border-white/40 shadow-xl inline-flex flex-col items-start text-left w-[95%] relative overflow-hidden mb-1 pointer-events-auto cursor-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                  <div className="w-full flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full border border-white/30 shadow-md overflow-hidden flex-shrink-0 bg-[#1c1c1c]">
                        <img src={userAvatar} alt="DP" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-white/90 font-bold text-[11px] tracking-wide mt-[1px]">@ghost_mind</span>
                    </div>
                    <div className="text-white/90 text-[8px] font-black uppercase tracking-widest flex items-center gap-1 bg-black/20 pr-2.5 pl-1.5 py-[3px] rounded-full shadow-inner border border-white/10">
                      <div className="w-3 h-3 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm shadow-sm">
                        <Sparkles size={7} className="text-white" strokeWidth={3} />
                      </div>
                      <span className="mt-[1px]">{reel.type}</span>
                    </div>
                  </div>

                  <p className="text-white text-[15px] sm:text-base leading-snug font-black tracking-tight drop-shadow-md">{reel.question}</p>
                </motion.div>

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
                  <span className="text-white font-bold text-[9px] sm:text-[10px]">{reel.comments}</span>
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
                  <span className="text-white text-sm font-bold">Comments <span className="text-white/50 text-xs font-normal">({reelsData[activeHeroReel]?.commentsList?.length || 0})</span></span>
                  <div className="w-8" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {reelsData[activeHeroReel]?.commentsList?.map(comment => (
                  <div key={comment.id} className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${comment.avatarFrom} ${comment.avatarTo} shrink-0`} />
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
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${reply.avatarFrom} ${reply.avatarTo} shrink-0`} />
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
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-[#0c0c10] border-b border-white/[0.08] pt-[10px] pb-[8px] px-[14px]">
        <div className="flex">
          <button className="w-8 h-8 rounded-full bg-white/[0.07] flex items-center justify-center relative">
            <Bell size={16} className="text-white" />
          </button>
        </div>
        <div className="flex">
          <button onClick={() => onInboxClick && onInboxClick()} className="w-8 h-8 rounded-full bg-white/[0.07] flex items-center justify-center relative">
            <AgentMessageIcon size={22} className="text-white" />
            <div className="w-2 h-2 rounded-full bg-[#ff5a1a] border-[1.5px] border-[#0c0c10] absolute top-0.5 right-0.5" />
          </button>
        </div>
      </div>

      {/* Main Scroll Content */}
      <div 
        ref={feedScrollRef}
        className="flex-1 overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        
            {/* Posts List */}
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
                    <div className="w-[36px] h-[36px] rounded-full shrink-0 flex items-center justify-center relative overflow-hidden bg-[#1a1a1a]">
                       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600" />
                       <span className="relative text-[16px] leading-none">👤</span>
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
                    
                    <div className="absolute top-3 left-3 bg-black/55 rounded-[6px] px-[8px] py-[3px] text-[10px] font-semibold text-white tracking-[0.05em] uppercase backdrop-blur-md border border-white/10 z-10">
                      {reel.type}
                    </div>

                    <div className="absolute inset-x-0 bottom-3 px-3 flex flex-col items-start z-10 w-[85%] gap-2 pointer-events-none">
                      <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl p-3 sm:p-3.5 rounded-3xl rounded-bl-sm border border-white/40 shadow-xl inline-flex flex-col items-start text-left w-full relative overflow-hidden pointer-events-auto cursor-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                        <p className="text-white text-[14px] sm:text-[15px] leading-snug font-black tracking-tight drop-shadow-md">{reel.question}</p>
                      </div>
                      
                      <div className="space-y-1.5 w-full pointer-events-auto cursor-auto" onClick={(e) => e.stopPropagation()}>
                        {reel.commentsList && reel.commentsList.slice(0, 2).map((comment, cidx) => (
                          <div key={cidx} className="flex items-start gap-1.5 origin-left">
                            <div className={`w-5 h-5 rounded-full border border-white/50 bg-gradient-to-tr ${comment.avatarFrom} ${comment.avatarTo} flex-shrink-0 shadow-md mt-0`} />
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
                        <span className="text-[12px] font-medium text-white/60">{reel.comments}</span>
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
                  <h4 className="text-white font-bold text-xs">Ghost Mode</h4>
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
                <span className="text-white text-sm font-bold">Comments <span className="text-white/50 text-xs font-normal">({reelsData[activeHeroReel]?.commentsList?.length || 0})</span></span>
                <div className="w-8" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {reelsData[activeHeroReel]?.commentsList?.map(comment => (
                <div key={comment.id} className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${comment.avatarFrom} ${comment.avatarTo} shrink-0`} />
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
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${reply.avatarFrom} ${reply.avatarTo} shrink-0`} />
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