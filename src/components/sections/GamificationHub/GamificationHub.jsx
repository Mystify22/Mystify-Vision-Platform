import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Trophy, Star, Crown, Zap } from 'lucide-react';

const GamificationHub = () => {
    const templates = [
        { id: 1, name: 'Galaxy', color: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black', unlocked: true },
        { id: 2, name: 'Sakura', color: 'bg-gradient-to-br from-pink-200 via-rose-100 to-red-100', unlocked: true },
        { id: 3, name: 'Glass', color: 'bg-white/20 backdrop-blur-xl border border-white', unlocked: false },
        { id: 4, name: 'Cyber', color: 'bg-gradient-to-br from-slate-900 to-gray-800 border border-cyan-500/30', unlocked: false },
        { id: 5, name: 'Minimal', color: 'bg-gray-50 border border-gray-200', unlocked: false },
        { id: 6, name: 'Ocean', color: 'bg-gradient-to-br from-cyan-100 to-blue-200', unlocked: false },
    ];

    const leaderboard = [
        { rank: 1, name: "Secret_User_01", points: "24,500", avatar: "👤", trend: "up" },
        { rank: 2, name: "Ghost_Writter", points: "21,200", avatar: "🥷", trend: "up" },
        { rank: 3, name: "Anony_Moose", points: "18,900", avatar: "🦌", trend: "same" }
    ];

    return (
        <section className="container mx-auto px-6 py-24 mb-20 scroll-mt-10" id="gamification">
            <div className="grid lg:grid-cols-2 gap-10">
                
                {/* Leaderboard Section */}
                <div className="glass-panel p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 blur-[80px] rounded-full pointer-events-none" />
                    
                    <div className="mb-10 text-center lg:text-left relative z-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-100 rounded-2xl mb-6 shadow-sm">
                            <Trophy className="text-yellow-600" size={28} />
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                            Mystify Legends
                        </h2>
                        <p className="text-gray-500 font-medium mt-3 max-w-sm mx-auto lg:mx-0">The most viral anonymous creators reshaping the platform this week.</p>
                    </div>

                    <div className="space-y-4 relative z-10">
                        {leaderboard.map((user, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ x: 8, scale: 1.01 }}
                                className="bg-white border border-gray-100 p-4 shrink-0 rounded-[1.5rem] flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-gray-100">
                                        {user.avatar}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-gray-900">{user.name}</p>
                                            {user.rank === 1 && <Crown size={16} className="text-yellow-500" />}
                                        </div>
                                        <p className="text-sm font-semibold text-gray-400 flex items-center gap-1">
                                           {user.points} PTS <Zap size={12} className="text-amber-400" fill="currentColor"/>
                                        </p>
                                    </div>
                                </div>
                                <div className="pr-4">
                                    <span className={`text-3xl font-black ${user.rank === 1 ? 'text-yellow-500' : 'text-gray-200'}`}>
                                        #{user.rank}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Template Gallery */}
                <div className="glass-panel p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
                    
                    <div className="mb-10 text-center lg:text-left relative z-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-2xl mb-6 shadow-sm border border-indigo-100">
                            <Star className="text-indigo-500" size={28} />
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                            Theme Gallery
                        </h2>
                        <p className="text-gray-500 font-medium mt-3 max-w-sm mx-auto lg:mx-0">Personalize your anonymous requests. Build your streak to unlock all themes.</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                        {templates.map((template) => (
                            <motion.div 
                                key={template.id}
                                whileHover={template.unlocked ? { scale: 1.05, y: -5 } : {}}
                                className={`relative aspect-square rounded-[1.5rem] overflow-hidden shadow-sm flex items-center justify-center ${template.color} ${!template.unlocked && 'grayscale opacity-60 cursor-not-allowed border-gray-200'} transition-all`}
                            >
                                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/20 to-transparent flex justify-center">
                                    <span className={`text-xs font-bold ${template.color.includes('900') || template.color.includes('gray-800') ? 'text-white' : 'text-gray-800'}`}>
                                        {template.name}
                                    </span>
                                </div>
                                
                                {!template.unlocked && (
                                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-2 text-center group">
                                        <Lock size={24} className="text-gray-500 mb-2 group-hover:scale-110 transition-transform" />
                                        <p className="text-[10px] text-gray-700 font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 px-2 py-1 rounded-md">Requires Streak</p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default GamificationHub;
