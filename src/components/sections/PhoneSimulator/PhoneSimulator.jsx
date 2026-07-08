import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash, Home, PlusSquare, MessageCircle, User, Heart, Share2, VolumeX, X, Send, Clock, Bell, Plus, Ghost, Lock, Inbox, Wifi, Battery, Edit, ChevronRight, MoreHorizontal, ArrowRight, BellOff, Trash, RefreshCw } from 'lucide-react';
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
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" />
  </svg>
);

const TablerPlanet = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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

const AgentMessageIcon = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill={color} className={className}>
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
  const [followedUsers, setFollowedUsers] = useState(new Set(['r2', 's1_s', 's4_s']));
  const [selectedPost, setSelectedPost] = useState(null);
  const [createdPosts, setCreatedPosts] = useState([]);
  const [showUploadActions, setShowUploadActions] = useState(false);
  const [privacyModalState, setPrivacyModalState] = useState(null);
  const [tempUploadedUrl, setTempUploadedUrl] = useState('');
  const [tempUploadedName, setTempUploadedName] = useState('');
  const [scannerSubtitle, setScannerSubtitle] = useState('Analyzing image for faces and identifiers...');
  const [scanProgress, setScanProgress] = useState(0);
  const fileInputRef = useRef(null);

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

  const triggerFileSelect = () => {
    setShowUploadActions(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const runScanningAnimation = () => {
    setPrivacyModalState('scanning');
    setScanProgress(0);
    setScannerSubtitle('Analyzing image for faces and identifiers...');

    setTimeout(() => {
      setScanProgress(1);
      setScannerSubtitle('Locating facial keypoints and geotags...');
    }, 800);

    setTimeout(() => {
      setScanProgress(2);
      setScannerSubtitle('Removing facial features & scrubbing EXIF metadata...');
    }, 1600);

    setTimeout(() => {
      setScanProgress(3);
      setPrivacyModalState('validation');
    }, 2400);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTempUploadedUrl(url);
      setTempUploadedName(`Custom Upload (${file.name})`);
      runScanningAnimation();
    }
  };

  const handleKeepPhoto = () => {
    setSelectedVibe({
      id: 'custom_' + Date.now(),
      name: tempUploadedName,
      img: tempUploadedUrl,
      isCustom: true
    });
    setPrivacyModalState(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setStep(1); // Back to composer screen
  };

  const handleChangePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleDiscardPhoto = () => {
    setPrivacyModalState(null);
    setTempUploadedUrl('');
    setTempUploadedName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
                selectedVibe={selectedVibe}
                setSelectedVibe={setSelectedVibe}
                selectedMusic={selectedMusic}
                setSelectedMusic={setSelectedMusic}
                onAddVibe={() => setStep(2)}
                onAddMusic={() => setStep(3)}
                onCancel={() => {
                  setThoughtText("");
                  setSelectedVibe(null);
                  setSelectedMusic(null);
                  setStep(4);
                }}
                onTriggerUpload={triggerFileSelect}
                onSubmit={(text) => {
                  const newPost = {
                    mood: selectedVibe ? selectedVibe.name : "Thought",
                    text: text,
                    replies: 0,
                    bg: selectedVibe ? selectedVibe.bg || "#111" : "#111",
                    img: selectedVibe ? selectedVibe.img : null,
                    audioSrc: selectedMusic ? selectedMusic.audioSrc : null,
                    audioName: selectedMusic ? selectedMusic.name : null,
                    createdAt: "Just now"
                  };
                  setCreatedPosts(prev => [newPost, ...prev]);
                  
                  // Reset states
                  setThoughtText("");
                  setSelectedVibe(null);
                  setSelectedMusic(null);
                  setStep(4); // Route back to Feed
                }}
                userProfileData={userProfileData}
              />
            )}
            {step === 2 && (
              <SelectVibeScreen
                key="step-vibe"
                selectedVibe={selectedVibe}
                onSelect={setSelectedVibe}
                onConfirm={() => setStep(1)}
                onBack={() => setStep(1)}
                onTriggerUpload={triggerFileSelect}
              />
            )}
            {step === 3 && (
              <SelectMusicScreen
                key="step-music"
                selectedVibe={selectedVibe}
                selectedMusic={selectedMusic}
                onSelectMusic={setSelectedMusic}
                onConfirm={() => setStep(1)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 4 && (
              <FeedScreen
                key="step-home"
                initialMode="feed"
                onInboxClick={() => { setChatTargetUsername(null); setStep(7); }}
                onNotificationsClick={() => setStep(12)}
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
                createdPosts={createdPosts}
              />
            )}
            {step === 11 && (
              <FeedScreen
                key="step-reels"
                initialMode="reels"
                initialPost={selectedPost}
                onBackFromReels={() => {
                  setSelectedPost(null);
                  setStep(4);
                }}
                createdPosts={createdPosts}
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
                createdPosts={createdPosts}
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
          {step > 0 && step !== 1 && step !== 2 && step !== 3 && step !== 8 && step !== 10 && (
            <div className="absolute bottom-0 inset-x-0 bg-[#0c0c10] border-t-[0.5px] border-[rgba(255,255,255,0.08)] flex items-center justify-around px-0 z-40 p-[10px_0_14px]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {/* TAB 1: FEED (Step 4) */}
              <button onClick={() => { setSelectedPost(null); setStep(4); }} className="flex flex-col items-center justify-center min-w-[50px] cursor-pointer">
                <TablerFlame size={24} color={step === 4 ? '#ff5a1a' : 'rgba(255,255,255,0.4)'} />
                <div className="h-[4px]" />
                <span className={`text-[8px] font-medium leading-none ${step === 4 ? 'text-white' : 'text-[rgba(255,255,255,0.35)]'}`}>Feed</span>
              </button>

              {/* TAB 2: CHAT (Step 7) */}
              <button onClick={() => { setSelectedPost(null); setChatTargetUsername(null); setStep(7); }} className="flex flex-col items-center justify-center min-w-[50px] cursor-pointer">
                <div className="w-6 h-6 flex items-center justify-center">
                  <AgentMessageIcon size={24} color={step === 7 ? '#ffffff' : 'rgba(255,255,255,0.4)'} />
                </div>
                <div className="h-[4px]" />
                <span className={`text-[8px] font-medium leading-none ${step === 7 ? 'text-white' : 'text-[rgba(255,255,255,0.35)]'}`}>Chat</span>
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

              {/* TAB 5: PROFILE (Step 5) */}
              <button onClick={() => { setSelectedPost(null); setSelectedProfileUsername(userProfileData.username); setStep(5); }} className="flex flex-col items-center justify-center min-w-[50px] cursor-pointer">
                <CircleDot size={24} color={step === 5 ? '#ffffff' : 'rgba(255,255,255,0.4)'} />
                <div className="h-[4px]" />
                <span className={`text-[8px] font-medium leading-none ${step === 5 ? 'text-white' : 'text-[rgba(255,255,255,0.35)]'}`}>Profile</span>
              </button>
            </div>
          )}

          {/* Hidden File Input for Custom Uploads */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />

          {/* Upload Actions Modal / Bottom Sheet */}
          {showUploadActions && (
            <div className="upload-actions-modal" id="upload-actions-modal">
              <div className="actions-overlay" onClick={() => setShowUploadActions(false)}></div>
              <div className="actions-sheet">
                <div className="actions-sheet-header">
                  <h3>Select Upload Source</h3>
                </div>
                <div className="actions-sheet-body">
                  <button className="actions-sheet-btn" id="upload-action-camera" onClick={triggerFileSelect}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    <span>Take Photo</span>
                  </button>
                  <button className="actions-sheet-btn" id="upload-action-gallery" onClick={triggerFileSelect}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <span>Photo Library</span>
                  </button>
                </div>
                <button className="actions-sheet-cancel" onClick={() => setShowUploadActions(false)}>Cancel</button>
              </div>
            </div>
          )}

          {/* Privacy Processing Modal */}
          {privacyModalState && (
            <div id="privacy-processing-modal">
              {privacyModalState === 'scanning' && (
                <div id="processing-view">
                  <div className="scanner-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0c0c10' }}>
                    <div className="loader"></div>
                  </div>
                  <div className="validation-content">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff' }}>Securing Privacy</h3>
                    
                    {/* Neon Progress Bar */}
                    <div className="scan-progress-bar-container">
                      <div 
                        className="scan-progress-bar" 
                        style={{ width: `${(scanProgress / 3) * 100}%` }}
                      ></div>
                    </div>

                    {/* Step-by-step Log Checklist */}
                    <div className="scan-steps-list">
                      <div className={`scan-step-item ${scanProgress >= 0 ? 'active' : ''} ${scanProgress > 0 ? 'completed' : ''}`}>
                        <span className="scan-step-icon">
                          {scanProgress > 0 ? '✓' : '1'}
                        </span>
                        <span className="scan-step-text">Analyzing image meta-data</span>
                      </div>
                      <div className={`scan-step-item ${scanProgress >= 1 ? 'active' : ''} ${scanProgress > 1 ? 'completed' : ''}`}>
                        <span className="scan-step-icon">
                          {scanProgress > 1 ? '✓' : '2'}
                        </span>
                        <span className="scan-step-text">Locating faces & keypoints</span>
                      </div>
                      <div className={`scan-step-item ${scanProgress >= 2 ? 'active' : ''} ${scanProgress > 2 ? 'completed' : ''}`}>
                        <span className="scan-step-icon">
                          {scanProgress > 2 ? '✓' : '3'}
                        </span>
                        <span className="scan-step-text">Scrubbing GPS & EXIF data</span>
                      </div>
                    </div>

                    <p id="processing-subtitle-text" style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.78rem', marginTop: '16px', fontStyle: 'italic', lineHeight: '1.4' }}>
                      {scannerSubtitle}
                    </p>
                  </div>
                </div>
              )}

              {privacyModalState === 'validation' && (
                <div id="validation-view">
                  {/* Floating tick button in the top right */}
                  <button className="anonymize-confirm-btn-floating" onClick={handleKeepPhoto} title="Keep Photo" aria-label="Keep Photo">
                    <Check size={20} />
                  </button>

                  <div className="anonymized-preview-container">
                    <div className="anonymized-image" style={{ backgroundImage: `url(${tempUploadedUrl})` }}></div>
                  </div>
                  <div className="validation-actions">
                    <button className="anonymize-reject-btn" onClick={handleDiscardPhoto} title="Discard Photo" aria-label="Discard Photo">
                      <Trash size={20} />
                    </button>
                    <button className="anonymize-change-btn" onClick={handleChangePhoto} title="Choose Different Photo" aria-label="Choose Different Photo">
                      <Edit size={20} />
                    </button>
                    <button className="anonymize-rescan-btn" onClick={runScanningAnimation} title="Scan Again" aria-label="Scan Again">
                      <RefreshCw size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PhoneSimulator;
