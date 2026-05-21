import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Heart, MessageCircle, Flame, Sparkles, Send, X, CheckCircle, BellOff } from 'lucide-react';
import { mockNotifications } from './MockData';

const NotificationsScreen = ({ onBack, onNavigateToStreak, onNavigateToProfile }) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [replyTarget, setReplyTarget] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleClearAll = () => {
    mockNotifications.length = 0;
    setNotifications([]);
  };

  const handleNotifClick = (notif) => {
    // Mark as read in singleton
    const found = mockNotifications.find(n => n.id === notif.id);
    if (found) found.unread = false;
    setNotifications([...mockNotifications]);

    if (notif.type === 'streak') {
      if (onNavigateToStreak) onNavigateToStreak();
    } else if (notif.type === 'reply') {
      setReplyTarget(notif);
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    // Simulate sending reply
    setReplyText('');
    setReplyTarget(null);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);

    if (replyTarget) {
      const found = mockNotifications.find(n => n.id === replyTarget.id);
      if (found) found.unread = false;
      setNotifications([...mockNotifications]);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart size={13} className="text-white/80" />;
      case 'reply':
        return <MessageCircle size={13} className="text-white/80" />;
      case 'streak':
        return <Flame size={13} className="text-[#ff5a1a]" />;
      case 'vibe':
        return <Sparkles size={13} className="text-white/80" />;
      default:
        return <Sparkles size={13} className="text-white/80" />;
    }
  };

  return (
    <motion.div
      key="notifications-screen"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute inset-0 z-[250] flex flex-col font-sans bg-[#0c0c10] text-white overflow-hidden pb-[64px]"
    >
      {/* Header bar */}
      <div className="flex justify-between items-center bg-[#0c0c10] border-b border-white/[0.06] pt-[12px] pb-[10px] px-[16px] z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 transition-all flex items-center justify-center border border-white/[0.08]"
          >
            <ChevronLeft size={16} className="text-white" />
          </button>
          <span className="text-sm font-bold text-white">
            Notifications
          </span>
        </div>
        {notifications.length > 0 && (
          <button 
            onClick={handleClearAll}
            className="text-[10px] font-medium text-white/40 hover:text-rose-400 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 [&::-webkit-scrollbar]:hidden space-y-2 z-10">
        <AnimatePresence initial={false}>
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                onClick={() => handleNotifClick(notif)}
                className={`w-full p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] active:scale-[0.99] border border-white/[0.04] cursor-pointer transition-all flex gap-3 items-center ${notif.unread ? 'bg-white/[0.04] border-white/[0.08]' : ''}`}
              >
                {/* Left Icon Panel */}
                <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] shrink-0 flex items-center justify-center relative">
                  {getIcon(notif.type)}
                  {notif.unread && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1a] absolute top-0.5 right-0.5" />
                  )}
                </div>

                {/* Content Panel */}
                <div className="flex-1 min-w-0 flex flex-col text-left">
                  <div className="flex items-baseline justify-between gap-2">
                    <span 
                      onClick={(e) => {
                        if (notif.user && notif.user !== 'Mystify Engine' && notif.user !== 'Resonance AI') {
                          e.stopPropagation();
                          if (onNavigateToProfile) onNavigateToProfile(notif.user);
                        }
                      }}
                      className="text-[11px] font-bold text-white/90 hover:underline shrink-0"
                    >
                      @{notif.user}
                    </span>
                    <span className="text-[8px] text-white/30 truncate">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-[11px] leading-normal text-white/50 mt-0.5 select-none font-medium">
                    {notif.content}
                  </p>

                  {notif.type === 'reply' && (
                    <span className="text-[8px] font-bold text-[#ff5a1a] uppercase tracking-wider mt-1.5 block">
                      Tap to reply
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center justify-center py-24 px-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                <BellOff size={20} className="text-white/20" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">All caught up!</h3>
              <p className="text-[10px] text-white/30 max-w-[180px]">
                No new notifications.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Reply Drawer Overlay */}
      <AnimatePresence>
        {replyTarget && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-[300]"
              onClick={() => setReplyTarget(null)}
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className="absolute inset-x-0 bottom-0 bg-[#0f0f12] border-t border-white/[0.08] rounded-t-2xl z-[310] flex flex-col p-4 pb-6"
            >
              <div className="w-8 h-1 bg-white/20 rounded-full self-center mb-4 shrink-0" />
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-white">Reply to @{replyTarget.user}</span>
                <button 
                  onClick={() => setReplyTarget(null)}
                  className="w-5 h-5 rounded-full bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-white"
                >
                  <X size={10} />
                </button>
              </div>

              {/* Target notification excerpt */}
              <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-lg mb-4 text-left">
                <p className="text-[11px] leading-relaxed text-white/40 italic">
                  "{replyTarget.targetText || replyTarget.content}"
                </p>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSendReply} className="flex gap-2 items-center">
                <div className="flex-1 bg-white/[0.06] border border-white/[0.04] focus-within:border-[#ff5a1a]/40 rounded-full px-4 py-2 flex items-center transition-all">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write an anonymous reply..."
                    className="bg-transparent text-white text-[11px] w-full focus:outline-none placeholder:text-white/20"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="w-8 h-8 rounded-full bg-[#ff5a1a] disabled:opacity-30 active:scale-95 flex items-center justify-center text-white transition-all shrink-0 cursor-pointer"
                >
                  <Send size={12} strokeWidth={2} className="pl-0.5" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -10, x: '-50%' }}
            className="absolute top-16 left-1/2 z-[350] bg-[#141419]/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#ff5a1a]/20 flex items-center gap-2 shadow-lg shadow-black/85 pointer-events-none"
          >
            <CheckCircle size={13} className="text-[#ff5a1a]" strokeWidth={2.5} />
            <span className="text-white text-[10px] font-bold tracking-wide">Reply sent anonymously!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NotificationsScreen;
