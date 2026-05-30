import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Phone, Bell, Ghost, 
  Palette, HelpCircle, Flag, Pause, Trash, LogOut, 
  Moon, Sun, Smartphone, Check, ChevronDown, PlusCircle, MessageSquare, Info, Shield
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
  const [expandedFaq, setExpandedFaq] = useState(null);

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

          {/* SECTION: About */}
          <div>
            <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-white/25 px-[14px] pt-[10px] pb-[5px]">About</div>
            <div className="bg-[#141418] border border-white/[0.07] rounded-[14px] overflow-hidden">
              <SettingsRow 
                icon={Info} iconBg="rgba(255,255,255,0.06)" iconColor="rgba(255,255,255,0.55)"
                title="About Mystify" subtitle="App details and privacy policy"
                onPress={() => setActiveModal('about')}
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
            Mystify · v2.4.1 · Made in India
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
        subtitle="Pick how Mystify looks for you."
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
        <div className="mx-4 mb-[10px] bg-[#111] rounded-[12px] overflow-hidden border border-white/5">
          {[
            {
              id: 'phone',
              question: "How to update phone number?",
              answer: "Go to settings, tap 'Phone number' under the Account section, enter your new phone number with the country code, and tap 'Send OTP'. Once verified, your number is updated instantly.",
              icon: Phone,
              iconBg: "rgba(77,144,215,0.12)",
              iconColor: "rgba(77,144,215,0.9)",
            },
            {
              id: 'post',
              question: "How to post a thought?",
              answer: "Tap the '+' icon on the home screen toolbar. Compose your message, choose mood tags that capture your vibe, choose an optional background canvas/track, and toggle 'Post anonymously' if you want to stay private, then hit Post.",
              icon: PlusCircle,
              iconBg: "rgba(255,90,26,0.12)",
              iconColor: "#ff5a1a",
            },
            {
              id: 'dm',
              question: "About direct messages",
              answer: "DMs allow private replies to posts. Tap the message icon on any post to reply contextually. All conversations live in your inbox, and you can Ghost (block) any user anytime to stop receiving messages.",
              icon: MessageSquare,
              iconBg: "rgba(127,218,159,0.12)",
              iconColor: "rgba(127,218,159,0.9)",
            }
          ].map((faq, i, arr) => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <div key={faq.id} className={`${i !== arr.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div 
                  onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                  className="flex items-center gap-3 p-[12px_14px] cursor-pointer hover:bg-white/[0.03] active:bg-white/[0.03] transition-colors"
                >
                  <div className="w-[28px] h-[28px] rounded-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: faq.iconBg }}>
                    <faq.icon size={14} color={faq.iconColor} />
                  </div>
                  <span className="flex-1 text-[12px] font-medium text-white/80">{faq.question}</span>
                  <div className="shrink-0 transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <ChevronDown size={14} color="rgba(255,255,255,0.3)" />
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-white/[0.01]"
                    >
                      <div className="px-[14px] pb-[14px] pt-[2px] text-[11px] leading-relaxed text-white/50 pl-[54px] pr-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
        {/* Still Need Help Gradient Card */}
        <div className="mx-4 mt-2 mb-4 p-4 rounded-[14px] bg-gradient-to-r from-[rgba(255,90,26,0.12)] to-[rgba(77,144,215,0.12)] border border-white/[0.08] flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[12px] font-semibold text-white/90">Still need help?</span>
            <span className="text-[10px] text-white/45">Our support agents are available 24/7.</span>
          </div>
          <button 
            onClick={() => {
              setActiveModal('report');
            }} 
            className="px-4 h-[32px] rounded-[16px] bg-[#ff5a1a] hover:bg-[#ff6b2d] active:scale-95 transition-all text-white font-semibold text-[11px] shrink-0"
          >
            Ask Us
          </button>
        </div>

        <button onClick={() => { setExpandedFaq(null); setActiveModal(null); }} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-white/5 border border-white/10 text-white/55 font-medium text-[14px]">
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

      {/* ABOUT MODAL */}
      <BottomSheet 
        visible={activeModal === 'about'} 
        onClose={() => setActiveModal(null)}
        title="About Mystify" 
        subtitle="Learn more about our mission and privacy protection."
      >
        <div className="mx-4 mb-[14px] flex flex-col items-center text-center p-4 bg-[#111] rounded-[12px] border border-white/5">
          <div className="w-[48px] h-[48px] rounded-[12px] bg-gradient-to-br from-[#ff5a1a] to-[#9f7fda] flex items-center justify-center shadow-lg mb-3">
            <span className="text-[20px] font-black text-white tracking-widest">M</span>
          </div>
          <span className="text-[14px] font-bold text-white mb-1">Mystify</span>
          <span className="text-[11px] text-white/35 mb-3">Version 2.4.1 (Stable)</span>
          <p className="text-[11px] text-white/60 leading-relaxed max-w-[260px]">
            Mystify is a canvas for authentic expressions. Share mood-synced thoughts, reply contextually to others, and connect under your handle or in full anonymity.
          </p>
        </div>

        <div className="mx-4 mb-[14px] bg-[#111] rounded-[12px] overflow-hidden border border-white/5">
          <div className="p-[12px_14px] border-b border-white/5 flex items-center gap-3">
            <div className="w-[24px] h-[24px] rounded-[6px] bg-white/[0.06] flex items-center justify-center shrink-0">
              <Shield size={12} className="text-[#7edaba]" />
            </div>
            <div className="flex-1 flex flex-col">
              <span className="text-[12px] font-semibold text-white">Privacy Policy</span>
              <span className="text-[10px] text-white/35 mt-0.5">Your data is safe and protected.</span>
            </div>
          </div>
          <div className="p-[12px_14px] flex flex-col gap-3 max-h-[160px] overflow-y-auto [scrollbar-width:none]">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-white/85">1. Anonymity Integrity</span>
              <p className="text-[10px] text-white/50 leading-relaxed">
                When you post anonymously, your username is stripped away and replaced with 'Anonymous'. We do not track or link this back to your profile in the public feed.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-white/85">2. Minimal Storage</span>
              <p className="text-[10px] text-white/50 leading-relaxed">
                We only store key information required for account verification (your phone number) and to display your feed. We never sell your personal information.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-white/85">3. Complete User Control</span>
              <p className="text-[10px] text-white/50 leading-relaxed">
                You have absolute control over your digital footprint. Deactivate or delete your account at any time right from settings to remove all data permanently.
              </p>
            </div>
          </div>
        </div>

        <button onClick={() => setActiveModal(null)} className="mx-4 mb-2 h-[44px] rounded-[12px] bg-white/5 border border-white/10 text-white/55 font-medium text-[14px]">
          Close
        </button>
      </BottomSheet>

    </motion.div>
  );
};

export default SettingsScreen;
