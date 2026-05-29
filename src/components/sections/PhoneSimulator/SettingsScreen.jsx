import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Phone, Bell, Ghost, 
  Palette, HelpCircle, Flag, Pause, Trash, LogOut, 
  Moon, Sun, Smartphone, Check
} from 'lucide-react';

const BottomSheet = ({ visible, onClose, title, subtitle, children }) => {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 z-[100] bg-black/75"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="absolute bottom-0 inset-x-0 z-[101] bg-[#141418] rounded-t-[20px] border-t border-white/10 flex flex-col pb-6"
          >
            <div className="w-[36px] h-[4px] bg-white/15 rounded-full mx-auto mt-[10px] mb-[14px]" />
            <h3 className="text-[14px] font-medium text-white px-4 mb-1">{title}</h3>
            {subtitle && <p className="text-[12px] text-white/40 px-4 mb-[14px] leading-relaxed">{subtitle}</p>}
            <div className="h-[0.5px] bg-white/5 mx-4 mb-[10px]" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SettingsRow = ({ 
  icon: Icon, iconBg, iconColor, title, titleColor = "white", subtitle, 
  rightElement, onPress, isLast, activeOpacity = true, hideChevron = false
}) => (
  <div 
    onClick={onPress}
    className={`flex items-center gap-3 p-[12px_14px] ${!isLast ? 'border-b border-white/5' : ''} ${activeOpacity && onPress ? 'cursor-pointer hover:bg-white/5 active:bg-white/5' : ''}`}
  >
    <div className="w-[32px] h-[32px] rounded-[9px] flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
      <Icon size={16} color={iconColor} />
    </div>
    <div className="flex-1 flex flex-col">
      <span className="text-[13px] font-medium leading-none" style={{ color: titleColor }}>{title}</span>
      {subtitle && <span className="text-[11px] text-white/35 mt-[3px] leading-none">{subtitle}</span>}
    </div>
    <div className="shrink-0 flex items-center gap-2">
      {rightElement}
      {onPress && !hideChevron && (
        <ChevronRight size={14} color="rgba(255,255,255,0.2)" />
      )}
    </div>
  </div>
);

const Toggle = ({ enabled, onToggle }) => (
  <button 
    onClick={onToggle}
    className="relative w-[38px] h-[22px] rounded-[20px] transition-colors duration-200 ease-in-out"
    style={{ backgroundColor: enabled ? '#ff5a1a' : 'rgba(255,255,255,0.15)' }}
  >
    <div 
      className="absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full transition-all duration-200 ease-in-out"
      style={{ left: enabled ? '18px' : '2px' }}
    />
  </button>
);

const SettingsScreen = ({ userProfileData, onBack, onEditProfile, onLogout, onLogoutAll }) => {
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [ghostedAccounts, setGhostedAccounts] = useState(['@void_wanderer', '@dark_troll_99', '@anon_shadow']);
  const [activeModal, setActiveModal] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reportText, setReportText] = useState('');

  const themeOptions = [
    { id: 'dark', label: 'Dark', desc: 'Easy on the eyes at night', icon: Moon, bg: 'rgba(77,144,215,0.1)', color: 'rgba(77,144,215,0.9)' },
    { id: 'light', label: 'Light', desc: 'Clean bright look', icon: Sun, bg: 'rgba(218,184,127,0.1)', color: 'rgba(218,184,127,0.9)' },
    { id: 'system', label: 'System default', desc: 'Follows your device setting', icon: Smartphone, bg: 'rgba(127,218,159,0.1)', color: 'rgba(127,218,159,0.8)' }
  ];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-[60] bg-[#0c0c10] flex flex-col font-sans overflow-hidden"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-[14px] py-[10px] border-b border-white/[0.08] bg-[#0c0c10] shrink-0">
        <button onClick={onBack} className="w-[30px] h-[30px] rounded-full bg-white/[0.07] flex items-center justify-center">
          <ChevronLeft size={15} color="rgba(255,255,255,0.7)" />
        </button>
        <span className="text-[15px] font-medium text-white">Settings</span>
        <div className="w-[30px]" /> {/* Spacer for centering */}
      </div>

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {/* Profile Mini Row */}
        <div className="flex items-center gap-[12px] p-[14px] bg-[#0c0c10]">
          <div className="w-[44px] h-[44px] rounded-full bg-[#1a1a26] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
            {userProfileData?.avatarValue?.startsWith('http') ? (
              <img src={userProfileData.avatarValue} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[20px] text-white">{userProfileData?.avatarValue || '✦'}</span>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <span className="text-[14px] font-medium text-white">{userProfileData?.username || 'ghost_mind'}</span>
            <span className="text-[11px] text-white/35">@{userProfileData?.username || 'ghost_mind'} · 12.4K followers</span>
          </div>
          <button 
            onClick={onEditProfile}
            className="text-[11px] text-white/40 bg-white/[0.06] border border-white/10 rounded-[20px] px-[10px] py-[4px]"
          >
            Edit profile
          </button>
        </div>

        <div className="px-[14px] pb-[30px] space-y-[18px]">
          
          {/* SECTION: Account */}
          <div>
            <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-white/25 px-[14px] pt-[10px] pb-[5px]">Account</div>
            <div className="bg-[#141418] border border-white/[0.07] rounded-[14px] overflow-hidden">
              <SettingsRow 
                icon={Phone} iconBg="rgba(77,144,215,0.12)" iconColor="rgba(77,144,215,0.9)"
                title="Phone number" subtitle="+91 98765 •••••"
                onPress={() => setActiveModal('phone')}
                isLast={true}
              />
            </div>
          </div>

          {/* SECTION: Notifications */}
          <div>
            <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-white/25 px-[14px] pt-[10px] pb-[5px]">Notifications</div>
            <div className="bg-[#141418] border border-white/[0.07] rounded-[14px] overflow-hidden">
              <SettingsRow 
                icon={Bell} iconBg="rgba(218,184,127,0.12)" iconColor="rgba(218,184,127,0.9)"
                title="Push notifications" subtitle={notifEnabled ? "All notifications on" : "Notifications off"}
                rightElement={<Toggle enabled={notifEnabled} onToggle={() => setNotifEnabled(!notifEnabled)} />}
                isLast={true} activeOpacity={false} hideChevron={true}
              />
            </div>
          </div>

          {/* SECTION: Privacy */}
          <div>
            <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-white/25 px-[14px] pt-[10px] pb-[5px]">Privacy</div>
            <div className="bg-[#141418] border border-white/[0.07] rounded-[14px] overflow-hidden">
              <SettingsRow 
                icon={Ghost} iconBg="rgba(255,255,255,0.06)" iconColor="rgba(255,255,255,0.55)"
                title="Ghosted" subtitle="Manage blocked accounts"
                rightElement={
                  ghostedAccounts.length > 0 ? (
                    <span className="bg-[rgba(255,90,26,0.15)] text-[#ff5a1a] text-[10px] font-medium px-[7px] py-[2px] rounded-[10px]">
                      {ghostedAccounts.length}
                    </span>
                  ) : null
                }
                onPress={() => setActiveModal('ghosted')}
                isLast={true}
              />
            </div>
          </div>

          {/* SECTION: Appearance */}
          <div>
            <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-white/25 px-[14px] pt-[10px] pb-[5px]">Appearance</div>
            <div className="bg-[#141418] border border-white/[0.07] rounded-[14px] overflow-hidden">
              <SettingsRow 
                icon={Palette} iconBg="rgba(255,90,26,0.1)" iconColor="#ff5a1a"
                title="Theme" subtitle={themeOptions.find(t => t.id === selectedTheme)?.label}
                onPress={() => setActiveModal('theme')}
                isLast={true}
              />
            </div>
          </div>

          {/* SECTION: Support */}
          <div>
            <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-white/25 px-[14px] pt-[10px] pb-[5px]">Support</div>
            <div className="bg-[#141418] border border-white/[0.07] rounded-[14px] overflow-hidden">
              <SettingsRow 
                icon={HelpCircle} iconBg="rgba(77,144,215,0.1)" iconColor="rgba(77,144,215,0.9)"
                title="Help center" subtitle="FAQs and guides"
                onPress={() => setActiveModal('help')}
              />
              <SettingsRow 
                icon={Flag} iconBg="rgba(218,184,127,0.1)" iconColor="rgba(218,184,127,0.9)"
                title="Report an issue" subtitle="Bug or content problem"
                onPress={() => setActiveModal('report')}
                isLast={true}
              />
            </div>
          </div>

          {/* SECTION: Danger zone */}
          <div>
            <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-white/25 px-[14px] pt-[10px] pb-[5px]">Danger zone</div>
            <div className="bg-[#141418] border border-white/[0.07] rounded-[14px] overflow-hidden">
              <SettingsRow 
                icon={Pause} iconBg="rgba(218,184,127,0.1)" iconColor="rgba(218,184,127,0.9)"
                title="Deactivate account" titleColor="rgba(218,184,127,0.95)" subtitle="Temporarily pause your account"
                onPress={() => setActiveModal('deactivate')}
              />
              <SettingsRow 
                icon={Trash} iconBg="rgba(255,60,60,0.1)" iconColor="rgba(255,80,80,0.9)"
                title="Delete account" titleColor="rgba(255,80,80,0.9)" subtitle="Permanent — cannot be undone"
                rightElement={
                  <span className="bg-[rgba(255,60,60,0.12)] text-[rgba(255,80,80,0.9)] text-[10px] font-medium px-[7px] py-[2px] rounded-[10px]">
                    Permanent
                  </span>
                }
                onPress={() => setActiveModal('delete')}
                isLast={true}
              />
            </div>
          </div>

          {/* SECTION: Session */}
          <div>
            <div className="bg-[#141418] border border-white/[0.07] rounded-[14px] overflow-hidden mt-[10px]">
              <SettingsRow 
                icon={LogOut} iconBg="rgba(255,90,26,0.1)" iconColor="#ff5a1a"
                title="Log out" subtitle="Sign out of this device"
                onPress={() => setActiveModal('logout')}
                isLast={false}
              />
              <SettingsRow 
                icon={LogOut} iconBg="rgba(255,60,60,0.12)" iconColor="rgba(255,80,80,0.9)"
                title="Log out from all devices" titleColor="rgba(255,80,80,0.9)" subtitle="Sign out of all active sessions"
                onPress={() => setActiveModal('logoutAll')}
                isLast={true}
              />
            </div>
          </div>

          <div className="text-[11px] text-white/15 text-center py-[22px]">
            Vibe · v2.4.1 · Made in India
          </div>
        </div>
      </div>

      {/* MODALS */}
      
      {/* PHONE MODAL */}
      <BottomSheet 
        visible={activeModal === 'phone'} 
        onClose={() => setActiveModal(null)}
        title="Update phone number" 
        subtitle="We'll send a verification code to your new number."
      >
        <input 
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+91 new number"
          className="mx-4 mb-[14px] bg-[#111] border border-white/12 rounded-[10px] p-[10px_14px] text-[14px] text-white outline-none"
        />
        <div className="h-[0.5px] bg-white/[0.07] mx-4 mb-[10px]" />
        <button onClick={() => setActiveModal(null)} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-[#ff5a1a] text-white font-medium text-[14px]">
          Send OTP
        </button>
        <button onClick={() => setActiveModal(null)} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-white/5 border border-white/10 text-white/55 font-medium text-[14px]">
          Cancel
        </button>
      </BottomSheet>

      {/* GHOSTED MODAL */}
      <BottomSheet 
        visible={activeModal === 'ghosted'} 
        onClose={() => setActiveModal(null)}
        title="Ghosted accounts" 
        subtitle="These accounts can't see your posts or send you messages."
      >
        <div className="mx-4 mb-[14px] bg-[#111] rounded-[12px] overflow-hidden">
          {ghostedAccounts.length === 0 ? (
            <div className="p-[20px] text-center text-[12px] text-white/30">
              No ghosted accounts
            </div>
          ) : (
            ghostedAccounts.map((account, index) => (
              <div key={account} className={`flex items-center justify-between p-[11px_14px] ${index !== ghostedAccounts.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div className="flex items-center gap-[10px]">
                  <div className="w-[28px] h-[28px] rounded-full bg-white/[0.07] flex items-center justify-center">
                    <Ghost size={14} color="rgba(255,255,255,0.5)" />
                  </div>
                  <span className="text-[13px] text-white">{account}</span>
                </div>
                <button 
                  onClick={() => setGhostedAccounts(prev => prev.filter((_, i) => i !== index))}
                  className="bg-[rgba(255,60,60,0.08)] border border-[rgba(255,60,60,0.15)] rounded-[8px] px-[10px] py-[4px] text-[11px] text-[rgba(255,80,80,0.8)]"
                >
                  Unghost
                </button>
              </div>
            ))
          )}
        </div>
        <button onClick={() => setActiveModal(null)} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-white/5 border border-white/10 text-white/55 font-medium text-[14px]">
          Done
        </button>
      </BottomSheet>

      {/* THEME MODAL */}
      <BottomSheet 
        visible={activeModal === 'theme'} 
        onClose={() => setActiveModal(null)}
        title="Choose theme" 
        subtitle="Pick how Vibe looks for you."
      >
        <div className="mx-4 mb-[14px] bg-[#111] rounded-[12px] overflow-hidden">
          {themeOptions.map((opt, index) => {
            const Icon = opt.icon;
            const isSelected = selectedTheme === opt.id;
            return (
              <div 
                key={opt.id}
                onClick={() => setSelectedTheme(opt.id)}
                className={`flex items-center gap-[12px] p-[11px_14px] cursor-pointer ${index !== themeOptions.length - 1 ? 'border-b border-white/5' : ''} ${isSelected ? 'bg-[rgba(255,90,26,0.06)]' : ''}`}
              >
                <div className="w-[30px] h-[30px] rounded-[9px] flex items-center justify-center shrink-0" style={{ backgroundColor: opt.bg }}>
                  <Icon size={15} color={opt.color} />
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-[13px] font-medium text-white">{opt.label}</span>
                  <span className="text-[11px] text-white/35">{opt.desc}</span>
                </div>
                <div 
                  className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-[#ff5a1a] bg-[#ff5a1a]' : 'border-white/30'}`}
                >
                  {isSelected && <div className="w-[8px] h-[8px] bg-white rounded-full" />}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={() => setActiveModal(null)} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-white/5 border border-white/10 text-white/55 font-medium text-[14px]">
          Done
        </button>
      </BottomSheet>

      {/* HELP MODAL */}
      <BottomSheet 
        visible={activeModal === 'help'} 
        onClose={() => setActiveModal(null)}
        title="Help center" 
        subtitle="Browse common questions or reach out to support."
      >
        <div className="mx-4 mb-[14px] bg-[#111] rounded-[12px] overflow-hidden">
          {[
            "How does anonymous posting work?",
            "How do I earn streak points?",
            "How do I ghost someone?",
            "Why can't I see my post in Explore?"
          ].map((q, i, arr) => (
            <div key={i} className={`p-[10px_14px] text-[12px] text-white/60 cursor-pointer ${i !== arr.length - 1 ? 'border-b border-white/5' : ''}`}>
              {q}
            </div>
          ))}
        </div>
        <button onClick={() => setActiveModal(null)} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-[#ff5a1a] text-white font-medium text-[14px]">
          Contact support
        </button>
        <button onClick={() => setActiveModal(null)} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-white/5 border border-white/10 text-white/55 font-medium text-[14px]">
          Close
        </button>
      </BottomSheet>

      {/* REPORT MODAL */}
      <BottomSheet 
        visible={activeModal === 'report'} 
        onClose={() => setActiveModal(null)}
        title="Report an issue" 
        subtitle="Tell us what's wrong and we'll look into it quickly."
      >
        <textarea 
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          placeholder="Describe the issue..."
          className="mx-4 mb-[14px] bg-[#111] border border-white/12 rounded-[10px] p-[10px_14px] text-[13px] text-white outline-none min-h-[80px] resize-none"
        />
        <div className="h-[0.5px] bg-white/[0.07] mx-4 mb-[10px]" />
        <button onClick={() => { setReportText(''); setActiveModal(null); }} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-[#ff5a1a] text-white font-medium text-[14px]">
          Send report
        </button>
        <button onClick={() => { setReportText(''); setActiveModal(null); }} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-white/5 border border-white/10 text-white/55 font-medium text-[14px]">
          Cancel
        </button>
      </BottomSheet>

      {/* LOGOUT MODAL */}
      <BottomSheet 
        visible={activeModal === 'logout'} 
        onClose={() => setActiveModal(null)}
        title="Log out?" 
        subtitle="You'll need to verify your phone number to log back in."
      >
        <button onClick={() => { setActiveModal(null); onLogout(); }} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-[rgba(255,60,60,0.12)] border border-[rgba(255,60,60,0.2)] text-[rgba(255,80,80,0.9)] font-medium text-[14px]">
          Log out
        </button>
        <button onClick={() => setActiveModal(null)} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-white/5 border border-white/10 text-white/55 font-medium text-[14px]">
          Stay logged in
        </button>
      </BottomSheet>

      {/* LOGOUT ALL MODAL */}
      <BottomSheet 
        visible={activeModal === 'logoutAll'} 
        onClose={() => setActiveModal(null)}
        title="Log out from all devices?" 
        subtitle="This will sign you out of all devices and active sessions. You'll need to log back in everywhere."
      >
        <button onClick={() => { setActiveModal(null); onLogoutAll ? onLogoutAll() : onLogout(); }} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-[rgba(255,60,60,0.12)] border border-[rgba(255,60,60,0.2)] text-[rgba(255,80,80,0.9)] font-medium text-[14px]">
          Log out from all devices
        </button>
        <button onClick={() => setActiveModal(null)} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-white/5 border border-white/10 text-white/55 font-medium text-[14px]">
          Cancel
        </button>
      </BottomSheet>

      {/* DEACTIVATE MODAL */}
      <BottomSheet 
        visible={activeModal === 'deactivate'} 
        onClose={() => setActiveModal(null)}
        title="Deactivate account" 
        subtitle="Your profile and posts will be hidden. You can reactivate any time by logging back in."
      >
        <button onClick={() => setActiveModal(null)} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-[rgba(218,184,127,0.12)] border border-[rgba(218,184,127,0.2)] text-[rgba(218,184,127,0.9)] font-medium text-[14px]">
          Deactivate temporarily
        </button>
        <button onClick={() => setActiveModal(null)} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-white/5 border border-white/10 text-white/55 font-medium text-[14px]">
          Cancel
        </button>
      </BottomSheet>

      {/* DELETE MODAL */}
      <BottomSheet 
        visible={activeModal === 'delete'} 
        onClose={() => setActiveModal(null)}
        title="Delete account permanently" 
        subtitle="This will erase all your posts, followers, streak and data. This cannot be undone."
      >
        <button onClick={() => setActiveModal(null)} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-[rgba(255,60,60,0.12)] border border-[rgba(255,60,60,0.2)] text-[rgba(255,80,80,0.9)] font-medium text-[14px]">
          Yes, delete everything
        </button>
        <button onClick={() => setActiveModal(null)} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-white/5 border border-white/10 text-white/55 font-medium text-[14px]">
          No, keep my account
        </button>
      </BottomSheet>

    </motion.div>
  );
};

export default SettingsScreen;
