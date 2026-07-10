import React, { useRef, useState, useEffect } from 'react';

const CreatePostScreen = ({
  thoughtText,
  setThoughtText,
  selectedVibe,
  setSelectedVibe,
  selectedMusic,
  setSelectedMusic,
  onAddVibe,
  onAddMusic,
  onCancel,
  onSubmit,
  onTriggerUpload,
  userProfileData
}) => {
  const [subStep, setSubStep] = useState('composer'); // 'composer' or 'preview'
  const textareaRef = useRef(null);

  // Auto-grow textarea on text change
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [thoughtText, subStep]);

  const handleNext = () => {
    const text = thoughtText.trim();
    if (!text && !selectedVibe) {
      alert("Please enter a message or choose a background theme.");
      return;
    }
    setSubStep('preview');
  };

  const handleBackToEdit = () => {
    setSubStep('composer');
  };

  const handleFinalSubmit = () => {
    onSubmit(thoughtText.trim());
    setSubStep('composer');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (userProfileData && userProfileData.username) {
      const parts = userProfileData.username.split('_');
      if (parts.length > 1) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return userProfileData.username.substring(0, 2).toUpperCase();
    }
    return 'AQ';
  };

  return (
    <div className="absolute inset-0 flex flex-col font-sans bg-[var(--paper)] text-[var(--ink)] overflow-hidden">
      {subStep === 'composer' && (
        <section className="screen is-active" id="create">
          <div className="note-composer">
            <header className="note-header">
              <button className="icon-button close-btn" onClick={onCancel} title="Cancel" aria-label="Cancel">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <span className="note-title">New thought</span>
              <div className="note-actions">
                <button className="icon-button" id="composer-next-btn" onClick={handleNext} title="Next" aria-label="Next">
                  <svg className="icon"><use href="#i-arrow-right"></use></svg>
                </button>
              </div>
            </header>

            <div className="note-body">
              <div className="avatar-col">
                {userProfileData?.avatarValue?.startsWith('http') ? (
                  <img src={userProfileData.avatarValue} alt="profile" className="avatar-current object-cover" />
                ) : (
                  <span className="avatar-current">{userProfileData?.avatarValue || getUserInitials()}</span>
                )}
              </div>
              <div className="input-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexGrow: 1, width: '100%' }}>
                <textarea
                  ref={textareaRef}
                  id="composer-textarea"
                  placeholder="Compose something..."
                  rows="1"
                  autoFocus
                  value={thoughtText}
                  onChange={(e) => setThoughtText(e.target.value)}
                />

                {/* Attachment Preview Container */}
                <div 
                  className="create-attachment-preview" 
                  id="create-attachment-preview"
                  style={{ display: (selectedVibe || selectedMusic) ? 'flex' : 'none' }}
                >
                  {selectedVibe && (
                    <div className="attachment-image-card" id="attachment-image-card" style={{ position: 'relative', overflow: 'hidden' }}>
                      <img 
                        id="attachment-img" 
                        src={selectedVibe.img} 
                        alt="Attached vibe" 
                        style={{ filter: selectedVibe.filter || 'none', width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {selectedVibe.overlay && selectedVibe.overlay !== 'none' && (
                        <div 
                          className="variant-overlay" 
                          style={{ 
                            position: 'absolute', 
                            inset: 0, 
                            background: selectedVibe.overlay, 
                            mixBlendMode: 'overlay', 
                            pointerEvents: 'none' 
                          }} 
                        />
                      )}
                      <button 
                        className="remove-attachment-btn" 
                        id="remove-img-btn" 
                        onClick={() => setSelectedVibe(null)} 
                        title="Remove image"
                        style={{ zIndex: 10 }}
                      >
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {selectedMusic && (
                    <div className="attachment-sound-card" id="attachment-sound-card">
                      <div className="sound-card-icon">
                        <svg className="icon"><use href="#i-music"></use></svg>
                      </div>
                      <div className="sound-card-details">
                        <span className="sound-card-title" id="attachment-sound-title">{selectedMusic.name}</span>
                        <span className="sound-card-desc" id="attachment-sound-desc">
                          {selectedMusic.desc || `${selectedMusic.category || 'Sound'} • ${selectedMusic.duration || '3:00'}`}
                        </span>
                      </div>
                      <button 
                        className="remove-attachment-btn" 
                        id="remove-sound-btn" 
                        onClick={() => setSelectedMusic(null)} 
                        title="Remove sound"
                      >
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                <div className="note-toolbar">
                  <button className="toolbar-btn" id="composer-attach-image-btn" onClick={onAddVibe} title="Choose image" aria-label="Choose image">
                    <svg className="icon"><use href="#i-gallery"></use></svg>
                  </button>
                  <button className="toolbar-btn" id="composer-camera-btn" onClick={onTriggerUpload} title="Upload from device" aria-label="Upload from device">
                    <svg className="icon"><use href="#i-upload"></use></svg>
                  </button>
                  <button className="toolbar-btn" id="composer-add-music-btn" onClick={onAddMusic} title="Add music" aria-label="Add music">
                    <svg className="icon"><use href="#i-music"></use></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {subStep === 'preview' && (
        <section className="screen is-active" id="post-preview">
          <div className="preview-composer-container">
            <div className={`preview-card-body ${selectedVibe ? 'has-vibe-bg' : ''}`} id="preview-card-body">
              {selectedVibe && (
                <div 
                  className="preview-card-bg-image" 
                  style={{ 
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${selectedVibe.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: selectedVibe.filter || 'none',
                    zIndex: 0
                  }}
                />
              )}
              {selectedVibe && selectedVibe.overlay && selectedVibe.overlay !== 'none' && (
                <div 
                  className="variant-overlay" 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: selectedVibe.overlay, 
                    mixBlendMode: 'overlay',
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                />
              )}
              <div className="preview-card-text" style={{ zIndex: 2 }}>{thoughtText}</div>
            </div>
            <header className="note-header">
              <button className="icon-button back-btn" id="preview-back-btn" onClick={handleBackToEdit} title="Back to Edit">
                <svg className="icon"><use href="#i-arrow-left"></use></svg>
              </button>
              <span className="note-title">Preview</span>
              <div className="note-actions"></div>
            </header>
            <button className="post-submit-btn" id="preview-post-btn" onClick={handleFinalSubmit}>Post thought</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default CreatePostScreen;