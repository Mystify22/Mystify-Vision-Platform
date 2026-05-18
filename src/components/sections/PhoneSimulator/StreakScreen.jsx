import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockResultsRiya } from './MockData';
import coverImage from '../../../assets/cover.png';

const mockData = {
  global: [
    { rank: 1, symbol: '◎', username: 'void_echo', points: '18,450', streak: '90', isMe: false, crown: '#f5c842' },
    { rank: 2, symbol: '❋', username: 'soul_query', points: '14,200', streak: '60', isMe: false, crown: '#b0b0b0' },
    { rank: 3, symbol: '☽', username: 'mind_drift', points: '11,880', streak: '60', isMe: false, crown: '#c87941' },
    { rank: 4, symbol: '✴', username: 'dark_note', points: '9,340', streak: '30', isMe: false, crown: null },
    { rank: 5, symbol: '⚝', username: 'lost_voice', points: '7,100', streak: '30', isMe: false, crown: null },
  ],
  week: [
    { rank: 1, symbol: '⚛', username: 'anon_wave', points: '420', streak: '7', isMe: false, crown: '#f5c842' },
    { rank: 2, symbol: '☯', username: 'night_pen', points: '385', streak: '7', isMe: false, crown: '#b0b0b0' },
    { rank: 3, symbol: '◈', username: 'deep_ask', points: '310', streak: '5', isMe: false, crown: '#c87941' },
    { rank: 4, symbol: '❧', username: 'void_echo', points: '290', streak: '7', isMe: false, crown: null },
  ],
  following: [
    { rank: 1, symbol: '❋', username: 'soul_query', points: '14,200', streak: '60', isMe: false, crown: '#f5c842' },
    { rank: 2, symbol: '☽', username: 'mind_drift', points: '11,880', streak: '60', isMe: false, crown: '#b0b0b0' },
  ]
};

const StreakScreen = ({ onBack, isOwnProfile = true, username = "ghost_mind", userProfileData }) => {
  const [activeSegment, setActiveSegment] = useState(isOwnProfile ? 'streak' : 'leaderboard');
  const [lbFilter, setLbFilter] = useState('global');

  const userProfile = mockResultsRiya?.find(u => u.handle === username || u.handle === `@${username}`);
  const displayCover = userProfile?.coverImage || coverImage;
  const otherUserAvatar = userProfile?.avatarImage;
  const myAvatarValue = userProfileData?.avatarValue;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 bg-[#0c0c10] flex flex-col font-sans z-50 overflow-hidden"
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />

      {/* TOP BAR */}
      <div className="bg-[#0c0c10] border-b border-white/[0.08] px-4 pt-3 pb-3 flex items-center justify-between shrink-0">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center cursor-pointer transition-colors hover:bg-white/[0.12]">
          <i className="ti ti-chevron-left text-[16px] text-white/70"></i>
        </button>
        <span className="text-[14px] font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{isOwnProfile ? "Streak & Points" : ""}</span>
        <div className="w-8" />
      </div>

      {/* SEGMENTED CONTROL */}
      {isOwnProfile && (
        <div className="bg-white/[0.06] rounded-[20px] m-[12px_16px] p-[3px] flex flex-row gap-[2px] shrink-0">
          {['streak', 'points', 'leaderboard'].map(segment => (
            <button
              key={segment}
              onClick={() => setActiveSegment(segment)}
              className={`flex-1 py-[7px] text-center text-[11px] font-medium capitalize transition-all duration-200 ${activeSegment === segment ? 'bg-white text-[#0c0c10] rounded-[16px]' : 'bg-transparent text-white/40'
                }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {segment}
            </button>
          ))}
        </div>
      )}

      {/* TOP PADDING FOR OTHER USER */}
      {!isOwnProfile && <div className="h-[16px]"></div>}

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto pb-5 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <AnimatePresence mode="wait">
          {activeSegment === 'streak' && (
            <motion.div
              key="streak"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* FLAME HERO CARD */}
              <div className="bg-[#141418] border border-white/[0.07] rounded-[20px] p-5 mb-3">
                <div className="flex flex-row justify-between items-center mb-[18px]">
                  <div className="flex flex-row gap-[10px] items-center">
                    <i className="ti ti-flame text-[#ff5a1a] text-[36px]"></i>
                    <div className="flex flex-col">
                      <span className="text-[#ff5a1a] text-[44px] font-bold leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>15</span>
                      <span className="text-[12px] font-medium text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>day streak</span>
                      <span className="text-[10px] text-white/30 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Best: 30 days</span>
                    </div>
                  </div>
                  <div className="bg-[#ff5a1a]/[0.12] border border-[#ff5a1a]/25 rounded-[20px] py-1.5 px-3 text-right">
                    <div className="text-[#ff5a1a] text-[18px] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>3,000</div>
                    <div className="text-[#ff5a1a]/60 text-[9px] mt-[1px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>total pts</div>
                  </div>
                </div>

                {/* CYCLE PROGRESS */}
                <div className="flex flex-row justify-between mb-1">
                  <span className="text-[10px] text-white/[0.35]" style={{ fontFamily: "'DM Sans', sans-serif" }}>30-day cycle progress</span>
                  <span className="text-[10px] text-[#ff5a1a] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>15 / 30 — Halfway there!</span>
                </div>
                <div className="h-[6px] bg-white/[0.07] rounded-[4px] overflow-hidden mb-[10px]">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "50%" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-[#ff5a1a] rounded-[4px]"
                  />
                </div>

                {/* MONTH DOT GRID */}
                <div className="grid grid-cols-6 gap-y-3 gap-x-2 mt-[12px]">
                  {Array.from({ length: 30 }).map((_, idx) => {
                    const isDone = idx < 15;
                    const isToday = idx === 15;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <span className="text-[9px] text-white/25" style={{ fontFamily: "'DM Sans', sans-serif" }}>{idx + 1}</span>
                        <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${isDone ? 'bg-[#ff5a1a]' : isToday ? 'bg-[#ff5a1a]/[0.15] border-[1.5px] border-[#ff5a1a]' : 'bg-white/[0.05] border border-white/[0.09]'
                          }`}>
                          {isDone && <span className="text-[16px]">🥷🏻</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>



              <div className="text-[9px] font-medium tracking-[0.09em] uppercase text-white/[0.22] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>How it works</div>

              {/* HOW IT WORKS CARD */}
              <div className="bg-[#141418] border border-white/[0.07] rounded-[14px] p-[14px] mb-3">
                <div className="flex flex-row gap-[10px] items-start border-b border-white/[0.06] pb-[11px] mb-[11px]">
                  <div className="w-[28px] h-[28px] rounded-[8px] bg-[#ff5a1a]/[0.12] flex items-center justify-center shrink-0">
                    <i className="ti ti-flame text-[#ff5a1a] text-[16px]"></i>
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="text-[11px] font-medium text-white mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Post once every day</span>
                    <span className="text-[10px] text-white/[0.35] leading-[1.45]" style={{ fontFamily: "'DM Sans', sans-serif" }}>One post before midnight keeps your streak alive. Skipping a day resets the count — your points stay.</span>
                  </div>
                </div>

                <div className="flex flex-row gap-[10px] items-start border-b border-white/[0.06] pb-[11px] mb-[11px]">
                  <div className="w-[28px] h-[28px] rounded-[8px] bg-[#7fda9f]/10 flex items-center justify-center shrink-0">
                    <i className="ti ti-circle-check text-[#7fda9f]/85 text-[16px]"></i>
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="text-[11px] font-medium text-white mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Complete a 30-day cycle</span>
                    <span className="text-[10px] text-white/[0.35] leading-[1.45]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Hit 30 consecutive days and earn a 500 pt bonus. The cycle resets and starts fresh automatically.</span>
                  </div>
                </div>

                <div className="flex flex-row gap-[10px] items-start">
                  <div className="w-[28px] h-[28px] rounded-[8px] bg-[#dab87f]/10 flex items-center justify-center shrink-0">
                    <i className="ti ti-message-circle text-[#dab87f]/85 text-[16px]"></i>
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="text-[11px] font-medium text-white mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Reply to earn points</span>
                    <span className="text-[10px] text-white/[0.35] leading-[1.45]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Every reply you give earns +3 pts. When someone replies to your post, +1 more. Points compound your rank.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSegment === 'points' && (
            <motion.div
              key="points"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* TOTAL HERO CARD */}
              <div className="bg-[#141418] border border-white/[0.07] rounded-[20px] p-[20px_16px] mb-3 text-center">
                <div className="text-[#ff5a1a] text-[40px] font-bold leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>3,000</div>
                <div className="text-[11px] text-white/[0.35] mt-1 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>total points earned</div>
                <div className="border-t border-white/[0.07] pt-[14px] flex flex-row">
                  <div className="flex-1 flex flex-col">
                    <span className="text-[16px] font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>2,100</span>
                    <span className="text-[9px] text-white/[0.3]" style={{ fontFamily: "'DM Sans', sans-serif" }}>from replies</span>
                  </div>
                  <div className="flex-1 flex flex-col border-l border-white/[0.07]">
                    <span className="text-[16px] font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>400</span>
                    <span className="text-[9px] text-white/[0.3]" style={{ fontFamily: "'DM Sans', sans-serif" }}>from posting</span>
                  </div>
                  <div className="flex-1 flex flex-col border-l border-white/[0.07]">
                    <span className="text-[16px] font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>500</span>
                    <span className="text-[9px] text-white/[0.3]" style={{ fontFamily: "'DM Sans', sans-serif" }}>streak bonus</span>
                  </div>
                </div>
              </div>

              <div className="text-[9px] font-medium tracking-[0.09em] uppercase text-white/[0.22] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>How to earn</div>
              <div className="grid grid-cols-2 gap-2 mb-[14px]">
                <div className="bg-[#141418] border border-white/[0.07] rounded-[12px] p-3">
                  <i className="ti ti-message-circle text-white/[0.45] text-[15px] mb-1.5 block"></i>
                  <div className="text-[#ff5a1a] text-[15px] font-semibold mb-[3px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>+3 pts</div>
                  <div className="text-[10px] text-white/[0.38] leading-[1.4]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Each reply on someone's post</div>
                </div>
                <div className="bg-[#141418] border border-white/[0.07] rounded-[12px] p-3">
                  <i className="ti ti-messages text-white/[0.45] text-[15px] mb-1.5 block"></i>
                  <div className="text-[#ff5a1a] text-[15px] font-semibold mb-[3px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>+1 pt</div>
                  <div className="text-[10px] text-white/[0.38] leading-[1.4]" style={{ fontFamily: "'DM Sans', sans-serif" }}>When someone replies to your post</div>
                </div>
                <div className="bg-[#141418] border border-white/[0.07] rounded-[12px] p-3">
                  <i className="ti ti-pencil text-white/[0.45] text-[15px] mb-1.5 block"></i>
                  <div className="text-[#ff5a1a] text-[15px] font-semibold mb-[3px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>+1 pt</div>
                  <div className="text-[10px] text-white/[0.38] leading-[1.4]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Daily post to keep streak</div>
                </div>
                <div className="bg-[#141418] border border-white/[0.07] rounded-[12px] p-3">
                  <i className="ti ti-flame text-white/[0.45] text-[15px] mb-1.5 block"></i>
                  <div className="text-[#ff5a1a] text-[15px] font-semibold mb-[3px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>+500 pts</div>
                  <div className="text-[10px] text-white/[0.38] leading-[1.4]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Completing a 30-day cycle</div>
                </div>
              </div>


              <div className="text-[9px] font-medium tracking-[0.09em] uppercase text-white/[0.22] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Recent activity</div>
              <div className="bg-[#141418] border border-white/[0.07] rounded-[14px] overflow-hidden mb-[14px]">
                <div className="flex flex-row justify-between items-center p-[10px_12px] border-b border-white/[0.06]">
                  <div className="flex flex-row gap-2 items-center">
                    <i className="ti ti-message-circle text-[#4d90d7]/80 text-[14px]"></i>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-white/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>Replied to a post</span>
                      <span className="text-[9px] text-white/25" style={{ fontFamily: "'DM Sans', sans-serif" }}>2 min ago</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-[#ff5a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>+3</span>
                </div>
                <div className="flex flex-row justify-between items-center p-[10px_12px] border-b border-white/[0.06]">
                  <div className="flex flex-row gap-2 items-center">
                    <i className="ti ti-messages text-[#da7f7f]/85 text-[14px]"></i>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-white/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>Someone replied to your post</span>
                      <span className="text-[9px] text-white/25" style={{ fontFamily: "'DM Sans', sans-serif" }}>18 min ago</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-[#ff5a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>+1</span>
                </div>
                <div className="flex flex-row justify-between items-center p-[10px_12px] border-b border-white/[0.06]">
                  <div className="flex flex-row gap-2 items-center">
                    <i className="ti ti-flame text-[#ff5a1a] text-[14px]"></i>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-white/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>30-day cycle completed</span>
                      <span className="text-[9px] text-white/25" style={{ fontFamily: "'DM Sans', sans-serif" }}>Today</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-[#ff5a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>+500</span>
                </div>
                <div className="flex flex-row justify-between items-center p-[10px_12px]">
                  <div className="flex flex-row gap-2 items-center">
                    <i className="ti ti-pencil text-[#7fda9f]/75 text-[14px]"></i>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-white/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>Posted today</span>
                      <span className="text-[9px] text-white/25" style={{ fontFamily: "'DM Sans', sans-serif" }}>Today</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-[#ff5a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>+1</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeSegment === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* YOU / OTHER USER CARD */}
              {isOwnProfile ? (
                <div className="flex flex-row items-center gap-[10px] bg-[#ff5a1a]/[0.07] border border-[#ff5a1a]/20 rounded-[14px] p-[11px_13px] mb-[10px]">
                  <div className="text-[18px] font-bold text-[#ff5a1a] min-w-[30px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>#43</div>
                  <div className="w-[36px] h-[36px] rounded-full bg-[#1a1a28] border-[1.5px] border-[#ff5a1a] flex items-center justify-center shrink-0">
                    <span className="text-white text-[17px]">✦</span>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-row items-center gap-1.5">
                      <span className="text-[12px] font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{username}</span>
                      <span className="bg-[#ff5a1a]/[0.15] text-[#ff5a1a] text-[8px] px-1.5 py-[2px] rounded-[8px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>You</span>
                    </div>
                    <div className="flex flex-row items-center gap-1 mt-0.5">
                      <span className="text-[10px] text-white/[0.35]" style={{ fontFamily: "'DM Sans', sans-serif" }}>3,000 pts · </span>
                      <i className="ti ti-flame text-[#ff5a1a] text-[10px]"></i>
                      <span className="text-[10px] text-white/[0.35]" style={{ fontFamily: "'DM Sans', sans-serif" }}>30 days</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative bg-gradient-to-br from-[#1a1a24] to-[#0c0c10] border border-white/[0.08] rounded-[24px] p-6 mb-[16px] overflow-hidden flex flex-col items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 inset-x-0 h-[110px] z-0">
                      <img src={displayCover} alt="cover" className="w-full h-full object-cover opacity-40" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#14141d]" />
                    </div>
                    <div className="absolute top-[-20%] right-[-10%] w-[150px] h-[150px] bg-[#ff5a1a]/15 blur-[50px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[120px] h-[120px] bg-[#4a90e2]/10 blur-[40px] rounded-full pointer-events-none" />

                    <div className="w-[72px] h-[72px] rounded-full bg-[#111] border-[2px] border-white/10 flex items-center justify-center shrink-0 mb-3 z-10 shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
                      {otherUserAvatar
                        ? <img src={otherUserAvatar} alt="avatar" className="w-[60px] h-[60px] rounded-full object-cover" />
                        : <span className="text-white text-[28px]">✦</span>
                      }
                    </div>

                    <div className="text-[19px] font-bold text-white mb-1.5 z-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>{username}</div>

                    <div className="flex items-center gap-2 mb-5 z-10">
                      <span className="text-[11px] text-white/50 font-medium tracking-wide uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Global Rank</span>
                      <div className="bg-[#ff5a1a] text-[#0c0c10] text-[11px] font-bold px-2 py-[3px] rounded-[6px] shadow-[0_0_10px_rgba(255,90,26,0.3)]">#12</div>
                    </div>

                    <div className="w-full flex flex-row border-t border-white/[0.06] pt-[18px] z-10">
                      <div className="flex-1 flex flex-col items-center border-r border-white/[0.06]">
                        <span className="text-[22px] font-bold text-white leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>12.5k</span>
                        <span className="text-[9px] text-white/40 uppercase tracking-widest mt-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Points</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <span className="text-[22px] font-bold text-white leading-none flex items-center gap-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          45 <i className="ti ti-flame text-[#ff5a1a] text-[18px] mt-0.5"></i>
                        </span>
                        <span className="text-[9px] text-white/40 uppercase tracking-widest mt-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Streak</span>
                      </div>
                    </div>
                  </div>

                  {/* COMPARISON CARD */}
                  <div className="mt-2">
                    <div className="bg-[#141418] border border-white/[0.07] rounded-[20px] p-4 mb-4">
                      <div className="flex flex-row justify-between items-center mb-5 px-2">
                        <div className="flex flex-col items-center">
                          <div className="w-[44px] h-[44px] rounded-full bg-[#1a1a28] border-[1.5px] border-white/20 flex items-center justify-center shrink-0 mb-1.5 overflow-hidden">
                            {myAvatarValue?.startsWith('http')
                              ? <img src={myAvatarValue} alt="you" className="w-full h-full rounded-full object-cover" />
                              : <span className="text-white text-[20px]">{myAvatarValue || '✦'}</span>
                            }
                          </div>
                          <span className="text-[11px] font-medium text-white/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>You</span>
                        </div>
                        <div className="text-[10px] font-bold text-white/20 italic tracking-wider">VS</div>
                        <div className="flex flex-col items-center">
                          <div className="w-[44px] h-[44px] rounded-full bg-[#111] border-[1.5px] border-[#ff5a1a] flex items-center justify-center shrink-0 mb-1.5 shadow-[0_0_10px_rgba(255,90,26,0.2)] overflow-hidden">
                            {otherUserAvatar
                              ? <img src={otherUserAvatar} alt="them" className="w-full h-full rounded-full object-cover" />
                              : <span className="text-white text-[16px]">✦</span>
                            }
                          </div>
                          <span className="text-[11px] font-medium text-[#ff5a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{username}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {/* Rank */}
                        <div className="flex flex-row justify-between items-center bg-white/[0.03] rounded-[12px] p-3">
                          <span className="text-[15px] font-bold text-white w-[60px] text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>#43</span>
                          <span className="text-[9px] text-white/40 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>Rank</span>
                          <span className="text-[15px] font-bold text-[#ff5a1a] w-[60px] text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>#12</span>
                        </div>

                        {/* Points */}
                        <div className="flex flex-row justify-between items-center bg-white/[0.03] rounded-[12px] p-3">
                          <span className="text-[15px] font-bold text-white w-[60px] text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>3,000</span>
                          <span className="text-[9px] text-white/40 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>Points</span>
                          <span className="text-[15px] font-bold text-[#ff5a1a] w-[60px] text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>12.5k</span>
                        </div>

                        {/* Streak */}
                        <div className="flex flex-row justify-between items-center bg-[#ff5a1a]/[0.05] border border-[#ff5a1a]/10 rounded-[12px] p-3">
                          <div className="w-[60px] flex justify-center items-center gap-1.5">
                            <span className="text-[15px] font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>15</span>
                            <i className="ti ti-flame text-white/40 text-[14px]"></i>
                          </div>
                          <span className="text-[9px] text-[#ff5a1a]/70 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>Streak</span>
                          <div className="w-[60px] flex justify-center items-center gap-1.5">
                            <span className="text-[15px] font-bold text-[#ff5a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>45</span>
                            <i className="ti ti-flame text-[#ff5a1a] text-[14px]"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {isOwnProfile && (
                <>
                  {/* FILTER PILLS */}
                  <div className="flex flex-row gap-1.5 mb-[10px]">
                    {['global', 'week', 'following'].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setLbFilter(filter)}
                        className={`text-[10px] px-3 py-1.5 rounded-[20px] transition-colors capitalize ${lbFilter === filter ? 'bg-white text-[#0c0c10] border border-white' : 'bg-transparent border border-white/10 text-white/[0.45]'
                          }`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {filter === 'week' ? 'This week' : filter}
                      </button>
                    ))}
                  </div>

                  {/* LIST & CONTENT */}
                  <div>
                    {mockData[lbFilter]?.map((item, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <div className={`flex flex-row items-center gap-[10px] p-[9px_12px] rounded-[11px] mb-[5px] border ${item.isMe ? 'bg-[#ff5a1a]/[0.05] border-[#ff5a1a]/[0.22]' : 'bg-[#141418] border-white/[0.06]'
                            }`}>
                            <div className={`text-[12px] min-w-[22px] text-center ${item.isMe ? 'text-[#ff5a1a] font-semibold' : 'text-white/30 font-medium'}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {item.crown ? <i className="ti ti-crown" style={{ color: item.crown, fontSize: '14px' }}></i> : item.rank}
                            </div>
                            <div className="w-[30px] h-[30px] rounded-full bg-[#1a1a28] border border-white/10 flex items-center justify-center shrink-0">
                              <span className="text-white text-[14px]">{item.symbol}</span>
                            </div>
                            <div className="flex-1 flex flex-row items-center">
                              <span className="text-[11px] font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.username}</span>
                              {item.isMe && <span className="text-[9px] text-[#ff5a1a] ml-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>you</span>}
                            </div>
                            <div className="text-right flex flex-col">
                              <span className="text-[12px] font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.points}</span>
                              <div className="flex flex-row items-center justify-end gap-1 mt-0.5">
                                <i className="ti ti-flame text-[#ff5a1a] text-[9px]"></i>
                                <span className="text-[9px] text-white/[0.28]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.streak} days</span>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <div className="text-center text-[10px] text-white/[0.18] mt-[10px] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Resets every 30 days · All-time points are kept
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StreakScreen;
