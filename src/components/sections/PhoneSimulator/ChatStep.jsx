import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash, Home, PlusSquare, MessageCircle, User, Heart, Share2, VolumeX, X, Send, Clock, Bell, Plus, Ghost, Lock, Inbox, Wifi, Battery, Edit, ChevronRight, MoreHorizontal, ArrowRight, BellOff, Trash } from 'lucide-react';
import { vibeData, vibeCategories, musicData, musicCategories, moods, moodStyles, audiences, exploreRecentItems, exploreTrendingData, mockResultsCity, mockResultsRiya, exploreGridItems, mockConversationsData, moodColors } from './Data';

const ChatStep = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [conversations, setConversations] = useState(mockConversationsData);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatDraft, setChatDraft] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessages, setNewMessages] = useState([]);

  const filteredConversations = (activeFilter === 'Unread' 
    ? conversations.filter(c => c.unread) 
    : conversations).filter(c => 
      c.handle.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.post && c.post.text.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
  const unreadCount = conversations.filter(c => c.unread).length;
  
  const openChat = (chat) => {
    setSelectedChat(chat);
    setNewMessages([]);
    if (chat.unread) {
      setConversations(prev => prev.map(c => c.id === chat.id ? { ...c, unread: false, unreadCount: null } : c));
    }
  };

  const handleSend = () => {
    if (!chatDraft.trim()) return;
    setNewMessages(prev => [...prev, { text: chatDraft.trim(), time: "Just now", isMine: true }]);
    setChatDraft('');
  };
  
  const renderMoodTag = (tag) => {
    if (!tag) return null;
    const isTopic = tag.startsWith('re:');
    const style = isTopic ? { border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' } 
                          : { border: moodColors[tag]?.border || '1px solid rgba(255,255,255,0.12)', color: moodColors[tag]?.text || 'rgba(255,255,255,0.9)' };
    return (
      <div style={style} className="text-[8px] px-[6px] py-[2px] rounded-[8px] bg-transparent whitespace-nowrap font-medium">
        {tag}
      </div>
    );
  };
  
  if (selectedChat) {
    return (
      <motion.div
        key="step-chat-thread"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex flex-col bg-[#0c0c10] text-white overflow-hidden pb-[0px] z-[60] font-sans"
      >
        <div className="flex justify-between items-center pt-[12px] px-[20px] pb-[4px]">
          <span className="text-[11px] text-white font-medium">9:41</span>
          <div className="flex items-center gap-[5px] text-white">
            <Wifi size={12} strokeWidth={2.5} />
            <Battery size={14} strokeWidth={2.5} />
          </div>
        </div>

        <div className="pt-[14px] px-[12px] pb-[12px] flex items-center justify-between border-b-[0.5px] border-[rgba(255,255,255,0.07)] bg-[#0c0c10]">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedChat(null)} className="w-[26px] h-[26px] rounded-full bg-[rgba(255,255,255,0.07)] flex items-center justify-center">
              <ChevronLeft size={16} className="text-white" />
            </button>
            <div className="flex items-center gap-[10px]">
              <div className="relative">
                <img src={selectedChat.avatarImage} className="w-[32px] h-[32px] rounded-full object-cover" alt="" />
                {selectedChat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-[9px] h-[9px] rounded-full bg-[#FF4500] border-[1.5px] border-[#0c0c10]" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-white">{selectedChat.handle}</span>
                <span className="text-[9px] text-[rgba(255,255,255,0.35)]">{selectedChat.isOnline ? 'Online now' : `Last seen ${selectedChat.time}`}</span>
              </div>
            </div>
          </div>
          <button className="w-[26px] h-[26px] rounded-full bg-[rgba(255,255,255,0.07)] flex items-center justify-center">
            <MoreHorizontal size={14} className="text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[12px] py-[10px] [scrollbar-width:none]">
          {selectedChat.post && (
            <div className="border border-[rgba(255,255,255,0.08)] rounded-[10px] overflow-hidden mb-[16px] bg-[#0c0c10]">
              <div className="relative h-[52px] w-full" style={{ backgroundColor: selectedChat.post.bg }}>
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute bottom-0 left-0 p-[6px_8px] text-[9px] font-medium text-white">{selectedChat.post.text}</div>
              </div>
              <div className="p-[6px_8px] flex items-center gap-[5px]">
                {renderMoodTag(selectedChat.post.mood)}
                <span className="text-[8px] text-[rgba(255,255,255,0.35)]">Your post · {selectedChat.post.answers} answers</span>
              </div>
            </div>
          )}

          <div className="flex justify-center my-[10px]">
            <span className="text-[9px] text-[rgba(255,255,255,0.25)]">Today</span>
          </div>

          <div className="flex flex-col gap-[8px]">
            <div className="flex items-end gap-[7px]">
              <img src={selectedChat.avatarImage} className="w-[22px] h-[22px] shrink-0 rounded-full object-cover" alt="" />
              <div className="flex flex-col">
                <div className="bg-[rgba(255,255,255,0.09)] border border-[rgba(255,255,255,0.07)] text-white p-[8px_11px] text-[11px] leading-[1.5] rounded-[14px_14px_14px_4px] max-w-[220px]">
                  Your question hit different today. I've been thinking about it all afternoon.
                </div>
              </div>
            </div>
            
            <div className="flex items-end gap-[7px]">
              <div className="w-[22px] h-[22px] shrink-0" />
              <div className="flex flex-col">
                <div className="bg-[rgba(255,255,255,0.09)] border border-[rgba(255,255,255,0.07)] text-white p-[8px_11px] text-[11px] leading-[1.5] rounded-[14px_14px_14px_4px] max-w-[220px]">
                  Like genuinely — I almost messaged three people I haven't spoken to in years.
                </div>
                <span className="text-[8px] text-[rgba(255,255,255,0.2)] mt-1">2:14 PM</span>
              </div>
            </div>

            <div className="flex items-end gap-[7px] flex-row-reverse mt-2">
              <div className="flex flex-col items-end">
                <div className="bg-[#FF4500] text-white p-[8px_11px] text-[11px] leading-[1.5] rounded-[14px_14px_4px_14px] max-w-[220px]">
                  that's exactly what I was hoping for when I posted it
                </div>
              </div>
            </div>

            <div className="flex items-end gap-[7px] flex-row-reverse">
              <div className="flex flex-col items-end">
                <div className="bg-[#FF4500] text-white p-[8px_11px] text-[11px] leading-[1.5] rounded-[14px_14px_4px_14px] max-w-[220px]">
                  did you end up reaching out to them?
                </div>
                <span className="text-[8px] text-[rgba(255,255,255,0.2)] mt-1 text-right w-full">2:16 PM</span>
              </div>
            </div>
            
            <div className="flex items-end gap-[7px] mt-2">
              <img src={selectedChat.avatarImage} className="w-[22px] h-[22px] shrink-0 rounded-full object-cover" alt="" />
              <div className="flex flex-col">
                <div className="bg-[rgba(255,255,255,0.09)] border border-[rgba(255,255,255,0.07)] text-white p-[8px_11px] text-[11px] leading-[1.5] rounded-[14px_14px_14px_4px] max-w-[220px]">
                  still deciding. but honestly... maybe
                </div>
                <span className="text-[8px] text-[rgba(255,255,255,0.2)] mt-1">2:18 PM</span>
              </div>
            </div>

            {newMessages.map((msg, idx) => (
              <div key={idx} className={`flex items-end gap-[7px] ${msg.isMine ? 'flex-row-reverse mt-2' : 'mt-2'}`}>
                {msg.isMine ? (
                  <div className="flex flex-col items-end">
                    <div className="bg-[#FF4500] text-white p-[8px_11px] text-[11px] leading-[1.5] rounded-[14px_14px_4px_14px] max-w-[220px]">
                      {msg.text}
                    </div>
                    <span className="text-[8px] text-[rgba(255,255,255,0.2)] mt-1 text-right w-full">{msg.time}</span>
                  </div>
                ) : (
                  <>
                    <img src={selectedChat.avatarImage} className="w-[22px] h-[22px] shrink-0 rounded-full object-cover" alt="" />
                    <div className="flex flex-col">
                      <div className="bg-[rgba(255,255,255,0.09)] border border-[rgba(255,255,255,0.07)] text-white p-[8px_11px] text-[11px] leading-[1.5] rounded-[14px_14px_14px_4px] max-w-[220px]">
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-[rgba(255,255,255,0.2)] mt-1">{msg.time}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-[8px_12px] pb-[16px] border-t-[0.5px] border-[rgba(255,255,255,0.07)] bg-[#0c0c10] flex items-end gap-[8px]">
          <button className="w-[28px] h-[28px] rounded-full bg-[rgba(255,255,255,0.07)] flex items-center justify-center shrink-0 mb-[3px]">
            <Link size={14} className="text-white" />
          </button>
          <textarea
            value={chatDraft}
            onChange={(e) => setChatDraft(e.target.value)}
            placeholder="Reply..."
            className="flex-1 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-[20px] p-[8px_12px] text-[11px] text-white outline-none placeholder:text-[rgba(255,255,255,0.5)] resize-none min-h-[34px] max-h-[70px]"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!chatDraft.trim()}
            className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 mb-[2px] transition-opacity ${chatDraft.trim() ? 'bg-[#FF4500] opacity-100' : 'bg-[#FF4500] opacity-40'}`}
          >
            <ArrowRight size={14} className="text-white" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="step-chat-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col bg-[#0c0c10] text-white overflow-hidden pb-[70px] font-sans"
    >
      <div className="flex justify-between items-center pt-[12px] px-[20px] pb-[4px]">
        <span className="text-[11px] text-white font-medium">9:41</span>
        <div className="flex items-center gap-[5px] text-white">
          <Wifi size={12} strokeWidth={2.5} />
          <Battery size={14} strokeWidth={2.5} />
        </div>
      </div>

      <div className="pt-[10px] px-[12px] pb-[8px] flex items-center justify-between">
        <h1 className="text-[15px] font-medium tracking-[-0.01em] text-white">Messages</h1>
        <div className="flex gap-[8px]">
          <button className="w-[28px] h-[28px] rounded-full bg-[rgba(255,255,255,0.07)] flex items-center justify-center">
            <Edit size={14} className="text-white" />
          </button>
        </div>
      </div>

      <div className="px-[12px] pb-[10px] flex gap-[6px] overflow-x-auto [scrollbar-width:none]">
        {['All', 'Unread', 'Groups'].map(pill => (
          <button
            key={pill}
            onClick={() => setActiveFilter(pill)}
            className={`whitespace-nowrap px-[12px] py-[5px] rounded-[20px] text-[10px] font-medium transition-colors ${activeFilter === pill ? 'bg-white text-[#0c0c10]' : 'bg-transparent border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.45)]'}`}
          >
            {pill}
          </button>
        ))}
      </div>

      {activeFilter === 'Unread' && (
        <div className="px-[12px] pb-[8px] pt-[2px]">
          <span className="text-[10px] text-[rgba(255,255,255,0.3)]">{unreadCount} unread conversations</span>
        </div>
      )}

      <div className="px-[12px] pb-[8px] pt-[2px]">
        <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded-[10px] flex items-center px-[10px] h-[34px]">
          <Search size={14} className="text-[rgba(255,255,255,0.4)] mr-[8px]" />
          <input
            type="text"
            placeholder="Search messages..."
            className="flex-1 bg-transparent border-none outline-none text-[11px] text-white placeholder:text-[rgba(255,255,255,0.4)]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="h-[0.5px] bg-[rgba(255,255,255,0.07)] mx-0 my-[4px]" />

      <div className="flex-1 overflow-y-auto [scrollbar-width:none]">
        {activeFilter === 'Groups' || filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center pt-[40px] px-[20px]">
            <div className="w-[48px] h-[48px] rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mb-[4px]">
              <MessageCircle size={22} className="text-[rgba(255,255,255,0.2)]" />
            </div>
            <h3 className="text-[13px] font-medium text-white mb-[4px]">{activeFilter === 'Groups' ? 'Groups coming soon' : 'No messages yet'}</h3>
            <p className="text-[11px] text-[rgba(255,255,255,0.3)] text-center leading-[1.5] max-w-[220px]">
              When someone reaches out about your posts, their messages will appear here.
            </p>
            
            <div className="mt-[16px] w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-[12px] p-[10px_12px] flex items-center gap-[8px] cursor-pointer">
              <Edit size={16} className="text-[rgba(255,255,255,0.4)]" />
              <span className="flex-1 text-[12px] text-[rgba(255,255,255,0.5)]">Start a new conversation</span>
              <ArrowRight size={14} className="text-[rgba(255,255,255,0.3)]" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col pb-[20px]">
            {filteredConversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => openChat(conv)}
                className={`flex gap-[10px] p-[10px_12px] border-b-[0.5px] border-[rgba(255,255,255,0.05)] cursor-pointer ${conv.unread ? 'bg-[rgba(255,255,255,0.02)]' : 'bg-[#0c0c10]'}`}
              >
                <div className="relative shrink-0">
                  <img src={conv.avatarImage} className={`w-[40px] h-[40px] rounded-full object-cover ${conv.faded ? 'opacity-70' : ''} ${conv.moreFaded ? 'opacity-40' : ''}`} alt="" />
                  {conv.isOnline && (
                    <div className="absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full bg-[#FF4500] border-[2px] border-[#0c0c10]" />
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-medium text-white">{conv.handle}</span>
                    <span className="text-[9px] text-[rgba(255,255,255,0.25)] shrink-0">{conv.time}</span>
                  </div>
                  <div className={`text-[11px] truncate whitespace-nowrap mt-[1px] ${conv.unread ? 'text-[rgba(255,255,255,0.7)] font-normal' : 'text-[rgba(255,255,255,0.4)]'}`}>
                    {conv.preview}
                  </div>
                  {(conv.moodTag || conv.contextTag) && (
                    <div className="flex gap-[4px] mt-[4px] items-center">
                      {renderMoodTag(conv.moodTag)}
                      {renderMoodTag(conv.contextTag)}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end justify-center shrink-0 w-[18px]">
                  {conv.unread && (
                    <div className="w-[8px] h-[8px] bg-[#FF4500] rounded-full mt-[4px]" />
                  )}
                </div>
              </div>
            ))}
            
            {activeFilter === 'Unread' && filteredConversations.length > 0 && (
              <div className="mt-[20px] text-center text-[11px] text-[rgba(255,255,255,0.2)]">
                All other conversations are read
              </div>
            )}
          </div>
        )}
      </div>

      {['All', 'Unread'].includes(activeFilter) && (
        <button className="absolute bottom-[80px] right-[14px] w-[36px] h-[36px] rounded-full bg-[#FF4500] flex items-center justify-center shadow-lg z-40">
          <Edit size={16} className="text-white" />
        </button>
      )}
    </motion.div>
  );
};
export default ChatStep;