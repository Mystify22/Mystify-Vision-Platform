import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronRight, X, Check } from 'lucide-react';

const avatarData = {
  Cosmic: ['✦', '☀', '☽', '★', '✴', '◈', '✧', '☄', '❋', '☁'],
  Shadows: ['☠', '◉', '◈', '⚔', '☣', '✝', '◆', '⚡', '✦', '⚗'],
  Nature: ['✿', '✾', '❀', '✻', '✽', '❁', '❃', '❊', '✺', '✹'],
  Tech: ['⌬', '⎔', '⊗', '⊞', '⟁', '⊙', '⬡', '⟐', '⊕', '◎'],
  Spirits: ['⚯', '❧', '☯', '⚝', '⟁', '⚜', '⎈', '✤', '⚛', '☮']
};

const coverData = {
  Dark: ['#1a0a3e', '#0a1a2e', '#2a0a1a', '#0a0a0a', '#1a1a0a', '#0a2a1a'],
  Nature: ['#1a3a1a', '#2a4a1a', '#0a2a0a', '#3a4a1a', '#1a2a0a', '#0a3a2a'],
  Abstract: ['#3a1a2a', '#1a2a4a', '#3a2a1a', '#2a1a3a', '#1a3a3a', '#3a3a1a'],
  Minimal: ['#1a1a1a', '#222222', '#181818', '#141414', '#1e1e1e', '#161616'],
  City: ['#0a1a2a', '#1a1a2a', '#0a0a1a', '#2a1a0a', '#1a0a2a', '#0a2a2a']
};

const suggestedUsernames = [
  'ghost_mind', 'void_echo', 'silent_ask', 'dark_note', 'anon_wave', 
  'night_pen', 'soul_query', 'lost_voice', 'mind_drift', 'deep_ask'
];

const EditProfileScreen = ({ initialData, onSave, onCancel }) => {
  const [activePanel, setActivePanel] = useState(null); // 'avatar' | 'cover' | 'username' | null
  
  const [selectedAvatarCat, setSelectedAvatarCat] = useState('Cosmic');
  const [selectedCoverCat, setSelectedCoverCat] = useState('Dark');
  
  const [username, setUsername] = useState(initialData?.username || 'ghost_mind');
  const [bio, setBio] = useState(initialData?.bio || 'Anonymous thoughts. Questions nobody dares ask out loud.');
  const [avatarValue, setAvatarValue] = useState(initialData?.avatarValue || '✦');
  const [coverColor, setCoverColor] = useState(initialData?.coverColor || '#1a0a3e');
  
  const [customUsername, setCustomUsername] = useState('');

  const handleSave = () => {
    onSave({ username, bio, avatarValue, coverColor });
  };

  const handlePanelSwitch = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-50 flex flex-col bg-[#111] overflow-hidden"
      style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
    >
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 pt-[10px] pb-[8px] border-b border-[rgba(255,255,255,0.08)] bg-[#111] shrink-0">
        <button onClick={onCancel} className="text-[13px] text-[rgba(255,255,255,0.45)] px-2 py-1">
          Cancel
        </button>
        <span className="text-[14px] font-medium text-white">Edit profile</span>
        <button onClick={handleSave} className="text-[13px] font-medium text-[#ff5a1a] px-2 py-1">
          Save
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-[200px] [&::-webkit-scrollbar]:hidden">
        {/* LIVE PREVIEW SECTION */}
        <div className="relative mb-6">
          {/* Cover Preview Area */}
          <div 
            className="w-full h-[100px] relative cursor-pointer" 
            style={{ backgroundColor: coverColor }}
            onClick={() => handlePanelSwitch('cover')}
          >
            <div className="absolute bottom-2 right-2 bg-[rgba(0,0,0,0.55)] rounded-[20px] px-[10px] py-[3px] flex flex-row items-center gap-[4px]">
              <Camera size={12} color="rgba(255,255,255,0.8)" />
              <span className="text-[11px] text-[rgba(255,255,255,0.8)]">Edit cover</span>
            </div>
          </div>

          {/* Avatar + Row */}
          <div className="relative px-4 flex justify-between items-end mt-[-28px] pointer-events-none">
            <div 
              className="relative w-[58px] h-[58px] rounded-full border-[3px] border-[#111] bg-[rgba(255,255,255,0.05)] flex items-center justify-center cursor-pointer pointer-events-auto"
              onClick={() => handlePanelSwitch('avatar')}
            >
              <span className="text-[24px] text-white">{avatarValue}</span>
              <div className="absolute bottom-[-2px] right-[-2px] w-[18px] h-[18px] rounded-full bg-[#ff5a1a] border-[2px] border-[#111] flex items-center justify-center">
                <Camera size={10} color="white" />
              </div>
            </div>
            <span className="text-[11px] text-[rgba(255,255,255,0.35)] pb-1 pointer-events-auto" onClick={() => handlePanelSwitch('avatar')}>
              Tap to change
            </span>
          </div>
        </div>

        {/* EDITABLE FIELDS */}
        <div className="px-4 flex flex-col gap-4">
          <div>
            <div className="text-[10px] uppercase text-[rgba(255,255,255,0.5)] mb-[8px] font-medium tracking-wide">
              Username
            </div>
            <div 
              className="bg-[#1a1a22] border border-[rgba(255,255,255,0.08)] rounded-[11px] p-[10px_12px] flex justify-between items-center cursor-pointer"
              onClick={() => handlePanelSwitch('username')}
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-medium tracking-[0.06em] uppercase text-[rgba(255,255,255,0.35)] mb-1">
                  Display name
                </span>
                <span className="text-[14px] text-white">
                  {username}
                </span>
              </div>
              <ChevronRight size={18} color="rgba(255,255,255,0.25)" />
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase text-[rgba(255,255,255,0.5)] mb-[8px] font-medium tracking-wide">
              Bio
            </div>
            <div className="bg-[#1a1a22] border border-[rgba(255,255,255,0.08)] rounded-[11px] p-[10px_12px] relative">
              <span className="text-[10px] font-medium tracking-[0.06em] uppercase text-[rgba(255,255,255,0.35)] block mb-1">
                About you
              </span>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, 120))}
                placeholder="Write something about yourself..."
                className="w-full bg-transparent border-none outline-none text-[14px] text-white resize-none"
                rows={3}
                style={{ textAlignVertical: 'top' }}
              />
              <div className="absolute bottom-2 right-3 text-[10px] text-[rgba(255,255,255,0.25)]">
                {bio.length} / 120
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PICKER PANEL */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 inset-x-0 bg-[#0c0c10] border-t border-[rgba(255,255,255,0.08)] rounded-t-[16px] z-50 flex flex-col max-h-[60%]"
          >
            {/* Header */}
            <div className="px-4 py-[10px] flex justify-between items-center shrink-0">
              <span className="text-[12px] font-medium text-white">
                {activePanel === 'avatar' && 'Choose avatar'}
                {activePanel === 'cover' && 'Choose cover'}
                {activePanel === 'username' && 'Choose username'}
              </span>
              <button 
                onClick={() => setActivePanel(null)}
                className="w-[22px] h-[22px] rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center"
              >
                <X size={12} color="rgba(255,255,255,0.6)" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Avatar Mode */}
              {activePanel === 'avatar' && (
                <>
                  <div className="px-4 py-2 flex gap-[6px] overflow-x-auto [&::-webkit-scrollbar]:hidden shrink-0">
                    {Object.keys(avatarData).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedAvatarCat(cat)}
                        className={`px-[12px] py-[5px] rounded-[20px] text-[11px] font-medium whitespace-nowrap border ${
                          selectedAvatarCat === cat 
                            ? 'bg-white text-[#111] border-white' 
                            : 'bg-transparent text-[rgba(255,255,255,0.5)] border-[rgba(255,255,255,0.15)]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <div className="p-[6px_16px_16px] grid grid-cols-5 gap-[8px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    {avatarData[selectedAvatarCat].map((symbol, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAvatarValue(symbol)}
                        className={`aspect-square rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center text-[24px] text-white border-[2px] transition-colors ${
                          avatarValue === symbol ? 'border-[#ff5a1a]' : 'border-transparent'
                        }`}
                      >
                        {symbol}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Cover Mode */}
              {activePanel === 'cover' && (
                <>
                  <div className="px-4 py-2 flex gap-[6px] overflow-x-auto [&::-webkit-scrollbar]:hidden shrink-0">
                    {Object.keys(coverData).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCoverCat(cat)}
                        className={`px-[12px] py-[5px] rounded-[20px] text-[11px] font-medium whitespace-nowrap border ${
                          selectedCoverCat === cat 
                            ? 'bg-white text-[#111] border-white' 
                            : 'bg-transparent text-[rgba(255,255,255,0.5)] border-[rgba(255,255,255,0.15)]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <div className="p-[6px_16px_16px] grid grid-cols-3 gap-[6px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    {coverData[selectedCoverCat].map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCoverColor(color)}
                        className={`w-full h-[52px] rounded-[8px] border-[2px] transition-colors ${
                          coverColor === color ? 'border-[#ff5a1a]' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Username Mode */}
              {activePanel === 'username' && (
                <>
                  <div className="px-4 pb-[10px] text-[10px] text-[rgba(255,255,255,0.25)] leading-[1.5] shrink-0">
                    Pick from suggested names or type your own below
                  </div>
                  <div className="px-4 py-[6px] flex flex-wrap gap-[6px] overflow-y-auto [&::-webkit-scrollbar]:hidden shrink-0 max-h-[120px]">
                    {suggestedUsernames.map(name => (
                      <button
                        key={name}
                        onClick={() => {
                          setUsername(name);
                          setCustomUsername('');
                        }}
                        className={`px-[12px] py-[6px] rounded-[20px] text-[12px] font-medium border ${
                          username === name && !customUsername
                            ? 'bg-[#ff5a1a] text-white border-[#ff5a1a]' 
                            : 'bg-transparent text-[rgba(255,255,255,0.7)] border-[rgba(255,255,255,0.15)]'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                  <div className="p-[10px_16px_16px] flex gap-[6px] items-center shrink-0">
                    <input
                      type="text"
                      value={customUsername}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomUsername(val);
                        if(val) setUsername(val);
                      }}
                      placeholder="Type your own..."
                      maxLength={24}
                      className="flex-1 bg-[#1a1a22] border border-[rgba(255,255,255,0.12)] rounded-[8px] px-[12px] py-[8px] text-[13px] text-white outline-none"
                    />
                    {customUsername.length >= 3 && (
                      <div className="flex items-center gap-[3px] shrink-0 ml-1">
                        <Check size={13} color="rgba(78,175,107,0.9)" />
                        <span className="text-[10px] text-[rgba(78,175,107,0.9)]">Available</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EditProfileScreen;
