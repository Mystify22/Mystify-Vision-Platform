import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash, Home, PlusSquare, MessageCircle, User, Heart, Share2, VolumeX, X, Send, Clock, Bell, Plus, Ghost, Lock, Inbox, Wifi, Battery, Edit, ChevronRight, MoreHorizontal, ArrowRight, BellOff, Trash } from 'lucide-react';
import { vibeData, vibeCategories, musicData, musicCategories } from './MockData';

import './PhoneSimulator.css';
import CreatePostScreen from './CreatePostScreen';
import SelectVibeScreen from './SelectVibeScreen';
import SelectMusicScreen from './SelectMusicScreen';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import MessageScreen from './MessageScreen';
import LoginScreen from './LoginScreen';
import EditProfileScreen from './EditProfileScreen';
import SettingsScreen from './SettingsScreen';
import StreakScreen from './StreakScreen';
import NotificationsScreen from './NotificationsScreen';

const TablerFlame = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" />
  </svg>
);

const TablerPlanet = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" />
    <circle cx="12" cy="12" r="7" />
  </svg>
);

const TablerWaveSine = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12h2.5c1.5 0 2 5 3.5 5s2.5 -12 4.5 -12s2 7 3.5 7h2" />
  </svg>
);

const TablerCircleDashed = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
    <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
    <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
    <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
    <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
    <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
    <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
    <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
  </svg>
);

const PhoneSimulator = () => {
  const containerRef = useRef(null);

  const [step, setStep] = useState(0);
  const [thoughtText, setThoughtText] = useState("");
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [selectedProfileUsername, setSelectedProfileUsername] = useState("ghost_mind");
  const [chatTargetUsername, setChatTargetUsername] = useState(null);
  const [followedUsers, setFollowedUsers] = useState(new Set(['r2']));
  const [selectedPost, setSelectedPost] = useState(null);

  const [userProfileData, setUserProfileData] = useState(() => {
    const saved = localStorage.getItem('mystify_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse user profile from local storage", e);
      }
    }
    return {
      username: 'ghost_mind',
      bio: 'Anonymous thoughts. Questions nobody dares ask out loud.',
      avatarValue: '✦',
      coverColor: '#1a0a3e'
    };
  });

  useEffect(() => {
    localStorage.setItem('mystify_user_profile', JSON.stringify(userProfileData));
  }, [userProfileData]);

  const handleFollowToggle = (id) => {
    if (!id) return;
    setFollowedUsers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="container mx-auto px-6 py-24 flex flex-col lg:flex-row-reverse items-center justify-center gap-16 lg:gap-24 overflow-hidden scroll-mt-10" id="feed" ref={containerRef}>

      {/* Right Side Content */}
      <div className="flex-1 text-center lg:text-left space-y-8 max-w-xl z-10">
        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-full text-sm font-bold border border-gray-200">
          <Sparkles size={16} /> Interactive Demo
        </div>
        <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
          Experience <br /><span className="text-gradient">Mystify</span>
        </h2>
        <p className="text-xl text-gray-500 font-medium">
          Step into a premium, anonymous-first social experience. Combine deep thoughts with immersive visuals and soundscapes, and spark meaningful conversations without revealing who you are.
        </p>

        <ul className="space-y-4 pt-6 text-left max-w-sm mx-auto lg:mx-0">
          {[
            { title: "Audio-Visual Posts", desc: "Pair your thoughts with curated visual vibes and ambient soundtracks." },
            { title: "Anonymous Connections", desc: "No names, no followers. Connect through shared feelings and private DMs." },
            { title: "Premium Dark Mode", desc: "A sleek, distraction-free deep black interface designed for late-night scrolling." }
          ].map((item, i) => (
            <li key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-1">
                <div className="w-3 h-3 bg-gray-900 rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed mt-1">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Left Side - Dedicated Theme Selector Phone */}
      <div className="flex-1 w-full max-w-md mx-auto relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-[340px] h-[720px] rounded-[3.5rem] border-[14px] border-black bg-[#0c0c10] overflow-hidden shadow-2xl relative ring-1 ring-gray-200 flex flex-col font-sans"
        >
          <AnimatePresence>
            {step === 0 && (
              <LoginScreen
                key="step-login"
                onNext={() => setStep(4)}
              />
            )}
            {step === 1 && (
              <CreatePostScreen
                key="step-compose"
                thoughtText={thoughtText}
                setThoughtText={setThoughtText}
                selectedMoods={selectedMoods}
                setSelectedMoods={setSelectedMoods}
                isAnonymous={isAnonymous}
                setIsAnonymous={setIsAnonymous}
                selectedVibe={selectedVibe}
                selectedMusic={selectedMusic}
                userProfileData={userProfileData}
                onAddVibe={() => setStep(2)}
                onNext={() => {
                  if (selectedVibe && selectedMusic) {
                    console.log("Posting...", { thoughtText, selectedMoods, isAnonymous, selectedVibe, selectedMusic });
                  } else {
                    setStep(2);
                  }
                }}
                onCancel={() => {
                  setThoughtText("");
                  setSelectedMoods([]);
                  setSelectedVibe(null);
                  setSelectedMusic(null);
                  setStep(4);
                }}
              />
            )}
            {step === 2 && (
              <SelectVibeScreen
                key="step-vibe"
                stepId={2}
                title="Choose a vibe"
                data={vibeData}
                categories={vibeCategories}
                selectedItem={selectedVibe}
                onSelect={setSelectedVibe}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
                bottomLabel="Vibe"
              />
            )}
            {step === 3 && (
              <SelectMusicScreen
                key="step-music"
                stepId={3}
                selectedVibe={selectedVibe}
                selectedVibeCategory={vibeData.find(s => s.items.some(i => i.id === selectedVibe?.id) || s.extraItems?.some(i => i.id === selectedVibe?.id))?.category}
                data={musicData}
                categories={musicCategories}
                selectedMusic={selectedMusic}
                onSelectMusic={setSelectedMusic}
                onNext={() => setStep(1)}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && (
              <FeedScreen 
                key="step-home" 
                initialMode="feed" 
                onInboxClick={() => { setChatTargetUsername(null); setStep(7); }} 
                onNotificationsClick={() => setStep(12)} 
              />
            )}
            {step === 11 && (
              <FeedScreen 
                key="step-reels" 
                initialMode="reels" 
                initialPost={selectedPost} 
                onBackFromReels={() => {
                  if (selectedPost) {
                    setSelectedPost(null);
                    setStep(6);
                  } else {
                    setStep(4);
                  }
                }} 
              />
            )}
            {step === 12 && (
              <NotificationsScreen
                key="step-notifications"
                onBack={() => setStep(4)}
                onNavigateToStreak={() => setStep(10)}
                onNavigateToProfile={(username) => {
                  setSelectedProfileUsername(username);
                  setStep(5);
                }}
              />
            )}
            {step === 5 && (
              <ProfileScreen
                key="step-profile"
                username={selectedProfileUsername}
                userProfileData={userProfileData}
                onEditProfile={() => setStep(8)}
                onMessageUser={() => {
                  setChatTargetUsername(selectedProfileUsername);
                  setStep(7);
                }}
                followedUsers={followedUsers}
                onFollowToggle={handleFollowToggle}
                onOpenSettings={() => setStep(9)}
                onOpenStreak={() => setStep(10)}
                onNavigateToProfile={(username) => {
                  setSelectedProfileUsername(username);
                }}
              />
            )}
            {step === 6 && (
              <SearchScreen
                key="step-explore"
                onUserSelect={(username) => {
                  setSelectedProfileUsername(username);
                  setStep(5);
                }}
                followedUsers={followedUsers}
                onFollowToggle={handleFollowToggle}
                onPostClick={(post) => {
                  setSelectedPost(post);
                  setStep(11);
                }}
              />
            )}
            {step === 7 && (
              <MessageScreen
                key="step-chat"
                targetUsername={chatTargetUsername}
                onBack={() => {
                  setChatTargetUsername(null);
                  setStep(5);
                }}
              />
            )}
            {step === 8 && (
              <EditProfileScreen
                key="step-edit-profile"
                initialData={userProfileData}
                onSave={(newData) => {
                  setUserProfileData(newData);
                  setSelectedProfileUsername(newData.username);
                  setStep(5);
                }}
                onCancel={() => setStep(5)}
              />
            )}
            {step === 9 && (
              <SettingsScreen
                key="step-settings"
                userProfileData={userProfileData}
                onBack={() => setStep(5)}
                onEditProfile={() => setStep(8)}
                onLogout={() => {
                  setStep(0);
                }}
                onLogoutAll={() => {
                  setStep(0);
                }}
              />
            )}
            {step === 10 && (
              <StreakScreen
                key="step-streak"
                onBack={() => setStep(5)}
                isOwnProfile={selectedProfileUsername === userProfileData.username}
                username={selectedProfileUsername}
                userProfileData={userProfileData}
              />
            )}
          </AnimatePresence>

          {/* Bottom Navigation Bar */}
          {step > 0 && step !== 10 && (
            <div className="absolute bottom-0 inset-x-0 bg-[#0c0c10] border-t-[0.5px] border-[rgba(255,255,255,0.08)] flex items-center justify-around px-0 z-40 p-[10px_0_14px]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {/* TAB 1: FEED (Step 4) */}
              <button onClick={() => { setSelectedPost(null); setStep(4); }} className="flex flex-col items-center justify-center min-w-[50px] cursor-pointer">
                <TablerFlame size={24} color={step === 4 ? '#ff5a1a' : 'rgba(255,255,255,0.4)'} />
                <div className="h-[4px]" />
                <span className={`text-[8px] font-medium leading-none ${step === 4 ? 'text-white' : 'text-[rgba(255,255,255,0.35)]'}`}>Feed</span>
              </button>

              {/* TAB 2: EXPLORE (Step 6) */}
              <button onClick={() => { setSelectedPost(null); setStep(6); }} className="flex flex-col items-center justify-center min-w-[50px] cursor-pointer">
                <TablerPlanet size={24} color={step === 6 ? '#ffffff' : 'rgba(255,255,255,0.4)'} />
                <div className="h-[4px]" />
                <span className={`text-[8px] font-medium leading-none ${step === 6 ? 'text-white' : 'text-[rgba(255,255,255,0.35)]'}`}>Explore</span>
              </button>

              {/* TAB 3: CREATE (Step 1) */}
              <button onClick={() => setStep(1)} className="flex flex-col items-center justify-center min-w-[50px] cursor-pointer transition-transform active:scale-95">
                <div className="w-[34px] h-[34px] bg-[#FF4500] rounded-full flex items-center justify-center mt-[-4px]">
                  <Plus size={20} className="text-white" strokeWidth={2.5} />
                </div>
              </button>

              {/* TAB 4: VIBES (Step 11) */}
              <button onClick={() => { setSelectedPost(null); setStep(11); }} className="flex flex-col items-center justify-center min-w-[50px] cursor-pointer">
                <TablerWaveSine size={24} color={step === 11 ? '#ffffff' : 'rgba(255,255,255,0.4)'} />
                <div className="h-[4px]" />
                <span className={`text-[8px] font-medium leading-none ${step === 11 ? 'text-white' : 'text-[rgba(255,255,255,0.35)]'}`}>Vibes</span>
              </button>

              {/* TAB 5: ME (Step 5) */}
              <button onClick={() => { setSelectedPost(null); setSelectedProfileUsername(userProfileData.username); setStep(5); }} className="flex flex-col items-center justify-center min-w-[50px] cursor-pointer">
                <TablerCircleDashed size={24} color={step === 5 ? '#ffffff' : 'rgba(255,255,255,0.4)'} />
                <div className="h-[4px]" />
                <span className={`text-[8px] font-medium leading-none ${step === 5 ? 'text-white' : 'text-[rgba(255,255,255,0.35)]'}`}>Me</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PhoneSimulator;
