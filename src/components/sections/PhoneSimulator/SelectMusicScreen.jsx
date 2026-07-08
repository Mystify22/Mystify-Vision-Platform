import React, { useState, useRef, useEffect } from 'react';

const soundsData = {
  'for-you': [
    { id: "serene_mountain", title: "Serene Mountain", desc: "Nature • 2:34", freq: 329.63 },
    { id: "valley_dusk", title: "Valley Dusk", desc: "Nature • 3:12", freq: 293.66 }
  ],
  explore: [
    { id: "serene_mountain", title: "Serene Mountain", desc: "Nature • 2:34", freq: 329.63 },
    { id: "valley_dusk", title: "Valley Dusk", desc: "Nature • 3:12", freq: 293.66 },
    { id: "night_echoes", title: "Night Echoes", desc: "Dark • 4:10", freq: 220.00 },
    { id: "neon_nights", title: "Neon Nights", desc: "Urban • 3:00", freq: 440.00 },
    { id: "social_collage", title: "Social Collage", desc: "Creative • 2:45", freq: 392.00 }
  ],
  trending: [
    { id: "night_echoes", title: "Night Echoes", desc: "Dark • 4:10", freq: 220.00 },
    { id: "neon_nights", title: "Neon Nights", desc: "Urban • 3:00", freq: 440.00 }
  ],
  saved: [
    { id: "valley_dusk", title: "Valley Dusk", desc: "Nature • 3:12", freq: 293.66 }
  ]
};

const SelectMusicScreen = ({
  selectedVibe,
  selectedMusic,
  onSelectMusic,
  onConfirm,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState('for-you'); // 'for-you', 'explore', 'trending', 'saved'
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState(null);

  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const lfoRef = useRef(null);

  const stopMusic = () => {
    if (oscRef.current) {
      try { oscRef.current.stop(); } catch(e){}
      oscRef.current = null;
    }
    if (lfoRef.current) {
      try { lfoRef.current.stop(); } catch(e){}
      lfoRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      try { audioCtxRef.current.close(); } catch(e){}
      audioCtxRef.current = null;
    }
    setPlayingId(null);
  };

  const playMusic = (freq, id) => {
    if (playingId === id) {
      stopMusic();
      return;
    }
    stopMusic();

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 3.5;
      lfoGain.gain.value = 4;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      lfo.start();
      osc.start();
      
      oscRef.current = osc;
      lfoRef.current = lfo;
      gainRef.current = gain;
      setPlayingId(id);
    } catch (e) {
      console.error("Audio Context Failed", e);
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  // Filter sound tracks in real-time
  const getFilteredTracks = () => {
    let list = soundsData[activeTab] || [];
    
    // Adapt 'for-you' dynamically if there is a selected Vibe
    if (activeTab === 'for-you' && selectedVibe) {
      const nameLower = selectedVibe.name.toLowerCase();
      if (nameLower.includes('mountain') || nameLower.includes('dusk') || nameLower.includes('forest')) {
        // nature
        list = soundsData['for-you'];
      } else if (nameLower.includes('midnight') || nameLower.includes('dark')) {
        // dark
        list = [soundsData['explore'].find(s => s.id === 'night_echoes')];
      } else if (nameLower.includes('nights') || nameLower.includes('urban') || nameLower.includes('city')) {
        // urban
        list = [soundsData['explore'].find(s => s.id === 'neon_nights')];
      } else if (nameLower.includes('collage') || nameLower.includes('creative') || nameLower.includes('social')) {
        // creative
        list = [soundsData['explore'].find(s => s.id === 'social_collage')];
      } else {
        list = soundsData['explore'];
      }
    } else if (activeTab === 'for-you') {
      list = soundsData['explore'];
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return list.filter(track => 
        track.title.toLowerCase().includes(query) || 
        track.desc.toLowerCase().includes(query)
      );
    }

    return list;
  };

  const handleSelectTrack = (track) => {
    onSelectMusic({
      id: track.id,
      name: track.title,
      desc: track.desc,
      audioSrc: track.freq // Save freq as source or we can use generic file later
    });
  };

  const handleNoSound = () => {
    onSelectMusic(null);
    onConfirm();
  };

  const categories = [
    { key: 'for-you', label: 'For you' },
    { key: 'explore', label: 'Explore' },
    { key: 'trending', label: 'Trending' },
    { key: 'saved', label: 'Saved' }
  ];

  const tracks = getFilteredTracks();

  return (
    <div className="absolute inset-0 flex flex-col font-sans bg-[var(--paper)] text-[var(--ink)] overflow-hidden">
      <section className="screen is-active" id="sound-select">
        <div className="note-composer-scroll">
          <header className="note-header">
            <button className="icon-button back-btn" onClick={onBack} title="Back">
              <svg className="icon"><use href="#i-arrow-left"></use></svg>
            </button>
            <span className="note-title">Add a sound</span>
            <div className="note-actions">
              <button 
                className="selector-check-btn" 
                onClick={onConfirm} 
                title="Confirm Sound"
                disabled={!selectedMusic}
                style={{ opacity: selectedMusic ? 1 : 0.5 }}
              >
                <svg className="icon"><use href="#i-check"></use></svg>
              </button>
            </div>
          </header>

          <div className="sound-vibe-preview-row">
            <div className="sound-vibe-thumb">
              {selectedVibe ? (
                <img id="sound-vibe-img" src={selectedVibe.img} alt="Selected Vibe" />
              ) : (
                <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--line)' }} />
              )}
            </div>
            <div className="sound-vibe-meta">
              <span className="sound-vibe-label">YOUR IMAGE</span>
              <span className="sound-vibe-name" id="sound-vibe-title">
                {selectedVibe ? selectedVibe.name : 'No image selected'}
              </span>
            </div>
            <button className="no-sound-btn" id="no-sound-action" onClick={handleNoSound}>
              No sound yet
            </button>
          </div>

          <div className="sound-search-box">
            <input 
              type="search" 
              id="sound-search-input" 
              placeholder="Search tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="sound-tabs">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`sound-tab-btn ${activeTab === cat.key ? 'is-active' : ''}`}
                onClick={() => setActiveTab(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="sound-subheader" id="sound-subheader-el">
            {activeTab === 'for-you' ? 'RECOMMENDED FOR YOU' : activeTab.toUpperCase()}
          </div>
          
          <div className="sound-list-container">
            <div className="sound-list" id="sound-list">
              {tracks.map(track => {
                const isSelected = selectedMusic && selectedMusic.id === track.id;
                const isPlaying = playingId === track.id;
                
                return (
                  <div 
                    key={track.id}
                    className={`sound-item ${isSelected ? 'is-selected' : ''} ${isPlaying ? 'is-playing' : ''}`}
                    onClick={() => handleSelectTrack(track)}
                  >
                    <button 
                      className="sound-play-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        playMusic(track.freq, track.id);
                      }}
                    >
                      <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor" style={{ width: '14px', height: '14px', display: isPlaying ? 'none' : 'block' }}>
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                      <svg className="pause-icon" viewBox="0 0 24 24" fill="currentColor" style={{ width: '14px', height: '14px', display: isPlaying ? 'block' : 'none' }}>
                        <rect x="6" y="4" width="4" height="16"/>
                        <rect x="14" y="4" width="4" height="16"/>
                      </svg>
                    </button>
                    <div className="sound-info">
                      <span className="sound-name">{track.title}</span>
                      <span className="sound-desc">{track.desc}</span>
                    </div>
                    <div className="sound-wave-indicator" style={{ display: isPlaying ? 'flex' : 'none' }}>
                      <span></span><span></span><span></span>
                    </div>
                    <div className="sound-radio-btn"></div>
                  </div>
                );
              })}
              {tracks.length === 0 && (
                <div style={{ color: 'var(--muted)', fontSize: '0.88rem', padding: '16px 0', textAlign: 'center' }}>
                  No tracks found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelectMusicScreen;