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

  // temporary states for picker
  const [tempUsername, setTempUsername] = useState(username);
  const [tempAvatarValue, setTempAvatarValue] = useState(avatarValue);
  const [tempCoverColor, setTempCoverColor] = useState(coverColor);

  const handleSave = () => {
    onSave({ username, bio, avatarValue, coverColor });
  };

  const handlePanelSwitch = (panel) => {
    if (panel) {
      setTempUsername(username);
      setTempAvatarValue(avatarValue);
      setTempCoverColor(coverColor);
    }
    setActivePanel(panel === activePanel ? null : panel);
  };

  const handlePickerOk = () => {
    if (activePanel === 'username') setUsername(tempUsername);
    if (activePanel === 'avatar') setAvatarValue(tempAvatarValue);
    if (activePanel === 'cover') setCoverColor(tempCoverColor);
    setActivePanel(null);
  };

  const handlePickerCancel = () => {
    setActivePanel(null);
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={handlePickerCancel}
          >
            {/* Preview Above Modal */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="mb-8 flex justify-center w-full"
            >
              {activePanel === 'avatar' && (
                <div className="w-[100px] h-[100px] rounded-full border-[4px] border-[#111] bg-[#1a1a1a] flex items-center justify-center shadow-2xl">
                  <span className="text-[44px] text-white">{tempAvatarValue}</span>
                </div>
              )}
              {activePanel === 'cover' && (
                <div 
                  className="w-[80%] max-w-[300px] h-[100px] rounded-[16px] border-[4px] border-[#111] shadow-2xl"
                  style={{ backgroundColor: tempCoverColor }}
                />
              )}
              {activePanel === 'username' && (
                <div className="bg-[#1a1a22] border border-[rgba(255,255,255,0.12)] rounded-[12px] px-[24px] py-[12px] shadow-2xl">
                  <span className="text-[18px] font-bold text-white tracking-wide">{tempUsername}</span>
                </div>
              )}
            </motion.div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-[#111] border border-[rgba(255,255,255,0.12)] rounded-[20px] flex flex-col max-h-[70%] shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-[14px] flex justify-between items-center shrink-0 border-b border-[rgba(255,255,255,0.06)] bg-[#111]">
                <button 
                  onClick={handlePickerCancel}
                  className="text-[13px] text-[rgba(255,255,255,0.45)] px-2 py-1"
                >
                  Cancel
                </button>
                <span className="text-[13px] font-medium text-white">
                  {activePanel === 'avatar' && 'Choose Avatar'}
                  {activePanel === 'cover' && 'Choose Cover'}
                  {activePanel === 'username' && 'Choose Username'}
                </span>
                <button 
                  onClick={handlePickerOk}
                  className="text-[13px] font-medium text-[#ff5a1a] px-2 py-1"
                >
                  OK
                </button>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col bg-[#0c0c10]">
                {/* Avatar Mode */}
                {activePanel === 'avatar' && (
                  <>
                    <div className="px-4 py-3 flex gap-[6px] overflow-x-auto [&::-webkit-scrollbar]:hidden shrink-0 border-b border-[rgba(255,255,255,0.04)]">
                      {Object.keys(avatarData).map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedAvatarCat(cat)}
                          className={`px-[14px] py-[6px] rounded-[20px] text-[11px] font-medium whitespace-nowrap border transition-colors ${
                            selectedAvatarCat === cat 
                              ? 'bg-white text-[#111] border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]' 
                              : 'bg-transparent text-[rgba(255,255,255,0.5)] border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.3)]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="p-[12px_16px_20px] grid grid-cols-5 gap-[10px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                      {avatarData[selectedAvatarCat].map((symbol, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setTempAvatarValue(symbol);
                          }}
                          className={`aspect-square rounded-full bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-[26px] text-white border-[2px] transition-all hover:bg-[rgba(255,255,255,0.08)] hover:scale-105 ${
                            tempAvatarValue === symbol ? 'border-[#ff5a1a] bg-[rgba(255,90,26,0.1)]' : 'border-transparent'
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
                    <div className="px-4 py-3 flex gap-[6px] overflow-x-auto [&::-webkit-scrollbar]:hidden shrink-0 border-b border-[rgba(255,255,255,0.04)]">
                      {Object.keys(coverData).map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCoverCat(cat)}
                          className={`px-[14px] py-[6px] rounded-[20px] text-[11px] font-medium whitespace-nowrap border transition-colors ${
                            selectedCoverCat === cat 
                              ? 'bg-white text-[#111] border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]' 
                              : 'bg-transparent text-[rgba(255,255,255,0.5)] border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.3)]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="p-[12px_16px_20px] grid grid-cols-3 gap-[8px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                      {coverData[selectedCoverCat].map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setTempCoverColor(color);
                          }}
                          className={`w-full h-[60px] rounded-[10px] border-[2px] transition-transform hover:scale-[1.03] ${
                            tempCoverColor === color ? 'border-[#ff5a1a] shadow-[0_0_12px_rgba(255,90,26,0.4)]' : 'border-transparent'
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
                    <div className="px-5 pt-[14px] pb-[8px] text-[11px] text-[rgba(255,255,255,0.4)] leading-[1.5] shrink-0 font-medium">
                      Pick from suggested names or type your own below
                    </div>
                    <div className="px-5 py-[6px] flex flex-wrap gap-[8px] overflow-y-auto [&::-webkit-scrollbar]:hidden shrink-0 max-h-[140px]">
                      {suggestedUsernames.map(name => (
                        <button
                          key={name}
                          onClick={() => {
                            setTempUsername(name);
                            setCustomUsername('');
                          }}
                          className={`px-[14px] py-[8px] rounded-[20px] text-[12px] font-medium border transition-colors ${
                            tempUsername === name && !customUsername
                              ? 'bg-[#ff5a1a] text-white border-[#ff5a1a] shadow-[0_0_10px_rgba(255,90,26,0.3)]' 
                              : 'bg-[rgba(255,255,255,0.03)] text-[rgba(255,255,255,0.7)] border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)]'
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                    <div className="p-[16px_20px_20px] flex gap-[8px] items-center shrink-0 border-t border-[rgba(255,255,255,0.04)] mt-2">
                      <input
                        type="text"
                        value={customUsername}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomUsername(val);
                          if(val) setTempUsername(val);
                        }}
                        placeholder="Type your own..."
                        maxLength={24}
                        className="flex-1 bg-[#1a1a22] border border-[rgba(255,255,255,0.12)] focus:border-[rgba(255,255,255,0.3)] transition-colors rounded-[10px] px-[14px] py-[10px] text-[13px] text-white outline-none placeholder:text-[rgba(255,255,255,0.25)]"
                      />
                      {customUsername.length >= 3 && (
                        <div className="flex items-center gap-[4px] shrink-0 ml-1 bg-[rgba(78,175,107,0.15)] px-[8px] py-[4px] rounded-full">
                          <Check size={12} color="#4caf50" strokeWidth={3} />
                          <span className="text-[10px] font-bold text-[#4caf50] uppercase tracking-wide">Avail</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EditProfileScreen;
