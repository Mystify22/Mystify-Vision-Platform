import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash, Home, PlusSquare, MessageCircle, User, Heart, Share2, VolumeX, X, Send, Clock, Bell, Plus, Ghost, Lock, Inbox, Wifi, Battery, Edit, ChevronRight, MoreHorizontal, ArrowRight, BellOff, Trash } from 'lucide-react';
import { moodStyles, exploreRecentItems, exploreTrendingData, mockResultsCity, mockResultsRiya, exploreGridItems } from './MockData';

const SearchScreen = ({ onUserSelect, followedUsers, onFollowToggle, onPostClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState('Questions'); // Questions, People, Moods, Vibes
  const [recentSearches, setRecentSearches] = useState(exploreRecentItems);
  const inputRef = useRef(null);

  const renderHighlightedText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ?
        <span key={i} style={{ color: '#FF4500' }}>{part}</span> :
        part
    );
  };



  const isSearchMatch = (text, query) => text && query && text.toLowerCase().includes(query.toLowerCase());
  const filteredPeople = mockResultsRiya.filter(item => isSearchMatch(item.handle, searchQuery) || isSearchMatch(item.name, searchQuery));

  const hasResults = (searchQuery.toLowerCase() === 'city' && activeResultTab === 'Questions') ||
    (activeResultTab === 'People' && filteredPeople.length > 0);

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
                <motion.div layoutId="searchUnderline" className="absolute bottom-0 left-[15%] right-[15%] h-[2px] bg-white rounded-[1px]" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto [scrollbar-width:none]">

        {screenState === 'default' && (
          <div className="grid grid-cols-3 gap-[3px] auto-rows-[123px] grid-flow-dense pb-[10px] px-[6px] animate-fade-in pt-1">
            {exploreGridItems.map(item => (
              <div
                key={item.id}
                onClick={() => onPostClick && onPostClick(item)}
                className="relative cursor-pointer active:scale-[0.98] transition-all duration-300 overflow-hidden shadow-lg"
              >
                <motion.div
                  animate={{ backgroundPositionX: ['100%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                  className="absolute inset-0 bg-cover pointer-events-none"
                  style={{ backgroundImage: `url('${item.img}')`, backgroundPositionY: 'center', backgroundRepeat: 'repeat-x' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 z-10 pointer-events-none transition-colors duration-300" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 z-20 pointer-events-none" />

                <div className="absolute bottom-0 left-0 p-2 w-full flex flex-col gap-[5px] z-20">
                  <p className="text-[11px] text-white/90 font-medium leading-[1.38] line-clamp-3 drop-shadow-md">{item.text}</p>
                </div>

                <div className="absolute top-1.5 right-1.5 text-[9.5px] text-white/70 bg-black/50 backdrop-blur-sm px-[5px] py-[1px] rounded-[5px] flex items-center gap-1 z-20">
                  <MessageCircle size={10} />
                  {item.replies}
                </div>
              </div>
            ))}
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

            <div className="flex flex-col">
              {filteredPeople.map(item => {
                const isFollowing = followedUsers.has(item.id);
                return (
                  <div key={item.id} onClick={() => onUserSelect && onUserSelect(item.handle.replace('@', ''))} className="flex items-center gap-[9px] py-2 px-3 border-b border-[rgba(255,255,255,0.05)] cursor-pointer hover:bg-white/5 transition-colors">
                    {item.avatarImage ? (
                      <img src={item.avatarImage} alt={item.name} className="w-[36px] h-[36px] rounded-full shrink-0 object-cover border border-white/5" />
                    ) : (
                      <div className="w-[36px] h-[36px] rounded-full shrink-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 border border-white/5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-white mb-[1px] truncate">
                        {renderHighlightedText(item.handle, searchQuery)}
                      </p>
                      <p className="text-[10px] text-white/35 truncate">{item.name} • {item.followers} followers</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onFollowToggle && onFollowToggle(item.id); }}
                      className={`px-[12px] py-[4px] rounded-[20px] text-[10px] font-medium transition-colors shrink-0 ${isFollowing ? 'bg-transparent text-white/50 border border-white/15' : 'bg-[#FF4500] text-white border border-[#FF4500]'}`}
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
              ].map(item => {
                const isFollowing = followedUsers.has(item.id);
                return (
                  <div key={item.id} onClick={() => onUserSelect && onUserSelect(item.handle.replace('@', ''))} className="flex items-center gap-[9px] py-2 px-3 border-b border-[rgba(255,255,255,0.05)] cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="w-[36px] h-[36px] rounded-full shrink-0 bg-gradient-to-tr from-blue-500/30 to-green-500/30 border border-white/5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-white mb-[1px] truncate">{item.handle}</p>
                      <p className="text-[10px] text-white/35 truncate">{item.name} • {item.followers} followers</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onFollowToggle && onFollowToggle(item.id); }}
                      className={`px-[12px] py-[4px] rounded-[20px] text-[10px] font-medium transition-colors shrink-0 ${isFollowing ? 'bg-transparent text-white/50 border border-white/15' : 'bg-[#FF4500] text-white border border-[#FF4500]'}`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                );
              })}
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
export default SearchScreen;