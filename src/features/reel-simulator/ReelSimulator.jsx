import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, Check, ChevronDown, ChevronUp, Music, Play, Volume1, Volume2, Circle, CircleDot, Activity, Search, Bold, Italic, Link, AtSign, Hash, Home, PlusSquare, MessageCircle, User, Heart, Share2, VolumeX, X, Send, Clock, Bell, Plus, Ghost, Lock, Inbox, Wifi, Battery } from 'lucide-react';
const initialHeroReels = [
  {
    type: "Spooky Vibes",
    question: `"What's the scariest thing that happened to you?"`,
    replies: [
      { user: "upside_down_fan", text: "Hearing a clock tick when there's no clock in the room. 🕰️😱", from: "from-red-600", to: "to-black", size: "w-11/12", padding: "px-3 py-2", margin: "mt-1", dot: "w-6 h-6" },
      { user: "eleven_waffles", text: "Running out of Eggos on a Monday morning. The true horror. 🧇😭", from: "from-yellow-400", to: "to-orange-500", size: "w-10/12 ml-4", padding: "px-3 py-2", margin: "mt-1", dot: "w-5 h-5" }
    ],
    commentsList: [
      { id: 1, user: "upside_down_fan", text: "Hearing a clock tick when there's no clock in the room. 🕰️😱", likes: 842, time: "2h", avatarFrom: "from-red-600", avatarTo: "to-black" },
      { id: 2, user: "eleven_waffles", text: "Running out of Eggos on a Monday morning. The true horror. 🧇😭", likes: 256, time: "1h", avatarFrom: "from-yellow-400", avatarTo: "to-orange-500" },
      { id: 3, user: "vecna_stan", text: "This song is my alarm clock now.", likes: 89, time: "45m", avatarFrom: "from-purple-400", avatarTo: "to-indigo-500" }
    ],
    likes: "11.0",
    comments: "2.1K",
    shares: "450",
    bgImage: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1776715534/stable-diffusion-xl-base-10_wide-angle-shot_3_m9y7vl.png",
    audioSrc: "https://res.cloudinary.com/dyy8sqeh7/video/upload/v1776881859/qihcodueume9lipsgi1d.mp3"
  },
  {
    type: "Secret Confession",
    question: `"What's one thing you're too afraid to tell anyone?"`,
    replies: [
      { user: "mystik_creator", text: "Honestly, I just let my phone ring and then text them \"what's up?\" 🤷‍♂️😂", from: "from-yellow-400", to: "to-pink-500", size: "w-11/12", padding: "px-3 py-2", margin: "mt-1", dot: "w-6 h-6" },
      { user: "sarah_vibes", text: "Same here! Thought I was the only one that did this. 👀", from: "from-cyan-400", to: "to-emerald-400", size: "w-10/12 ml-4", padding: "px-3 py-2", margin: "mt-1", dot: "w-5 h-5" }
    ],
    commentsList: [
      { id: 11, user: "mystik_creator", text: "Honestly, I just let my phone ring and then text them \"what's up?\" 🤷‍♂️😂", likes: 842, time: "2h", avatarFrom: "from-yellow-400", avatarTo: "to-pink-500" },
      { id: 12, user: "sarah_vibes", text: "Same here! Thought I was the only one that did this. 👀", likes: 256, time: "1h", avatarFrom: "from-cyan-400", avatarTo: "to-emerald-400" },
      { id: 13, user: "introvert_king", text: "Relatable levels are off the charts right now", likes: 89, time: "45m", avatarFrom: "from-purple-400", avatarTo: "to-indigo-500" },
      { id: 14, user: "anon_user_99", text: "I put my phone on DND 24/7 lol", likes: 12, time: "10m", avatarFrom: "from-gray-400", avatarTo: "to-gray-600" }
    ],
    likes: "12",
    comments: "4.2K",
    shares: "Share",
    bgImage: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775192948/xkqtlmnohayyh1hx3e78.jpg",
    audioSrc: "https://res.cloudinary.com/dyy8sqeh7/video/upload/q_auto/f_auto/v1776640285/pihf9rnxy73p1n7betwi.mp3"
  },
  {
    type: "Anime Debate",
    question: `"If you could live in any anime world, which one would it be?"`,
    replies: [
      { user: "otaku_warrior", text: "Definitely the One Piece world! I want to set sail and search for the ultimate treasure. 🏴‍☠️🍖", from: "from-red-500", to: "to-orange-500", size: "w-11/12", padding: "px-3 py-2", margin: "mt-1", dot: "w-6 h-6" },
      { user: "ninja_way", text: "Naruto universe! Learning jutsu and exploring the hidden leaf. 🦊🍥", from: "from-blue-400", to: "to-indigo-500", size: "w-10/12 ml-4", padding: "px-3 py-2", margin: "mt-1", dot: "w-5 h-5" }
    ],
    commentsList: [
      { id: 21, user: "otaku_warrior", text: "Definitely the One Piece world! I want to set sail and search for the ultimate treasure. 🏴‍☠️🍖", likes: 532, time: "5h", avatarFrom: "from-red-500", avatarTo: "to-orange-500" },
      { id: 22, user: "ninja_way", text: "Naruto universe! Learning jutsu and exploring the hidden leaf. 🦊🍥", likes: 410, time: "3h", avatarFrom: "from-blue-400", avatarTo: "to-indigo-500" },
      { id: 23, user: "ghoul_boy", text: "Tokyo Ghoul... but as a human just trying to survive coffee shops ☕", likes: 120, time: "2h", avatarFrom: "from-stone-700", avatarTo: "to-zinc-900" }
    ],
    likes: "15.8",
    comments: "1.2K",
    shares: "890",
    bgImage: "https://res.cloudinary.com/dyy8sqeh7/image/upload/q_auto/f_auto/v1775745594/stable-diffusion-xl-base-10_wide-angle-shot_1_uvwwwe.png",
    audioSrc: "https://res.cloudinary.com/dyy8sqeh7/video/upload/v1776630683/desifreemusic-battle-rage-intense-fight-music-411019_mpf7i8.mp3"
  },
  {
    type: "Productivity Flex",
    question: `"What's your most overpowered setup secret?"`,
    replies: [
      { user: "code_ninja", text: "Using AI to write my boilerplate. Saves me like 10 hours a week! 🚀💻", from: "from-purple-500", to: "to-indigo-600", size: "w-11/12", padding: "px-3.5 py-2.5", margin: "mt-1", dot: "w-7 h-7" },
      { user: "mac_addict", text: "Keyboard shortcuts for everything. If I touch the mouse, I lose. ⌨️🔥", from: "from-green-400", to: "to-emerald-500", size: "w-10/12 ml-6", padding: "px-3.5 py-2.5", margin: "mt-1", dot: "w-6 h-6" }
    ],
    commentsList: [
      { id: 31, user: "code_ninja", text: "Using AI to write my boilerplate. Saves me like 10 hours a week! 🚀💻", likes: 1024, time: "1h", avatarFrom: "from-purple-500", avatarTo: "to-indigo-600" },
      { id: 32, user: "mac_addict", text: "Keyboard shortcuts for everything. If I touch the mouse, I lose. ⌨️🔥", likes: 890, time: "45m", avatarFrom: "from-green-400", avatarTo: "to-emerald-500" },
      { id: 33, user: "vim_user", text: "Vim. I still don't know how to exit, but my productivity is amazing.", likes: 450, time: "20m", avatarFrom: "from-emerald-400", avatarTo: "to-teal-600" }
    ],
    likes: "24.5",
    comments: "3.1K",
    shares: "1.2K",
    bgImage: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775753291/mh5cum4ms0gl69ybwgal.jpg",
    audioSrc: "https://res.cloudinary.com/dyy8sqeh7/video/upload/v1776630682/monume-space-509492_jwpg3u.mp3"
  },
  {
    type: "Zen Focus",
    question: `"What's your go-to sound for ultimate deep work?"`,
    replies: [
      { user: "chill_coder", text: "Ocean waves all day. Drowns out everything so I can just flow. 🌊🎧", from: "from-blue-500", to: "to-cyan-500", size: "w-11/12", padding: "px-3.5 py-2.5", margin: "mt-1", dot: "w-7 h-7" },
      { user: "lofi_girl", text: "Lofi hip hop beats to relax/study to. A classic. ☕📚", from: "from-amber-400", to: "to-orange-500", size: "w-10/12 ml-6", padding: "px-3.5 py-2.5", margin: "mt-1", dot: "w-6 h-6" }
    ],
    commentsList: [
      { id: 41, user: "chill_coder", text: "Ocean waves all day. Drowns out everything so I can just flow. 🌊🎧", likes: 620, time: "3h", avatarFrom: "from-blue-500", avatarTo: "to-cyan-500" },
      { id: 42, user: "lofi_girl", text: "Lofi hip hop beats to relax/study to. A classic. ☕📚", likes: 590, time: "2h", avatarFrom: "from-amber-400", avatarTo: "to-orange-500" },
      { id: 43, user: "noise_fan", text: "Brown noise is highly underrated 🤎", likes: 210, time: "1h", avatarFrom: "from-yellow-700", avatarTo: "to-amber-900" }
    ],
    likes: "18.2",
    comments: "1.5K",
    shares: "920",
    bgImage: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775755724/kzmvlx75tsy2mngul5qu.jpg",
    audioSrc: "https://res.cloudinary.com/dyy8sqeh7/video/upload/v1776630683/desifreemusic-ocean-wave-loops-377890_gbxv2x.mp3"
  },
  {
    type: "Weekend Vibes",
    question: `"What's your favorite way to unwind on a Saturday?"`,
    replies: [
      { user: "mall_rat", text: "Hitting the shops with friends! Love the energy of a busy mall. 🛍️✨", from: "from-pink-500", to: "to-rose-500", size: "w-11/12", padding: "px-3.5 py-2.5", margin: "mt-1", dot: "w-7 h-7" },
      { user: "coffee_lover", text: "Just people watching with an iced coffee. It's so peaceful in a weird way. ☕🚶", from: "from-fuchsia-400", to: "to-purple-500", size: "w-10/12 ml-6", padding: "px-3.5 py-2.5", margin: "mt-1", dot: "w-6 h-6" }
    ],
    commentsList: [
      { id: 51, user: "mall_rat", text: "Hitting the shops with friends! Love the energy of a busy mall. 🛍️✨", likes: 780, time: "6h", avatarFrom: "from-pink-500", avatarTo: "to-rose-500" },
      { id: 52, user: "coffee_lover", text: "Just people watching with an iced coffee. It's so peaceful in a weird way. ☕🚶", likes: 640, time: "5h", avatarFrom: "from-fuchsia-400", avatarTo: "to-purple-500" },
      { id: 53, user: "couch_potato", text: "Binge watching 3 seasons of a show without moving", likes: 1100, time: "4h", avatarFrom: "from-orange-300", avatarTo: "to-rose-400" }
    ],
    likes: "21.4",
    comments: "2.8K",
    shares: "1.1K",
    bgImage: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1775756562/muzhikhjcsxhens09720.jpg",
    audioSrc: "https://res.cloudinary.com/dyy8sqeh7/video/upload/v1776630682/gregorquendel_sounddesign-crowd-people-shopping-mall-ambience-138235_u3fycr.mp3"
  }
];
import userAvatar from '../../assets/avatar.png';
import coverImage from '../../assets/cover.png';
import './ReelSimulator.css';

const vibeData = [
  {
    category: "Nature",
    id: "nature",
    items: [
      { id: "nature-1", name: "Serene Mountain", bg: "#1e3a5f", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&fit=crop" },
      { id: "nature-2", name: "Valley Dusk", bg: "#1a3a2a", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80&fit=crop" },
      { id: "nature-3", name: "Misty Forest", bg: "#2a2a1a", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "nature-4", name: "Deep Lake", bg: "#152238", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80&fit=crop" },
      { id: "nature-5", name: "Red Woods", bg: "#4a2e2b", img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=400&q=80&fit=crop" },
      { id: "nature-6", name: "Golden Hour", bg: "#8a5a44", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Dark & Moody",
    id: "dark-moody",
    items: [
      { id: "dark-1", name: "Mystic Aura", bg: "#2d1b4e", img: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80&fit=crop" },
      { id: "dark-2", name: "Dark Matter", bg: "#1a1a3a", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80&fit=crop" },
      { id: "dark-3", name: "Night Pulse", bg: "#3a1a2a", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "dark-4", name: "Obsidian", bg: "#0d0d12", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80&fit=crop" },
      { id: "dark-5", name: "Crimson Night", bg: "#300810", img: "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=400&q=80&fit=crop" },
      { id: "dark-6", name: "Void", bg: "#1a1b26", img: "https://images.unsplash.com/photo-1464061884559-3d0c2b65c2b1?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Avengers",
    id: "avengers",
    items: [
      { id: "av-1", name: "Iron Man", bg: "#8b0000", img: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=400&q=80&fit=crop" },
      { id: "av-2", name: "Storm", bg: "#1a1a2e", img: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80&fit=crop" },
      { id: "av-3", name: "Infinity", bg: "#4b0082", img: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "av-4", name: "Shield", bg: "#00008b", img: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&q=80&fit=crop" },
      { id: "av-5", name: "Snap", bg: "#2c2c54", img: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=80&fit=crop" },
      { id: "av-6", name: "Assemble", bg: "#1a0a00", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Harry Potter",
    id: "harry-potter",
    items: [
      { id: "hp-1", name: "Hogwarts", bg: "#1a1a2e", img: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=400&q=80&fit=crop" },
      { id: "hp-2", name: "Dark Arts", bg: "#2d1b4e", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80&fit=crop" },
      { id: "hp-3", name: "Magic Library", bg: "#1c0a00", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "hp-4", name: "Platform 9¾", bg: "#1a2a3a", img: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&q=80&fit=crop" },
      { id: "hp-5", name: "Patronus", bg: "#0a1628", img: "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=400&q=80&fit=crop" },
      { id: "hp-6", name: "Forbidden Forest", bg: "#0d1f0d", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Death Note",
    id: "death-note",
    items: [
      { id: "dn-1", name: "The Notebook", bg: "#0d0d0d", img: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=400&q=80&fit=crop" },
      { id: "dn-2", name: "Shinigami", bg: "#1a0a0a", img: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=400&q=80&fit=crop" },
      { id: "dn-3", name: "L vs Kira", bg: "#0a0a1a", img: "https://images.unsplash.com/photo-1464061884559-3d0c2b65c2b1?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "dn-4", name: "Near", bg: "#1a1a1a", img: "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=400&q=80&fit=crop" },
      { id: "dn-5", name: "Kira", bg: "#200000", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80&fit=crop" },
      { id: "dn-6", name: "Shadows", bg: "#0d0d12", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Demon Slayer",
    id: "demon-slayer",
    items: [
      { id: "ds-1", name: "Flame Hashira", bg: "#8b1a00", img: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&q=80&fit=crop" },
      { id: "ds-2", name: "Cherry Blossom", bg: "#3d1a2a", img: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&q=80&fit=crop" },
      { id: "ds-3", name: "Wisteria Moon", bg: "#1a0a2a", img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "ds-4", name: "Thunder Breath", bg: "#0a0a3a", img: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80&fit=crop" },
      { id: "ds-5", name: "Sunrise", bg: "#5a2a1a", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80&fit=crop" },
      { id: "ds-6", name: "Infinity Castle", bg: "#1a1a3a", img: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Prince of Persia",
    id: "prince-of-persia",
    items: [
      { id: "pop-1", name: "Sand Dunes", bg: "#8b6914", img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80&fit=crop" },
      { id: "pop-2", name: "Ancient Palace", bg: "#5a3a1a", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80&fit=crop" },
      { id: "pop-3", name: "Desert Storm", bg: "#6b4a1a", img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "pop-4", name: "Oasis", bg: "#1a3a2a", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80&fit=crop" },
      { id: "pop-5", name: "Sands of Time", bg: "#7a5a1a", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80&fit=crop" },
      { id: "pop-6", name: "Mirage", bg: "#4a3a1a", img: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Stranger Things",
    id: "stranger-things",
    items: [
      { id: "st-1", name: "Upside Down", bg: "#1a0a1a", img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&q=80&fit=crop" },
      { id: "st-2", name: "Hawkins Lab", bg: "#0a1a1a", img: "https://images.unsplash.com/photo-1553949285-1196ce81deda?w=400&q=80&fit=crop" },
      { id: "st-3", name: "Neon 80s", bg: "#0a0a1a", img: "https://images.unsplash.com/photo-1545033131-485ea67fd7c3?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "st-4", name: "The Void", bg: "#0d0d0d", img: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80&fit=crop" },
      { id: "st-5", name: "Demogorgon", bg: "#1a0a0a", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80&fit=crop" },
      { id: "st-6", name: "Portal", bg: "#1a1a00", img: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=80&fit=crop" }
    ]
  },
  {
    category: "Game of Thrones",
    id: "game-of-thrones",
    items: [
      { id: "got-1", name: "Winterfell", bg: "#1a1a2e", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&fit=crop" },
      { id: "got-2", name: "Dragon Fire", bg: "#5a0000", img: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&q=80&fit=crop" },
      { id: "got-3", name: "The Wall", bg: "#1e2d3a", img: "https://images.unsplash.com/photo-1517525822813-9980d1813ce2?w=400&q=80&fit=crop" }
    ],
    extraItems: [
      { id: "got-4", name: "Iron Throne", bg: "#2a1a0a", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80&fit=crop" },
      { id: "got-5", name: "King's Landing", bg: "#3a2a1a", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80&fit=crop" },
      { id: "got-6", name: "Night King", bg: "#0d1a2a", img: "https://images.unsplash.com/photo-1464061884559-3d0c2b65c2b1?w=400&q=80&fit=crop" }
    ]
  }
];

const vibeCategories = ["All", "Nature", "Dark & Moody", "Urban", "Avengers", "Harry Potter", "Death Note", "Demon Slayer", "Prince of Persia", "Stranger Things", "Game of Thrones"];

const musicData = [
  {
    category: "Nature",
    id: "nature-music",
    items: [{ id: "nm-1", name: "Serene Mountain", duration: "2:34", bg: "#1e3a5f" }, { id: "nm-2", name: "Valley Dusk", duration: "3:12", bg: "#1a3a2a" }],
    extraItems: [{ id: "nm-3", name: "Misty Forest", duration: "3:45", bg: "#2a2a1a" }, { id: "nm-4", name: "River Flow", duration: "2:50", bg: "#3a2a3a" }]
  },
  {
    category: "Dark & Moody",
    id: "dark-moody-music",
    items: [{ id: "dm-1", name: "Mystic Aura", duration: "4:05", bg: "#2d1b4e" }, { id: "dm-2", name: "Dark Matter", duration: "3:47", bg: "#1a1a3a" }],
    extraItems: [{ id: "dm-3", name: "Night Pulse", duration: "6:15", bg: "#3a1a2a" }, { id: "dm-4", name: "Shadow Walk", duration: "4:30", bg: "#1a1a2a" }]
  },
  {
    category: "Urban",
    id: "urban-music",
    items: [{ id: "ur-1", name: "City Lights", duration: "2:58", bg: "#1a2a3a" }, { id: "ur-2", name: "Rooftop", duration: "3:22", bg: "#3d2b1f" }],
    extraItems: [{ id: "ur-3", name: "Subway", duration: "3:10", bg: "#2a2a1a" }, { id: "ur-4", name: "Street Beat", duration: "2:45", bg: "#1a1a1a" }]
  },
  {
    category: "Avengers",
    id: "avengers-music",
    items: [{ id: "av-1", name: "Hero's Theme", duration: "3:45", bg: "#8b0000" }, { id: "av-2", name: "Assemble", duration: "4:12", bg: "#1a1a2e" }],
    extraItems: [{ id: "av-3", name: "Endgame", duration: "5:30", bg: "#4b0082" }, { id: "av-4", name: "Infinity", duration: "2:55", bg: "#00008b" }]
  },
  {
    category: "Harry Potter",
    id: "hp-music",
    items: [{ id: "hp-1", name: "Hedwig's Flight", duration: "3:10", bg: "#1a1a2e" }, { id: "hp-2", name: "Magic Wand", duration: "2:45", bg: "#2d1b4e" }],
    extraItems: [{ id: "hp-3", name: "Dark Arts", duration: "4:20", bg: "#1c0a00" }, { id: "hp-4", name: "Hogwarts", duration: "3:50", bg: "#1a2a3a" }]
  },
  {
    category: "Death Note",
    id: "dn-music",
    items: [{ id: "dn-1", name: "Kira's Theme", duration: "3:15", bg: "#0d0d0d" }, { id: "dn-2", name: "L's Theme", duration: "2:50", bg: "#1a0a0a" }],
    extraItems: [{ id: "dn-3", name: "Shinigami", duration: "4:10", bg: "#0a0a1a" }, { id: "dn-4", name: "Justice", duration: "3:25", bg: "#1a1a1a" }]
  },
  {
    category: "Demon Slayer",
    id: "ds-music",
    items: [{ id: "ds-1", name: "Water Breathing", duration: "3:30", bg: "#8b1a00" }, { id: "ds-2", name: "Hinokami", duration: "4:05", bg: "#3d1a2a" }],
    extraItems: [{ id: "ds-3", name: "Mugen Train", duration: "5:15", bg: "#1a0a2a" }, { id: "ds-4", name: "Hashira", duration: "2:40", bg: "#0a0a3a" }]
  },
  {
    category: "Prince of Persia",
    id: "pop-music",
    items: [{ id: "pop-1", name: "Sands of Time", duration: "3:40", bg: "#8b6914" }, { id: "pop-2", name: "Warrior Within", duration: "4:20", bg: "#5a3a1a" }],
    extraItems: [{ id: "pop-3", name: "Two Thrones", duration: "3:55", bg: "#6b4a1a" }, { id: "pop-4", name: "Desert Winds", duration: "2:50", bg: "#1a3a2a" }]
  },
  {
    category: "Stranger Things",
    id: "st-music",
    items: [{ id: "st-1", name: "Upside Down", duration: "3:25", bg: "#1a0a1a" }, { id: "st-2", name: "Synth Wave", duration: "2:55", bg: "#0a1a1a" }],
    extraItems: [{ id: "st-3", name: "Hawkins", duration: "4:10", bg: "#0a0a1a" }, { id: "st-4", name: "Demogorgon", duration: "3:40", bg: "#0d0d0d" }]
  },
  {
    category: "Game of Thrones",
    id: "got-music",
    items: [{ id: "got-1", name: "Main Title", duration: "2:50", bg: "#1a1a2e" }, { id: "got-2", name: "Winter is Here", duration: "3:45", bg: "#5a0000" }],
    extraItems: [{ id: "got-3", name: "Rains of Castamere", duration: "4:20", bg: "#1e2d3a" }, { id: "got-4", name: "Dragonstone", duration: "3:15", bg: "#2a1a0a" }]
  }
];

const musicCategories = ["For you", "Explore", "Trending", "Saved"];

const moods = ['Curious', 'Vulnerable', 'Frustrated', 'Hopeful', 'Nostalgic'];
const moodStyles = {
  Curious: { border: 'rgba(77,144,215,0.4)', color: 'rgba(77,144,215,0.9)' },
  Vulnerable: { border: 'rgba(159,127,218,0.4)', color: 'rgba(159,127,218,0.9)' },
  Frustrated: { border: 'rgba(218,127,127,0.4)', color: 'rgba(218,127,127,0.9)' },
  Hopeful: { border: 'rgba(127,218,159,0.4)', color: 'rgba(127,218,159,0.9)' },
  Nostalgic: { border: 'rgba(218,184,127,0.4)', color: 'rgba(218,184,127,0.9)' },
};

const audiences = ['Everyone', 'Followers', 'Close friends'];

const ComposeStep = ({
  thoughtText,
  setThoughtText,
  audienceIndex,
  setAudienceIndex,
  selectedMood,
  setSelectedMood,
  isAnonymous,
  setIsAnonymous,
  selectedVibe,
  selectedMusic,
  onAddVibe,
  onNext,
  onCancel
}) => {
  const [showPreview, setShowPreview] = React.useState(false);
  const editorRef = React.useRef(null);
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);

  const stripHtml = (html) => {
    if (typeof document === 'undefined') return '';
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || "").trim().replace(/\n/g, "");
  };

  const plainText = stripHtml(thoughtText);
  const charCount = plainText.length;

  const handleCommand = (command) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, null);
      checkFormatState();
    }
  };

  const checkFormatState = () => {
    if (typeof document !== 'undefined') {
      setIsBold(document.queryCommandState('bold'));
      setIsItalic(document.queryCommandState('italic'));
    }
  };

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== thoughtText) {
      editorRef.current.innerHTML = thoughtText;
    }
  }, [thoughtText]);
  const circumference = 62.8; // 2 * pi * 10
  const dashoffset = Math.max(0, circumference - (charCount / 280) * circumference);
  const isRed = (280 - charCount) <= 10;
  const showNumber = (280 - charCount) <= 40;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col font-sans bg-[#0c0c10] text-white"
    >
      {/* Top Nav */}
      <div className="pt-12 pb-3 px-4 flex items-center justify-between shrink-0">
        <button onClick={onCancel} className="text-[14px] text-white/45 bg-transparent border-none p-0 focus:outline-none hover:text-white/60 transition-colors cursor-pointer">Cancel</button>
        <button
          onClick={() => charCount >= 3 && onNext()}
          disabled={charCount < 3}
          className={`px-[18px] py-[7px] rounded-[20px] text-[13px] font-semibold transition-opacity duration-200 ${charCount >= 3 ? 'opacity-100 bg-white text-[#0c0c10] cursor-pointer hover:bg-gray-200' : 'opacity-35 bg-white text-[#0c0c10] cursor-not-allowed'}`}
        >
          {selectedVibe && selectedMusic ? 'Post' : 'Next →'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto [scrollbar-width:none]">
        {/* Avatar + Compose Area */}
        <div className="px-4 flex gap-3 items-start mt-2">
          {/* Avatar */}
          <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2d1b4e] to-[#1a2a3a] flex items-center justify-center shrink-0 border border-white/5">
            <span className="text-[13px] font-medium text-white/70">A</span>
          </div>

          <div className="flex-1 flex flex-col min-w-0">
            {/* Audience Pill */}
            <button
              onClick={() => setAudienceIndex((audienceIndex + 1) % 3)}
              className="self-start rounded-[20px] px-[10px] py-[4px] pl-[8px] bg-white/5 border border-white/10 flex items-center gap-[5px] mb-[10px] hover:bg-white/10 transition-colors"
            >
              <div className="w-[7px] h-[7px] bg-white/80 rounded-full" />
              <span className="text-[11px] font-medium text-white/70">{audiences[audienceIndex]}</span>
              <ChevronDown size={10} className="text-white/40" />
            </button>

            {/* Text Input Box */}
            <div className="relative w-full h-[180px] bg-[rgba(255,255,255,0.03)] border border-white/5 rounded-2xl p-4 transition-colors focus-within:bg-[rgba(255,255,255,0.05)] focus-within:border-white/10 flex flex-col">
              {charCount === 0 && thoughtText === '' && (
                <div className="absolute top-4 left-4 text-white/20 text-[18px] pointer-events-none">
                  What's on your mind?
                </div>
              )}
              <div
                ref={editorRef}
                contentEditable
                onInput={(e) => {
                  setThoughtText(e.currentTarget.innerHTML);
                  checkFormatState();
                }}
                onKeyUp={checkFormatState}
                onMouseUp={checkFormatState}
                className="w-full flex-1 bg-transparent border-none outline-none text-white text-[18px] font-normal leading-[1.55] caret-white whitespace-pre-wrap break-words focus:outline-none [&_a]:text-blue-400 [&_a]:underline overflow-y-auto [scrollbar-width:none]"
              />
            </div>
            <div className="h-4 mt-1 mb-2">
              {charCount === 0 && (
                <span className="text-[11px] text-white/20 block">Ask something.</span>
              )}
            </div>
          </div>
        </div>

        {/* Mood Tags */}
        <div className="px-4 pt-[10px] flex gap-[6px] overflow-x-auto [scrollbar-width:none]">
          {moods.map(mood => {
            const isSelected = selectedMood === mood;
            const style = moodStyles[mood];
            return (
              <button
                key={mood}
                onClick={() => setSelectedMood(isSelected ? null : mood)}
                className="px-[12px] py-[5px] rounded-[20px] text-[11px] font-medium shrink-0 transition-all duration-200 cursor-pointer"
                style={isSelected ? {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)'
                } : {
                  backgroundColor: 'transparent',
                  color: style.color,
                  border: `1px solid ${style.border}`
                }}
              >
                {mood}
              </button>
            );
          })}
        </div>

        {/* Vibe Preview Strip */}
        <div className="mx-4 mt-3 p-[10px] px-[12px] rounded-[14px] border border-white/10 bg-[rgba(255,255,255,0.03)] flex gap-[10px] items-center">
          {/* Thumb */}
          <div
            onClick={() => {
              if (selectedVibe && selectedMusic) setShowPreview(true);
            }}
            className={`w-[36px] h-[48px] rounded-[7px] shrink-0 overflow-hidden relative ${selectedVibe && selectedMusic ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            style={{ backgroundColor: selectedVibe ? selectedVibe.bg : '#1a2a3a' }}
          >
            {selectedVibe?.img && <img src={selectedVibe.img} alt="vibe" className="absolute inset-0 w-full h-full object-cover" />}
          </div>

          <div className="flex-1 flex flex-col justify-center gap-[3px]">
            <div className="flex items-center gap-[6px]">
              <div className="w-[5px] h-[5px] rounded-full bg-[#4a8fd4]" />
              <span className="text-[11px] text-white/45 truncate">{selectedVibe ? selectedVibe.name : 'No image yet'}</span>
            </div>
            <div className="flex items-center gap-[6px] mt-[3px]">
              <div className="w-[5px] h-[5px] rounded-full bg-[#9f7fda]" />
              <span className="text-[11px] text-white/45 truncate">{selectedMusic ? selectedMusic.name : 'No sound yet'}</span>
            </div>
          </div>

          <button
            onClick={onAddVibe}
            className={`px-[10px] py-[4px] rounded-[20px] text-[11px] font-medium whitespace-nowrap transition-colors border cursor-pointer ${selectedVibe && selectedMusic ? 'bg-transparent border-white/5 text-white/30 hover:bg-white/5' : 'bg-[rgba(255,255,255,0.07)] border-white/10 text-white/55 hover:bg-[rgba(255,255,255,0.1)]'}`}
          >
            {selectedVibe && selectedMusic ? 'Vibe set ✓' : 'Add vibe →'}
          </button>
        </div>

        <div className="h-[0.5px] bg-[rgba(255,255,255,0.07)] mt-[14px]" />

        {/* Formatting Toolbar */}
        <div className="px-4 flex gap-[4px] items-center mt-2">
          <button
            onClick={() => handleCommand('bold')}
            className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors cursor-pointer border-none ${isBold ? 'bg-white/20 text-white' : 'bg-transparent text-white/45 hover:bg-white/10'}`}
          >
            <Bold size={18} strokeWidth={isBold ? 3 : 2} />
          </button>
          <button
            onClick={() => handleCommand('italic')}
            className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors cursor-pointer border-none ${isItalic ? 'bg-white/20 text-white' : 'bg-transparent text-white/45 hover:bg-white/10'}`}
          >
            <Italic size={18} strokeWidth={isItalic ? 3 : 2} />
          </button>
          <button className="w-[36px] h-[36px] rounded-full flex items-center justify-center hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer bg-transparent border-none">
            <Link size={18} className="text-white/45" strokeWidth={2} />
          </button>
          <div className="w-[1px] h-[20px] bg-[rgba(255,255,255,0.08)] mx-[4px]" />
          <button className="w-[36px] h-[36px] rounded-full flex items-center justify-center hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer bg-transparent border-none">
            <AtSign size={18} className="text-white/45" strokeWidth={2} />
          </button>
          <button className="w-[36px] h-[36px] rounded-full flex items-center justify-center hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer bg-transparent border-none">
            <Hash size={18} className="text-white/45" strokeWidth={2} />
          </button>

          <div className="flex-1" />

          {/* Character Ring */}
          <div className="w-[26px] h-[26px] relative flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 26 26" className="-rotate-90">
              <circle cx="13" cy="13" r="10" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle
                cx="13" cy="13" r="10"
                stroke={isRed ? "rgba(218,80,80,0.8)" : "rgba(255,255,255,0.5)"}
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.2s ease-out, stroke 0.2s ease-out' }}
              />
            </svg>
            {showNumber && (
              <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-medium ${isRed ? 'text-[rgba(218,80,80,0.9)]' : 'text-[rgba(255,255,255,0.5)]'}`}>
                {280 - charCount}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Area */}
        <div className="border-t-[0.5px] border-[rgba(255,255,255,0.07)] px-4 pt-[10px] pb-[24px] mt-[12px] flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <div
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`w-[36px] h-[20px] rounded-[20px] relative cursor-pointer transition-colors duration-200 ${isAnonymous ? 'bg-[rgba(255,255,255,0.35)]' : 'bg-[rgba(255,255,255,0.1)]'}`}
            >
              <motion.div
                animate={{ left: isAnonymous ? 18 : 2 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[2px] w-[16px] h-[16px] bg-white rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] text-white/40 leading-tight mb-[2px]">Post anonymously</span>
              <span className="text-[11px] text-white/20 leading-tight">Others won't see your name</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reel Preview Overlay */}
      <AnimatePresence>
        {showPreview && selectedVibe && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-[#0c0c10] overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${selectedVibe.img}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

            {/* Header / Close button */}
            <div className="absolute top-12 left-5 right-5 flex justify-between items-center text-white z-50 pointer-events-auto">
              <span className="font-bold text-base shadow-sm">Preview</span>
              <button
                onClick={(e) => { e.stopPropagation(); setShowPreview(false); }}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 cursor-pointer hover:bg-black/60 transition-colors"
              >
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Question Sticker */}
            <div className="absolute inset-0 flex items-center justify-center z-20 px-6 pointer-events-none">
              <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl p-5 rounded-3xl border border-white/40 shadow-2xl inline-flex flex-col items-center text-center w-full max-w-xs relative overflow-hidden pointer-events-auto">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <p className="text-white text-[18px] leading-relaxed font-medium tracking-tight drop-shadow-md">
                  {thoughtText ? (
                    <span dangerouslySetInnerHTML={{ __html: thoughtText }} className="[&_b]:font-black [&_i]:italic [&_a]:text-blue-300 [&_a]:underline" />
                  ) : (
                    "What's on your mind?"
                  )}
                </p>
                {selectedMood && (
                  <div className="w-full mt-5 flex justify-start">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 bg-black/20 px-2.5 py-1.5 rounded-sm border border-white/5 shadow-inner">
                      <div className="w-1 h-1 bg-white/30 rounded-full" />
                      {selectedMood}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="absolute right-4 bottom-8 flex flex-col items-center z-20">
              {/* Spinning CD */}
              <div className="relative flex justify-center w-12 h-12 pointer-events-none">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-11 h-11 rounded-full border-[2px] border-white/20 bg-[#1a1a1a] flex items-center justify-center shadow-lg overflow-hidden relative">
                  <Music size={14} className="text-white z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
                </motion.div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

const VibeCard = ({ item, isSelected, onToggle, className }) => {
  return (
    <div
      onClick={() => onToggle(item)}
      className={`relative rounded-xl overflow-hidden cursor-pointer transition-transform active:scale-[0.98] ${className}`}
      style={{ backgroundColor: item.bg }}
    >
      {/* Real image layer */}
      {item.img && (
        <img
          src={item.img}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,${item.isLight ? '0.55' : '0.70'}) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)`
        }}
      />
      <span className="absolute bottom-[9px] left-[10px] text-[11px] font-semibold text-white drop-shadow-sm">{item.name}</span>

      {isSelected && (
        <>
          <div className="absolute inset-0 rounded-xl border-2 border-white pointer-events-none" />
          <div className={`absolute top-2 left-2 w-5 h-5 rounded-full ${item.isLight ? 'bg-[#0c0c10]' : 'bg-white'} flex items-center justify-center shadow-md`}>
            <Check size={12} strokeWidth={3} className={item.isLight ? 'text-white' : 'text-[#0c0c10]'} />
          </div>
        </>
      )}
    </div>
  )
};

const SelectorStep = ({
  stepId,
  title,
  data,
  categories,
  selectedItem,
  onSelect,
  onNext,
  onBack,
  bottomLabel
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedCategories, setExpandedCategories] = useState({});

  const handleCategoryExpand = (catId) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const handleToggle = (item) => {
    if (selectedItem?.id === item.id) {
      onSelect(null);
    } else {
      onSelect(item);
    }
  };

  const visibleData = activeCategory === 'All'
    ? data
    : data.filter(d => d.category === activeCategory);

  return (
    <motion.div
      key={stepId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col font-sans"
    >
      {/* Dynamic Island Mockup */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-3">
        <div className="w-2 h-2 bg-green-500 rounded-full opacity-0" />
        <div className="w-2 h-2 bg-white/20 rounded-full" />
      </div>

      {/* Top Navigation Bar */}
      <div className="pt-12 pb-3 px-4 flex items-center justify-between z-10 shrink-0">
        <button
          onClick={onBack}
          className="w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-white font-medium text-[15px]">{title}</h3>
        <button
          onClick={() => selectedItem && onNext()}
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 ${selectedItem ? 'bg-white border-white cursor-pointer' : 'bg-transparent border-[1.5px] border-white/15 cursor-default'}`}
        >
          <Check size={18} strokeWidth={selectedItem ? 3 : 2} className={selectedItem ? 'text-[#0c0c10]' : 'text-white/30'} />
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="w-full overflow-x-auto [scrollbar-width:none] shrink-0 mb-2">
        <div className="flex gap-2 px-4 pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-[14px] py-[7px] text-[12px] font-medium transition-colors ${activeCategory === cat
                ? 'bg-white text-[#0c0c10]'
                : 'bg-white/5 text-white/55 border border-white/10 hover:bg-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Image Grid */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] px-4 pb-4">
        <div className="flex flex-col gap-6">
          {visibleData.map(section => (
            <div key={section.id} className="flex flex-col relative pb-6">
              <h4 className="text-[10px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-[10px]">
                {section.category}
              </h4>

              {/* Standard 9:16 Layout for all categories */}
              <div className="grid grid-cols-3 gap-2">
                {section.items.map(item => (
                  <VibeCard key={item.id} item={item} isSelected={selectedItem?.id === item.id} onToggle={handleToggle} className="aspect-[9/16]" />
                ))}
              </div>

              {/* Expanded Items */}
              <AnimatePresence>
                {expandedCategories[section.id] && section.extraItems && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-2"
                  >
                    <div className="grid grid-cols-3 gap-2 pb-8">
                      {section.extraItems.map(item => (
                        <VibeCard
                          key={item.id}
                          item={item}
                          isSelected={selectedItem?.id === item.id}
                          onToggle={handleToggle}
                          className="aspect-[9/16]"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dropdown Blur Overlay */}
              {section.extraItems && (
                <div className={`absolute bottom-0 inset-x-0 flex items-end justify-center transition-all duration-300 pointer-events-none ${expandedCategories[section.id] ? 'h-10 bg-transparent pb-0' : 'h-24 bg-gradient-to-t from-[#0c0c10] via-[#0c0c10]/80 to-transparent pb-2 backdrop-blur-[1px]'}`}>
                  <button
                    onClick={() => handleCategoryExpand(section.id)}
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 pointer-events-auto shadow-lg hover:bg-white/20 transition-colors"
                  >
                    {expandedCategories[section.id] ? (
                      <ChevronUp size={16} className="text-white/80" />
                    ) : (
                      <ChevronDown size={16} className="text-white/80" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t-[0.5px] border-white/10 px-4 pt-[10px] pb-[22px] flex items-center gap-3 shrink-0 bg-[#0c0c10]">
        <div
          className="w-[36px] h-[36px] rounded-lg border border-white/10 transition-all duration-300"
          style={{
            backgroundColor: selectedItem ? selectedItem.bg : 'transparent',
            opacity: selectedItem ? 1 : 0.3
          }}
        />
        <div className="flex flex-col flex-1 justify-center">
          <span className="text-[10px] text-white/35 leading-tight">{bottomLabel}</span>
          {selectedItem ? (
            <span className="text-[13px] font-medium text-white leading-tight mt-[2px]">{selectedItem.name}</span>
          ) : (
            <span className="text-[12px] text-white/30 italic leading-tight mt-[2px]">None selected</span>
          )}
        </div>
        <button
          onClick={() => selectedItem && onNext()}
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${selectedItem ? 'bg-white border-white cursor-pointer' : 'bg-transparent border-[1.5px] border-white/15 cursor-default'}`}
        >
          <Check size={18} strokeWidth={selectedItem ? 3 : 2} className={selectedItem ? 'text-[#0c0c10]' : 'text-white/30'} />
        </button>
      </div>

    </motion.div>
  );
};

const MusicStep = ({
  stepId,
  selectedVibe,
  selectedVibeCategory,
  data,
  categories,
  selectedMusic,
  onSelectMusic,
  onNext,
  onBack
}) => {
  const [activeCategory, setActiveCategory] = useState('For you');
  const [expandedCategories, setExpandedCategories] = useState({});

  const handleCategoryExpand = (catId) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  let visibleData = data;
  if (activeCategory === 'For you') {
    visibleData = data.filter(d => d.category === selectedVibeCategory);
    if (visibleData.length === 0) visibleData = [data[0]];
  } else if (activeCategory === 'Explore') {
    visibleData = data;
  } else if (activeCategory === 'Trending') {
    visibleData = [...data].reverse().slice(0, 4);
  } else if (activeCategory === 'Saved') {
    visibleData = data.slice(0, 2);
  }

  const renderMusicItem = (item, sectionCategory) => {
    const isSelected = selectedMusic?.id === item.id;
    return (
      <div
        key={item.id}
        onClick={() => onSelectMusic(isSelected ? null : item)}
        className={`relative flex items-center p-2 rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-white/5' : 'hover:bg-white/5'
          }`}
      >
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 mr-3"
          style={{ backgroundColor: item.bg }}
        >
          {isSelected ? (
            <div className="flex items-end justify-center gap-[2px] h-4 w-4">
              <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-white rounded-full" />
              <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 bg-white rounded-full" />
              <motion.div animate={{ height: [6, 14, 6] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1 bg-white rounded-full" />
            </div>
          ) : (
            <Play size={20} className="text-white/80 ml-1" fill="currentColor" />
          )}
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-[13px] font-semibold text-white mb-0.5">{item.name}</span>
          <span className="text-[11px] text-white/40">{item.category || sectionCategory} • {item.duration}</span>
        </div>
        <div className="flex items-center gap-3 pr-2">
          <Activity size={14} className={isSelected ? 'text-white' : 'text-white/20'} />
          {isSelected ? (
            <CircleDot size={18} className="text-white" />
          ) : (
            <Circle size={18} className="text-white/20" />
          )}
        </div>

        {/* Active Progress Bar Simulator */}
        {isSelected && (
          <div className="absolute bottom-0 left-[68px] right-[40px] h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 30, ease: "linear" }}
              className="h-full bg-white/80"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      key={stepId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col font-sans bg-[#0c0c10]"
    >
      {/* Dynamic Island Mockup */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-3">
        <div className="w-2 h-2 bg-green-500 rounded-full opacity-0" />
        <div className="w-2 h-2 bg-white/20 rounded-full" />
      </div>

      {/* Top Navigation Bar */}
      <div className="pt-12 pb-3 px-4 flex items-center justify-between z-10 shrink-0">
        <button
          onClick={onBack}
          className="w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-white font-medium text-[15px]">Add a sound</h3>
        <button
          onClick={() => selectedMusic && onNext()}
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 ${selectedMusic ? 'bg-white/10 border-transparent cursor-pointer' : 'bg-transparent border-[1.5px] border-white/15 cursor-default'}`}
        >
          <Check size={18} strokeWidth={selectedMusic ? 2 : 2} className={selectedMusic ? 'text-white' : 'text-white/30'} />
        </button>
      </div>

      {/* Selected Image Banner */}
      <div className="flex items-center gap-3 py-2 px-4 shrink-0">
        <div
          className="w-12 h-16 rounded-md bg-white/10 overflow-hidden relative"
          style={{ backgroundColor: selectedVibe?.bg }}
        >
          {selectedVibe?.img && (
            <img src={selectedVibe.img} alt="vibe" className="absolute inset-0 w-full h-full object-cover" />
          )}
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-[10px] text-white/40 uppercase tracking-wide font-semibold mb-0.5">Your image</span>
          <span className="text-[14px] text-white font-medium">{selectedVibe?.name || "None"}</span>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <span className="text-[11px] text-white/50">{selectedMusic ? 'Sound selected' : 'No sound yet'}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-2 shrink-0">
        <div className="bg-white/10 rounded-xl h-9 flex items-center px-3 gap-2">
          <Search size={14} className="text-white/40" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-white text-[13px] w-full placeholder:text-white/40"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="w-full overflow-x-auto [scrollbar-width:none] shrink-0 mt-3 mb-2">
        <div className="flex gap-2 px-4 pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-[14px] py-[7px] text-[12px] font-medium transition-colors ${activeCategory === cat
                ? 'bg-white text-[#0c0c10]'
                : 'bg-white/5 text-white/55 border border-white/10 hover:bg-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Audio List View */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] px-4 pb-4">
        <div className="flex flex-col gap-6">
          {visibleData.map(section => (
            <div key={section.id} className="flex flex-col relative pb-4">
              <h4 className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/30 mb-3 ml-1">
                {section.category}
              </h4>
              <div className="flex flex-col gap-1 relative z-0">
                {section.items.map(item => renderMusicItem(item, section.category))}

                {/* Expanded Items */}
                <AnimatePresence>
                  {expandedCategories[section.id] && section.extraItems && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden flex flex-col gap-1"
                    >
                      {section.extraItems.map(item => renderMusicItem(item, section.category))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dropdown Blur Overlay */}
              {section.extraItems && (
                <div className={`absolute bottom-0 inset-x-0 flex items-end justify-center transition-all duration-300 pointer-events-none ${expandedCategories[section.id] ? 'h-10 bg-transparent pb-0 relative mt-2 z-10' : 'h-24 bg-gradient-to-t from-[#0c0c10] via-[#0c0c10]/80 to-transparent pb-2 backdrop-blur-[1px] z-10'}`}>
                  <button
                    onClick={() => handleCategoryExpand(section.id)}
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 pointer-events-auto shadow-lg hover:bg-white/20 transition-colors"
                  >
                    {expandedCategories[section.id] ? (
                      <ChevronUp size={16} className="text-white/80" />
                    ) : (
                      <ChevronDown size={16} className="text-white/80" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Volume Control */}
      <div className="px-6 py-4 flex items-center gap-3 shrink-0">
        <Volume1 size={14} className="text-white/40" />
        <div className="flex-1 h-1 bg-white/10 rounded-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-white rounded-full">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow" />
          </div>
        </div>
        <Volume2 size={14} className="text-white/40" />
      </div>

      {/* Bottom Strip */}
      <div className="border-t-[0.5px] border-white/10 px-4 pt-[10px] pb-[22px] flex items-center gap-3 shrink-0 bg-[#0c0c10]">
        <div
          className="w-[36px] h-[36px] rounded-lg border border-white/10 transition-all duration-300 flex items-center justify-center overflow-hidden bg-white/5"
        >
          {selectedMusic ? (
            <div className="w-full h-full" style={{ backgroundColor: selectedMusic.bg }} />
          ) : (
            <Music size={16} className="text-white/20" />
          )}
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <span className="text-[10px] text-white/35 leading-tight">Sound</span>
          {selectedMusic ? (
            <span className="text-[13px] font-medium text-white leading-tight mt-[2px]">{selectedMusic.name}</span>
          ) : (
            <span className="text-[12px] text-white/30 italic leading-tight mt-[2px]">None selected</span>
          )}
        </div>
        <button
          onClick={() => selectedMusic && onNext()}
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${selectedMusic ? 'bg-white cursor-pointer' : 'bg-transparent border-[1.5px] border-white/15 cursor-default'}`}
        >
          <Check size={18} strokeWidth={selectedMusic ? 3 : 2} className={selectedMusic ? 'text-[#0c0c10]' : 'text-white/30'} />
        </button>
      </div>

    </motion.div>
  );
};

const LoginStep = ({ onNext }) => {
  React.useEffect(() => {
    window.showScreen = (step) => {
      if (step === 1 || step === 'compose') onNext();
    };

    if (!document.getElementById('login-styles')) {
      const style = document.createElement('style');
      style.id = 'login-styles';
      style.innerHTML = `
        .otp-box {
          flex: 1;
          height: 52px;
          background: rgba(255,255,255,0.03);
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
          user-select: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .otp-box.active {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
          position: relative;
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .otp-box.active::after {
          content: "";
          position: absolute;
          width: 2px;
          height: 24px;
          background-color: #fff;
          animation: blinkCursor 1s step-end infinite;
          border-radius: 2px;
        }
        .otp-box.filled {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.3);
        }
        .otp-box.err {
          border-color: rgba(255,77,77,0.6);
          background: rgba(255,77,77,0.1);
          color: #ff4d4d;
        }
        .otp-box.ok {
          border-color: rgba(212,245,106,0.5);
          color: #d4f56a;
        }

        @keyframes conffall {
          0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
        }
        @keyframes loginShake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-5px); }
          40%     { transform: translateX(5px); }
          60%     { transform: translateX(-3px); }
          80%     { transform: translateX(3px); }
        }
        .do-shake {
          animation: loginShake 0.35s ease;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    if (!document.getElementById('login-script')) {
      const script = document.createElement('script');
      script.id = 'login-script';
      script.innerHTML = `
        (function() {

        var loginPhone = '';
        var loginOtp = '';
        var loginAttempts = 0;
        var loginResendSecs = 30;
        var loginResendInterval = null;
        var loginBlinkInterval = null;
        var loginCatState = 'idle';
        var loginTailInterval = null;
        /* Removed unused country variables */

        function lq(id) { return document.getElementById(id); }

        /* ── INIT ── */
        window.loginInit = function() {
          loginSetCatState('idle');
          setTimeout(function(){ loginWagTail(1); }, 800);
          loginStartBlink();
        };

        window.loginCleanup = function() {
          if (loginResendInterval) clearInterval(loginResendInterval);
          if (loginBlinkInterval) clearInterval(loginBlinkInterval);
          if (loginTailInterval) clearInterval(loginTailInterval);
        };

        /* Removed unused country toggle function */

        /* ── PHONE INPUT ── */
        window.onPhoneInput = function() {
          var raw = lq('phoneInput').value.replace(/\\D/g,'');
          loginPhone = raw;
          lq('phoneErr').style.display = 'none';
          loginSetPhoneBorder('focused');
          var btn = lq('sendOtpBtn');
          if (raw.length === 10) {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
          } else {
            btn.style.opacity = '0.3';
            btn.style.pointerEvents = 'none';
          }
          loginSetCatState('looking');
        };

        window.onPhoneFocus = function() {
          loginSetPhoneBorder('focused');
          loginSetCatState('looking');
        };

        window.onPhoneBlur = function() {
          if (loginPhone.length > 0 && loginPhone.length !== 10) {
            loginSetPhoneBorder('error');
            lq('phoneErr').style.display = 'flex';
            loginSetCatState('sad');
          } else if (loginPhone.length === 10) {
            loginSetPhoneBorder('success');
          } else {
            loginSetPhoneBorder('default');
          }
        };

        function loginSetPhoneBorder(state) {
          var row = lq('phoneRow');
          var map = {
            default: 'rgba(255,255,255,0.12)',
            focused: 'rgba(255,255,255,0.4)',
            error:   'rgba(255,77,77,0.6)',
            success: 'rgba(212,245,106,0.5)'
          };
          var bgMap = {
            default: 'rgba(255,255,255,0.04)',
            focused: 'rgba(255,255,255,0.08)',
            error:   'rgba(255,77,77,0.08)',
            success: 'rgba(212,245,106,0.05)'
          };
          row.style.borderColor = map[state] || map.default;
          row.style.background  = bgMap[state] || bgMap.default;
        }

        /* ── SEND OTP ── */
        window.sendOtp = function() {
          if (loginPhone.length < 10) {
            lq('phoneErr').style.display = 'flex';
            loginSetPhoneBorder('error');
            loginShakeEl('phoneRow');
            loginSetCatState('sad');
            return;
          }
          var btn = lq('sendOtpBtn');
          btn.innerHTML = '<div style="width:14px;height:14px;border:2px solid rgba(0,0,0,0.15);border-top-color:#0c0c10;border-radius:50%;animation:spin 0.7s linear infinite;"></div> Sending...';
          btn.style.opacity = '0.7';
          btn.style.pointerEvents = 'none';
          loginSetCatState('hiding');
          setTimeout(function() {
            loginShowSubStep('B');
            var masked = loginPhone.slice(0,5) + ' •••••';
            lq('maskedNum').textContent = 'Sent to ' + masked + ' via SMS';
            loginSetCatState('peeking');
            loginStartResendTimer();
            focusOtp();
          }, 300);
        };

        /* ── OTP INPUT ── */
        window.focusOtp = function() { if(lq('otpHidden')) lq('otpHidden').focus(); };

        window.onOtpFocus = function() {
          var raw = lq('otpHidden').value.toString().replace(/\\D/g,'').slice(0,6);
          for (var i = 0; i < 6; i++) {
            var b = lq('ob' + i);
            if (i === raw.length) { b.classList.add('active'); } else { b.classList.remove('active'); }
          }
        };

        window.onOtpBlur = function() {
          for (var i = 0; i < 6; i++) {
            var b = lq('ob' + i);
            if (b) b.classList.remove('active');
          }
        };

        window.onOtpInput = function() {
          var raw = lq('otpHidden').value.toString().replace(/\\D/g,'').slice(0,6);
          lq('otpHidden').value = raw;
          loginOtp = raw;
          for (var i = 0; i < 6; i++) {
            var b = lq('ob' + i);
            b.className = 'otp-box';
            b.textContent = '';
            if (i < raw.length) { b.classList.add('filled'); b.textContent = '•'; }
            if (i === raw.length && document.activeElement === lq('otpHidden')) { b.classList.add('active'); }
          }
          lq('otpErr').style.display = 'none';
          var vBtn = lq('verifyBtn');
          if (raw.length === 6) {
            vBtn.style.opacity = '1';
            vBtn.style.pointerEvents = 'auto';
          } else {
            vBtn.style.opacity = '0.3';
            vBtn.style.pointerEvents = 'none';
          }
          loginSetCatState(raw.length > 0 ? 'covering' : 'peeking');
        };

        window.onOtpKey = function(e) {
          if (e.key === 'Enter' && loginOtp.length === 6) verifyOtp();
        };

        /* ── VERIFY OTP ── */
        window.verifyOtp = function() {
          if (loginOtp.length < 6) return;
          var btn = lq('verifyBtn');
          btn.innerHTML = '<div style="width:14px;height:14px;border:2px solid rgba(0,0,0,0.15);border-top-color:#0c0c10;border-radius:50%;animation:spin 0.7s linear infinite;"></div> Verifying...';
          btn.style.opacity = '0.7';
          btn.style.pointerEvents = 'none';

          setTimeout(function() {
            if (loginOtp === '123456') {
              for (var i=0;i<6;i++) { lq('ob'+i).className='otp-box ok'; }
              loginSetCatState('success');
              setTimeout(function() { loginGoToApp(); }, 300);
            } else {
              loginAttempts++;
              for (var i=0;i<6;i++) { lq('ob'+i).className='otp-box err'; }
              loginShakeEl('otpBoxRow');
              var msg = loginAttempts >= 3
                ? 'Too many attempts. Request a new code.'
                : 'Incorrect code. ' + (3 - loginAttempts) + ' attempt' + (loginAttempts < 2 ? 's' : '') + ' remaining.';
              lq('otpErrTxt').textContent = msg;
              lq('otpErr').style.display = 'flex';
              loginSetCatState('shocked');
              btn.innerHTML = 'Verify';
              btn.style.opacity = loginOtp.length === 6 ? '1' : '0.3';
              btn.style.pointerEvents = loginOtp.length === 6 ? 'auto' : 'none';
              if (loginAttempts >= 3) { loginClearOtp(); loginAttempts = 0; }
            }
          }, 300);
        };

        function loginClearOtp() {
          lq('otpHidden').value = '';
          loginOtp = '';
          for (var i=0;i<6;i++) { var b=lq('ob'+i); b.className='otp-box'; b.textContent=''; }
          lq('verifyBtn').style.opacity = '0.3';
          lq('verifyBtn').style.pointerEvents = 'none';
        }

        /* ── RESEND ── */
        window.resendOtp = function() {
          loginClearOtp();
          lq('otpErr').style.display = 'none';
          loginAttempts = 0;
          loginStartResendTimer();
          loginSetCatState('peeking');
          focusOtp();
        };

        function loginStartResendTimer() {
          loginResendSecs = 30;
          lq('resendBtn').style.color = 'rgba(255,255,255,0.25)';
          lq('resendBtn').style.pointerEvents = 'none';
          if (loginResendInterval) clearInterval(loginResendInterval);
          loginResendInterval = setInterval(function() {
            loginResendSecs--;
            var m = Math.floor(loginResendSecs/60);
            var s = loginResendSecs % 60;
            if(lq('resendTimer')) lq('resendTimer').textContent = loginResendSecs > 0
              ? 'Resend in ' + m + ':' + (s<10?'0':'') + s
              : 'Code expired';
            if (loginResendSecs <= 0) {
              clearInterval(loginResendInterval);
              if(lq('resendBtn')) {
                lq('resendBtn').style.color = 'rgba(255,255,255,0.6)';
                lq('resendBtn').style.pointerEvents = 'auto';
              }
            }
          }, 1000);
        }

        /* ── BACK ── */
        window.goBackToPhone = function() {
          loginShowSubStep('A');
          loginClearOtp();
          lq('otpErr').style.display = 'none';
          lq('sendOtpBtn').innerHTML = 'Send OTP';
          lq('sendOtpBtn').style.opacity = loginPhone.length === 10 ? '1' : '0.3';
          lq('sendOtpBtn').style.pointerEvents = loginPhone.length === 10 ? 'auto' : 'none';
          if (loginResendInterval) clearInterval(loginResendInterval);
          loginSetCatState('idle');
        };

        /* ── SUB-STEP VISIBILITY ── */
        function loginShowSubStep(step) {
          if(lq('loginStepA')) lq('loginStepA').style.display = step === 'A' ? 'block' : 'none';
          if(lq('loginStepB')) lq('loginStepB').style.display = step === 'B' ? 'block' : 'none';
          if(lq('loginStepC')) lq('loginStepC').style.display = step === 'C' ? 'flex'  : 'none';
        }

        /* ── GO TO APP (after login) ── */
        function loginGoToApp() {
          if (window.showScreen) {
            window.showScreen(1); 
          }
        }

        /* ── SHAKE UTILITY ── */
        function loginShakeEl(id) {
          var el = lq(id);
          if(!el) return;
          el.classList.remove('do-shake');
          void el.offsetWidth;
          el.classList.add('do-shake');
          setTimeout(function(){ el.classList.remove('do-shake'); }, 400);
        }

        /* ── CAT STATE MACHINE ── */
        function loginSetCatState(state) {
          loginCatState = state;
          var cl = lq('coverLeft');
          var cr = lq('coverRight');
          var cl_show = (state === 'hiding' || state === 'covering');
          if(cl) cl.style.display = cl_show ? 'block' : 'none';
          if(cr) cr.style.display = cl_show ? 'block' : 'none';
          if (loginBlinkInterval) clearInterval(loginBlinkInterval);
          if (state === 'idle' || state === 'peeking' || state === 'success') {
            loginStartBlink();
          }
          if (state === 'peeking') { loginWagTail(1); }
          if (state === 'success') {
            loginWagTail(8);
            loginShowHeart();
            if(lq('catPaw')) lq('catPaw').style.display = 'block';
            setTimeout(function(){ if(lq('catPaw')) lq('catPaw').style.display='none'; }, 2000);
          }
        }

        /* ── BLINK ── */
        function loginStartBlink() {
          loginBlinkInterval = setInterval(loginBlinkOnce, 2800 + Math.random()*2000);
        }
        function loginBlinkOnce() {
          if(lq('blinkLeft')) lq('blinkLeft').style.display  = 'block';
          if(lq('blinkRight')) lq('blinkRight').style.display = 'block';
          setTimeout(function(){
            if(lq('blinkLeft')) lq('blinkLeft').style.display  = 'none';
            if(lq('blinkRight')) lq('blinkRight').style.display = 'none';
          }, 120);
        }

        /* ── WAG TAIL ── */
        function loginWagTail(cycles) {
          if (loginTailInterval) clearInterval(loginTailInterval);
          var count = 0, max = cycles * 2;
          loginTailInterval = setInterval(function() {
            count++;
            if(lq('catTail')) lq('catTail').style.transform = count % 2 === 0 ? 'rotate(15deg)' : 'rotate(-15deg)';
            if (count >= max) {
              clearInterval(loginTailInterval);
              if(lq('catTail')) lq('catTail').style.transform = 'rotate(0deg)';
            }
          }, 140);
        }

        /* ── HEART FLOAT ── */
        function loginShowHeart() {
          var h = lq('catHeart');
          if(!h) return;
          h.style.display   = 'block';
          h.style.opacity   = '1';
          h.style.transform = 'translateY(0px)';
          var start = null;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / 1200, 1);
            h.style.opacity   = p < 0.5 ? (p*2).toFixed(2) : ((1-p)*2).toFixed(2);
            h.style.transform = 'translateY(' + (-p*12) + 'px)';
            if (p < 1) requestAnimationFrame(step);
            else { h.style.display='none'; h.style.opacity='0'; }
          }
          requestAnimationFrame(step);
        }

        /* ── CAT PAT (tap the cat) ── */
        window.catPat = function() {
          loginShowHeart();
          loginBlinkOnce();
          loginWagTail(1);
        };

        /* ── CONFETTI ── */
        function loginShowConfetti() {
          var wrap = lq('confettiWrap');
          if(!wrap) return;
          wrap.innerHTML = '';
          var colors = ['#d4f56a','#e8a0a8','#a0c8e8','#f0c070','#a8e8c0','#e8a0f0'];
          for (var i = 0; i < 14; i++) {
            var d = document.createElement('div');
            var size = 5 + Math.random()*4;
            d.style.cssText = [
              'position:absolute',
              'width:'+size+'px',
              'height:'+size+'px',
              'border-radius:50%',
              'background:'+colors[i%colors.length],
              'left:'+(10+Math.random()*160)+'px',
              'top:0px',
              'opacity:0',
              'animation:conffall '+(0.8+Math.random()*0.6)+'s '+(Math.random()*0.4)+'s ease-out forwards'
            ].join(';');
            wrap.appendChild(d);
          }
        }

        })();
      `;
      document.body.appendChild(script);
    }

    // Call init when component mounts
    if (window.loginInit) {
      window.loginInit();
    }

    return () => {
      if (window.loginCleanup) {
        window.loginCleanup();
      }
    };
  }, [onNext]);

  return (
    <motion.div
      key="step-login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col font-sans"
      dangerouslySetInnerHTML={{
        __html: `
        <div id="screen-login" style="background:#0c0c10; height:100%; overflow-y:auto; padding:60px 16px 24px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:flex-start;">
          <!-- CAT SVG -->
          <div id="catWrap" style="position:relative; margin-bottom:16px;">
            <svg id="catSvg" viewBox="0 0 120 120" width="100" height="100" style="cursor:pointer; display:block;" onclick="catPat()">

              <!-- TAIL -->
              <g id="catTail" style="transform-origin:30px 95px; transform:rotate(0deg);">
                <path d="M30 95 Q10 85 15 70 Q20 55 35 60" fill="none" stroke="#c8a882" stroke-width="9" stroke-linecap="round"/>
              </g>

              <!-- BODY -->
              <ellipse cx="60" cy="80" rx="32" ry="28" fill="#d4b896"/>
              <ellipse cx="60" cy="80" rx="20" ry="18" fill="#f0dcc8"/>

              <!-- EARS -->
              <g id="catLeftEar" style="transform-origin:38px 52px;">
                <path d="M38 52 L28 30 L52 44 Z" fill="#d4b896"/>
                <path d="M38 52 L33 38 L48 47 Z" fill="#e8a0a8"/>
              </g>
              <g id="catRightEar" style="transform-origin:82px 52px;">
                <path d="M82 52 L92 30 L68 44 Z" fill="#d4b896"/>
                <path d="M82 52 L87 38 L72 47 Z" fill="#e8a0a8"/>
              </g>

              <!-- HEAD -->
              <ellipse cx="60" cy="68" rx="28" ry="22" fill="#d4b896"/>
              <ellipse cx="60" cy="68" rx="18" ry="14" fill="#f0dcc8"/>

              <!-- LEFT EYE -->
              <g id="catEyeLeft">
                <ellipse cx="47" cy="63" rx="7" ry="7.5" fill="#2a1a0a"/>
                <ellipse cx="47" cy="63" rx="5" ry="5.5" fill="#1a0a00"/>
                <circle cx="50" cy="60" r="2" fill="white" opacity="0.9"/>
                <ellipse id="blinkLeft" cx="47" cy="63" rx="7" ry="0.5" fill="#d4b896" style="display:none;"/>
              </g>

              <!-- RIGHT EYE -->
              <g id="catEyeRight">
                <ellipse cx="73" cy="63" rx="7" ry="7.5" fill="#2a1a0a"/>
                <ellipse cx="73" cy="63" rx="5" ry="5.5" fill="#1a0a00"/>
                <circle cx="76" cy="60" r="2" fill="white" opacity="0.9"/>
                <ellipse id="blinkRight" cx="73" cy="63" rx="7" ry="0.5" fill="#d4b896" style="display:none;"/>
              </g>

              <!-- EYE COVERS (paws over eyes) -->
              <path id="coverLeft" d="M34 54 Q47 48 60 54 Q47 70 34 54Z" fill="#b89070" style="display:none;"/>
              <path id="coverRight" d="M60 54 Q73 48 86 54 Q73 70 60 54Z" fill="#b89070" style="display:none;"/>

              <!-- NOSE -->
              <ellipse cx="60" cy="74" rx="5" ry="3.5" fill="#e8a0a8"/>

              <!-- MOUTH -->
              <path d="M60 77.5 Q53 82 48 80" fill="none" stroke="#8a6050" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M60 77.5 Q67 82 72 80" fill="none" stroke="#8a6050" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M60 77.5 L60 80" fill="none" stroke="#8a6050" stroke-width="1.3" stroke-linecap="round"/>

              <!-- WHISKERS -->
              <line x1="45" y1="72" x2="22" y2="67" stroke="#8a6050" stroke-width="1" opacity="0.6"/>
              <line x1="45" y1="74" x2="22" y2="74" stroke="#8a6050" stroke-width="1" opacity="0.6"/>
              <line x1="45" y1="76" x2="22" y2="81" stroke="#8a6050" stroke-width="1" opacity="0.6"/>
              <line x1="75" y1="72" x2="98" y2="67" stroke="#8a6050" stroke-width="1" opacity="0.6"/>
              <line x1="75" y1="74" x2="98" y2="74" stroke="#8a6050" stroke-width="1" opacity="0.6"/>
              <line x1="75" y1="76" x2="98" y2="81" stroke="#8a6050" stroke-width="1" opacity="0.6"/>

              <!-- PAW (success state) -->
              <g id="catPaw" style="display:none; transform-origin:28px 95px;">
                <ellipse cx="28" cy="95" rx="10" ry="7" fill="#d4b896"/>
                <ellipse cx="24" cy="97" rx="4" ry="3" fill="#f0dcc8"/>
                <ellipse cx="32" cy="97" rx="4" ry="3" fill="#f0dcc8"/>
              </g>

              <!-- HEART (floating, pat/success) -->
              <text id="catHeart" x="60" y="30" text-anchor="middle" font-size="16" fill="#e8a0a8" style="display:none; opacity:0;">♥</text>

            </svg>

            <!-- CONFETTI CONTAINER -->
            <div id="confettiWrap" style="position:absolute; top:0; left:50%; transform:translateX(-50%); width:180px; height:60px; pointer-events:none; overflow:visible;"></div>
          </div>

          <!-- PREMIUM CONTAINER FOR STEPS -->
          <div style="width:100%; max-width:320px; background:rgba(255,255,255,0.02); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,0.08); border-radius:32px; padding:32px 24px; box-shadow:0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1); font-family:'DM Sans', sans-serif;">
            
            <!-- SUB-STEP A: PHONE ENTRY -->
            <div id="loginStepA" style="width:100%; text-align:center;">
              <h2 style="font-size:24px; font-weight:700; color:#fff; margin:0 0 6px 0; letter-spacing:-0.5px; font-family:'Syne', sans-serif;">Welcome Back</h2>
              <p style="font-size:13px; color:rgba(255,255,255,0.5); margin:0 0 28px 0; font-weight:500;">Enter your mobile number to continue</p>

              <div id="phoneRow" style="display:flex; align-items:center; background:rgba(255,255,255,0.04); border:1.5px solid rgba(255,255,255,0.12); border-radius:16px; overflow:hidden; height:54px; transition:all 0.3s cubic-bezier(0.4,0,0.2,1);">
                <div style="padding:0 12px 0 16px; font-size:16px; color:rgba(255,255,255,0.9); font-weight:600; border-right:1px solid rgba(255,255,255,0.1);">+91</div>
                <input id="phoneInput" type="tel" placeholder="Phone number" maxlength="10"
                  style="flex:1; background:transparent; border:none; outline:none; font-size:16px; font-weight:600; color:#fff; padding:0 16px; height:100%; font-family:inherit; letter-spacing:1px;"
                  oninput="onPhoneInput()" onfocus="onPhoneFocus()" onblur="onPhoneBlur()"
                />
              </div>

              <div id="phoneErr" style="display:none; align-items:center; gap:6px; margin-top:10px; justify-content:center;">
                <div style="width:6px; height:6px; border-radius:50%; background:#ff4d4d; flex-shrink:0; box-shadow:0 0 8px #ff4d4d;"></div>
                <span style="font-size:11px; font-weight:600; color:#ff4d4d; letter-spacing:0.2px;">Enter a valid 10-digit number</span>
              </div>

              <button id="sendOtpBtn" onclick="sendOtp()"
                style="width:100%; height:54px; border-radius:16px; border:none; background:#fff; color:#000; font-size:15px; font-weight:700; cursor:pointer; margin-top:24px; opacity:0.3; pointer-events:none; display:flex; align-items:center; justify-content:center; gap:8px; font-family:inherit; transition:all 0.2s cubic-bezier(0.4,0,0.2,1); box-shadow:0 8px 20px rgba(255,255,255,0.15);">
                Continue
              </button>

              <div style="margin-top:24px; font-size:11px; color:rgba(255,255,255,0.3); line-height:1.6; font-weight:500;">
                By continuing you agree to our<br/>
                <span style="color:rgba(255,255,255,0.6); text-decoration:underline; cursor:pointer;">Terms of Service</span> & 
                <span style="color:rgba(255,255,255,0.6); text-decoration:underline; cursor:pointer;">Privacy Policy</span>
              </div>
            </div>

            <!-- SUB-STEP B: OTP ENTRY -->
            <div id="loginStepB" style="width:100%; display:none; text-align:center;">
              <h2 style="font-size:24px; font-weight:700; color:#fff; margin:0 0 6px 0; letter-spacing:-0.5px; font-family:'Syne', sans-serif;">Verify Identity</h2>
              <div id="maskedNum" style="font-size:13px; color:rgba(255,255,255,0.5); margin-bottom:28px; font-weight:500;"></div>

              <input id="otpHidden" type="number" maxlength="6"
                style="position:absolute; opacity:0; width:1px; height:1px; pointer-events:none;"
                oninput="onOtpInput()" onfocus="onOtpFocus()" onblur="onOtpBlur()" onkeydown="onOtpKey(event)"
              />

              <div id="otpBoxRow" style="display:flex; gap:8px; justify-content:center; margin-bottom:12px; cursor:pointer;" onclick="focusOtp()">
                <div class="otp-box" id="ob0"></div>
                <div class="otp-box" id="ob1"></div>
                <div class="otp-box" id="ob2"></div>
                <div class="otp-box" id="ob3"></div>
                <div class="otp-box" id="ob4"></div>
                <div class="otp-box" id="ob5"></div>
              </div>

              <div id="otpErr" style="display:none; align-items:center; gap:6px; margin-bottom:12px; justify-content:center;">
                <div style="width:6px; height:6px; border-radius:50%; background:#ff4d4d; flex-shrink:0; box-shadow:0 0 8px #ff4d4d;"></div>
                <span id="otpErrTxt" style="font-size:11px; font-weight:600; color:#ff4d4d; letter-spacing:0.2px;"></span>
              </div>

              <button id="verifyBtn" onclick="verifyOtp()"
                style="width:100%; height:54px; border-radius:16px; border:none; background:#fff; color:#000; font-size:15px; font-weight:700; cursor:pointer; opacity:0.3; pointer-events:none; display:flex; align-items:center; justify-content:center; gap:8px; font-family:inherit; transition:all 0.2s cubic-bezier(0.4,0,0.2,1); box-shadow:0 8px 20px rgba(255,255,255,0.15); margin-top:24px;">
                Verify Code
              </button>

              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:24px; padding:0 4px;">
                <div style="display:flex; align-items:center; gap:4px; cursor:pointer; transition:opacity 0.2s;" onclick="goBackToPhone()" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'" style="opacity:0.6;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  <span style="font-size:12px; font-weight:600; color:#fff;">Back</span>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                  <span id="resendTimer" style="font-size:12px; font-weight:600; color:rgba(255,255,255,0.3);">0:30</span>
                  <span id="resendBtn" style="font-size:12px; font-weight:600; color:rgba(255,255,255,0.3); cursor:pointer; pointer-events:none; transition:color 0.2s;" onclick="resendOtp()">Resend</span>
                </div>
              </div>
            </div>

            <!-- SUB-STEP C: SUCCESS -->
            <div id="loginStepC" style="width:100%; display:none; flex-direction:column; align-items:center; text-align:center; padding:16px 0;">
              <div style="width:64px; height:64px; border-radius:50%; background:rgba(212,245,106,0.1); border:2px solid rgba(212,245,106,0.4); display:flex; align-items:center; justify-content:center; margin-bottom:24px; box-shadow:0 0 30px rgba(212,245,106,0.15);">
                <svg width="28" height="28" viewBox="0 0 22 22" fill="none">
                  <polyline points="4,11 9,16 18,6" stroke="#d4f56a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2 style="font-size:26px; font-weight:700; color:#fff; margin:0 0 8px 0; letter-spacing:-0.5px; font-family:'Syne', sans-serif;">Authenticated</h2>
              <p style="font-size:14px; color:rgba(255,255,255,0.5); margin:0 0 32px 0; font-weight:500;">Welcome to your secure feed.</p>
              
              <div style="width:100%; height:4px; background:rgba(255,255,255,0.06); border-radius:4px; overflow:hidden; margin-bottom:12px;">
                <div id="redirBar" style="height:100%; width:0%; background:#d4f56a; border-radius:4px; transition:width 0.6s linear; box-shadow:0 0 10px #d4f56a;"></div>
              </div>
              <div style="font-size:11px; font-weight:600; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:1px;">Entering platform...</div>
            </div>

          </div>

        </div>
      `}}
    />
  );
};
const ProfileStep = () => {
  const [activeTab, setActiveTab] = useState("Posts");
  const streakDays = 30;

  const profileTabs = ["Posts", "Replies", "Saved"];

  const samplePosts = [
    { mood: "dark", text: "Do you ever feel most alone in a crowded room?", replies: 84, bg: "#111" },
    { mood: "thought", text: "What if your inner voice isn't even yours?", replies: 61, bg: "#0d0d0d" },
    { mood: "raw", text: "The mask you wear becomes your face.", replies: 112, bg: "#0f0f0f" },
    { mood: "quiet", text: "Silence is just noise nobody taught you to hear.", replies: 39, bg: "#101010" },
    { mood: "anon", text: "Would you say it if your name was on it?", replies: 77, bg: "#111" },
    { mood: "late night", text: "3am thoughts hit different.", replies: 53, bg: "#0d0d0d" },
  ];

  const sampleReplies = [
    { username: "ghost_mind", time: "2h", to: "void_speaks", text: "Anonymity isn't cowardice. Sometimes it's the only way truth survives.", likes: "412", retweets: "88", comments: "34" },
    { username: "ghost_mind", time: "1d", to: "nobody_asked__", text: "Loneliness isn't about being alone. It's about not being seen.", likes: "1.1K", retweets: "344", comments: "92" }
  ];

  const sampleSaved = [
    { icon: "ti-message-2", text: "Is loneliness different when surrounded by millions?", author: "@riya_m", replies: 189, tag: "urban" },
    { icon: "ti-brain", text: "What do you do when you feel stuck but not unhappy?", author: "Anonymous", replies: 134, tag: "mind" },
    { icon: "ti-eye-off", text: "Can you ever fully trust someone you met online?", author: "@rohan_d", replies: 76, tag: "anon" }
  ];

  return (
    <motion.div
      key="step-profile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col bg-[#0a0a0a] overflow-y-auto overflow-x-hidden pb-[64px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Syne:wght@600;700;800&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      <style dangerouslySetInnerHTML={{
        __html: `
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-dmsans { font-family: 'DM Sans', sans-serif; }
      `}} />

      {/* 1. COVER BANNER */}
      <div className="relative h-[110px] bg-[#111] shrink-0 overflow-hidden">
        <img src={coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-0 inset-x-0 h-[70px] bg-gradient-to-b from-transparent to-[#0a0a0a]"></div>
      </div>

      {/* 2. AVATAR ROW */}
      <div className="relative z-10 px-5 flex justify-between items-end" style={{ marginTop: '-44px' }}>
        <div className="relative">
          <div className="w-[82px] h-[82px] rounded-full bg-[#1c1c1c] border-2 border-[#2a2a2a] p-[2px] flex items-center justify-center">
            <img src={userAvatar} alt="DP" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>

        <div className="flex gap-2 pb-1">
          <button className="w-[34px] h-[34px] rounded-full bg-[#111] border border-[#222] flex items-center justify-center hover:bg-[#1a1a1a] transition-colors">
            <i className="ti ti-dots text-[#666] text-[16px]"></i>
          </button>
          <button className="w-[34px] h-[34px] rounded-full bg-[#111] border border-[#222] flex items-center justify-center hover:bg-[#1a1a1a] transition-colors">
            <i className="ti ti-mail text-[#666] text-[16px]"></i>
          </button>
          <button className="h-[34px] rounded-[17px] bg-white px-[18px] text-[#0a0a0a] font-dmsans font-semibold text-[13px] hover:bg-gray-200 transition-colors">
            Follow
          </button>
        </div>
      </div>

      {/* 3. USER INFO */}
      <div className="px-5 mt-4 shrink-0">
        <h1 className="font-dmsans font-bold text-white text-[20px] mb-1 leading-normal pb-1">ghost_mind</h1>
        <p className="font-dmsans font-normal text-[#888] text-[13.5px] leading-[1.65] mb-4">Anonymous thoughts. Questions nobody dares ask out loud.</p>
      </div>

      {/* 4. STATS ROW */}
      <div className="px-5 mb-5 shrink-0">
        <div className="flex border border-[#1a1a1a] rounded-[14px] overflow-hidden relative">
          <div className="flex-1 flex flex-col items-center py-[12px] relative">
            <span className="font-dmsans font-bold text-[18px] text-white">348</span>
            <span className="text-[10px] text-[#666] uppercase tracking-[0.06em] mt-[3px]">POSTS</span>
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-[#1a1a1a]"></div>
          </div>
          <div className="flex-1 flex flex-col items-center py-[12px] relative">
            <span className="font-dmsans font-bold text-[18px] text-white">12.4K</span>
            <span className="text-[10px] text-[#666] uppercase tracking-[0.06em] mt-[3px]">FOLLOWERS</span>
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-[#1a1a1a]"></div>
          </div>
          <div className="flex-1 flex flex-col items-center py-[12px]">
            <span className="font-dmsans font-bold text-[18px] text-white">89</span>
            <span className="text-[10px] text-[#666] uppercase tracking-[0.06em] mt-[3px]">FOLLOWING</span>
          </div>
        </div>
      </div>

      {/* 5. GAMIFICATION & LEADERBOARD WIDGET (Minimal Strip) */}
      <div className="px-5 mb-[18px] shrink-0">
        <div className="h-[48px] rounded-[14px] bg-[#111] border border-[#1e1e1e] flex items-center justify-between px-4 cursor-pointer hover:bg-[#151515] transition-colors relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>

          <div className="flex items-center gap-3 z-10">
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="text-[14px]">🔥</span>
              <span className="font-dmsans font-bold text-[#e8e8e8] text-[14px]">{streakDays}</span>
            </div>
            <div className="w-[1px] h-[12px] bg-[#333]"></div>
            <span className="font-dmsans font-bold text-[#e8e8e8] text-[14px] tracking-wide">3,000 PTS</span>
          </div>

          <div className="flex items-center gap-2 z-10">
            <span className="text-[#666] text-[12px] font-dmsans">Rank #43</span>
            <i className="ti ti-chevron-right text-[#444] text-[14px]"></i>
          </div>
        </div>
      </div>

      {/* 6. STICKY TABS BAR */}
      <div className="sticky top-0 z-30 bg-[#0a0a0a] border-b border-[#141414] flex px-2 shrink-0">
        {profileTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-[11px] pt-[13px] font-dmsans font-medium text-[12.5px] tracking-[0.02em] border-b-[1.5px] -mb-[1px] transition-colors ${activeTab === tab ? 'text-[#d0d0d0] border-[#d0d0d0]' : 'text-[#3a3a3a] border-transparent'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 7. TAB PANELS */}
      <div className="flex-1 bg-[#0a0a0a] pt-1">
        {activeTab === "Posts" && (
          <div className="grid grid-cols-3 gap-[2px] p-[2px]">
            {samplePosts.map((post, idx) => (
              <div key={idx} className="aspect-[0.85] rounded-[3px] overflow-hidden relative cursor-pointer group" style={{ backgroundColor: post.bg }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
                <div className="absolute bottom-0 left-0 p-2 w-full flex flex-col gap-[5px]">
                  <span className="self-start text-[9.5px] uppercase bg-black/60 text-[#888] px-[4px] py-[2px] rounded-[3px] font-bold tracking-wider">{post.mood}</span>
                  <p className="text-[11px] text-white/75 font-dmsans font-light leading-[1.38] line-clamp-3">{post.text}</p>
                </div>
                <div className="absolute top-1.5 right-1.5 text-[9.5px] text-white/30 bg-black/50 px-[5px] py-[1px] rounded-[5px] flex items-center gap-1">
                  <i className="ti ti-message-circle text-[10px]"></i>
                  {post.replies}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Replies" && (
          <div className="flex flex-col">
            {sampleReplies.map((reply, idx) => (
              <div key={idx} className="flex gap-[11px] p-[15px_20px] border-b border-[#0f0f0f]">
                <div className="w-[34px] h-[34px] rounded-full bg-[#141414] border border-[#1e1e1e] flex items-center justify-center shrink-0">
                  <i className="ti ti-ghost text-[#333] text-[16px]"></i>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-[6px]">
                    <span className="font-syne font-semibold text-[#aaa] text-[13px]">{reply.username}</span>
                    <span className="text-[#2e2e2e] text-[11px]">· {reply.time}</span>
                  </div>
                  <div className="text-[11.5px] text-[#2e2e2e] mb-[4px]">
                    replying to <span className="text-[#555]">@{reply.to}</span>
                  </div>
                  <p className="font-dmsans font-light text-[#888] text-[13.5px] leading-[1.6]">{reply.text}</p>
                  <div className="flex gap-[16px] mt-[9px]">
                    <div className="flex items-center gap-[4px] text-[#2e2e2e] text-[12px] group cursor-pointer hover:text-[#e8643a]">
                      <i className="ti ti-heart group-hover:text-[#e8643a]"></i> {reply.likes}
                    </div>
                    <div className="flex items-center gap-[4px] text-[#2e2e2e] text-[12px] cursor-pointer hover:text-[#555]">
                      <i className="ti ti-repeat"></i> {reply.retweets}
                    </div>
                    <div className="flex items-center gap-[4px] text-[#2e2e2e] text-[12px] cursor-pointer hover:text-[#555]">
                      <i className="ti ti-message-circle"></i> {reply.comments}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Saved" && (
          <div className="flex flex-col px-[20px]">
            {sampleSaved.map((item, idx) => (
              <div key={idx} className="flex gap-[13px] py-[15px] border-b border-[#0f0f0f] cursor-pointer hover:bg-white/[0.02]">
                <div className="w-[56px] h-[56px] bg-[#111] border border-[#1a1a1a] rounded-[10px] flex items-center justify-center shrink-0">
                  <i className={`ti ${item.icon} text-[#2a2a2a] text-[20px]`}></i>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-dmsans font-normal text-[#aaa] text-[13.5px] leading-[1.45] mb-[5px] line-clamp-2">{item.text}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-[#2e2e2e] text-[11.5px]">{item.author} · {item.replies} replies</span>
                    <span className="uppercase text-[#444] bg-[#141414] border border-[#1e1e1e] text-[10px] px-[8px] py-[2px] rounded-[6px] font-bold">{item.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const HomeStep = () => {
  const [reelsData, setReelsData] = useState(initialHeroReels);
  const [activeHeroReel, setActiveHeroReel] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showMutePopup, setShowMutePopup] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});
  const [replyTo, setReplyTo] = useState(null);
  const [commentText, setCommentText] = useState("");
  const audioRef = useRef(null);

  React.useEffect(() => {
    if (audioRef.current && reelsData[activeHeroReel]?.audioSrc) {
      const currentSrc = audioRef.current.src;
      const targetSrc = reelsData[activeHeroReel].audioSrc;
      if (!currentSrc || currentSrc !== targetSrc) {
        audioRef.current.src = targetSrc;
      }
      if (!isMuted) {
        audioRef.current.play().catch(e => console.log('Audio error:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [activeHeroReel, isMuted, reelsData]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      user: "mystik_user",
      text: replyTo ? `@${replyTo.user} ${commentText}` : commentText,
      likes: 0,
      time: "Just now",
      avatarFrom: "from-indigo-500",
      avatarTo: "to-purple-500",
      replies: []
    };
    const updatedReels = [...reelsData];
    if (replyTo) {
      const commentIndex = updatedReels[activeHeroReel].commentsList.findIndex(c => c.id === replyTo.id);
      if (commentIndex !== -1) {
        if (!updatedReels[activeHeroReel].commentsList[commentIndex].replies) {
          updatedReels[activeHeroReel].commentsList[commentIndex].replies = [];
        }
        updatedReels[activeHeroReel].commentsList[commentIndex].replies.push(newComment);
      }
    } else {
      updatedReels[activeHeroReel].commentsList.unshift(newComment);
    }
    setReelsData(updatedReels);
    setCommentText("");
    setReplyTo(null);
  };

  const toggleCommentLike = (commentId) => {
    setCommentLikes(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const toggleHeart = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const toggleMute = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setIsMuted(!isMuted);
    setShowMutePopup(true);
    setTimeout(() => setShowMutePopup(false), 900);
  };

  const handleShare = async (e, reel) => {
    e.stopPropagation();
    setShowSharePopup(true);
  };

  const handleHeroScroll = (e) => {
    const idx = Math.round(e.target.scrollTop / e.target.clientHeight);
    if (idx !== activeHeroReel) {
      setActiveHeroReel(idx);
      setIsLiked(false);
    }
  };

  return (
    <motion.div
      key="step-home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col font-sans bg-[#0c0c10] text-white overflow-hidden pb-[64px]"
    >
      <audio ref={audioRef} loop />

      {/* Center screen Mute/Unmute Popup */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={showMutePopup ? { scale: 1.2, opacity: 1 } : { scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-black/50 backdrop-blur-md p-4 rounded-full text-white/90 shadow-2xl"
        >
          {isMuted ? <VolumeX size={28} strokeWidth={1.5} /> : <Volume2 size={28} strokeWidth={1.5} />}
        </motion.div>
      </div>

      <motion.div
        animate={{ height: showComments ? '45%' : '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-y snap-mandatory cursor-pointer relative z-10"
        onScroll={handleHeroScroll}
        onClick={(e) => {
          if (showComments || showSharePopup) {
            setShowComments(false);
            setShowSharePopup(false);
            setReplyTo(null);
          } else {
            toggleMute(e);
          }
        }}
      >
        {reelsData.map((reel, i) => (
          <div key={i} className="w-full h-full snap-start relative flex flex-col justify-end p-4 sm:p-5 pb-6 sm:pb-8 overflow-hidden z-10">
            <motion.div
              animate={{ scale: [1.05, 1.15, 1.05], backgroundPosition: ['50% 50%', '60% 40%', '50% 50%'] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
              style={{ backgroundImage: `url('${reel.bgImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-0 pointer-events-none" />

            <div className="absolute top-8 left-5 right-5 flex justify-between items-center text-white z-20 pointer-events-none">
              <span className="font-bold text-base sm:text-lg text-shadow-sm">For You</span>
            </div>

            <div className={`relative z-20 w-full flex flex-col pr-10 sm:pr-12 space-y-3 sm:space-y-4 transition-all duration-300 origin-bottom-left ${showComments ? 'scale-[0.80] sm:scale-[0.70] translate-y-2 sm:translate-y-4' : 'scale-100'}`}>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring', bounce: 0.4 }}
                viewport={{ once: false }}
                className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl p-3.5 sm:p-4 rounded-3xl rounded-bl-sm border border-white/40 shadow-xl inline-flex flex-col items-start text-left w-[95%] relative overflow-hidden mb-1 pointer-events-auto cursor-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                <div className="w-full flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border border-white/30 shadow-md overflow-hidden flex-shrink-0 bg-[#1c1c1c]">
                      <img src={userAvatar} alt="DP" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white/90 font-bold text-[11px] tracking-wide mt-[1px]">@ghost_mind</span>
                  </div>
                  <div className="text-white/90 text-[8px] font-black uppercase tracking-widest flex items-center gap-1 bg-black/20 pr-2.5 pl-1.5 py-[3px] rounded-full shadow-inner border border-white/10">
                    <div className="w-3 h-3 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm shadow-sm">
                      <Sparkles size={7} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="mt-[1px]">{reel.type}</span>
                  </div>
                </div>

                <p className="text-white text-[15px] sm:text-base leading-snug font-black tracking-tight drop-shadow-md">{reel.question}</p>
              </motion.div>

              <div className="space-y-3 sm:space-y-4 w-full">
                {reel.replies.map((reply, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + (idx * 0.2), duration: 0.4 }}
                    viewport={{ once: false }}
                    className={`flex items-start gap-2 ${reply.size} pointer-events-auto cursor-auto`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={`${reply.dot} rounded-full border border-white/50 bg-gradient-to-tr ${reply.from} ${reply.to} flex-shrink-0 shadow-md ${reply.margin}`} />
                    <div className={`bg-black/40 backdrop-blur-md ${reply.padding} rounded-2xl rounded-tl-sm border border-white/10 shadow-lg`}>
                      <p className="text-white/70 font-bold text-[8px] uppercase tracking-wide mb-px">@{reply.user}</p>
                      <p className="text-white text-[10px] sm:text-[11px] leading-snug drop-shadow-sm">{reply.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className={`absolute right-3 sm:right-4 bottom-4 sm:bottom-6 space-y-4 sm:space-y-5 flex flex-col items-center z-20 transition-opacity duration-300 ${(showComments || showSharePopup) ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
              <button onClick={toggleHeart} className="flex flex-col items-center gap-1 group relative z-50">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full backdrop-blur-md flex items-center justify-center border shadow-lg transition-all duration-300 ${isLiked ? 'bg-rose-500/20 border-rose-500/30' : 'bg-black/40 border-white/20 group-hover:scale-110'}`}>
                  <motion.div initial={false} animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                    <Heart size={20} className={`transition-colors duration-300 ${isLiked ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]' : 'text-white'}`} strokeWidth={isLiked ? 0 : 2} />
                  </motion.div>
                </div>
                <span className="text-white font-bold text-[9px] sm:text-[10px] drop-shadow-md">{isLiked ? `${parseFloat(reel.likes) + 0.1}K` : `${reel.likes}K`}</span>
              </button>
              <button onClick={(e) => { e.stopPropagation(); setShowComments(true); }} className="flex flex-col items-center gap-1 group relative z-50">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <span className="text-white font-bold text-[9px] sm:text-[10px]">{reel.comments}</span>
              </button>
              <button onClick={(e) => handleShare(e, reel)} className="flex flex-col items-center gap-1 group relative z-50">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                  <Share2 size={20} className="text-white" />
                </div>
                <span className="text-white font-bold text-[9px] sm:text-[10px]">{reel.shares}</span>
              </button>
              <div className="relative flex justify-center items-center w-10 h-10 pointer-events-none mt-2 sm:mt-4">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[2px] border-white/20 bg-[#1a1a1a] flex items-center justify-center shadow-lg overflow-hidden relative shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <Music size={10} className="text-white z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
                </motion.div>
                <motion.div animate={{ y: [-5, -20], opacity: [0, 1, 0], scale: [0.8, 1.2], x: [0, -8] }} transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }} className="absolute bottom-5 left-0 text-white/80">
                  <Music size={8} />
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 h-[55%] bg-[#1c1c1e] rounded-t-3xl rounded-b-[2.4rem] z-[100] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center px-4 py-3 border-b border-white/10 shrink-0">
              <div className="w-10 h-1 bg-white/20 rounded-full mb-3" />
              <div className="w-full flex items-center justify-between">
                <div className="w-8" />
                <span className="text-white text-sm font-bold">Comments <span className="text-white/50 text-xs font-normal">({reelsData[activeHeroReel].commentsList.length})</span></span>
                <div className="w-8" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {reelsData[activeHeroReel].commentsList.map(comment => (
                <div key={comment.id} className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${comment.avatarFrom} ${comment.avatarTo} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white/70 font-bold text-xs">@{comment.user}</span>
                        <span className="text-white/40 text-[10px]">{comment.time}</span>
                      </div>
                      <p className="text-white/90 text-sm leading-snug mb-1.5">{comment.text}</p>
                      <div className="flex items-center gap-4 text-white/50 text-xs font-medium">
                        <button onClick={() => setReplyTo({ id: comment.id, user: comment.user })} className="hover:text-white transition-colors">Reply</button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 shrink-0 pt-2">
                      <button onClick={() => toggleCommentLike(comment.id)} className="transition-transform active:scale-90">
                        <Heart size={14} className={commentLikes[comment.id] ? "text-rose-500 fill-rose-500" : "text-white/50"} />
                      </button>
                      <span className="text-white/50 text-[10px]">{comment.likes + (commentLikes[comment.id] ? 1 : 0)}</span>
                    </div>
                  </div>
                  {comment.replies && comment.replies.map(reply => (
                    <div key={reply.id} className="flex gap-3 ml-11">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${reply.avatarFrom} ${reply.avatarTo} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-white/70 font-bold text-[11px]">@{reply.user}</span>
                          <span className="text-white/40 text-[9px]">{reply.time}</span>
                        </div>
                        <p className="text-white/80 text-xs leading-snug mb-1.5">{reply.text}</p>
                        <div className="flex items-center gap-4 text-white/50 text-[10px] font-medium">
                          <button onClick={() => setReplyTo({ id: comment.id, user: reply.user })} className="hover:text-white transition-colors">Reply</button>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
                        <button onClick={() => toggleCommentLike(reply.id)} className="transition-transform active:scale-90">
                          <Heart size={12} className={commentLikes[reply.id] ? "text-rose-500 fill-rose-500" : "text-white/50"} />
                        </button>
                        <span className="text-white/50 text-[9px]">{reply.likes + (commentLikes[reply.id] ? 1 : 0)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="p-3 bg-[#1c1c1e] border-t border-white/10 shrink-0 mb-[64px]">
              {replyTo && (
                <div className="flex justify-between items-center text-xs text-white/50 mb-2 px-1">
                  <span>Replying to <span className="text-white/80 font-bold">@{replyTo.user}</span></span>
                  <button onClick={() => setReplyTo(null)}><X size={12} /></button>
                </div>
              )}
              <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex-shrink-0" />
                <div className="flex-1 bg-white/10 rounded-full px-4 py-2 flex items-center border border-white/5 focus-within:border-indigo-500/50 transition-colors">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={replyTo ? "Write a reply..." : "Add a comment..."}
                    className="bg-transparent text-white text-sm w-full focus:outline-none placeholder:text-white/40"
                  />
                  <button type="submit" disabled={!commentText.trim()} className="text-indigo-400 disabled:opacity-50 ml-2">
                    <Send size={16} className={commentText.trim() ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSharePopup && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 bg-[#1c1c1e] rounded-b-[2.4rem] rounded-t-3xl z-[150] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto pb-[80px] pt-4 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center mb-4 px-2">
              <span className="text-white text-sm font-bold">Share to</span>
            </div>

            <div className="flex justify-around items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1 pb-4">
              <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-2 min-w-[60px] group transition-transform active:scale-95">
                <div className="w-[52px] h-[52px] rounded-full bg-gray-700/80 flex items-center justify-center text-white shadow-lg border border-white/10">
                  <Link size={22} className="group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-white/80 text-[10px] font-medium">Copy Link</span>
              </button>
              <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-2 min-w-[60px] group transition-transform active:scale-95">
                <div className="w-[52px] h-[52px] rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg border border-white/10">
                  <MessageCircle size={22} className="group-hover:scale-110 transition-transform fill-white" />
                </div>
                <span className="text-white/80 text-[10px] font-medium">WhatsApp</span>
              </button>
              <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-2 min-w-[60px] group transition-transform active:scale-95">
                <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] flex items-center justify-center text-white shadow-lg border border-white/10">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform text-white">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <span className="text-white/80 text-[10px] font-medium">Instagram</span>
              </button>
              <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-2 min-w-[60px] group transition-transform active:scale-95">
                <div className="w-[52px] h-[52px] rounded-full bg-black border border-white/20 flex items-center justify-center text-white shadow-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform text-white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span className="text-white/80 text-[10px] font-medium">X.com</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

const exploreRecentItems = [
  { id: '1', type: 'clock', text: 'city loneliness invisible' },
  { id: '2', type: 'clock', text: 'trust strangers' },
  { id: '3', type: 'person', text: '@riya_m' },
  { id: '4', type: 'clock', text: 'healing feels like' }
];

const exploreTrendingData = [
  { id: 't1', rank: 1, question: 'Does the city make you feel free or invisible?', answers: 342, mood: 'Urban', bg: '#1a2a3a' },
  { id: 't2', rank: 2, question: 'When did you last do something for the first time?', answers: 218, mood: 'Nature', bg: '#1a3a2a' },
  { id: 't3', rank: 3, question: 'Is loneliness different when surrounded by millions?', answers: 189, mood: 'Vulnerable', bg: '#2d1b4e' },
  { id: 't4', rank: 4, question: 'What do you do when you feel stuck but not unhappy?', answers: 134, mood: 'Minimal', bg: '#3d2b1f' },
  { id: 't5', rank: 5, question: 'Can you ever fully trust someone you just met?', answers: 97, mood: 'Dark', bg: '#3a1a2a' }
];

const mockResultsCity = [
  { id: 'c1', question: 'Does the city make you feel free, or just invisible?', bg: '#1a2a3a', mood: 'Curious', answers: 342 },
  { id: 'c2', question: 'Is city loneliness different from rural loneliness?', bg: '#3d2b1f', mood: 'Vulnerable', answers: 98 },
  { id: 'c3', question: 'What does your city say about who you are?', bg: '#1e3a5f', mood: 'Nostalgic', answers: 57 },
  { id: 'c4', question: 'Do city lights make you feel watched or free?', bg: '#2d1b4e', mood: 'Curious', answers: 34 },
  { id: 'c5', question: 'Can you ever truly belong to a city?', bg: '#1a3a2a', mood: 'Hopeful', answers: 22 }
];

const mockResultsRiya = [
  { id: 'r1', name: 'Riya Mehta', handle: '@riya_m', followers: '2.4K', following: false },
  { id: 'r2', name: 'Riyansh Kumar', handle: '@riyansh_k', followers: '890', following: true },
  { id: 'r3', name: 'Ananya Riya', handle: '@ananya_r', followers: '412', following: false }
];

const exploreGridItems = [
  { id: 'g1', type: 'image', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 'g2', type: 'image', img: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 'g3', type: 'video', img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80&fit=crop', span: 'col-span-1 row-span-2' },
  { id: 'g4', type: 'image', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 'g5', type: 'image', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 'g6', type: 'video', img: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80&fit=crop', span: 'col-span-1 row-span-2' },
  { id: 'g7', type: 'image', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 'g8', type: 'image', img: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=400&q=80&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 'g9', type: 'image', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 'g10', type: 'image', img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 'g11', type: 'image', img: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 'g12', type: 'image', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 'g13', type: 'video', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&fit=crop', span: 'col-span-1 row-span-2' },
  { id: 'g14', type: 'image', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80&fit=crop', span: 'col-span-1 row-span-1' },
  { id: 'g15', type: 'image', img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80&fit=crop', span: 'col-span-1 row-span-1' },
];

const initialMessages = [
  { id: 'm1', handle: '@lunary_sky', unread: true, time: '2m ago', question: "What's your 3am thought lately?", preview: "Mine is always about that one conversation I never finished...", privateReply: true },
  { id: 'm2', handle: '@void_walker', unread: true, time: '18m ago', question: "One thing people assume about you?", preview: "That I have everything figured out lol", privateReply: true },
  { id: 'm3', handle: '@echo.chamber', unread: false, time: '1h ago', question: "Which city has your heart?", preview: "You: Istanbul, always. What about you?", privateReply: true },
  { id: 'm4', handle: '@drifting_away', unread: false, time: 'Yesterday', question: "Red flag you keep ignoring?", preview: "Haha I stopped replying after that one", privateReply: true }
];

const initialRequests = [
  { id: 'r1', handle: '@hidden_eye', time: '3h ago', question: "What's something you never told anyone?", preview: "I actually relate so much to this. Can we talk?" },
  { id: 'r2', handle: '@kael.vibes', time: '5h ago', question: "Your villain era aesthetic?", preview: "Same energy honestly, let's vibe" },
  { id: 'r3', handle: '@midnight_run', time: '8h ago', question: "If you could relive one memory…", preview: "This question hit different. Reply me?" },
  { id: 'r4', handle: '@siren_song', time: 'Yesterday', question: "What's your 3am thought lately?", preview: "Literally cried reading the replies on this" },
  { id: 'r5', handle: '@cipher.zero', time: '2d ago', question: "Red flag you keep ignoring?", preview: "I see myself in this so much, hi" }
];

const ChatStep = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [requests, setRequests] = useState(initialRequests);
  const [activeTab, setActiveTab] = useState('Messages');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [removingId, setRemovingId] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatDraft, setChatDraft] = useState('');
  const [chatHistory, setChatHistory] = useState({});

  const filteredMessages = messages.filter(m =>
    m.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRequests = requests.filter(r =>
    r.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayList = activeTab === 'Messages' ? filteredMessages : filteredRequests;

  const handleAccept = (req) => {
    setRemovingId(req.id);
    setTimeout(() => {
      setRequests(prev => prev.filter(r => r.id !== req.id));
      setMessages(prev => [{ ...req, unread: true, privateReply: true }, ...prev]);
      setRemovingId(null);
    }, 350);
  };

  const handleDecline = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      setRequests(prev => prev.filter(r => r.id !== id));
      setRemovingId(null);
    }, 350);
  };

  const openChat = (chat) => {
    setSelectedChat(chat);
    if (chat.unread) {
      setMessages(prev => prev.map(m => m.id === chat.id ? { ...m, unread: false } : m));
    }
  };

  const handleSend = () => {
    if (!chatDraft.trim()) return;
    const newMsg = { id: Date.now(), text: chatDraft, sender: 'me' };
    setChatHistory(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg]
    }));
    setChatDraft('');
  };

  if (selectedChat) {
    const history = chatHistory[selectedChat.id] || [];
    return (
      <motion.div
        key="step-chat-thread"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex flex-col bg-[#0d0d0d] text-[#e8e8e8] overflow-hidden pb-[70px] z-50"
      >
        {/* Status Bar */}
        <div className="flex justify-between items-center pt-[12px] px-[20px] pb-[4px]">
          <span className="text-[11px] text-[#444] font-medium">9:41</span>
          <div className="flex items-center gap-[5px] text-[#444]">
            <Wifi size={12} strokeWidth={2.5} />
            <Battery size={14} strokeWidth={2.5} />
          </div>
        </div>

        {/* Chat Header */}
        <div className="pt-[14px] px-[18px] pb-[12px] flex items-center gap-3 border-b-[0.5px] border-[#1a1a1a]">
          <button onClick={() => setSelectedChat(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft size={20} className="text-[#e8e8e8]" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-[36px] h-[36px] rounded-[12px] bg-[#161616] border-[0.5px] border-[#222] flex items-center justify-center">
              <Ghost size={18} className="text-[#333]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-medium text-[#c8c8c8]">{selectedChat.handle || "@anonymous"}</span>
            </div>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 [scrollbar-width:none]">
          <div className="flex justify-center">
            <span className="text-[10px] text-[#444] bg-[#111] px-2 py-1 rounded-full border border-[#1a1a1a] max-w-[80%] text-center">
              Reply to: "{selectedChat.question}"
            </span>
          </div>
          
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-[#161616] border border-[#222] text-[#e8e8e8] text-[13px] px-3 py-2 rounded-2xl rounded-tl-sm">
              {selectedChat.preview.replace(/^You: /, '')}
            </div>
          </div>

          {history.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] text-[13px] px-3 py-2 ${msg.sender === 'me' ? 'bg-[#d4f56a] text-[#0d0d0d] rounded-2xl rounded-tr-sm font-medium' : 'bg-[#161616] border border-[#222] text-[#e8e8e8] rounded-2xl rounded-tl-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t-[0.5px] border-[#1a1a1a] bg-[#0d0d0d]">
          <div className="flex items-center gap-2 bg-[#161616] border-[0.5px] border-[#2a2a2a] rounded-full p-1 pl-4">
            <input
              type="text"
              value={chatDraft}
              onChange={(e) => setChatDraft(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-[#666]"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${chatDraft.trim() ? 'bg-[#d4f56a] text-[#0d0d0d]' : 'bg-[#222] text-[#666]'}`}
            >
              <Send size={14} className={chatDraft.trim() ? 'mr-[2px]' : ''} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="step-chat"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col bg-[#0d0d0d] text-[#e8e8e8] overflow-hidden pb-[70px]"
      style={{ fontFamily: 'system-ui, sans-serif' }}
      onClick={() => { if (isSearchOpen) setIsSearchOpen(false); }}
    >
      {/* Status Bar */}
      <div className="flex justify-between items-center pt-[12px] px-[20px] pb-[4px]">
        <span className="text-[11px] text-[#444] font-medium">9:41</span>
        <div className="flex items-center gap-[5px] text-[#444]">
          <Wifi size={12} strokeWidth={2.5} />
          <Battery size={14} strokeWidth={2.5} />
        </div>
      </div>

      {/* Top Bar */}
      <div className="pt-[14px] px-[18px] pb-[12px] flex items-center justify-between relative">
        <h1 className="text-[20px] font-medium tracking-[-0.3px] text-[#e8e8e8]">Inbox</h1>

        <div
          onClick={(e) => { e.stopPropagation(); setIsSearchOpen(true); }}
          className={`relative flex items-center justify-end h-[32px] bg-[#161616] border-[0.5px] border-[#2a2a2a] rounded-[10px] transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden cursor-pointer ${isSearchOpen ? 'w-[190px]' : 'w-[32px]'}`}
        >
          {isSearchOpen && (
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className="absolute left-3 right-8 top-0 bottom-0 bg-transparent text-[12px] text-[#d0d0d0] outline-none placeholder:text-[#d0d0d0]/50"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          )}

          {isSearchOpen && searchQuery.length > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setSearchQuery(''); }}
              className="absolute right-[32px] top-0 bottom-0 px-2 flex items-center justify-center text-[#d0d0d0] hover:text-white"
            >
              <X size={12} />
            </button>
          )}

          <div
            onClick={(e) => {
              if (isSearchOpen) {
                e.stopPropagation();
                setIsSearchOpen(false);
                setSearchQuery('');
              }
            }}
            className="w-[32px] h-[32px] shrink-0 flex items-center justify-center text-[#e8e8e8] hover:bg-white/5 transition-colors"
          >
            <Search size={14} />
          </div>
        </div>
      </div>

      {/* Segment Tabs */}
      <div className="flex border-b-[0.5px] border-[#1a1a1a] bg-[#0d0d0d]">
        <button
          onClick={() => { setActiveTab('Messages'); setSearchQuery(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-[10px] text-[12px] font-medium border-b-[1.5px] transition-colors ${activeTab === 'Messages' ? 'text-[#d0d0d0] border-[#d0d0d0]' : 'text-[#3a3a3a] border-transparent'}`}
        >
          Messages
          <span className={`text-[9px] px-[6px] py-[2px] rounded-[20px] ${activeTab === 'Messages' ? 'bg-[#2a2a2a] text-[#aaa]' : 'bg-[#252525] text-[#666]'}`}>
            {messages.length}
          </span>
        </button>
        <button
          onClick={() => { setActiveTab('Requests'); setSearchQuery(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-[10px] text-[12px] font-medium border-b-[1.5px] transition-colors ${activeTab === 'Requests' ? 'text-[#d0d0d0] border-[#d0d0d0]' : 'text-[#3a3a3a] border-transparent'}`}
        >
          Requests
          <span className={`text-[9px] px-[6px] py-[2px] rounded-[20px] ${activeTab === 'Requests' ? 'bg-[#2a2a2a] text-[#aaa]' : 'bg-[#252525] text-[#666]'}`}>
            {requests.length}
          </span>
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none]">
        {searchQuery.length > 0 && displayList.length === 0 ? (
          <div className="flex items-center justify-center pt-[50px] text-[#4a4a4a] text-[13px]">
            No conversations found
          </div>
        ) : activeTab === 'Messages' ? (
          <div className="flex flex-col">
            {displayList.map(thread => (
              <div
                key={thread.id}
                onClick={() => openChat(thread)}
                className={`flex gap-[11px] p-[13px_18px] border-b-[0.5px] border-[#141414] cursor-pointer transition-colors hover:bg-[#111] active:bg-[#1a1a1a] ${thread.unread ? 'bg-[#111111]' : ''}`}
              >
                <div className="relative shrink-0">
                  <div className="w-[40px] h-[40px] rounded-[13px] bg-[#161616] border-[0.5px] border-[#222] flex items-center justify-center">
                    <Ghost size={20} className="text-[#333]" />
                  </div>
                  {thread.unread && (
                    <div className="absolute -top-[2px] -right-[2px] w-[8px] h-[8px] rounded-full bg-[#e0e0e0] border-[1.5px] border-[#111]" />
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-[2px]">
                    <span className="text-[13px] font-medium text-[#c8c8c8]">{thread.handle}</span>
                    <span className="text-[10px] text-[#2e2e2e]">{thread.time}</span>
                  </div>
                  <div className="text-[11px] italic text-[#333] truncate mb-[2px]">
                    Re: {thread.question}
                  </div>
                  <div className={`text-[12px] truncate ${thread.unread ? 'text-[#888]' : 'text-[#4a4a4a]'}`}>
                    {thread.preview}
                  </div>
                  {thread.privateReply && (
                    <div className="flex items-center gap-[3px] mt-[5px] text-[#252525] text-[10px]">
                      <Lock size={10} />
                      <span>Private reply</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col relative min-h-[200px]">
            {requests.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-[50px]">
                <Inbox size={40} className="text-[#222] mb-3" />
                <p className="text-[13px] text-[#333]">No pending requests</p>
              </div>
            ) : (
              displayList.map(req => (
                <div
                  key={req.id}
                  className={`flex gap-[11px] p-[13px_18px] border-b-[0.5px] border-[#141414] transition-opacity duration-[350ms] ${removingId === req.id ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
                >
                  <div className="shrink-0 w-[40px] h-[40px] rounded-[13px] bg-[#161616] border-[0.5px] border-[#222] flex items-center justify-center">
                    <Ghost size={20} className="text-[#333]" />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-[2px]">
                      <span className="text-[13px] font-medium text-[#c8c8c8]">{req.handle}</span>
                      <span className="text-[10px] text-[#2e2e2e]">{req.time}</span>
                    </div>
                    <div className="text-[11px] italic text-[#333] truncate mb-[2px]">
                      Re: {req.question}
                    </div>
                    <div className="text-[12px] truncate text-[#4a4a4a]">
                      {req.preview}
                    </div>

                    <div className="flex gap-[6px] mt-[9px]">
                      <button
                        onClick={() => handleAccept(req)}
                        className="flex-1 text-center py-[7px] bg-[#1e1e1e] border-[0.5px] border-[#2e2e2e] rounded-[8px] text-[#c0c0c0] text-[11px] font-medium cursor-pointer hover:bg-[#252525] transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(req.id)}
                        className="flex-1 text-center py-[7px] bg-[#161616] border-[0.5px] border-[#222] rounded-[8px] text-[#666] text-[11px] font-medium cursor-pointer hover:bg-[#1a1a1a] transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ExploreStep = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState('Questions'); // Questions, People, Moods, Vibes
  const [selectedMoodFilter, setSelectedMoodFilter] = useState(null);
  const [recentSearches, setRecentSearches] = useState(exploreRecentItems);
  const [followedUsers, setFollowedUsers] = useState(new Set(['r2']));

  const inputRef = useRef(null);

  const vibeCardsList = [
    { name: 'Urban', bg: '#1a2a3a', posts: '2.4K' },
    { name: 'Nature', bg: '#1a3a2a', posts: '1.8K' },
    { name: 'Dark', bg: '#2d1b4e', posts: '4.1K' },
    { name: 'Abstract', bg: '#3a1a2a', posts: '890' },
    { name: 'Minimal', bg: '#3d2b1f', posts: '1.2K' }
  ];

  const renderHighlightedText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ?
        <span key={i} style={{ color: '#d4f56a' }}>{part}</span> :
        part
    );
  };

  const handleFollowToggle = (id) => {
    setFollowedUsers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const hasResults = (searchQuery.toLowerCase() === 'city' && activeResultTab === 'Questions') ||
    (searchQuery.toLowerCase() === 'riya' && activeResultTab === 'People');

  const screenState = isFocused && searchQuery.length === 0 ? 'focused_empty'
    : searchQuery.length > 0 && hasResults ? 'results'
      : searchQuery.length > 0 && !hasResults ? 'no_results'
        : 'default';

  const handleCancel = () => {
    setSearchQuery('');
    setIsFocused(false);
    if (inputRef.current) inputRef.current.blur();
  };

  const handleClear = () => {
    setSearchQuery('');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleRecentTap = (query) => {
    setSearchQuery(query);
    setIsFocused(true);
    if (inputRef.current) inputRef.current.blur();
  };

  const handleRemoveRecent = (e, id) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(item => item.id !== id));
  };

  return (
    <motion.div
      key="step-explore"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex flex-col font-sans bg-[#0c0c10] text-white overflow-hidden pb-[64px]"
      onClick={() => {
        if (screenState === 'results' || screenState === 'no_results') {
          if (inputRef.current) inputRef.current.blur();
        }
      }}
    >
      {/* Search Bar container */}
      <div className={`pt-12 px-3 pb-2 flex items-center transition-all ${isFocused ? 'gap-2' : ''}`}>
        <div className="flex-1 bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] focus-within:border-[rgba(255,255,255,0.3)] rounded-[12px] p-[9px_12px] flex items-center gap-2 transition-colors duration-200">
          <Search size={16} className="text-white/40 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-white text-[13px] outline-none placeholder:text-white/25"
            placeholder="Search questions, people, moods..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
          {searchQuery.length > 0 && (
            <button onClick={handleClear} className="shrink-0"><X size={14} className="text-white/30 hover:text-white/60 transition-colors" /></button>
          )}
        </div>
        {isFocused && (
          <button onClick={handleCancel} className="text-[12px] text-white/45 hover:text-white/60 bg-transparent border-none shrink-0 transition-colors">Cancel</button>
        )}
      </div>

      {/* Tabs for Results */}
      {searchQuery.length > 0 && (
        <div className="flex border-b border-[rgba(255,255,255,0.07)] mb-2 px-1 relative">
          {['Questions', 'People', 'Moods', 'Vibes'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveResultTab(tab)}
              className={`flex-1 py-2 text-[12px] font-medium transition-colors relative ${activeResultTab === tab ? 'text-white' : 'text-white/35 hover:text-white/60'}`}
            >
              {tab}
              {activeResultTab === tab && (
                <motion.div layoutId="searchUnderline" className="absolute bottom-0 left-[15%] right-[15%] h-[2px] bg-white rounded-[1px]" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto [scrollbar-width:none]">

        {screenState === 'default' && (
          <div className="grid grid-cols-3 gap-[3px] auto-rows-[115px] grid-flow-dense pb-[10px] px-[6px] animate-fade-in pt-1">
            {exploreGridItems.map(item => (
              <div
                key={item.id}
                className={`relative cursor-pointer group active:scale-[0.98] transition-all duration-300 rounded-[6px] overflow-hidden shadow-lg ${item.span}`}
                style={{
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[6px]" />
                {item.type === 'video' && (
                  <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-md rounded-full p-[5px] ring-1 ring-white/20 shadow-xl">
                    <Play size={10} className="text-white" fill="white" />
                  </div>
                )}
                {item.type === 'image' && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/30 backdrop-blur-md rounded-full p-1 ring-1 ring-white/20">
                      <Search size={10} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {screenState === 'focused_empty' && (
          <div className="flex flex-col animate-fade-in">
            {recentSearches.length > 0 && (
              <>
                <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 py-2 mb-1">Recent searches</h3>
                <div className="px-3 flex flex-col">
                  {recentSearches.map(item => (
                    <div key={item.id} onClick={() => handleRecentTap(item.text)} className="flex items-center gap-[9px] py-[7px] border-b border-[rgba(255,255,255,0.05)] cursor-pointer active:bg-white/5 transition-colors">
                      <div className="w-[30px] h-[30px] rounded-[8px] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center shrink-0">
                        {item.type === 'clock' ? <Clock size={14} className="text-white/40" /> : <User size={14} className="text-white/40" />}
                      </div>
                      <span className="flex-1 text-[11px] text-white/70 leading-[1.3]">{item.text}</span>
                      <button onClick={(e) => handleRemoveRecent(e, item.id)} className="p-1"><X size={14} className="text-white/20 hover:text-white/50" /></button>
                    </div>
                  ))}
                </div>
                <div className="h-[0.5px] bg-[rgba(255,255,255,0.07)] mx-3 my-[10px]" />
              </>
            )}

            <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 mb-2 mt-1">Suggested</h3>
            <div className="flex flex-wrap gap-[6px] px-3">
              {["city life", "belonging", "isolation", "midnight", "nostalgia", "urban vibes"].map(keyword => (
                <button
                  key={keyword}
                  onClick={() => handleRecentTap(keyword)}
                  className="px-[13px] py-[6px] rounded-[20px] border border-white/10 bg-white/5 text-[10px] font-medium text-white/70 hover:bg-white/10 transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        )}

        {screenState === 'results' && activeResultTab === 'Questions' && (
          <div className="flex flex-col animate-fade-in">
            <p className="text-[10px] text-white/25 px-3 pb-[6px] pt-1">
              {mockResultsCity.length} results for "<span className="text-[#d4f56a]">{searchQuery}</span>"
            </p>
            <div className="flex flex-col">
              {mockResultsCity.map((item, idx) => (
                <div key={item.id} className="flex gap-[9px] py-2 px-3 border-b border-[rgba(255,255,255,0.05)] cursor-pointer active:bg-white/5 transition-colors" style={{ opacity: 1 - (idx * 0.15) }}>
                  <div className="w-[38px] h-[50px] rounded-[8px] shrink-0 relative overflow-hidden" style={{ backgroundColor: item.bg }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <p className="text-[11px] font-medium text-white leading-[1.4] mb-[3px]">
                      {renderHighlightedText(item.question, searchQuery)}
                    </p>
                    <div className="flex items-center gap-[5px]">
                      <span className="text-[8px] px-[6px] py-[2px] rounded-[10px] border font-medium" style={{ borderColor: moodStyles[item.mood]?.border, color: moodStyles[item.mood]?.color }}>{item.mood}</span>
                      <span className="text-[9px] text-white/30">{item.answers} answers</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {screenState === 'results' && activeResultTab === 'People' && (
          <div className="flex flex-col animate-fade-in">
            <p className="text-[10px] text-white/25 px-3 pb-[6px] pt-1">
              {mockResultsRiya.length} results for "<span className="text-[#d4f56a]">{searchQuery}</span>"
            </p>
            <div className="flex flex-col">
              {mockResultsRiya.map(item => {
                const isFollowing = followedUsers.has(item.id);
                return (
                  <div key={item.id} className="flex items-center gap-[9px] py-2 px-3 border-b border-[rgba(255,255,255,0.05)]">
                    <div className="w-[36px] h-[36px] rounded-full shrink-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 border border-white/5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-white mb-[1px] truncate">
                        {renderHighlightedText(item.name, searchQuery)}
                      </p>
                      <p className="text-[10px] text-white/35 truncate">{item.handle} • {item.followers} followers</p>
                    </div>
                    <button
                      onClick={() => handleFollowToggle(item.id)}
                      className={`px-[12px] py-[4px] rounded-[20px] text-[10px] font-medium transition-colors shrink-0 ${isFollowing ? 'bg-transparent text-white/50 border border-white/15' : 'bg-white text-[#0c0c10] border border-white'}`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="h-[0.5px] bg-[rgba(255,255,255,0.07)] mx-3 my-[10px]" />
            <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 mb-2">People you might know</h3>
            <div className="flex flex-col">
              {[
                { id: 's1', name: 'Meera Talwar', handle: '@meera_t', followers: '1.1K' },
                { id: 's2', name: 'Rohan Desai', handle: '@rohan_d', followers: '678' }
              ].map(item => (
                <div key={item.id} className="flex items-center gap-[9px] py-2 px-3 border-b border-[rgba(255,255,255,0.05)]">
                  <div className="w-[36px] h-[36px] rounded-full shrink-0 bg-gradient-to-tr from-blue-500/30 to-green-500/30 border border-white/5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-white mb-[1px] truncate">{item.name}</p>
                    <p className="text-[10px] text-white/35 truncate">{item.handle} • {item.followers} followers</p>
                  </div>
                  <button className="px-[12px] py-[4px] rounded-[20px] text-[10px] font-medium transition-colors shrink-0 bg-white text-[#0c0c10] border border-white">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {screenState === 'no_results' && (
          <div className="flex flex-col animate-fade-in pt-7">
            <div className="flex flex-col items-center px-5 text-center mb-6">
              <div className="w-[44px] h-[44px] rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mb-4">
                <Search size={20} className="text-white/25" />
              </div>
              <h4 className="text-[13px] font-medium text-white mb-1">No results found</h4>
              <p className="text-[11px] text-white/35 leading-[1.5]">Nothing matched "{searchQuery}". Try a different word, or browse moods below.</p>
            </div>

            <div className="h-[0.5px] bg-[rgba(255,255,255,0.07)] mx-3 mb-[12px]" />

            <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 mb-2">Try searching for</h3>
            <div className="flex flex-wrap gap-[6px] px-3 mb-6">
              {["city", "trust", "loneliness", "healing", "home", "belonging"].map(keyword => (
                <button
                  key={keyword}
                  onClick={() => handleRecentTap(keyword)}
                  className="px-[13px] py-[6px] rounded-[20px] border border-white/10 bg-white/5 text-[10px] font-medium text-white/70 hover:bg-white/10 transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>

            <h3 className="text-[9px] font-semibold tracking-[0.08em] uppercase text-white/25 px-3 mb-[7px]">Trending instead</h3>
            <div className="px-3 flex flex-col">
              {exploreTrendingData.slice(0, 2).map((item) => (
                <div key={item.id} className="flex gap-2 py-2 border-b border-[rgba(255,255,255,0.05)] cursor-pointer active:bg-white/5 transition-colors">
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-[11px] font-medium text-white leading-[1.4] mb-[2px] line-clamp-2">{item.question}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-white/30">{item.answers} answers • {item.mood}</span>
                    </div>
                  </div>
                  <div className="w-[40px] h-[52px] rounded-[7px] shrink-0 relative overflow-hidden" style={{ backgroundColor: item.bg }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ReelSimulator = () => {
  const containerRef = useRef(null);

  const [step, setStep] = useState(0);
  const [thoughtText, setThoughtText] = useState("");
  const [audienceIndex, setAudienceIndex] = useState(0);
  const [selectedMood, setSelectedMood] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState(null);

  return (
    <section className="container mx-auto px-6 py-24 flex flex-col lg:flex-row-reverse items-center justify-center gap-16 lg:gap-24 overflow-hidden scroll-mt-10" id="feed" ref={containerRef}>

      {/* Right Side Content */}
      <div className="flex-1 text-center lg:text-left space-y-8 max-w-xl z-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold border border-indigo-100">
          <Sparkles size={16} /> Interactive Demo
        </div>
        <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] h-[140px] md:h-auto">
          {step === 1 ? (
            <>Next-Gen <br /><span className="text-gradient">Anonymity</span></>
          ) : (
            <>Immersive <br /><span className="text-gradient">Experience</span></>
          )}
        </h2>
        <p className="text-xl text-gray-500 font-medium h-[80px]">
          {step === 1
            ? "Experience a completely new standard for social media. Use the live demo to see how Mystify transforms anonymous interactions into a modern, premium visual format."
            : "Elevate your hidden thoughts with dynamic audio. Discover our advanced tools designed to turn basic Q&A into highly engaging, share-ready content."
          }
        </p>

        <div className="space-y-4 pt-8 text-left max-w-sm mx-auto lg:mx-0">
          {[
            { 
              icon: <Activity size={20} className="text-indigo-600" />,
              title: "Real-Time Interaction", 
              desc: "Tap and explore a fully functional build of the app's core loop.",
              color: "bg-indigo-50 border-indigo-100"
            },
            { 
              icon: <Sparkles size={20} className="text-pink-600" />,
              title: "Cinematic Alchemy", 
              desc: "Watch as your raw, hidden secrets magically transform into breathtaking visual masterpieces.",
              color: "bg-pink-50 border-pink-100"
            },
            { 
              icon: <Share2 size={20} className="text-amber-600" />,
              title: "Built for Virality", 
              desc: "Every creation is auto-formatted for maximum reach on TikTok and Reels.",
              color: "bg-amber-50 border-amber-100"
            }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 5, scale: 1.02 }}
              className="flex gap-5 items-start p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color} shadow-sm border`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Left Side - Dedicated Theme Selector Phone */}
      <div className="flex-1 w-full max-w-md mx-auto relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-[340px] h-[720px] rounded-[3.5rem] border-[14px] border-black bg-[#0c0c10] overflow-hidden shadow-2xl relative ring-1 ring-gray-200 flex flex-col font-sans"
        >
          <AnimatePresence>
            {step === 0 && (
              <LoginStep
                key="step-login"
                onNext={() => setStep(4)}
              />
            )}
            {step === 1 && (
              <ComposeStep
                key="step-compose"
                thoughtText={thoughtText}
                setThoughtText={setThoughtText}
                audienceIndex={audienceIndex}
                setAudienceIndex={setAudienceIndex}
                selectedMood={selectedMood}
                setSelectedMood={setSelectedMood}
                isAnonymous={isAnonymous}
                setIsAnonymous={setIsAnonymous}
                selectedVibe={selectedVibe}
                selectedMusic={selectedMusic}
                onAddVibe={() => setStep(2)}
                onNext={() => {
                  if (selectedVibe && selectedMusic) {
                    console.log("Posting...", { thoughtText, audienceIndex, selectedMood, isAnonymous, selectedVibe, selectedMusic });
                  } else {
                    setStep(2);
                  }
                }}
                onCancel={() => {
                  setThoughtText("");
                  setSelectedVibe(null);
                  setSelectedMusic(null);
                  setStep(4);
                }}
              />
            )}
            {step === 2 && (
              <SelectorStep
                key="step-vibe"
                stepId={2}
                title="Choose a vibe"
                data={vibeData}
                categories={vibeCategories}
                selectedItem={selectedVibe}
                onSelect={setSelectedVibe}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
                bottomLabel="Vibe"
              />
            )}
            {step === 3 && (
              <MusicStep
                key="step-music"
                stepId={3}
                selectedVibe={selectedVibe}
                selectedVibeCategory={vibeData.find(s => s.items.some(i => i.id === selectedVibe?.id) || s.extraItems?.some(i => i.id === selectedVibe?.id))?.category}
                data={musicData}
                categories={musicCategories}
                selectedMusic={selectedMusic}
                onSelectMusic={setSelectedMusic}
                onNext={() => setStep(1)}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && (
              <HomeStep key="step-home" />
            )}
            {step === 5 && (
              <ProfileStep key="step-profile" />
            )}
            {step === 6 && (
              <ExploreStep key="step-explore" />
            )}
            {step === 7 && (
              <ChatStep key="step-chat" />
            )}
          </AnimatePresence>

          {/* Bottom Navigation Bar */}
          {step > 0 && (
            <div className="absolute bottom-0 inset-x-0 bg-[#0d0d0d] border-t-[0.5px] border-[#1a1a1a] flex items-center justify-around px-0 z-50 pt-[12px] pb-[20px]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              <button onClick={() => setStep(4)} className={`flex flex-col items-center justify-center min-w-[50px] gap-[3px] cursor-pointer transition-colors ${step === 4 ? 'text-[#bebebe]' : 'text-[#333] hover:text-[#bebebe]'}`}>
                <Home size={20} strokeWidth={step === 4 ? 2.5 : 2} />
                <span className="text-[9px] font-medium">Home</span>
              </button>
              <button onClick={() => setStep(6)} className={`flex flex-col items-center justify-center min-w-[50px] gap-[3px] cursor-pointer transition-colors ${step === 6 ? 'text-[#bebebe]' : 'text-[#333] hover:text-[#bebebe]'}`}>
                <Search size={20} strokeWidth={step === 6 ? 2.5 : 2} />
                <span className="text-[9px] font-medium">Explore</span>
              </button>
              <button onClick={() => setStep(1)} className="flex flex-col items-center justify-center min-w-[50px] cursor-pointer transition-transform active:scale-95">
                <div className="w-[40px] h-[40px] bg-[#1e1e1e] border-[0.5px] border-[#2a2a2a] rounded-[12px] flex items-center justify-center mt-[-10px]">
                  <Plus size={18} className="text-[#888]" strokeWidth={2.5} />
                </div>
              </button>
              <button onClick={() => setStep(7)} className={`relative flex flex-col items-center justify-center min-w-[50px] gap-[3px] cursor-pointer transition-colors ${step === 7 ? 'text-[#bebebe]' : 'text-[#333] hover:text-[#bebebe]'}`}>
                <MessageCircle size={20} strokeWidth={step === 7 ? 2.5 : 2} />
                <span className="text-[9px] font-medium">Inbox</span>
                <div className="absolute top-[0px] right-[13px] w-[6px] h-[6px] rounded-full bg-[#d0d0d0] border-[1.5px] border-[#0d0d0d]" />
              </button>
              <button onClick={() => setStep(5)} className={`flex flex-col items-center justify-center min-w-[50px] gap-[3px] cursor-pointer transition-colors ${step === 5 ? 'text-[#bebebe]' : 'text-[#333] hover:text-[#bebebe]'}`}>
                <User size={20} strokeWidth={step === 5 ? 2.5 : 2} />
                <span className="text-[9px] font-medium">Profile</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ReelSimulator;
