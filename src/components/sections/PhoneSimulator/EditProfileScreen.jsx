import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronRight, X, Check } from 'lucide-react';

const avatarData = {
  Monx: [
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778672802/mystify/avatar/monx/andlhzujd2pqp2aodc2t.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778672793/mystify/avatar/monx/p7u3prwwskqwgdrf6yhn.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778672785/mystify/avatar/monx/rxzv4r5r4cprctygn2jo.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778672715/mystify/avatar/monx/uzaezuofgjpgilodhacv.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778672646/mystify/avatar/monx/wyczrngu7tdr17eeazdr.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778672596/mystify/avatar/monx/skhzlrtushx96cgyrxpg.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778672580/mystify/avatar/monx/haaakhmwjjapsmjayssi.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778672560/mystify/avatar/monx/fijgp3iehcz3fmzb2fen.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778672550/mystify/avatar/monx/pretea2hsysmd5x9yflv.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778672491/mystify/avatar/monx/ybixgtlb4asujgxfadur.png"
  ],
  Mimo: [
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778675520/mystify/avatar/mimo/nnqkkw5flb9ceu9kdffz.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778675534/mystify/avatar/mimo/pklpqmdo6lfhk3xu4cfs.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778675662/mystify/avatar/mimo/rrg53863czv8cutzzfwd.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778675605/mystify/avatar/mimo/dmhylycaf9j52zj1139p.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778675632/mystify/avatar/mimo/goamacxbzx9gcwhgky47.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778675594/mystify/avatar/mimo/kkeaywhzgxfs4errituf.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778675623/mystify/avatar/mimo/ldw8b1p0xkvkikunfnrr.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778675583/mystify/avatar/mimo/qmlyku6eqjejminthlua.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778675615/mystify/avatar/mimo/jvwer7c0ghbsqxucvizh.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778675548/mystify/avatar/mimo/lsf9dd4svnxiyum4ccll.png"
  ],
  Peeps: [
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677380/mystify/avatar/peeps/ptbvkkwlde2kse4pej2k.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677371/mystify/avatar/peeps/imir0hqmtwelttlqtu79.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677363/mystify/avatar/peeps/t223xorxsp8xudqmgmvz.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677353/mystify/avatar/peeps/qg2v19nuk2ywez1je2vh.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677344/mystify/avatar/peeps/taqricgvnq3kodve7lpf.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677335/mystify/avatar/peeps/ut7dod8ikds9vj1gwmmt.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677325/mystify/avatar/peeps/umjb9h57qj030wfqbtvy.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677315/mystify/avatar/peeps/kkpokgzwt6emct9tmbwp.png"
  ],
  Toon: [
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677830/mystify/avatar/toons/zrxwnpxmz51ya1ghq696.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677804/mystify/avatar/toons/n5n4vji9p5nhkqr7n4ya.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677792/mystify/avatar/toons/nmtd07q2smonyjbzikpy.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677784/mystify/avatar/toons/ydhjko6zbxptjq6nuvyb.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677775/mystify/avatar/toons/k1rmm5xzxswqbquhfvru.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677766/mystify/avatar/toons/ryq1urz19sdgpieivdsh.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677757/mystify/avatar/toons/zzvuscxdinwcr0nickpb.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677748/mystify/avatar/toons/j6lxddsjb9fdiijyovls.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778677735/mystify/avatar/toons/ktwd5p7tqcqd0ko3gxak.png"
  ],
  Emoji: [
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778678527/mystify/avatar/emoji/iagpfb2rkyutj3vfpjuk.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778678519/mystify/avatar/emoji/lgcuzinacrehpwqwwuf0.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778678511/mystify/avatar/emoji/wbxiyhnocj9tsuafp0tj.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778678501/mystify/avatar/emoji/lb7ixainlbv9jvfcr1me.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778678491/mystify/avatar/emoji/ovq0qywdoijnlglfzmoe.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778678483/mystify/avatar/emoji/iy3tlf7xlqs8j89k4f0c.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778678475/mystify/avatar/emoji/i21r6uo62ay4g3vdrd3j.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778678466/mystify/avatar/emoji/zozwxy6hue5pmrmyfwxs.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778678457/mystify/avatar/emoji/w2v0hzetf4idusmloo22.png"
  ]
};

const coverData = {
  Dark: [
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778681847/mystify/cover/dark/jg7colb5rnciwp1c2he1.jpg",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778681834/mystify/cover/dark/pr0fwvw6asfix3c35c59.jpg",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778681824/mystify/cover/dark/u6obss5wnfcfmvkh7cxn.jpg",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778681787/mystify/cover/dark/mihbwavbyvxiiaeb7ax6.jpg"
  ],
  Nature: [
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778681415/mystify/cover/nature/ahiuvfarfqni6ucbq60h.jpg",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778681372/mystify/cover/nature/prf606vbl1uzlz0wohrh.jpg",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778679897/mystify/cover/nature/pxgslssi04h7xgliujaj.jpg"
  ],
  Anime: [
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778681914/mystify/cover/anime/hdote5qsisrin9g4i1ci.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778681899/mystify/cover/anime/e2pnjldullm7qy5wrcpa.png",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778681455/mystify/cover/anime/ye9yyzi2c9lj4hfhcyrx.jpg",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778681444/mystify/cover/anime/r2psqbpoxp4xkw3nlfih.jpg",
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778679855/mystify/cover/anime/k4bqcfvzxjal1ptrb3ej.png"
  ],
  Aesthetic: [
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778680874/mystify/cover/aesthetic/vbwtrvqikhat7h5sruqx.webp"
  ],
  Action: [
    "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1778680007/mystify/cover/action/i8tbkmdduox329rxuovz.jpg"
  ]
};

const suggestedUsernames = [
  'ghost_mind', 'void_echo', 'silent_ask', 'dark_note', 'anon_wave', 
  'night_pen', 'soul_query', 'lost_voice', 'mind_drift', 'deep_ask'
];

const EditProfileScreen = ({ initialData, onSave, onCancel }) => {
  const [activePanel, setActivePanel] = useState(null); // 'avatar' | 'cover' | 'username' | null
  
  const [selectedAvatarCat, setSelectedAvatarCat] = useState('Monx');
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
            className="w-full h-[100px] relative cursor-pointer bg-center bg-cover" 
            style={coverColor.startsWith('http') ? { backgroundImage: `url(${coverColor})` } : { backgroundColor: coverColor }}
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
              className="relative w-[58px] h-[58px] rounded-full border-[3px] border-[#111] bg-[#1c1c1c] flex items-center justify-center cursor-pointer pointer-events-auto"
              onClick={() => handlePanelSwitch('avatar')}
            >
              {avatarValue.startsWith('http') ? (
                <img src={avatarValue} alt="avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-[24px] text-white">{avatarValue}</span>
              )}
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
              className="absolute top-[10%] flex justify-center w-full"
            >
              {activePanel === 'avatar' && (
                <div className="w-[100px] h-[100px] rounded-full border-[4px] border-[#111] bg-[#1a1a1a] flex items-center justify-center shadow-2xl">
                  {tempAvatarValue.startsWith('http') ? (
                    <img src={tempAvatarValue} alt="avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-[44px] text-white">{tempAvatarValue}</span>
                  )}
                </div>
              )}
              {activePanel === 'cover' && (
                <div 
                  className="w-[80%] max-w-[300px] h-[100px] rounded-[16px] border-[4px] border-[#111] shadow-2xl bg-center bg-cover"
                  style={tempCoverColor.startsWith('http') ? { backgroundImage: `url(${tempCoverColor})` } : { backgroundColor: tempCoverColor }}
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
              className="w-full bg-[#111] border border-[rgba(255,255,255,0.12)] rounded-[20px] flex flex-col max-h-[45%] shadow-2xl overflow-hidden"
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
                    <div className="p-[12px_16px_20px] grid grid-cols-3 gap-[10px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
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
                          {symbol.startsWith('http') ? (
                            <img src={symbol} alt="avatar option" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            symbol
                          )}
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
                      {coverData[selectedCoverCat].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setTempCoverColor(item);
                          }}
                          className={`w-full h-[60px] rounded-[10px] border-[2px] transition-transform hover:scale-[1.03] overflow-hidden bg-center bg-cover ${
                            tempCoverColor === item ? 'border-[#ff5a1a] shadow-[0_0_12px_rgba(255,90,26,0.4)]' : 'border-transparent'
                          }`}
                          style={item.startsWith('http') ? { backgroundImage: `url(${item})` } : { backgroundColor: item }}
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
