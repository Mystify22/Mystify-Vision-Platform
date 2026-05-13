import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash, Home, PlusSquare, MessageCircle, User, Heart, Share2, VolumeX, X, Send, Clock, Bell, Plus, Ghost, Lock, Inbox, Wifi, Battery, Edit, ChevronRight, MoreHorizontal, ArrowRight, BellOff, Trash } from 'lucide-react';
import { vibeData, vibeCategories, musicData, musicCategories, moods, moodStyles, audiences, exploreRecentItems, exploreTrendingData, mockResultsCity, mockResultsRiya, exploreGridItems, mockConversationsData, moodColors } from './MockData';

import userAvatar from '../../../assets/avatar.png';
import coverImage from '../../../assets/cover.png';

const ProfileScreen = ({ username = "ghost_mind", onMessageUser, followedUsers, onFollowToggle, userProfileData, onEditProfile, onOpenSettings }) => {
  const [activeTab, setActiveTab] = useState("Posts");
  const [showOtherUserActions, setShowOtherUserActions] = useState(false);
  const [viewingMedia, setViewingMedia] = useState(null);
  const streakDays = 30;

  const isOwnProfile = userProfileData && username === userProfileData.username;
  const profileTabs = isOwnProfile ? ["Posts", "Replies", "Saved"] : ["Posts", "Replies"];

  const userProfile = mockResultsRiya.find(u => u.handle === username || u.handle === `@${username}`);
  const displayAvatar = isOwnProfile ? null : (userProfile?.avatarImage || userAvatar);
  const isFollowing = followedUsers?.has(userProfile?.id);
  const displayBio = isOwnProfile ? userProfileData.bio : "Anonymous thoughts. Questions nobody dares ask out loud.";

  const samplePosts = [
    { mood: "avenger", text: "Part of the journey is the end. I love you 3000.", replies: 300, bg: "#8b0000", img: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=400&q=80&fit=crop" },
    { mood: "thought", text: "What if your inner voice isn't even yours?", replies: 61, bg: "#0d0d0d", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80&fit=crop" },
    { mood: "raw", text: "The mask you wear becomes your face.", replies: 112, bg: "#0f0f0f", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80&fit=crop" },
    { mood: "quiet", text: "Silence is just noise nobody taught you to hear.", replies: 39, bg: "#101010", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80&fit=crop" },
    { mood: "anon", text: "Would you say it if your name was on it?", replies: 77, bg: "#111", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80&fit=crop" },
    { mood: "late night", text: "3am thoughts hit different.", replies: 53, bg: "#0d0d0d", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&fit=crop" },
  ];

  const sampleReplies = [
    { username: "ghost_mind", time: "2h", to: "void_speaks", text: "Anonymity isn't cowardice. Sometimes it's the only way truth survives.", likes: "412", retweets: "88", comments: "34" },
    { username: "ghost_mind", time: "1d", to: "nobody_asked__", text: "Loneliness isn't about being alone. It's about not being seen.", likes: "1.1K", retweets: "344", comments: "92" }
  ];

  const sampleSaved = [
    { mood: "urban", text: "Is loneliness different when surrounded by millions?", replies: 189, bg: "#1a2a3a", img: "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=400&q=80&fit=crop" },
    { mood: "mind", text: "What do you do when you feel stuck but not unhappy?", replies: 134, bg: "#2d1b4e", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80&fit=crop" },
    { mood: "anon", text: "Can you ever fully trust someone you met online?", replies: 76, bg: "#3a1a2a", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80&fit=crop" }
  ];

  const renderGrid = (posts) => (
    <div className="grid grid-cols-3 gap-[2px] p-[2px]">
      {posts.map((post, idx) => (
        <div key={idx} className="aspect-[0.85] rounded-[3px] overflow-hidden relative cursor-pointer group" style={{ backgroundColor: post.bg }}>
          <motion.div
            animate={{ scale: [1.05, 1.15, 1.05], backgroundPosition: ['50% 50%', '60% 40%', '50% 50%'] }}
            transition={{ repeat: Infinity, duration: 25 + idx, ease: "linear" }}
            className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none opacity-60"
            style={{ backgroundImage: `url('${post.img}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 p-2 w-full flex flex-col gap-[5px] z-20">
            <span className="self-start text-[9.5px] uppercase bg-black/60 backdrop-blur-sm text-[#ddd] px-[4px] py-[2px] rounded-[3px] font-bold tracking-wider">{post.mood}</span>
            <p className="text-[11px] text-white/90 font-dmsans font-medium leading-[1.38] line-clamp-3 drop-shadow-md">{post.text}</p>
          </div>
          <div className="absolute top-1.5 right-1.5 text-[9.5px] text-white/70 bg-black/50 backdrop-blur-sm px-[5px] py-[1px] rounded-[5px] flex items-center gap-1 z-20">
            <i className="ti ti-message-circle text-[10px]"></i>
            {post.replies}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      key="step-profile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col bg-[#0a0a0a] overflow-y-auto overflow-x-hidden pb-[64px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Syne:wght@600;700;800&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />


      {/* 1. COVER BANNER */}
      <div
        className="relative h-[110px] bg-[#111] shrink-0 overflow-hidden cursor-pointer"
        style={isOwnProfile ? { backgroundColor: userProfileData.coverColor } : {}}
        onClick={() => setViewingMedia({
          type: isOwnProfile ? 'color' : 'image',
          value: isOwnProfile ? userProfileData.coverColor : (userProfile?.coverImage || coverImage),
          isCover: true
        })}
      >
        {!isOwnProfile && <img src={userProfile?.coverImage || coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />}
        <div className="absolute bottom-0 inset-x-0 h-[70px] bg-gradient-to-b from-transparent to-[#0a0a0a]"></div>
      </div>

      {/* 2. AVATAR ROW */}
      <div className="relative z-10 px-5 flex justify-between items-end" style={{ marginTop: '-44px' }}>
        <div className="relative">
          <div 
            className="w-[82px] h-[82px] rounded-full bg-[#1c1c1c] border-2 border-[#2a2a2a] p-[2px] flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => setViewingMedia({
              type: (isOwnProfile && !userProfileData.avatarValue?.startsWith('http')) ? 'text' : 'image',
              value: isOwnProfile ? userProfileData.avatarValue : displayAvatar,
              isCover: false
            })}
          >
            {isOwnProfile ? (
              userProfileData.avatarValue?.startsWith('http') ? (
                <img src={userProfileData.avatarValue} alt="DP" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-[34px] text-white">{userProfileData.avatarValue}</span>
              )
            ) : (
              <img src={displayAvatar} alt="DP" className="w-full h-full rounded-full object-cover" />
            )}
          </div>
        </div>

        <div className="flex gap-2 pb-1">
          <button onClick={isOwnProfile ? onOpenSettings : () => setShowOtherUserActions(!showOtherUserActions)} className="w-[34px] h-[34px] rounded-full bg-[#111] border border-[#222] flex items-center justify-center hover:bg-[#1a1a1a] transition-colors">
            <i className="ti ti-dots text-[#666] text-[16px]"></i>
          </button>

          {username !== (userProfileData?.username || "ghost_mind") && (
            <button onClick={onMessageUser} className="w-[34px] h-[34px] rounded-full bg-[#111] border border-[#222] flex items-center justify-center hover:bg-[#1a1a1a] transition-colors">
              <i className="ti ti-mail text-[#666] text-[16px]"></i>
            </button>
          )}

          {isOwnProfile ? (
            <button onClick={onEditProfile} className="h-[34px] rounded-[17px] bg-[#111] border border-[#333] px-[18px] text-white font-dmsans font-semibold text-[13px] hover:bg-[#1a1a1a] transition-colors">
              Edit Profile
            </button>
          ) : (
            <button
              onClick={() => onFollowToggle && onFollowToggle(userProfile?.id)}
              className={`h-[34px] rounded-[17px] px-[18px] text-white font-dmsans font-semibold text-[13px] transition-colors ${isFollowing
                  ? 'bg-transparent border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.05)]'
                  : 'bg-[#FF4500] hover:bg-[#ff5722]'
                }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
      </div>

      {/* 3. USER INFO */}
      <div className="px-5 mt-4 shrink-0">
        <h1 className="font-dmsans font-bold text-white text-[20px] mb-1 leading-normal pb-1">{username}</h1>
        <p className="font-dmsans font-normal text-[#888] text-[13.5px] leading-[1.65] mb-4 whitespace-pre-wrap">{displayBio}</p>
      </div>

      {/* 4. STATS ROW */}
      <div className="px-5 mb-5 shrink-0">
        <div className="flex border border-[#1a1a1a] rounded-[14px] overflow-hidden relative">
          <div className="flex-1 flex flex-col items-center py-[12px] relative">
            <span className="font-dmsans font-bold text-[18px] text-white">348</span>
            <span className="text-[10px] text-[#666] uppercase tracking-[0.06em] mt-[3px]">POSTS</span>
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-[#1a1a1a]"></div>
          </div>
          <div className="flex-1 flex flex-col items-center py-[12px] relative">
            <span className="font-dmsans font-bold text-[18px] text-white">12.4K</span>
            <span className="text-[10px] text-[#666] uppercase tracking-[0.06em] mt-[3px]">FOLLOWERS</span>
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-[#1a1a1a]"></div>
          </div>
          <div className="flex-1 flex flex-col items-center py-[12px]">
            <span className="font-dmsans font-bold text-[18px] text-white">89</span>
            <span className="text-[10px] text-[#666] uppercase tracking-[0.06em] mt-[3px]">FOLLOWING</span>
          </div>
        </div>
      </div>

      {/* 5. GAMIFICATION & LEADERBOARD WIDGET (Minimal Strip) */}
      <div className="px-5 mb-[18px] shrink-0">
        <div className="h-[48px] rounded-[14px] bg-[#111] border border-[#1e1e1e] flex items-center justify-between px-4 cursor-pointer hover:bg-[#151515] transition-colors relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>

          <div className="flex items-center gap-3 z-10">
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="text-[14px]">🔥</span>
              <span className="font-dmsans font-bold text-[#e8e8e8] text-[14px]">{streakDays}</span>
            </div>
            <div className="w-[1px] h-[12px] bg-[#333]"></div>
            <span className="font-dmsans font-bold text-[#e8e8e8] text-[14px] tracking-wide">3,000 PTS</span>
          </div>

          <div className="flex items-center gap-2 z-10">
            <span className="text-[#666] text-[12px] font-dmsans">Rank #43</span>
            <i className="ti ti-chevron-right text-[#444] text-[14px]"></i>
          </div>
        </div>
      </div>

      {/* 6. STICKY TABS BAR */}
      <div className="sticky top-0 z-30 bg-[#0a0a0a] border-b border-[#141414] flex px-2 shrink-0">
        {profileTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-[11px] pt-[13px] font-dmsans font-medium text-[12.5px] tracking-[0.02em] border-b-[1.5px] -mb-[1px] transition-colors ${activeTab === tab ? 'text-[#d0d0d0] border-[#d0d0d0]' : 'text-[#3a3a3a] border-transparent'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 7. TAB PANELS */}
      <div className="flex-1 bg-[#0a0a0a] pt-1">
        {activeTab === "Posts" && renderGrid(samplePosts)}

        {activeTab === "Replies" && (
          <div className="flex flex-col">
            {sampleReplies.map((reply, idx) => (
              <div key={idx} className="flex gap-[11px] p-[15px_20px] border-b border-[#0f0f0f]">
                <div className="w-[34px] h-[34px] rounded-full bg-[#141414] border border-[#1e1e1e] flex items-center justify-center shrink-0">
                  <i className="ti ti-ghost text-[#333] text-[16px]"></i>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-[6px]">
                    <span className="font-syne font-semibold text-[#aaa] text-[13px]">{reply.username}</span>
                    <span className="text-[#2e2e2e] text-[11px]">· {reply.time}</span>
                  </div>
                  <div className="text-[11.5px] text-[#2e2e2e] mb-[4px]">
                    replying to <span className="text-[#555]">@{reply.to}</span>
                  </div>
                  <p className="font-dmsans font-light text-[#888] text-[13.5px] leading-[1.6]">{reply.text}</p>
                  <div className="flex gap-[16px] mt-[9px]">
                    <div className="flex items-center gap-[4px] text-[#2e2e2e] text-[12px] group cursor-pointer hover:text-[#e8643a]">
                      <i className="ti ti-heart group-hover:text-[#e8643a]"></i> {reply.likes}
                    </div>
                    <div className="flex items-center gap-[4px] text-[#2e2e2e] text-[12px] cursor-pointer hover:text-[#555]">
                      <i className="ti ti-repeat"></i> {reply.retweets}
                    </div>
                    <div className="flex items-center gap-[4px] text-[#2e2e2e] text-[12px] cursor-pointer hover:text-[#555]">
                      <i className="ti ti-message-circle"></i> {reply.comments}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Saved" && renderGrid(sampleSaved)}
      </div>

      {/* Invisible overlay for dropdown */}
      {showOtherUserActions && !isOwnProfile && (
        <div 
          onClick={() => setShowOtherUserActions(false)}
          className="absolute inset-0 z-40"
        />
      )}

      <AnimatePresence>
        {showOtherUserActions && !isOwnProfile && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-[105px] right-[20px] w-[160px] bg-[#111] border border-[#222] rounded-[12px] shadow-2xl overflow-hidden z-50 flex flex-col"
          >
            <button onClick={() => setShowOtherUserActions(false)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a1a] transition-colors text-left group border-b border-[#222]">
              <Ghost className="w-4 h-4 text-[#888] group-hover:text-white transition-colors" />
              <span className="text-[13px] font-dmsans font-medium text-[#aaa] group-hover:text-white transition-colors">Ghost User</span>
            </button>
            <button onClick={() => setShowOtherUserActions(false)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a1a] transition-colors text-left group border-b border-[#222]">
              <VolumeX className="w-4 h-4 text-[#888] group-hover:text-white transition-colors" />
              <span className="text-[13px] font-dmsans font-medium text-[#aaa] group-hover:text-white transition-colors">Mute</span>
            </button>
            <button onClick={() => setShowOtherUserActions(false)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a1a] transition-colors text-left group border-b border-[#222]">
              <Share2 className="w-4 h-4 text-[#888] group-hover:text-white transition-colors" />
              <span className="text-[13px] font-dmsans font-medium text-[#aaa] group-hover:text-white transition-colors">Share</span>
            </button>
            <button onClick={() => setShowOtherUserActions(false)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-colors text-left group">
              <X className="w-4 h-4 text-[#888] group-hover:text-red-500 transition-colors" />
              <span className="text-[13px] font-dmsans font-medium text-[#aaa] group-hover:text-red-500 transition-colors">Report</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. MEDIA VIEWER MODAL */}
      <AnimatePresence>
        {viewingMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setViewingMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative overflow-hidden shadow-2xl flex items-center justify-center ${
                viewingMedia.isCover ? 'w-full aspect-[21/9] rounded-[16px]' : 'w-[250px] h-[250px] rounded-full bg-[#111] border-[4px] border-[#222]'
              }`}
              style={viewingMedia.type === 'color' ? { backgroundColor: viewingMedia.value } : {}}
              onClick={(e) => e.stopPropagation()}
            >
              {viewingMedia.type === 'image' && (
                <img src={viewingMedia.value} alt="Expanded Media" className="w-full h-full object-cover" />
              )}
              {viewingMedia.type === 'text' && (
                <span className="text-[100px] text-white">{viewingMedia.value}</span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
export default ProfileScreen;