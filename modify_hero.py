import re

with open('/Users/arun/Documents/Mystify/Mystify-Vision-Platform/src/components/sections/Hero.jsx', 'r') as f:
    content = f.read()

# 1. Update imports
content = content.replace("import { motion } from 'framer-motion';", "import { motion, AnimatePresence } from 'framer-motion';")
content = content.replace("import { Sparkles, ArrowRight, Play, Heart, MessageCircle, Share2, User, Volume2, VolumeX, Music, Phone } from 'lucide-react';", "import { Sparkles, ArrowRight, Play, Heart, MessageCircle, Share2, User, Volume2, VolumeX, Music, Phone, X, Send } from 'lucide-react';")

# 2. Extract heroReels array and add commentsList
# First, find the heroReels declaration
match = re.search(r'const heroReels = \[(.*?)\];\n\n  useEffect', content, re.DOTALL)
if match:
    hero_reels_str = match.group(1)
    
    # Let's just define initialHeroReels at the top level
    initial_hero_reels_code = f"""
const initialHeroReels = [{hero_reels_str}];

# We will inject commentsList into each reel
"""

# Let's replace the inline heroReels entirely with state and inject commentsList.
comments_list_1 = """
    commentsList: [
      { id: 11, user: "mystik_creator", text: "Honestly, I just let my phone ring and then text them \\"what's up?\\" 🤷‍♂️😂", likes: 842, time: "2h", avatarFrom: "from-yellow-400", avatarTo: "to-pink-500" },
      { id: 12, user: "sarah_vibes", text: "Same here! Thought I was the only one that did this. 👀", likes: 256, time: "1h", avatarFrom: "from-cyan-400", avatarTo: "to-emerald-400" },
      { id: 13, user: "introvert_king", text: "Relatable levels are off the charts right now", likes: 89, time: "45m", avatarFrom: "from-purple-400", avatarTo: "to-indigo-500" },
      { id: 14, user: "anon_user_99", text: "I put my phone on DND 24/7 lol", likes: 12, time: "10m", avatarFrom: "from-gray-400", avatarTo: "to-gray-600" }
    ],"""
comments_list_2 = """
    commentsList: [
      { id: 21, user: "otaku_warrior", text: "Definitely the One Piece world! I want to set sail and search for the ultimate treasure. 🏴‍☠️🍖", likes: 532, time: "5h", avatarFrom: "from-red-500", avatarTo: "to-orange-500" },
      { id: 22, user: "ninja_way", text: "Naruto universe! Learning jutsu and exploring the hidden leaf. 🦊🍥", likes: 410, time: "3h", avatarFrom: "from-blue-400", avatarTo: "to-indigo-500" },
      { id: 23, user: "ghoul_boy", text: "Tokyo Ghoul... but as a human just trying to survive coffee shops ☕", likes: 120, time: "2h", avatarFrom: "from-stone-700", avatarTo: "to-zinc-900" }
    ],"""
comments_list_3 = """
    commentsList: [
      { id: 31, user: "code_ninja", text: "Using AI to write my boilerplate. Saves me like 10 hours a week! 🚀💻", likes: 1024, time: "1h", avatarFrom: "from-purple-500", avatarTo: "to-indigo-600" },
      { id: 32, user: "mac_addict", text: "Keyboard shortcuts for everything. If I touch the mouse, I lose. ⌨️🔥", likes: 890, time: "45m", avatarFrom: "from-green-400", avatarTo: "to-emerald-500" },
      { id: 33, user: "vim_user", text: "Vim. I still don't know how to exit, but my productivity is amazing.", likes: 450, time: "20m", avatarFrom: "from-emerald-400", avatarTo: "to-teal-600" }
    ],"""
comments_list_4 = """
    commentsList: [
      { id: 41, user: "chill_coder", text: "Ocean waves all day. Drowns out everything so I can just flow. 🌊🎧", likes: 620, time: "3h", avatarFrom: "from-blue-500", avatarTo: "to-cyan-500" },
      { id: 42, user: "lofi_girl", text: "Lofi hip hop beats to relax/study to. A classic. ☕📚", likes: 590, time: "2h", avatarFrom: "from-amber-400", avatarTo: "to-orange-500" },
      { id: 43, user: "noise_fan", text: "Brown noise is highly underrated 🤎", likes: 210, time: "1h", avatarFrom: "from-yellow-700", avatarTo: "to-amber-900" }
    ],"""
comments_list_5 = """
    commentsList: [
       { id: 51, user: "mall_rat", text: "Hitting the shops with friends! Love the energy of a busy mall. 🛍️✨", likes: 780, time: "6h", avatarFrom: "from-pink-500", avatarTo: "to-rose-500" },
       { id: 52, user: "coffee_lover", text: "Just people watching with an iced coffee. It's so peaceful in a weird way. ☕🚶", likes: 640, time: "5h", avatarFrom: "from-fuchsia-400", avatarTo: "to-purple-500" },
       { id: 53, user: "couch_potato", text: "Binge watching 3 seasons of a show without moving", likes: 1100, time: "4h", avatarFrom: "from-orange-300", avatarTo: "to-rose-400" }
    ],"""

content = content.replace('likes: "12",\n      comments: "4.2K",', f'{comments_list_1}\n      likes: "12",\n      comments: "4.2K",')
content = content.replace('likes: "15.8",\n      comments: "1.2K",', f'{comments_list_2}\n      likes: "15.8",\n      comments: "1.2K",')
content = content.replace('likes: "24.5",\n      comments: "3.1K",', f'{comments_list_3}\n      likes: "24.5",\n      comments: "3.1K",')
content = content.replace('likes: "18.2",\n      comments: "1.5K",', f'{comments_list_4}\n      likes: "18.2",\n      comments: "1.5K",')
content = content.replace('likes: "21.4",\n      comments: "2.8K",', f'{comments_list_5}\n      likes: "21.4",\n      comments: "2.8K",')

# Rename heroReels to initialHeroReels and pull it outside
content = content.replace('const heroReels = [', 'const initialHeroReels = [')
content = re.sub(r'const initialHeroReels = \[(.*?)\];', '];', content, flags=re.DOTALL) # wait this will fail.

