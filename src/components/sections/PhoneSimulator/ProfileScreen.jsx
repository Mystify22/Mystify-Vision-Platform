import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash, Home, PlusSquare, MessageCircle, User, Heart, Share2, VolumeX, X, Send, Clock, Bell, Plus, Ghost, Lock, Inbox, Wifi, Battery, Edit, ChevronRight, MoreHorizontal, ArrowRight, BellOff, Trash } from 'lucide-react';
import { mockResultsRiya, RANDOM_AVATARS, mockConversationsData } from './MockData';

const ChatIcon = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <circle cx="9" cy="10" r="1.2" fill="currentColor" />
    <circle cx="13" cy="10" r="1.2" fill="currentColor" />
    <circle cx="17" cy="10" r="1.2" fill="currentColor" />
  </svg>
);

const RepliesIcon = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M9 8c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4-2 4-4.5 4c-.5 0-1-.1-1.5-.3l-3 1.8.5-2.5C9.4 10.4 9 9.3 9 8z" />
  </svg>
);

const GridIcon = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const BookmarkIcon = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const getTabIcon = (tab, isActive) => {
  switch (tab) {
    case "Vibes":
      return <ChatIcon size={18} />;
    case "Replies":
      return <RepliesIcon size={18} />;
    case "Posts":
      return <GridIcon size={18} />;
    case "Saved":
      return <BookmarkIcon size={18} />;
    default:
      return null;
  }
};

const getFormattedDate = (createdAt) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const baseDate = new Date(2026, 6, 4); // July 4, 2026
  
  if (!createdAt || createdAt === "Just now" || createdAt.includes("h ago") || createdAt.includes("m ago")) {
    return "04 Jul 2026";
  }
  
  if (createdAt.includes("d ago")) {
    const days = parseInt(createdAt, 10) || 1;
    const targetDate = new Date(baseDate);
    targetDate.setDate(baseDate.getDate() - days);
    return `${String(targetDate.getDate()).padStart(2, '0')} ${months[targetDate.getMonth()]} ${targetDate.getFullYear()}`;
  }
  
  if (createdAt.includes("w ago")) {
    const weeks = parseInt(createdAt, 10) || 1;
    const targetDate = new Date(baseDate);
    targetDate.setDate(baseDate.getDate() - (weeks * 7));
    return `${String(targetDate.getDate()).padStart(2, '0')} ${months[targetDate.getMonth()]} ${targetDate.getFullYear()}`;
  }
  
  return "04 Jul 2026";
};

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

const ProfileScreen = ({ username = "ghost_mind", onMessageUser, followedUsers, onFollowToggle, userProfileData, onEditProfile, onOpenSettings, onOpenStreak, onNavigateToProfile, createdPosts: _createdPosts = [] }) => {
  const [activeTab, setActiveTab] = useState("Posts");
  const [showOtherUserActions, setShowOtherUserActions] = useState(false);
  const [viewingMedia, setViewingMedia] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followListType, setFollowListType] = useState(null); // 'followers' or 'following'
  const [followSearchQuery, setFollowSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState("");
  const [copiedPostIdx, setCopiedPostIdx] = useState(null);
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
  const profileTabs = isOwnProfile 
    ? ["Vibes", "Replies", "Posts", "Saved"] 
    : ["Vibes", "Replies", "Posts"];

  const userProfile = mockResultsRiya.find(u => u.handle.replace('@', '') === cleanUsername) ||
    suggestionPool.find(u => u.handle.replace('@', '') === cleanUsername);
  const displayAvatar = isOwnProfile 
    ? (userProfileData?.avatarValue || userAvatar) 
    : (userProfile?.avatarImage || userAvatar);
  const isFollowing = followedUsers?.has(userProfile?.id);
  const displayBio = isOwnProfile ? userProfileData.bio : "Anonymous thoughts. Questions nobody dares ask out loud.";

  const getPointsCount = () => {
    if (isOwnProfile) return "3,000";
    if (cleanUsername === 'lofi_girl') return "14,250";
    if (cleanUsername === 'chill_coder') return "8,900";
    if (cleanUsername === 'sarah_vibes') return "5,600";
    if (cleanUsername === 'code_ninja') return "18,100";
    if (cleanUsername === 'otaku_warrior') return "15,200";
    if (cleanUsername === 'riya_m') return "12,400";
    return "1,200";
  };

  const getStreakDays = () => {
    if (isOwnProfile) return "30";
    if (cleanUsername === 'lofi_girl') return "60";
    if (cleanUsername === 'chill_coder') return "30";
    if (cleanUsername === 'sarah_vibes') return "20";
    if (cleanUsername === 'code_ninja') return "90";
    if (cleanUsername === 'otaku_warrior') return "60";
    if (cleanUsername === 'riya_m') return "45";
    return "12";
  };

  const getRankNum = () => {
    if (isOwnProfile) return "#43";
    if (cleanUsername === 'code_ninja') return "#1";
    if (cleanUsername === 'lofi_girl') return "#2";
    if (cleanUsername === 'otaku_warrior') return "#3";
    if (cleanUsername === 'riya_m') return "#5";
    if (cleanUsername === 'chill_coder') return "#8";
    return "#15";
  };

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
    
    // Seed-based pseudo-random generator to remain pure & keep list stable
    let seed = 42;
    const seededRandom = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    
    while (list.length < count) {
      const adj = adjectives[Math.floor(seededRandom() * adjectives.length)];
      const noun = nouns[Math.floor(seededRandom() * nouns.length)];
      const num = Math.floor(seededRandom() * 90) + 10;
      const handle = `${adj}_${noun}${seededRandom() > 0.6 ? num : ''}`;
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
    if (isOwnProfile) {
      return followersList ? followersList.length.toString() : "50";
    }
    const baseCount = parseFollowers(userProfile?.followers || "1.2K");
    const count = isFollowing ? baseCount + 1 : baseCount;
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toLocaleString();
  };

  const getDisplayFollowingCount = () => {
    if (isOwnProfile) {
      return followedUsers ? followedUsers.size.toString() : "0";
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
    { mood: "avenger", text: "Part of the journey is the end. I love you 3000.", replies: 300, bg: "#8b0000", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325888/flux1-schnell_a-tall-male-knight-with-long-matte_cpc6ur.png", createdAt: "2h ago" },
    { mood: "thought", text: "What if your inner voice isn't even yours?", replies: 61, bg: "#0d0d0d", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325917/flux1-schnell_a-closed-bedroom-door-at-the-end-of_ilwyjk.png", createdAt: "1d ago" },
    { mood: "raw", text: "The mask you wear becomes your face.", replies: 112, bg: "#0f0f0f", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325920/flux1-schnell_a-pale-gaunt-man-with-long-greasy_j4uo3x.png", createdAt: "3d ago" },
    { mood: "quiet", text: "Silence is just noise nobody taught you to hear.", replies: 39, bg: "#101010", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325918/flux1-schnell_a-single-beam-of-golden-sunlight_cjbvub.png", createdAt: "5d ago" },
    { mood: "anon", text: "Would you say it if your name was on it?", replies: 77, bg: "#111", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325922/flux1-schnell_an-elderly-wizard-with-long-silver_kzilin.png", createdAt: "1w ago" },
    { mood: "late night", text: "3am thoughts hit different.", replies: 53, bg: "#0d0d0d", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325912/flux1-schnell_a-narrow-window-in-an-old-attic_u0t8uv.png", createdAt: "2w ago" },
  ];

  const allPosts = samplePosts;

  const handleCopyPostLink = (post, idx, e) => {
    if (e) e.stopPropagation();
    const cleanUser = username.replace('@', '');
    const cleanMood = (post.mood || 'vibe').toLowerCase().replace(/\s+/g, '-');
    const shareLink = `mystify.link/${cleanUser}/${cleanMood}`;
    
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        setCopiedPostIdx(idx);
        setToastMessage("Link copied! Share it to get replies.");
        setTimeout(() => {
          setCopiedPostIdx(null);
        }, 1500);
        setTimeout(() => {
          setToastMessage("");
        }, 2200);
      })
      .catch(() => {
        setCopiedPostIdx(idx);
        setToastMessage("Link copied!");
        setTimeout(() => {
          setCopiedPostIdx(null);
          setToastMessage("");
        }, 1500);
      });
  };

  const handleShareVibe = (post, idx, e) => {
    if (e) e.stopPropagation();
    const cleanUser = username.replace('@', '');
    const cleanMood = (post.mood || 'vibe').toLowerCase().replace(/\s+/g, '-');
    const shareLink = `mystify.link/${cleanUser}/${cleanMood}`;
    
    navigator.clipboard.writeText(shareLink).catch(() => {});
    setToastMessage("Ready for Instagram Story! Link copied.");
    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const renderPostCards = (postsList) => (
    <div className="flex flex-col gap-4 p-4">
      {postsList.map((post, idx) => {
        const cleanUser = username.replace('@', '');
        const cleanMood = (post.mood || 'vibe').toLowerCase().replace(/\s+/g, '-');
        const shareLink = `mystify.link/${cleanUser}/${cleanMood}`;
        const isCopied = copiedPostIdx === idx;
        const postDate = getFormattedDate(post.createdAt);

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="relative rounded-[20px] border border-white/[0.05] bg-[#0c0c0f] shadow-xl p-5 flex flex-col justify-between min-h-[140px] group transition-all duration-300"
          >
            <div className="relative z-10 flex flex-col gap-3">
              {/* Header: Date */}
              <div className="flex justify-end w-full">
                <span className="text-[11px] font-medium text-white/35 font-dmsans">
                  {postDate}
                </span>
              </div>
              {/* Body: Thought Text */}
              <p className="text-[13px] text-white/95 font-dmsans font-medium leading-[1.6] break-words">
                {post.text}
              </p>
            </div>

            {/* Footer Row */}
            <div className="relative z-10 mt-5 flex items-center justify-between gap-3">
              {/* Left Pill Button (Showcase only) */}
              <div 
                className="h-10 rounded-full bg-[#1b1b1f] border border-white/[0.06] flex items-center justify-between pl-4 pr-1.5 py-1.5 min-w-[130px] select-none"
              >
                <span className="text-[11px] font-bold text-white/90 font-dmsans mr-2">
                  let's go!
                </span>
                <div className="w-7 h-7 rounded-full bg-[#FF4500] flex items-center justify-center text-white shrink-0 shadow-md">
                  <ArrowRight size={12} strokeWidth={2.5} />
                </div>
              </div>

              {/* Right Share Button (Showcase only) */}
              <div
                className="w-10 h-10 rounded-full bg-[#FF4500] flex items-center justify-center text-white shrink-0 shadow-[0_2px_10px_rgba(255,69,0,0.2)]"
              >
                <Share2 size={13} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderChatTab = () => {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-white/20 text-[12px]">
        No vibes yet
      </div>
    );
  };

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
      className="absolute inset-0 flex flex-col bg-[#000000] overflow-y-auto overflow-x-hidden pb-[64px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet" />
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
        <div className="absolute bottom-0 inset-x-0 h-[70px] bg-gradient-to-b from-transparent to-[#000000]"></div>
      </div>

      {/* 2. AVATAR ROW */}
      <div className="relative z-10 px-5 flex justify-between items-end shrink-0" style={{ marginTop: '-44px' }}>
        <div className="relative">
          <div
            className="w-[82px] h-[82px] rounded-full bg-[#1c1c1c] border-2 border-white/10 p-[2px] flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-transform"
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
              <img src={userProfile?.avatarImage || displayAvatar || userAvatar} alt="DP" className="w-full h-full rounded-full object-cover" />
            )}
          </div>
        </div>

        <div className="flex gap-2 pb-1">
          {isOwnProfile ? (
            <>
              <button 
                onClick={onEditProfile} 
                className="h-[34px] rounded-full px-4 text-[11px] font-bold bg-white/[0.04] border border-white/[0.08] text-white/80 hover:bg-white/[0.08] transition-colors shrink-0"
              >
                Edit Profile
              </button>
              <button onClick={onOpenSettings} className="w-[34px] h-[34px] rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] transition-colors shrink-0" title="Settings">
                <MoreHorizontal size={14} className="text-white/60" />
              </button>
            </>
          ) : (
            <>
              <button onClick={onMessageUser} className="w-[34px] h-[34px] rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] transition-colors shrink-0" title="Message">
                <i className="ti ti-mail text-white/60 text-[14px]"></i>
              </button>
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
                className={`h-[34px] rounded-full px-4 text-[11px] font-bold transition-all shrink-0 ${isFollowing
                  ? 'bg-transparent border border-white/20 text-white/60 hover:bg-white/[0.05]'
                  : 'bg-[#FF4500] hover:bg-[#ff5722] text-white'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* 3. USER INFO / HEADER */}
      <div className="px-5 pt-4 pb-3 shrink-0">
        <h1 className="font-dmsans font-bold text-white text-[20px] leading-tight tracking-tight">{username}</h1>
        <p className="font-dmsans font-normal text-[#888] text-[13.5px] mt-1.5 leading-[1.6] whitespace-pre-wrap">{displayBio}</p>
      </div>

      {/* 4. STATS CARD (Modular rounded rectangle columns matching layout) */}
      <div className="px-5 mb-3 shrink-0">
        <div className="flex border border-white/[0.06] bg-[#0c0c0f] rounded-[16px] overflow-hidden">
          <div className="flex-1 flex flex-col items-center py-[14px] relative">
            <span className="font-dmsans font-bold text-[18px] text-white leading-none">{allPosts.length}</span>
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.08em] mt-[6px]">POSTS</span>
            <div className="absolute right-0 top-3 bottom-3 w-[1px] bg-white/[0.08]"></div>
          </div>
          <button
            onClick={() => openFollowList('followers')}
            className="flex-1 flex flex-col items-center py-[14px] relative hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors"
          >
            <span className="font-dmsans font-bold text-[18px] text-white leading-none">{getDisplayFollowersCount()}</span>
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.08em] mt-[6px]">FOLLOWERS</span>
            <div className="absolute right-0 top-3 bottom-3 w-[1px] bg-white/[0.08]"></div>
          </button>
          <button
            onClick={() => openFollowList('following')}
            className="flex-1 flex flex-col items-center py-[14px] hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors"
          >
            <span className="font-dmsans font-bold text-[18px] text-white leading-none">{getDisplayFollowingCount()}</span>
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.08em] mt-[6px]">FOLLOWING</span>
          </button>
        </div>
      </div>

      {/* 5. GAMIFICATION CARD (Streak, Points, Rank with Chevron right) */}
      <div className="px-5 mb-4 shrink-0" onClick={onOpenStreak}>
        <div className="relative flex border border-white/[0.06] bg-[#0c0c0f] rounded-[16px] items-center cursor-pointer hover:bg-white/[0.02] transition-colors pr-8">
          <div className="flex-1 flex flex-col items-center py-[14px] relative">
            <div className="flex items-center gap-1">
              <span className="text-[14px] leading-none">🔥</span>
              <span className="font-dmsans font-bold text-[18px] text-white leading-none">{getStreakDays()}</span>
            </div>
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.08em] mt-[6px]">STREAK</span>
            <div className="absolute right-0 top-3 bottom-3 w-[1px] bg-white/[0.08]"></div>
          </div>
          <div className="flex-1 flex flex-col items-center py-[14px] relative">
            <div className="flex items-center gap-1">
              <span className="text-[14px] leading-none">⭐</span>
              <span className="font-dmsans font-bold text-[18px] text-white leading-none">{getPointsCount()}</span>
            </div>
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.08em] mt-[6px]">POINTS</span>
            <div className="absolute right-0 top-3 bottom-3 w-[1px] bg-white/[0.08]"></div>
          </div>
          <div className="flex-1 flex flex-col items-center py-[14px]">
            <div className="flex items-center gap-1">
              <span className="text-[14px] leading-none">👑</span>
              <span className="font-dmsans font-bold text-[18px] text-white leading-none">{getRankNum()}</span>
            </div>
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.08em] mt-[6px]">RANK</span>
          </div>
          {/* Chevron Icon aligned to the right inside the card */}
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <ChevronRight size={14} className="text-white/30" />
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

      {/* 6. DYNAMIC TABS BAR (Active tab expands to show label, indicator below) */}
      <div className="sticky top-0 z-30 bg-[#000000] border-b border-white/[0.05] flex px-2 shrink-0 py-1.5 justify-around items-center">
        {profileTabs.map(tab => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative flex items-center gap-2 py-3 px-3 cursor-pointer group transition-all"
            >
              <span className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
                {getTabIcon(tab, isActive)}
              </span>
              
              {isActive && (
                <span className="font-dmsans font-bold text-[12.5px] text-white tracking-wide">
                  {tab}
                </span>
              )}
              
              {isActive && (
                <motion.div 
                  layoutId="activeTabIndicator" 
                  className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#FF4500] rounded-full" 
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 7. TAB PANELS */}
      <div className="flex-1 bg-[#000000] pt-1">
        {activeTab === "Posts" && renderPostCards(allPosts)}

        {activeTab === "Replies" && (
          <div className="flex flex-col items-center justify-center py-16 text-center text-white/20 text-[12px]">
            No replies yet
          </div>
        )}

        {activeTab === "Saved" && renderGrid(sampleSaved)}
        
        {activeTab === "Vibes" && renderChatTab()}
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

      {/* Toast Notification overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
            className="absolute top-16 left-1/2 z-[300] bg-black/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-2xl pointer-events-none w-auto max-w-[260px] text-center"
          >
            <Sparkles size={12} className="text-[#FF4500]" />
            <span className="text-white text-[11px] font-semibold tracking-wide font-dmsans whitespace-nowrap">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
export default ProfileScreen;