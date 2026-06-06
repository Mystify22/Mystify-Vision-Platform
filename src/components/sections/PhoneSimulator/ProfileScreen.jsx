import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash, Home, PlusSquare, MessageCircle, User, Heart, Share2, VolumeX, X, Send, Clock, Bell, Plus, Ghost, Lock, Inbox, Wifi, Battery, Edit, ChevronRight, MoreHorizontal, ArrowRight, BellOff, Trash } from 'lucide-react';
import { mockResultsRiya, RANDOM_AVATARS } from './MockData';

import userAvatar from '../../../assets/avatar.png';
import coverImage from '../../../assets/cover.png';

const suggestionPool = [
  { id: 's1_s', name: 'Lofi Girl', handle: 'lofi_girl', followers: '15.4K', avatarImage: 'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778678501/mystify/avatar/emoji/lb7ixainlbv9jvfcr1me.png' },
  { id: 's2_s', name: 'Chill Coder', handle: 'chill_coder', followers: '8.2K', avatarImage: 'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677775/mystify/avatar/toons/k1rmm5xzxswqbquhfvru.png' },
  { id: 's3_s', name: 'Mystik Creator', handle: 'mystik_creator', followers: '12.1K', avatarImage: 'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677792/mystify/avatar/toons/nmtd07q2smonyjbzikpy.png' },
  { id: 's4_s', name: 'Code Ninja', handle: 'code_ninja', followers: '24.5K', avatarImage: 'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778672646/mystify/avatar/monx/wyczrngu7tdr17eeazdr.png' },
  { id: 's5_s', name: 'Sarah Vibes', handle: 'sarah_vibes', followers: '6.7K', avatarImage: 'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778678519/mystify/avatar/emoji/lgcuzinacrehpwqwwuf0.png' },
  { id: 's6_s', name: 'Otaku Warrior', handle: 'otaku_warrior', followers: '11.8K', avatarImage: 'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677363/mystify/avatar/peeps/t223xorxsp8xudqmgmvz.png' }
];

const ProfileScreen = ({ username = "ghost_mind", onMessageUser, followedUsers, onFollowToggle, userProfileData, onEditProfile, onOpenSettings, onOpenStreak, onNavigateToProfile }) => {
  const [activeTab, setActiveTab] = useState("Posts");
  const [showOtherUserActions, setShowOtherUserActions] = useState(false);
  const [viewingMedia, setViewingMedia] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followListType, setFollowListType] = useState(null); // 'followers' or 'following'
  const [followSearchQuery, setFollowSearchQuery] = useState('');
  const streakDays = 30;

  const [prevUsername, setPrevUsername] = useState(username);
  if (username !== prevUsername) {
    setPrevUsername(username);
    setShowSuggestions(false);
    setShowFollowModal(false);
    setFollowSearchQuery('');
  }

  const cleanUsername = username.replace('@', '');
  const isOwnProfile = userProfileData && cleanUsername === userProfileData.username;
  const profileTabs = isOwnProfile ? ["Posts", "Replies", "Saved"] : ["Posts", "Replies"];

  const userProfile = mockResultsRiya.find(u => u.handle.replace('@', '') === cleanUsername) ||
    suggestionPool.find(u => u.handle.replace('@', '') === cleanUsername);
  const displayAvatar = isOwnProfile ? null : (userProfile?.avatarImage || userAvatar);
  const isFollowing = followedUsers?.has(userProfile?.id);
  const displayBio = isOwnProfile ? userProfileData.bio : "Anonymous thoughts. Questions nobody dares ask out loud.";

  // Helper to get user details by id or handle
  const getUserDetails = (idOrHandle) => {
    const found = mockResultsRiya.find(u => u.id === idOrHandle || u.handle.replace('@', '') === idOrHandle.replace('@', '')) ||
      suggestionPool.find(u => u.id === idOrHandle || u.handle.replace('@', '') === idOrHandle.replace('@', '')) ||
      (idOrHandle === 's1' ? { id: 's1', name: 'Meera Talwar', handle: 'meera_t', avatarImage: 'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677371/mystify/avatar/peeps/imir0hqmtwelttlqtu79.png' } : null) ||
      (idOrHandle === 's2' ? { id: 's2', name: 'Rohan Desai', handle: 'rohan_d', avatarImage: 'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778675534/mystify/avatar/mimo/pklpqmdo6lfhk3xu4cfs.png' } : null);

    if (found) {
      return {
        id: found.id,
        name: found.name,
        handle: found.handle.replace('@', ''),
        avatarImage: found.avatarImage || userAvatar
      };
    }
    return null;
  };

  // Helper for logged in user details
  const getLoggedInUserDetails = () => ({
    id: 'ghost_mind_user',
    name: userProfileData?.username || 'ghost_mind',
    handle: userProfileData?.username || 'ghost_mind',
    avatarImage: userProfileData?.avatarValue?.startsWith('http') ? userProfileData?.avatarValue : 'https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778678501/mystify/avatar/emoji/lb7ixainlbv9jvfcr1me.png'
  });

  const getStableAvatar = (username) => {
    if (!username) return RANDOM_AVATARS[0];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % RANDOM_AVATARS.length;
    return RANDOM_AVATARS[index];
  };

  const generateProfileUsers = (count, baseUsers) => {
    const list = [...baseUsers];
    const adjectives = ['dream', 'silent', 'cosmic', 'urban', 'lost', 'neon', 'hidden', 'silver', 'shadow', 'golden', 'retro', 'crypto', 'dark', 'cyber', 'velvet', 'vague', 'indigo', 'static', 'polar', 'lunar'];
    const nouns = ['vibe', 'echo', 'wanderer', 'nomad', 'note', 'drift', 'voice', 'mind', 'soul', 'wave', 'phantom', 'spirit', 'pulse', 'spark', 'glow', 'whisper', 'shade', 'aura', 'haze', 'orbit'];
    const usedNames = new Set(baseUsers.map(u => u.handle));
    usedNames.add('ghost_mind');
    
    while (list.length < count) {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const num = Math.floor(Math.random() * 90) + 10;
      const handle = `${adj}_${noun}${Math.random() > 0.6 ? num : ''}`;
      if (!usedNames.has(handle)) {
        usedNames.add(handle);
        const name = handle.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).replace(/[0-9]/g, '')).join(' ');
        list.push({
          id: `gen_${handle}`,
          name,
          handle,
          avatarImage: getStableAvatar(handle)
        });
      }
    }
    return list;
  };

  // Calculate followers and following lists
  const getFollowersList = () => {
    if (isOwnProfile) {
      const baseFollowers = ['r1', 'r3', 's2_s', 's5_s', 's6_s'].map(getUserDetails).filter(Boolean);
      return generateProfileUsers(50, baseFollowers);
    } else {
      const baseFollowers = ['r2', 'r3', 's1_s'].map(getUserDetails).filter(Boolean);
      if (isFollowing) {
        return [getLoggedInUserDetails(), ...baseFollowers];
      }
      return baseFollowers;
    }
  };

  const getFollowingList = () => {
    if (isOwnProfile) {
      const baseFollowing = Array.from(followedUsers).map(getUserDetails).filter(Boolean);
      return generateProfileUsers(50, baseFollowing);
    } else {
      return ['r3', 's2_s', 's4_s'].map(getUserDetails).filter(Boolean);
    }
  };

  const parseFollowers = (str) => {
    if (!str) return 0;
    if (str.endsWith('K')) {
      return Math.round(parseFloat(str.slice(0, -1)) * 1000);
    }
    return parseInt(str, 10) || 0;
  };

  const getDisplayFollowersCount = () => {
    if (isOwnProfile) return "50";
    const baseCount = parseFollowers(userProfile?.followers || "1.2K");
    const count = isFollowing ? baseCount + 1 : baseCount;
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toLocaleString();
  };

  const getDisplayFollowingCount = () => {
    if (isOwnProfile) {
      return "50";
    }
    return "142";
  };

  const openFollowList = (type) => {
    setFollowListType(type);
    setShowFollowModal(true);
  };

  const handleTabChange = (type) => {
    setFollowListType(type);
    setFollowSearchQuery('');
  };

  const closeFollowModal = () => {
    setShowFollowModal(false);
    setFollowSearchQuery('');
  };

  const followersList = getFollowersList();
  const followingList = getFollowingList();

  const filteredFollowers = followersList.filter(user =>
    user.name.toLowerCase().includes(followSearchQuery.toLowerCase()) ||
    user.handle.toLowerCase().includes(followSearchQuery.toLowerCase())
  );

  const filteredFollowing = followingList.filter(user =>
    user.name.toLowerCase().includes(followSearchQuery.toLowerCase()) ||
    user.handle.toLowerCase().includes(followSearchQuery.toLowerCase())
  );

  const samplePosts = [
    { mood: "avenger", text: "Part of the journey is the end. I love you 3000.", replies: 300, bg: "#8b0000", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325888/flux1-schnell_a-tall-male-knight-with-long-matte_cpc6ur.png" },
    { mood: "thought", text: "What if your inner voice isn't even yours?", replies: 61, bg: "#0d0d0d", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325917/flux1-schnell_a-closed-bedroom-door-at-the-end-of_ilwyjk.png" },
    { mood: "raw", text: "The mask you wear becomes your face.", replies: 112, bg: "#0f0f0f", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325920/flux1-schnell_a-pale-gaunt-man-with-long-greasy_j4uo3x.png" },
    { mood: "quiet", text: "Silence is just noise nobody taught you to hear.", replies: 39, bg: "#101010", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325918/flux1-schnell_a-single-beam-of-golden-sunlight_cjbvub.png" },
    { mood: "anon", text: "Would you say it if your name was on it?", replies: 77, bg: "#111", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325922/flux1-schnell_an-elderly-wizard-with-long-silver_kzilin.png" },
    { mood: "late night", text: "3am thoughts hit different.", replies: 53, bg: "#0d0d0d", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325912/flux1-schnell_a-narrow-window-in-an-old-attic_u0t8uv.png" },
  ];

  const sampleReplies = [
    { username: "ghost_mind", time: "2h", to: "void_speaks", text: "Anonymity isn't cowardice. Sometimes it's the only way truth survives.", likes: "412", retweets: "88", comments: "34" },
    { username: "ghost_mind", time: "1d", to: "nobody_asked__", text: "Loneliness isn't about being alone. It's about not being seen.", likes: "1.1K", retweets: "344", comments: "92" }
  ];

  const sampleSaved = [
    { mood: "urban", text: "Is loneliness different when surrounded by millions?", replies: 189, bg: "#1a2a3a", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325917/flux1-schnell_an-empty-high-school-classroom-at_ehxheg.png" },
    { mood: "mind", text: "What do you do when you feel stuck but not unhappy?", replies: 134, bg: "#2d1b4e", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325913/flux1-schnell_an-old-wooden-desk-by-a-rain_ntcpa5.png" },
    { mood: "anon", text: "Can you ever fully trust someone you met online?", replies: 76, bg: "#3a1a2a", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325922/flux1-schnell_a-rusted-moss-covered-passenger_hdovku.png" }
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
        className="relative h-[110px] bg-[#111] shrink-0 overflow-hidden cursor-pointer bg-center bg-cover"
        style={isOwnProfile ? (userProfileData.coverColor?.startsWith('http') ? { backgroundImage: `url(${userProfileData.coverColor})` } : { backgroundColor: userProfileData.coverColor }) : {}}
        onClick={() => setViewingMedia({
          type: (isOwnProfile && !userProfileData.coverColor?.startsWith('http')) ? 'color' : 'image',
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
              onClick={() => {
                const nextFollowing = !isFollowing;
                onFollowToggle && onFollowToggle(userProfile?.id);
                if (nextFollowing) {
                  setShowSuggestions(true);
                } else {
                  setShowSuggestions(false);
                }
              }}
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
          <button
            onClick={() => openFollowList('followers')}
            className="flex-1 flex flex-col items-center py-[12px] relative hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors"
          >
            <span className="font-dmsans font-bold text-[18px] text-white">{getDisplayFollowersCount()}</span>
            <span className="text-[10px] text-[#666] uppercase tracking-[0.06em] mt-[3px]">FOLLOWERS</span>
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-[#1a1a1a]"></div>
          </button>
          <button
            onClick={() => openFollowList('following')}
            className="flex-1 flex flex-col items-center py-[12px] hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors"
          >
            <span className="font-dmsans font-bold text-[18px] text-white">{getDisplayFollowingCount()}</span>
            <span className="text-[10px] text-[#666] uppercase tracking-[0.06em] mt-[3px]">FOLLOWING</span>
          </button>
        </div>
      </div>

      {/* 5. GAMIFICATION & LEADERBOARD WIDGET (Minimal Strip) */}
      <div className="px-5 mb-[18px] shrink-0" onClick={onOpenStreak}>
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

      <AnimatePresence>
        {showSuggestions && !isOwnProfile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-[#111] border-[#1e1e1e] border-t border-b mb-[18px] shrink-0"
          >
            <div className="p-3.5 flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <span className="text-[9px] font-semibold text-white/40 uppercase tracking-[0.05em]">Suggested for you</span>
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="text-white/30 hover:text-white/60 p-0.5"
                >
                  <X size={10} />
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {suggestionPool
                  .filter(suggestedUser => suggestedUser.id !== userProfile?.id)
                  .map(suggestedUser => {
                    const isSuggestedFollowing = followedUsers?.has(suggestedUser.id);
                    return (
                      <div
                        key={suggestedUser.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToProfile && onNavigateToProfile(suggestedUser.handle);
                        }}
                        className="w-[105px] bg-[#16161c] border border-[rgba(255,255,255,0.05)] rounded-[10px] p-2 flex flex-col items-center text-center shrink-0 cursor-pointer hover:border-white/10 active:scale-95 transition-all"
                      >
                        <div className="relative mb-1.5">
                          <img src={suggestedUser.avatarImage} alt={suggestedUser.name} className="w-[38px] h-[38px] rounded-full object-cover border border-white/5" />
                        </div>
                        <p className="text-[10px] font-bold text-white truncate w-full">@{suggestedUser.handle}</p>
                        <p className="text-[8px] text-white/35 truncate w-full mb-2">{suggestedUser.followers} followers</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onFollowToggle && onFollowToggle(suggestedUser.id);
                          }}
                          className={`w-full py-1 rounded-[12px] text-[8px] font-bold transition-all ${isSuggestedFollowing
                              ? 'bg-transparent text-white/40 border border-white/10'
                              : 'bg-[#FF4500] text-white border border-[#FF4500] hover:bg-[#ff5d1f]'
                            }`}
                        >
                          {isSuggestedFollowing ? 'Following' : 'Follow'}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowOtherUserActions(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a1a] transition-colors text-left group border-b border-[#222] cursor-default"
            >
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
              className={`relative overflow-hidden shadow-2xl flex items-center justify-center ${viewingMedia.isCover ? 'w-full aspect-[21/9] rounded-[16px]' : 'w-[250px] h-[250px] rounded-full bg-[#111] border-[4px] border-[#222]'
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

      {/* 9. FOLLOWERS / FOLLOWING SCREEN (Instagram / X Style) */}
      <AnimatePresence>
        {showFollowModal && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
            className="absolute inset-0 bg-[#0a0a0a] z-[90] flex flex-col font-sans overflow-hidden"
          >
            {/* Top Bar / Header */}
            <div className="bg-[#0a0a0a] border-b border-white/[0.08] px-4 pt-3 pb-3 flex items-center justify-between shrink-0">
              <button
                onClick={closeFollowModal}
                className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center cursor-pointer transition-all hover:bg-white/[0.08] active:scale-95 text-white/80 hover:text-white"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex flex-col items-center justify-center">
                <span className="text-[13px] font-bold text-white tracking-wide">
                  @{cleanUsername}
                </span>
              </div>
              <div className="w-8" />
            </div>

            {/* Tabs Selector */}
            <div className="flex border-b border-white/[0.06] bg-[#0a0a0a] shrink-0">
              <button
                onClick={() => handleTabChange('followers')}
                className={`flex-1 py-3 text-center font-dmsans font-bold text-[12.5px] relative transition-colors ${followListType === 'followers' ? 'text-white' : 'text-white/35 hover:text-white/60'
                  }`}
              >
                Followers
                <span className="ml-1 text-[11.5px] font-normal text-white/40">
                  {getDisplayFollowersCount()}
                </span>
                {followListType === 'followers' && (
                  <motion.div layoutId="followFullUnderline" className="absolute bottom-0 inset-x-6 h-[2px] bg-[#FF4500]" />
                )}
              </button>
              <button
                onClick={() => handleTabChange('following')}
                className={`flex-1 py-3 text-center font-dmsans font-bold text-[12.5px] relative transition-colors ${followListType === 'following' ? 'text-white' : 'text-white/35 hover:text-white/60'
                  }`}
              >
                Following
                <span className="ml-1 text-[11.5px] font-normal text-white/40">
                  {getDisplayFollowingCount()}
                </span>
                {followListType === 'following' && (
                  <motion.div layoutId="followFullUnderline" className="absolute bottom-0 inset-x-6 h-[2px] bg-[#FF4500]" />
                )}
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-3 bg-[#0a0a0a] border-b border-white/[0.04] shrink-0">
              <div className="bg-white/[0.05] border border-white/[0.08] focus-within:border-[#FF4500]/50 focus-within:bg-white/[0.08] rounded-[10px] p-[7px_10px] flex items-center gap-2 transition-all duration-200">
                <Search size={14} className="text-white/30 shrink-0" />
                <input
                  type="text"
                  value={followSearchQuery}
                  onChange={e => setFollowSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="bg-transparent text-white text-[12px] outline-none placeholder:text-white/25 flex-1"
                />
                {followSearchQuery && (
                  <button onClick={() => setFollowSearchQuery('')} className="p-0.5 hover:bg-white/10 rounded-full transition-colors shrink-0">
                    <X size={12} className="text-white/40 hover:text-white" />
                  </button>
                )}
              </div>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto bg-[#0a0a0a] no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {(followListType === 'followers' ? filteredFollowers : filteredFollowing).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                  <div className="w-14 h-14 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-4">
                    <User size={24} className="text-white/20" />
                  </div>
                  <h4 className="text-[13px] font-bold text-white mb-1">No results found</h4>
                  <p className="text-white/35 text-[11px] max-w-[200px] leading-normal font-dmsans">
                    {followSearchQuery ? `No users matched "${followSearchQuery}"` : "This list is currently empty."}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/[0.04]">
                  {(followListType === 'followers' ? filteredFollowers : filteredFollowing).map(user => {
                    const isUserFollowing = followedUsers?.has(user.id);
                    return (
                      <div
                        key={user.id}
                        onClick={() => {
                          closeFollowModal();
                          onNavigateToProfile && onNavigateToProfile(user.handle);
                        }}
                        className="flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.02] active:bg-white/[0.01] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={user.avatarImage}
                            alt={user.name}
                            className="w-[40px] h-[40px] rounded-full object-cover border border-white/10 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-[12.5px] font-bold text-white truncate leading-none mb-1 hover:underline">
                              {user.name}
                            </p>
                            <p className="text-[11px] text-white/40 truncate leading-none">
                              @{user.handle}
                            </p>
                          </div>
                        </div>

                        {user.id !== 'ghost_mind_user' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onFollowToggle && onFollowToggle(user.id);
                            }}
                            className={`h-[28px] rounded-full px-4 text-[10.5px] font-bold tracking-wide transition-all shrink-0 active:scale-95 ${isUserFollowing
                                ? 'bg-transparent text-white/80 border border-white/20 hover:bg-white/[0.05] hover:text-white'
                                : 'bg-[#FF4500] hover:bg-[#ff5722] text-white border border-[#FF4500]'
                              }`}
                          >
                            {isUserFollowing ? 'Following' : 'Follow'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
export default ProfileScreen;