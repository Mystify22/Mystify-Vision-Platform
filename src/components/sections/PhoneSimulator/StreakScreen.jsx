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
              {/* SLICK PREMIUM HERO CARD */}
              <div className="bg-[#111115] border border-white/[0.04] rounded-[24px] p-6 mb-4 relative overflow-hidden flex flex-row items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Current Streak</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[32px] font-bold text-white leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>15</span>
                    <span className="text-[13px] font-medium text-white/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>days</span>
                    <i className="ti ti-flame text-[#ff5a1a] text-[18px] ml-1 animate-pulse"></i>
                  </div>
                  <span className="text-[10px] text-white/30 mt-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Personal Best: 30 days</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Total Points</span>
                  <span className="text-[28px] font-bold text-[#ff5a1a] leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>3,000</span>
                  <span className="text-[9px] text-[#ff5a1a]/60 font-semibold uppercase mt-1 tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>pts earned</span>
                </div>
              </div>

              {/* DYNAMIC MONTHLY CALENDAR GRID */}
              <div className="bg-[#111115] border border-white/[0.04] rounded-[24px] p-5 mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                {/* CALENDAR HEADER */}
                <div className="flex flex-row justify-between items-center mb-4 px-1">
                  <span className="text-[12px] font-semibold text-white/80 uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {formattedMonthYear}
                  </span>
                  <div className="flex flex-row gap-2">
                    <button 
                      onClick={handlePrevMonth} 
                      className="w-6 h-6 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center cursor-pointer hover:bg-white/[0.1] transition-colors"
                    >
                      <i className="ti ti-chevron-left text-[11px] text-white/70"></i>
                    </button>
                    <button 
                      onClick={handleNextMonth} 
                      disabled={year === 2026 && month === 4}
                      className={`w-6 h-6 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center transition-colors ${
                        year === 2026 && month === 4 
                          ? 'opacity-30 cursor-not-allowed' 
                          : 'cursor-pointer hover:bg-white/[0.1]'
                      }`}
                    >
                      <i className="ti ti-chevron-right text-[11px] text-white/70"></i>
                    </button>
                  </div>
                </div>

                {/* WEEKDAY LABELS */}
                <div className="grid grid-cols-7 gap-1 text-center mb-3">
                  {weekDays.map(wd => (
                    <span key={wd} className="text-[9px] font-semibold text-white/20 uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {wd}
                    </span>
                  ))}
                </div>

                {/* DAYS GRID */}
                <div className="grid grid-cols-7 gap-y-2.5 gap-x-1">
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
                          <div className="w-[32px] h-[32px] rounded-full bg-[#ff5a1a] flex items-center justify-center relative shadow-[0_2px_8px_rgba(255,90,26,0.3)]">
                            <span className="text-white text-[10px] font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {dayNum}
                            </span>
                          </div>
                        ) : today ? (
                          <div className="w-[32px] h-[32px] rounded-full border-[1.5px] border-[#ff5a1a] bg-[#ff5a1a]/[0.1] flex items-center justify-center">
                            <span className="text-[#ff5a1a] text-[10px] font-bold animate-pulse" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {dayNum}
                            </span>
                          </div>
                        ) : (
                          <div className="w-[32px] h-[32px] flex items-center justify-center">
                            <span className="text-white/35 text-[10px] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
              <div className="mt-5 mb-3 px-1">
                <div className="text-[9px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>How it works</div>
                
                <div className="space-y-4">
                  <div className="flex gap-3.5 items-start">
                    <div className="w-[22px] h-[22px] rounded-full bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ti ti-flame text-[#ff5a1a] text-[11px]"></i>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white/90" style={{ fontFamily: "'DM Sans', sans-serif" }}>Post once every day</h4>
                      <p className="text-[10px] text-white/40 leading-relaxed mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>One post before midnight keeps your streak burning. Skipping a day resets the count — your points stay safe.</p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-[22px] h-[22px] rounded-full bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ti ti-circle-check text-white/60 text-[11px]"></i>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white/90" style={{ fontFamily: "'DM Sans', sans-serif" }}>Complete a 30-day cycle</h4>
                      <p className="text-[10px] text-white/40 leading-relaxed mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Hit 30 consecutive days and earn a 500 pt bonus. The cycle resets and starts fresh automatically.</p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-[22px] h-[22px] rounded-full bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ti ti-message-circle text-white/60 text-[11px]"></i>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white/90" style={{ fontFamily: "'DM Sans', sans-serif" }}>Reply to earn points</h4>
                      <p className="text-[10px] text-white/40 leading-relaxed mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Every reply you give earns +3 pts. When someone replies to your post, +1 more. Points compound your rank.</p>
                    </div>
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
                  <div className="w-[36px] h-[36px] rounded-full bg-[#1a1a28] border-[1.5px] border-[#ff5a1a] flex items-center justify-center shrink-0 overflow-hidden">
                    {myAvatarValue?.startsWith('http')
                      ? <img src={myAvatarValue} alt="you" className="w-full h-full object-cover" />
                      : <span className="text-white text-[17px]">{myAvatarValue || '✦'}</span>
                    }
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-row items-center gap-1.5">
                      <span className="text-[12px] font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{username}</span>
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
                    {['global', 'following'].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setLbFilter(filter)}
                        className={`text-[10px] px-3 py-1.5 rounded-[20px] transition-colors capitalize ${lbFilter === filter ? 'bg-white text-[#0c0c10] border border-white' : 'bg-transparent border border-white/10 text-white/[0.45]'
                          }`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {filter}
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
                              {item.rank}
                            </div>
                            <div className="w-[30px] h-[30px] rounded-full bg-[#1a1a28] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                              {item.isMe ? (
                                myAvatarValue?.startsWith('http')
                                  ? <img src={myAvatarValue} alt="you" className="w-full h-full object-cover" />
                                  : <span className="text-white text-[14px]">{myAvatarValue || '✦'}</span>
                              ) : (
                                <img src={getStableAvatar(item.username)} alt={item.username} className="w-full h-full object-cover" />
                              )}
                            </div>
                            <div className="flex-1 flex flex-row items-center">
                              <span className="text-[11px] font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.username}</span>
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
