import React, { useState } from 'react';

const vibesData = {
  nature: [
    { id: "serene_mountain", title: "Serene Mountain", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325913/flux1-schnell_a-cherry-blossom-tree-in-full-bloom_tuivgz.png" },
    { id: "valley_dusk", title: "Valley Dusk", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325915/flux1-schnell_a-birds-eye-view-of-a-summer_kasdp3.png" },
    { id: "misty_forest", title: "Misty Forest", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325918/flux1-schnell_a-single-beam-of-golden-sunlight_cjbvub.png" }
  ],
  dark: [
    { id: "deep_midnight", title: "Deep Midnight", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325912/flux1-schnell_a-narrow-window-in-an-old-attic_u0t8uv.png" }
  ],
  urban: [
    { id: "neon_nights", title: "Neon Nights", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325917/flux1-schnell_an-empty-high-school-classroom-at_ehxheg.png" }
  ],
  creative: [
    { id: "social_collage", title: "Social Collage", img: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1780325913/flux1-schnell_a-small-wooden-mailbox-at-the-end_xzxovw.png" }
  ]
};

const SelectVibeScreen = ({
  selectedVibe,
  onSelect,
  onConfirm,
  onBack,
  onTriggerUpload
}) => {
  const [activeTab, setActiveTab] = useState('nature'); // 'nature', 'dark', 'urban', 'creative'

  const categories = [
    { key: 'nature', label: 'Nature' },
    { key: 'dark', label: 'Dark & Moody' },
    { key: 'urban', label: 'Urban' },
    { key: 'creative', label: 'Creative' }
  ];

  const currentVibes = vibesData[activeTab] || [];

  return (
    <div className="absolute inset-0 flex flex-col font-sans bg-[var(--paper)] text-[var(--ink)] overflow-hidden">
      <section className="screen is-active" id="vibe-select">
        <div className="note-composer-scroll">
          <header className="note-header">
            <button className="icon-button back-btn" onClick={onBack} title="Back" aria-label="Back">
              <svg className="icon"><use href="#i-arrow-left"></use></svg>
            </button>
            <span className="note-title">Select theme</span>
            <div className="note-actions">
              <button 
                className="selector-check-btn" 
                id="confirm-vibe-btn" 
                onClick={onConfirm} 
                title="Confirm Vibe"
                disabled={!selectedVibe}
                style={{ opacity: selectedVibe ? 1 : 0.5 }}
              >
                <svg className="icon"><use href="#i-check"></use></svg>
              </button>
            </div>
          </header>

          <div className="vibe-tabs">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`vibe-tab-btn ${activeTab === cat.key ? 'is-active' : ''}`}
                onClick={() => setActiveTab(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="vibe-subheader" id="vibe-subheader-el">
            {activeTab.toUpperCase()}
          </div>

          <div className="vibe-grid-container">
            <div className="vibe-image-grid" id="vibe-grid">
              {currentVibes.map(vibe => {
                const isSelected = selectedVibe && selectedVibe.id === vibe.id;
                return (
                  <div
                    key={vibe.id}
                    className={`vibe-select-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      onSelect({
                        id: vibe.id,
                        name: vibe.title,
                        img: vibe.img,
                        isCustom: false
                      });
                    }}
                  >
                    <img src={vibe.img} alt={vibe.title} />
                    <span className="vibe-select-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="vibe-select-title">{vibe.title}</span>
                  </div>
                );
              })}
          </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default SelectVibeScreen;