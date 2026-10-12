
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { exploreGridItems } from './MockData';

export default function ArchiveScreen({ onBack, onPostClick }) {
  const archivedReels = Array.isArray(exploreGridItems)
    ? exploreGridItems
    : [];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#0c0c10] text-white">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex items-center justify-center"
        >
          <ChevronLeft size={24} />
        </button>

        <h2 className="text-lg font-semibold">Archived</h2>
      </div>

      {/* Vibes Grid */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid grid-cols-3 gap-[3px] auto-rows-[190px] grid-flow-dense pb-[3px] px-0 animate-fade-in pt-1">
          {archivedReels.map((item, index) => (
            <div
              key={item.id || index}
              onClick={() => {
                console.log('Thumbnail clicked:', item);

                if (typeof onPostClick === 'function') {
                  onPostClick(item);
                } else {
                  console.error(
                    'onPostClick was not passed to ArchiveScreen'
                  );
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open reel ${
                item.title || item.id || index + 1
              }`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPostClick?.(item);
                }
              }}
              className="relative cursor-pointer active:scale-[0.98] transition-all duration-300 overflow-hidden shadow-lg"
            >
              <motion.div
                animate={{
                  scale: [1.05, 1.15, 1.05],
                  backgroundPosition: [
                    '50% 50%',
                    '60% 40%',
                    '50% 50%',
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: 'linear',
                  delay: (index * 0.4) % 4,
                }}
                className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
                style={{
                  backgroundImage: `url(${
                    item.img ||
                    item.bgImage ||
                    item.avatarImage ||
                    ''
                  })`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 z-10 pointer-events-none transition-colors duration-300" />

              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 z-20 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
