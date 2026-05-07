import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, User, Plus, Bell, Home, Play, Activity } from 'lucide-react';

const exploreRecentItems = [
  { id: '1', type: 'clock', text: 'city loneliness invisible' },
  { id: '2', type: 'clock', text: 'trust strangers' },
  { id: '3', type: 'person', text: '@riya_m' },
  { id: '4', type: 'clock', text: 'healing feels like' }
];

const exploreTrendingData = [
  { id: 't1', rank: 1, question: 'Does the city make you feel free or invisible?', answers: 342, mood: 'Urban', bg: '#1a2a3a' },
  { id: 't2', rank: 2, question: 'When did you last do something for the first time?', answers: 218, mood: 'Nature', bg: '#1a3a2a' },
  { id: 't3', rank: 3, question: 'Is loneliness different when surrounded by millions?', answers: 189, mood: 'Vulnerable', bg: '#2d1b4e' },
  { id: 't4', rank: 4, question: 'What do you do when you feel stuck but not unhappy?', answers: 134, mood: 'Minimal', bg: '#3d2b1f' },
  { id: 't5', rank: 5, question: 'Can you ever fully trust someone you just met?', answers: 97, mood: 'Dark', bg: '#3a1a2a' }
];

const mockResultsCity = [
  { id: 'c1', question: 'Does the city make you feel free, or just invisible?', bg: '#1a2a3a', mood: 'Curious', answers: 342 },
  { id: 'c2', question: 'Is city loneliness different from rural loneliness?', bg: '#3d2b1f', mood: 'Vulnerable', answers: 98 },
  { id: 'c3', question: 'What does your city say about who you are?', bg: '#1e3a5f', mood: 'Nostalgic', answers: 57 },
  { id: 'c4', question: 'Do city lights make you feel watched or free?', bg: '#2d1b4e', mood: 'Curious', answers: 34 },
  { id: 'c5', question: 'Can you ever truly belong to a city?', bg: '#1a3a2a', mood: 'Hopeful', answers: 22 }
];

const mockResultsRiya = [
  { id: 'r1', name: 'Riya Mehta', handle: '@riya_m', followers: '2.4K', following: false },
  { id: 'r2', name: 'Riyansh Kumar', handle: '@riyansh_k', followers: '890', following: true },
  { id: 'r3', name: 'Ananya Riya', handle: '@ananya_r', followers: '412', following: false }
];

const ExploreStep = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState('Questions'); // Questions, People, Moods, Vibes
  const [selectedMoodFilter, setSelectedMoodFilter] = useState(null);
  const [recentSearches, setRecentSearches] = useState(exploreRecentItems);
  const [followedUsers, setFollowedUsers] = useState(new Set(['r2']));

  const inputRef = useRef(null);

  const moodsList = ['Curious', 'Vulnerable', 'Frustrated', 'Hopeful', 'Nostalgic'];
  const vibeCardsList = [
    { name: 'Urban', bg: '#1a2a3a', posts: '2.4K' },
    { name: 'Nature', bg: '#1a3a2a', posts: '1.8K' },
    { name: 'Dark', bg: '#2d1b4e', posts: '4.1K' },
    { name: 'Abstract', bg: '#3a1a2a', posts: '890' },
    { name: 'Minimal', bg: '#3d2b1f', posts: '1.2K' }
  ];

  const renderHighlightedText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={i} style={{ color: '#d4f56a' }}>{part}</span> : 
        part
    );
  };

  const handleFollowToggle = (id) => {
    setFollowedUsers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const hasResults = (searchQuery.toLowerCase() === 'city' && activeResultTab === 'Questions') || 
                     (searchQuery.toLowerCase() === 'riya' && activeResultTab === 'People');
                     
  const screenState = isFocused && searchQuery.length === 0 ? 'focused_empty'
             : searchQuery.length > 0 && hasResults ? 'results'
             : searchQuery.length > 0 && !hasResults ? 'no_results'
             : 'default';

  const handleCancel = () => {
    setSearchQuery('');
    setIsFocused(false);
    if (inputRef.current) inputRef.current.blur();
  };

  const handleClear = () => {
    setSearchQuery('');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleRecentTap = (query) => {
    setSearchQuery(query);
    setIsFocused(true);
    if (inputRef.current) inputRef.current.blur();
  };

  const handleRemoveRecent = (e, id) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(item => item.id !== id));
  };

  return (
    <motion.div
      key="step-explore"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col font-sans bg-[#0c0c10] text-white overflow-hidden pb-[64px]"
      onClick={() => {
        if (screenState === 'results' || screenState === 'no_results') {
          if (inputRef.current) inputRef.current.blur();
        }
      }}
    >
      {/* Search Bar container */}
      <div className={`pt-12 px-3 pb-2 flex items-center transition-all ${isFocused ? 'gap-2' : ''}`}>
         <div className="flex-1 bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] focus-within:border-[rgba(255,255,255,0.3)] rounded-[12px] p-[9px_12px] flex items-center gap-2 transition-colors duration-200">
           <Search size={16} className="text-white/40 shrink-0" />
           <input
             ref={inputRef}
             type="text"
             className="flex-1 bg-transparent text-white text-[13px] outline-none placeholder:text-white/25"
             placeholder="Search questions, people, moods..."
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
             onFocus={() => setIsFocused(true)}
           />
           {searchQuery.length > 0 && (
             <button onClick={handleClear} className="shrink-0"><X size={14} className="text-white/30 hover:text-white/60 transition-colors" /></button>
           )}
         </div>
         {isFocused && (
           <button onClick={handleCancel} className="text-[12px] text-white/45 hover:text-white/60 bg-transparent border-none shrink-0 transition-colors">Cancel</button>
         )}
      </div>

      {/* Tabs for Results */}
      {searchQuery.length > 0 && (
        <div className="flex border-b border-[rgba(255,255,255,0.07)] mb-2 px-1 relative">
          {['Questions', 'People', 'Moods', 'Vibes'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveResultTab(tab)}
              className={`flex-1 py-2 text-[12px] font-medium transition-colors relative ${activeResultTab === tab ? 'text-white' : 'text-white/35 hover:text-white/60'}`}
            >
              {tab}
              {activeResultTab === tab && (
                <motion.div layoutId="underline" className="absolute bottom-0 left-[15%] right-[15%] h-[2px] bg-white rounded-[1px]" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto [scrollbar-width:none]">
        
        {screenState === 'default' && (
          <div className="flex flex-col animate-fade-in">
            {/* SECTION A — Browse by mood */}
            <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 mb-[7px]">Browse by mood</h3>
            <div className="flex px-3 pb-3 gap-[6px] overflow-x-auto [scrollbar-width:none]">
              {moodsList.map(mood => {
                const style = moodStyles[mood];
                const isSelected = selectedMoodFilter === mood;
                return (
                  <button
                    key={mood}
                    onClick={() => setSelectedMoodFilter(isSelected ? null : mood)}
                    className="px-[13px] py-[6px] rounded-[20px] text-[10px] font-medium shrink-0 transition-colors border"
                    style={isSelected ? {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderColor: 'rgba(255,255,255,0.25)',
                      color: 'white'
                    } : {
                      backgroundColor: 'transparent',
                      borderColor: style.border,
                      color: style.color
                    }}
                  >
                    {mood}
                  </button>
                )
              })}
            </div>

            {/* SECTION B — Browse by vibe */}
            <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 mb-[7px] mt-2">Browse by vibe</h3>
            <div className="flex px-3 pb-3 gap-2 overflow-x-auto [scrollbar-width:none]">
              {vibeCardsList.map(vibe => (
                <div key={vibe.name} className="w-[90px] h-[115px] rounded-[12px] shrink-0 overflow-hidden relative cursor-pointer active:scale-95 transition-transform" style={{ backgroundColor: vibe.bg }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75" />
                  <span className="absolute bottom-[7px] left-[8px] text-[9px] font-medium text-white">{vibe.name}</span>
                  <span className="absolute top-[6px] right-[6px] text-[8px] text-white/60 bg-black/45 rounded-[8px] px-[5px] py-[2px]">{vibe.posts}</span>
                </div>
              ))}
            </div>

            <div className="h-[0.5px] bg-[rgba(255,255,255,0.07)] mx-3 mb-[10px]" />

            {/* SECTION C — Trending now */}
            <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 mb-[7px]">Trending now</h3>
            <div className="px-3 flex flex-col">
              {exploreTrendingData.filter(item => !selectedMoodFilter || item.mood === selectedMoodFilter).map((item) => (
                <div key={item.id} className="flex gap-2 py-2 border-b border-[rgba(255,255,255,0.05)] cursor-pointer active:bg-white/5 transition-colors">
                  <div className="w-4 text-[11px] font-medium text-white/15 pt-[1px] shrink-0">{item.rank}</div>
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-[11px] font-medium text-white leading-[1.4] mb-[2px] line-clamp-2">{item.question}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-white/30">{item.answers} answers • {item.mood}</span>
                      {item.rank === 1 && (
                        <span className="text-[8px] font-bold text-[#d4f56a]/80 tracking-wider uppercase">Trending</span>
                      )}
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

        {screenState === 'focused_empty' && (
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
                  className="px-[13px] py-[6px] rounded-[20px] border border-white/10 bg-white/5 text-[10px] font-medium text-white/70 hover:bg-white/10 transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        )}

        {screenState === 'results' && activeResultTab === 'Questions' && (
          <div className="flex flex-col animate-fade-in">
            <p className="text-[10px] text-white/25 px-3 pb-[6px] pt-1">
              {mockResultsCity.length} results for "<span className="text-[#d4f56a]">{searchQuery}</span>"
            </p>
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

        {screenState === 'results' && activeResultTab === 'People' && (
          <div className="flex flex-col animate-fade-in">
            <p className="text-[10px] text-white/25 px-3 pb-[6px] pt-1">
              {mockResultsRiya.length} results for "<span className="text-[#d4f56a]">{searchQuery}</span>"
            </p>
            <div className="flex flex-col">
              {mockResultsRiya.map(item => {
                const isFollowing = followedUsers.has(item.id);
                return (
                  <div key={item.id} className="flex items-center gap-[9px] py-2 px-3 border-b border-[rgba(255,255,255,0.05)]">
                    <div className="w-[36px] h-[36px] rounded-full shrink-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 border border-white/5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-white mb-[1px] truncate">
                        {renderHighlightedText(item.name, searchQuery)}
                      </p>
                      <p className="text-[10px] text-white/35 truncate">{item.handle} • {item.followers} followers</p>
                    </div>
                    <button 
                      onClick={() => handleFollowToggle(item.id)}
                      className={`px-[12px] py-[4px] rounded-[20px] text-[10px] font-medium transition-colors shrink-0 ${isFollowing ? 'bg-transparent text-white/50 border border-white/15' : 'bg-white text-[#0c0c10] border border-white'}`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
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
              ].map(item => (
                <div key={item.id} className="flex items-center gap-[9px] py-2 px-3 border-b border-[rgba(255,255,255,0.05)]">
                  <div className="w-[36px] h-[36px] rounded-full shrink-0 bg-gradient-to-tr from-blue-500/30 to-green-500/30 border border-white/5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-white mb-[1px] truncate">{item.name}</p>
                    <p className="text-[10px] text-white/35 truncate">{item.handle} • {item.followers} followers</p>
                  </div>
                  <button className="px-[12px] py-[4px] rounded-[20px] text-[10px] font-medium transition-colors shrink-0 bg-white text-[#0c0c10] border border-white">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {screenState === 'no_results' && (
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
    </motion.div>
  );
};
