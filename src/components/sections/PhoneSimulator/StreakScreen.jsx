import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockResultsRiya, RANDOM_AVATARS } from './MockData';
import coverImage from '../../../assets/cover.png';


const getStableAvatar = (username) => {
  if (!username) return RANDOM_AVATARS[0];
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % RANDOM_AVATARS.length;
  return RANDOM_AVATARS[index];
};

const mockData = {
  global: [
    { rank: 1, username: 'void_echo', points: '18,450', streak: '90', isMe: false },
    { rank: 2, username: 'soul_query', points: '14,200', streak: '60', isMe: false },
    { rank: 3, username: 'mind_drift', points: '11,880', streak: '60', isMe: false },
    { rank: 4, username: 'dark_note', points: '9,340', streak: '30', isMe: false },
    { rank: 5, username: 'lost_voice', points: '7,100', streak: '30', isMe: false },
  ],
  followers: [
    { rank: 1, username: 'void_echo', points: '18,450', streak: '90', isMe: false },
    { rank: 2, username: 'mind_drift', points: '11,880', streak: '60', isMe: false },
    { rank: 3, username: 'lost_voice', points: '7,100', streak: '30', isMe: false },
  ],
  following: [
    { rank: 1, username: 'soul_query', points: '14,200', streak: '60', isMe: false },
    { rank: 2, username: 'mind_drift', points: '11,880', streak: '60', isMe: false },
  ]
};

const StreakScreen = ({ onBack, isOwnProfile = true, username = "ghost_mind", userProfileData }) => {
  const [activeSegment, setActiveSegment] = useState(isOwnProfile ? 'streak' : 'leaderboard');
  const [lbFilter, setLbFilter] = useState('global');

  const [selectedMonth, setSelectedMonth] = useState(new Date(2026, 4, 1)); // May 2026

  const handlePrevMonth = () => {
    setSelectedMonth(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const handleNextMonth = () => {
    setSelectedMonth(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      if (d.getFullYear() > 2026 || (d.getFullYear() === 2026 && d.getMonth() > 4)) {
        return prev;
      }
      return d;
    });
  };

  const isDayCompleted = (dYear, dMonth, dayNum) => {
    if (dYear === 2026 && dMonth === 4) {
      return dayNum >= 17 && dayNum <= 31;
    }
    if (dYear === 2026 && dMonth === 3) {
      return dayNum >= 5 && dayNum <= 24;
    }
    if (dYear === 2026 && dMonth === 2) {
      return dayNum >= 10 && dayNum <= 28;
    }
    return false;
  };

  const isToday = (dYear, dMonth, dayNum) => {
    return dYear === 2026 && dMonth === 4 && dayNum === 31;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const year = selectedMonth.getFullYear();
  const month = selectedMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const formattedMonthYear = `${monthNames[month]} ${year}`;

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
      className="absolute inset-0 bg-[#07070a] flex flex-col font-sans z-50 overflow-hidden"
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />

      {/* TOP BAR */}
      <div className="bg-[#07070a]/90 border-b border-white/[0.06] backdrop-blur-md px-4 pt-3.5 pb-3.5 flex items-center justify-between shrink-0 z-10">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center cursor-pointer transition-all hover:bg-white/[0.1] hover:scale-105 active:scale-95">
          <i className="ti ti-chevron-left text-[16px] text-white/70"></i>
        </button>
        <span className="text-[14px] font-bold text-white tracking-wide uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>{isOwnProfile ? "Streak & Points" : ""}</span>
        <div className="w-8" />
      </div>

      {/* SEGMENTED CONTROL */}
      {isOwnProfile && (
        <div className="bg-white/[0.04] border border-white/[0.06] backdrop-blur-lg rounded-2xl m-[12px_16px] p-[4px] flex flex-row gap-[4px] shrink-0 z-10 shadow-lg">
          {['streak', 'points', 'leaderboard'].map(segment => (
            <button
              key={segment}
              onClick={() => setActiveSegment(segment)}
              className={`flex-1 py-[7px] text-center text-[11px] font-semibold tracking-wider capitalize transition-all duration-200 cursor-pointer rounded-xl ${
                activeSegment === segment 
                  ? 'bg-gradient-to-r from-[#ff5a1a] to-[#ff7e40] text-white shadow-[0_4px_12px_rgba(255,90,26,0.35)]' 
                  : 'bg-transparent text-white/40 hover:text-white/70'
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
      <div className="flex-1 overflow-y-auto pb-6 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <AnimatePresence mode="wait">
          {activeSegment === 'streak' && (
            <motion.div
              key="streak"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* SLICK PREMIUM HERO CARD */}
              <div className="bg-gradient-to-br from-[#1e1e24] via-[#121215] to-[#09090b] border border-white/[0.08] rounded-[24px] p-6 mb-4 relative overflow-hidden flex flex-row items-center justify-between shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
                {/* Glow Effects */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5a1a]/60 to-transparent z-10" />
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#ff5a1a]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-[#f59e0b]/8 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col relative z-10">
                  <span className="text-[9px] text-white/45 uppercase tracking-widest font-bold mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Current Streak</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[34px] font-extrabold text-white leading-none tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>15</span>
                    <span className="text-[12px] font-semibold text-white/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>days</span>
                    <i className="ti ti-flame text-[#ff5a1a] text-[20px] ml-1 animate-pulse drop-shadow-[0_0_8px_rgba(255,90,26,0.6)]"></i>
                  </div>
                </div>

                <div className="flex flex-col items-end relative z-10">
                  <span className="text-[9px] text-white/45 uppercase tracking-widest font-bold mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Highest Streak</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[30px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a1a] to-[#eab308] leading-none tracking-tight drop-shadow-[0_0_10px_rgba(255,90,26,0.25)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>30</span>
                    <span className="text-[12px] font-semibold text-[#ff5a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>days</span>
                  </div>
                  <span className="text-[8px] text-white/30 font-bold uppercase mt-1.5 tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>personal best</span>
                </div>
              </div>

              {/* DYNAMIC MONTHLY CALENDAR GRID */}
              <div className="bg-gradient-to-br from-[#1c1c22]/95 via-[#121215]/98 to-[#0a0a0c]/100 border border-white/[0.06] rounded-[24px] p-5 mb-4 shadow-[0_10px_25px_rgba(0,0,0,0.4)] backdrop-blur-md relative overflow-hidden">
                <div className="absolute right-[-10%] top-[-20%] w-[100px] h-[100px] bg-[#ff5a1a]/5 blur-2xl rounded-full pointer-events-none" />

                {/* CALENDAR HEADER */}
                <div className="flex flex-row justify-between items-center mb-5 px-1 relative z-10">
                  <span className="text-[11px] font-bold text-white/90 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {formattedMonthYear}
                  </span>
                  <div className="flex flex-row gap-2">
                    <button 
                      onClick={handlePrevMonth} 
                      className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center cursor-pointer hover:bg-white/[0.1] hover:scale-105 active:scale-95 transition-all"
                    >
                      <i className="ti ti-chevron-left text-[12px] text-white/80"></i>
                    </button>
                    <button 
                      onClick={handleNextMonth} 
                      disabled={year === 2026 && month === 4}
                      className={`w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center transition-all ${
                        year === 2026 && month === 4 
                          ? 'opacity-20 cursor-not-allowed' 
                          : 'cursor-pointer hover:bg-white/[0.1] hover:scale-105 active:scale-95'
                      }`}
                    >
                      <i className="ti ti-chevron-right text-[12px] text-white/80"></i>
                    </button>
                  </div>
                </div>

                {/* WEEKDAY LABELS */}
                <div className="grid grid-cols-7 gap-1 text-center mb-3.5 relative z-10">
                  {weekDays.map(wd => (
                    <span key={wd} className="text-[9px] font-bold text-white/25 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {wd}
                    </span>
                  ))}
                </div>

                {/* DAYS GRID */}
                <div className="grid grid-cols-7 gap-y-3 gap-x-1 relative z-10">
                  {/* Empty offset cells for starting day alignment */}
                  {Array.from({ length: firstDayIndex }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="w-[32px] h-[32px]" />
                  ))}

                  {/* Calendar day cells */}
                  {Array.from({ length: daysInMonth }).map((_, idx) => {
                    const dayNum = idx + 1;
                    const completed = isDayCompleted(year, month, dayNum);
                    const today = isToday(year, month, dayNum);

                    return (
                      <div key={dayNum} className="flex flex-col items-center justify-center">
                        {completed ? (
                          <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-[#ff7a3d] via-[#ff5a1a] to-[#e64000] flex items-center justify-center relative shadow-[0_3px_10px_rgba(255,90,26,0.45)] hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer">
                            <span className="text-white text-[10px] font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {dayNum}
                            </span>
                            <span className="absolute bottom-[2px] w-[3px] h-[3px] bg-white rounded-full opacity-60"></span>
                          </div>
                        ) : today ? (
                          <div className="w-[32px] h-[32px] rounded-full border-[1.5px] border-[#ff5a1a] bg-gradient-to-br from-[#ff5a1a]/20 to-[#ff5a1a]/5 flex items-center justify-center hover:scale-105 transition-all cursor-pointer">
                            <span className="text-[#ff5a1a] text-[10px] font-bold animate-pulse" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {dayNum}
                            </span>
                          </div>
                        ) : (
                          <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-white/[0.04] hover:text-white/80 transition-all duration-200 cursor-pointer">
                            <span className="text-white/30 text-[10px] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {dayNum}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* HOW IT WORKS SECTION */}
              <div className="mt-6 mb-3 px-1">
                <div className="text-[10px] font-bold tracking-[0.15em] uppercase bg-gradient-to-r from-white/40 via-white/50 to-white/20 bg-clip-text text-transparent mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>How it works</div>
                
                <div className="bg-[#121215]/65 border border-white/[0.04] rounded-3xl p-5 space-y-4.5 shadow-inner backdrop-blur-md">
                  <div className="flex gap-4 items-start">
                    <div className="w-[24px] h-[24px] rounded-full bg-gradient-to-br from-[#ff5a1a]/20 to-[#ff5a1a]/5 border border-[#ff5a1a]/30 shadow-[0_0_8px_rgba(255,90,26,0.15)] flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ti ti-flame text-[#ff7a3d] text-[12px]"></i>
                    </div>
                    <div>
                      <h4 className="text-[11.5px] font-bold text-white/90" style={{ fontFamily: "'DM Sans', sans-serif" }}>Post once every day</h4>
                      <p className="text-[10px] text-white/45 leading-relaxed mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>One post before midnight keeps your streak burning. Skipping a day resets the count — your points stay safe.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-[24px] h-[24px] rounded-full bg-gradient-to-br from-[#eab308]/20 to-[#eab308]/5 border border-[#eab308]/30 shadow-[0_0_8px_rgba(234,179,8,0.15)] flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ti ti-award text-[#eab308] text-[12px]"></i>
                    </div>
                    <div>
                      <h4 className="text-[11.5px] font-bold text-white/90" style={{ fontFamily: "'DM Sans', sans-serif" }}>Complete a 30-day cycle</h4>
                      <p className="text-[10px] text-white/45 leading-relaxed mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Hit 30 consecutive days and earn a 500 pt bonus. The cycle resets and starts fresh automatically.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-[24px] h-[24px] rounded-full bg-gradient-to-br from-[#4d90d7]/20 to-[#4d90d7]/5 border border-[#4d90d7]/30 shadow-[0_0_8px_rgba(77,144,215,0.15)] flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ti ti-message-2 text-[#64a9f5] text-[12px]"></i>
                    </div>
                    <div>
                      <h4 className="text-[11.5px] font-bold text-white/90" style={{ fontFamily: "'DM Sans', sans-serif" }}>Reply to earn points</h4>
                      <p className="text-[10px] text-white/45 leading-relaxed mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Every reply you give earns +3 pts. When someone replies to your post, +1 more. Points compound your rank.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSegment === 'points' && (
            <motion.div
              key="points"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* TOTAL HERO CARD */}
              <div className="bg-gradient-to-br from-[#1e1e24] via-[#101013] to-[#0d0d0f] border border-white/[0.08] rounded-[24px] p-6 mb-4 relative overflow-hidden text-center shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
                {/* Glow effects */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5a1a]/60 to-transparent z-10" />
                <div className="absolute -left-10 -top-10 w-28 h-28 bg-[#ff5a1a]/8 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-[#eab308]/6 rounded-full blur-2xl pointer-events-none" />

                <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a1a] via-[#ff7e40] to-[#eab308] text-[42px] font-extrabold leading-none drop-shadow-[0_0_15px_rgba(255,90,26,0.3)] relative z-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>3,000</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mt-2.5 mb-5 relative z-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>total points earned</div>
                <div className="border-t border-white/[0.06] pt-[18px] flex flex-row relative z-10">
                  <div className="flex-1 flex flex-col">
                    <span className="text-[15px] font-extrabold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>2,100</span>
                    <span className="text-[9px] font-bold text-white/30 uppercase mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>replies</span>
                  </div>
                  <div className="flex-1 flex flex-col border-l border-white/[0.06]">
                    <span className="text-[15px] font-extrabold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>400</span>
                    <span className="text-[9px] font-bold text-white/30 uppercase mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>posts</span>
                  </div>
                  <div className="flex-1 flex flex-col border-l border-white/[0.06]">
                    <span className="text-[15px] font-extrabold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>500</span>
                    <span className="text-[9px] font-bold text-white/30 uppercase mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>bonuses</span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-bold tracking-[0.12em] uppercase bg-gradient-to-r from-white/40 to-white/20 bg-clip-text text-transparent mb-3 px-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>How to earn</div>
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <div className="bg-[#121215]/80 border border-white/[0.06] rounded-2xl p-3.5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.04] flex flex-col">
                  <div className="w-6 h-6 rounded-lg bg-[#4d90d7]/15 border border-[#4d90d7]/20 flex items-center justify-center mb-2">
                    <i className="ti ti-message-2 text-[#4d90d7] text-[13px]"></i>
                  </div>
                  <div className="text-[#ff5a1a] text-[15px] font-extrabold mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>+3 pts</div>
                  <div className="text-[10px] text-white/45 leading-[1.4] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Each reply on someone's post</div>
                </div>
                
                <div className="bg-[#121215]/80 border border-white/[0.06] rounded-2xl p-3.5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.04] flex flex-col">
                  <div className="w-6 h-6 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center mb-2">
                    <i className="ti ti-message-share text-white/75 text-[13px]"></i>
                  </div>
                  <div className="text-[#ff5a1a] text-[15px] font-extrabold mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>+1 pt</div>
                  <div className="text-[10px] text-white/45 leading-[1.4] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>When someone replies to you</div>
                </div>

                <div className="bg-[#121215]/80 border border-white/[0.06] rounded-2xl p-3.5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.04] flex flex-col">
                  <div className="w-6 h-6 rounded-lg bg-[#eab308]/15 border border-[#eab308]/20 flex items-center justify-center mb-2">
                    <i className="ti ti-pencil text-[#eab308] text-[13px]"></i>
                  </div>
                  <div className="text-[#ff5a1a] text-[15px] font-extrabold mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>+1 pt</div>
                  <div className="text-[10px] text-white/45 leading-[1.4] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Daily post to keep streak</div>
                </div>

                <div className="bg-[#121215]/80 border border-white/[0.06] rounded-2xl p-3.5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.04] flex flex-col">
                  <div className="w-6 h-6 rounded-lg bg-[#f59e0b]/15 border border-[#f59e0b]/20 flex items-center justify-center mb-2">
                    <i className="ti ti-flame text-[#f59e0b] text-[13px]"></i>
                  </div>
                  <div className="text-[#ff5a1a] text-[15px] font-extrabold mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>+500 pts</div>
                  <div className="text-[10px] text-white/45 leading-[1.4] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Completing a 30-day cycle</div>
                </div>
              </div>

              <div className="text-[10px] font-bold tracking-[0.12em] uppercase bg-gradient-to-r from-white/40 to-white/20 bg-clip-text text-transparent mb-3 px-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Recent activity</div>
              <div className="bg-[#121215]/75 border border-white/[0.06] rounded-2xl overflow-hidden mb-4 shadow-lg backdrop-blur-md">
                <div className="flex flex-row justify-between items-center p-3.5 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <div className="flex flex-row gap-3 items-center">
                    <div className="w-7 h-7 rounded-full bg-[#4d90d7]/10 flex items-center justify-center shrink-0">
                      <i className="ti ti-message-2 text-[#4d90d7]/90 text-[14px]"></i>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold text-white/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>Replied to a post</span>
                      <span className="text-[9px] text-white/30 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>2 min ago</span>
                    </div>
                  </div>
                  <span className="text-[12px] font-extrabold text-[#ff5a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>+3</span>
                </div>
                <div className="flex flex-row justify-between items-center p-3.5 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <div className="flex flex-row gap-3 items-center">
                    <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0">
                      <i className="ti ti-message-share text-white/60 text-[14px]"></i>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold text-white/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>Someone replied to your post</span>
                      <span className="text-[9px] text-white/30 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>18 min ago</span>
                    </div>
                  </div>
                  <span className="text-[12px] font-extrabold text-[#ff5a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>+1</span>
                </div>
                <div className="flex flex-row justify-between items-center p-3.5 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <div className="flex flex-row gap-3 items-center">
                    <div className="w-7 h-7 rounded-full bg-[#ff5a1a]/10 flex items-center justify-center shrink-0">
                      <i className="ti ti-flame text-[#ff5a1a] text-[14px]"></i>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold text-white/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>30-day cycle completed</span>
                      <span className="text-[9px] text-white/30 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Today</span>
                    </div>
                  </div>
                  <span className="text-[12px] font-extrabold text-[#ff5a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>+500</span>
                </div>
                <div className="flex flex-row justify-between items-center p-3.5 hover:bg-white/[0.02] transition-colors">
                  <div className="flex flex-row gap-3 items-center">
                    <div className="w-7 h-7 rounded-full bg-[#7fda9f]/10 flex items-center justify-center shrink-0">
                      <i className="ti ti-pencil text-[#7fda9f]/90 text-[14px]"></i>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold text-white/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>Posted today</span>
                      <span className="text-[9px] text-white/30 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Today</span>
                    </div>
                  </div>
                  <span className="text-[12px] font-extrabold text-[#ff5a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>+1</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeSegment === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* YOU / OTHER USER CARD */}
              {isOwnProfile ? (
                <div className="flex flex-row items-center gap-[10px] bg-gradient-to-r from-[#ff5a1a]/15 via-[#ff5a1a]/5 to-[#eab308]/10 border border-[#ff5a1a]/25 rounded-2xl p-4 mb-3 relative overflow-hidden shadow-[0_4px_15px_rgba(255,90,26,0.15)]">
                  {/* Neon border decoration */}
                  <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#ff5a1a] to-[#eab308]" />
                  
                  <div className="text-[20px] font-extrabold text-[#ff5a1a] min-w-[32px] pl-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>#43</div>
                  <div className="w-[38px] h-[38px] rounded-full bg-[#1a1a28] border-[1.5px] border-[#ff5a1a] flex items-center justify-center shrink-0 overflow-hidden shadow-[0_0_8px_rgba(255,90,26,0.3)]">
                    {myAvatarValue?.startsWith('http')
                      ? <img src={myAvatarValue} alt="you" className="w-full h-full object-cover" />
                      : <span className="text-white text-[17px]">{myAvatarValue || '✦'}</span>
                    }
                  </div>
                  <div className="flex-1 flex flex-col ml-1">
                    <div className="flex flex-row items-center gap-1.5">
                      <span className="text-[12px] font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{username}</span>
                      <span className="text-[8px] bg-white/[0.08] text-white/60 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px]">You</span>
                    </div>
                    <div className="flex flex-row items-center gap-1 mt-1">
                      <span className="text-[10px] text-white/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>3,000 pts · </span>
                      <i className="ti ti-flame text-[#ff5a1a] text-[10px] mt-0.5 animate-pulse"></i>
                      <span className="text-[10px] text-[#ff5a1a] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>30 days streak</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative bg-gradient-to-br from-[#1c1c22] to-[#07070a] border border-white/[0.08] rounded-[24px] p-6 mb-[16px] overflow-hidden flex flex-col items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 inset-x-0 h-[110px] z-0">
                      <img src={displayCover} alt="cover" className="w-full h-full object-cover opacity-40" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#14141d]" />
                    </div>
                    <div className="absolute top-[-20%] right-[-10%] w-[150px] h-[150px] bg-[#ff5a1a]/15 blur-[50px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[120px] h-[120px] bg-[#4a90e2]/10 blur-[40px] rounded-full pointer-events-none" />

                    <div className="w-[72px] h-[72px] rounded-full bg-[#111] border-[2px] border-[#ff5a1a]/50 flex items-center justify-center shrink-0 mb-3 z-10 shadow-[0_5px_18px_rgba(255,90,26,0.3)] overflow-hidden">
                      {otherUserAvatar
                        ? <img src={otherUserAvatar} alt="avatar" className="w-full h-full object-cover" />
                        : <span className="text-white text-[28px]">✦</span>
                      }
                    </div>

                    <div className="text-[19px] font-extrabold text-white mb-1.5 z-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>{username}</div>

                    <div className="flex items-center gap-2 mb-5 z-10">
                      <span className="text-[11px] text-white/50 font-semibold tracking-wide uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Global Rank</span>
                      <div className="bg-gradient-to-r from-[#ff5a1a] to-[#ff7e40] text-[#0c0c10] text-[11px] font-bold px-2.5 py-[3px] rounded-[6px] shadow-[0_0_12px_rgba(255,90,26,0.4)]">#12</div>
                    </div>

                    <div className="w-full flex flex-row border-t border-white/[0.06] pt-[18px] z-10">
                      <div className="flex-1 flex flex-col items-center border-r border-white/[0.06]">
                        <span className="text-[22px] font-extrabold text-white leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>12.5k</span>
                        <span className="text-[9px] text-white/40 uppercase tracking-widest mt-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Points</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <span className="text-[22px] font-extrabold text-white leading-none flex items-center gap-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          45 <i className="ti ti-flame text-[#ff5a1a] text-[18px] mt-0.5 animate-pulse drop-shadow-[0_0_5px_rgba(255,90,26,0.5)]"></i>
                        </span>
                        <span className="text-[9px] text-white/40 uppercase tracking-widest mt-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Streak</span>
                      </div>
                    </div>
                  </div>

                  {/* COMPARISON CARD */}
                  <div className="mt-2">
                    <div className="bg-gradient-to-br from-[#121626] to-[#0c0c10] border border-white/[0.07] rounded-[24px] p-4.5 mb-4 shadow-lg">
                      <div className="flex flex-row justify-between items-center mb-5 px-2">
                        <div className="flex flex-col items-center">
                          <div className="w-[44px] h-[44px] rounded-full bg-[#1a1a28] border-[1.5px] border-white/20 flex items-center justify-center shrink-0 mb-2 overflow-hidden shadow-md">
                            {myAvatarValue?.startsWith('http')
                              ? <img src={myAvatarValue} alt="you" className="w-full h-full rounded-full object-cover" />
                              : <span className="text-white text-[20px]">{myAvatarValue || '✦'}</span>
                            }
                          </div>
                          <span className="text-[11px] font-bold text-white/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>You</span>
                        </div>
                        <div className="text-[10px] font-bold text-white/15 italic tracking-widest">VS</div>
                        <div className="flex flex-col items-center">
                          <div className="w-[44px] h-[44px] rounded-full bg-[#111] border-[1.5px] border-[#ff5a1a] flex items-center justify-center shrink-0 mb-2 shadow-[0_0_10px_rgba(255,90,26,0.25)] overflow-hidden">
                            {otherUserAvatar
                              ? <img src={otherUserAvatar} alt="them" className="w-full h-full rounded-full object-cover" />
                              : <span className="text-white text-[16px]">✦</span>
                            }
                          </div>
                          <span className="text-[11px] font-bold text-[#ff5a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{username}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {/* Rank */}
                        <div className="flex flex-row justify-between items-center bg-white/[0.02] border border-white/[0.04] rounded-xl p-3">
                          <span className="text-[14px] font-extrabold text-white w-[60px] text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>#43</span>
                          <span className="text-[9px] text-white/30 uppercase tracking-wider font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Rank</span>
                          <span className="text-[14px] font-extrabold text-[#ff5a1a] w-[60px] text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>#12</span>
                        </div>

                        {/* Points */}
                        <div className="flex flex-row justify-between items-center bg-white/[0.02] border border-white/[0.04] rounded-xl p-3">
                          <span className="text-[14px] font-extrabold text-white w-[60px] text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>3,000</span>
                          <span className="text-[9px] text-white/30 uppercase tracking-wider font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Points</span>
                          <span className="text-[14px] font-extrabold text-[#ff5a1a] w-[60px] text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>12.5k</span>
                        </div>

                        {/* Streak */}
                        <div className="flex flex-row justify-between items-center bg-[#ff5a1a]/[0.03] border border-[#ff5a1a]/15 rounded-xl p-3">
                          <div className="w-[60px] flex justify-center items-center gap-1">
                            <span className="text-[14px] font-extrabold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>15</span>
                            <i className="ti ti-flame text-white/30 text-[12px]"></i>
                          </div>
                          <span className="text-[9px] text-[#ff5a1a]/80 uppercase tracking-wider font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Streak</span>
                          <div className="w-[60px] flex justify-center items-center gap-1">
                            <span className="text-[14px] font-extrabold text-[#ff5a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>45</span>
                            <i className="ti ti-flame text-[#ff5a1a] text-[12px]"></i>
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
                  <div className="flex flex-row gap-2 mb-3 px-0.5">
                    {['global', 'followers', 'following'].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setLbFilter(filter)}
                        className={`text-[10px] px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer font-semibold uppercase tracking-wider ${
                          lbFilter === filter 
                            ? 'bg-gradient-to-r from-[#ff5a1a] to-[#ff7e40] text-white shadow-md' 
                            : 'bg-white/[0.04] border border-white/[0.08] text-white/45 hover:text-white/70 hover:bg-white/[0.08]'
                        }`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  {/* LIST & CONTENT */}
                  <div className="space-y-2">
                    {mockData[lbFilter]?.map((item, idx) => {
                      // Custom styles for top ranks
                      let rankBgClass = 'bg-[#121215]/80 border-white/[0.04]';
                      let rankTextClass = 'text-white/35';
                      
                      if (item.rank === 1) {
                        rankBgClass = 'bg-gradient-to-r from-[#eab308]/15 via-[#121215]/80 to-transparent border-[#eab308]/25';
                        rankTextClass = 'text-[#eab308] font-black drop-shadow-[0_0_6px_rgba(234,179,8,0.4)]';
                      } else if (item.rank === 2) {
                        rankBgClass = 'bg-gradient-to-r from-[#94a3b8]/12 via-[#121215]/80 to-transparent border-[#94a3b8]/20';
                        rankTextClass = 'text-[#cbd5e1] font-extrabold';
                      } else if (item.rank === 3) {
                        rankBgClass = 'bg-gradient-to-r from-[#b45309]/12 via-[#121215]/80 to-transparent border-[#b45309]/20';
                        rankTextClass = 'text-[#d97706] font-extrabold';
                      } else if (item.isMe) {
                        rankBgClass = 'bg-[#ff5a1a]/[0.08] border-[#ff5a1a]/[0.22]';
                        rankTextClass = 'text-[#ff5a1a] font-bold';
                      }

                      return (
                        <div 
                          key={idx} 
                          className={`flex flex-row items-center gap-[10px] p-[10px_14px] rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${rankBgClass}`}
                        >
                          <div className={`text-[13px] min-w-[22px] text-center ${rankTextClass}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            #{item.rank}
                          </div>
                          <div className="w-[32px] h-[32px] rounded-full bg-[#1a1a28] border border-white/[0.08] flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                            {item.isMe ? (
                              myAvatarValue?.startsWith('http')
                                ? <img src={myAvatarValue} alt="you" className="w-full h-full object-cover" />
                                : <span className="text-white text-[14px]">{myAvatarValue || '✦'}</span>
                            ) : (
                              <img src={getStableAvatar(item.username)} alt={item.username} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="flex-1 flex flex-row items-center">
                            <span className="text-[11.5px] font-bold text-white/90" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.username}</span>
                          </div>
                          <div className="text-right flex flex-col">
                            <span className="text-[12px] font-extrabold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.points}</span>
                            <div className="flex flex-row items-center justify-end gap-1 mt-0.5">
                              <i className="ti ti-flame text-[#ff5a1a] text-[9px] animate-pulse"></i>
                              <span className="text-[9px] text-[#ff5a1a] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.streak} days</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
