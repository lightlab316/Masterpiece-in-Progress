/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Compass, Sparkles } from "lucide-react";

interface ExhibitionCompassProps {
  activeIndex: number;
  onSelectWall: (index: number) => void;
}

export function ExhibitionCompass({ activeIndex, onSelectWall }: ExhibitionCompassProps) {
  const coordinates = [
    { label: "北", full: "北面牆: 自然的低語", direction: "N", index: 0 },
    { label: "東", full: "東面牆: 抽象多維", direction: "E", index: 1 },
    { label: "南", full: "南面牆: 人間容顏", direction: "S", index: 2 },
    { label: "西", full: "西面牆: 構築幾何", direction: "W", index: 3 },
  ];

  return (
    <div
      id="exhibition-compass-navigation"
      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur-md border border-stone-200/60 rounded-2xl shadow-md max-w-2xl mx-auto mb-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center border border-amber-200/50 shadow-[0_4px_10px_rgba(197,168,128,0.15)] animate-pulse">
          <Compass className="w-4.5 h-4.5" />
        </div>
        <div>
          <h2 className="text-xs font-serif tracking-[0.1em] text-stone-800">展廳羅盤導航</h2>
          <p className="text-[9px] text-stone-400 font-sans tracking-[0.2em] font-light">DIGITAL COMPASS INDEX</p>
        </div>
      </div>

      {/* Actual Clickable coordinates */}
      <div className="flex items-center gap-1.5 md:gap-3">
        {coordinates.map((coord) => {
          const isActive = activeIndex === coord.index;
          return (
            <button
              id={`compass-coordinate-${coord.direction}`}
              key={coord.direction}
              onClick={() => onSelectWall(coord.index)}
              className={`relative px-3 py-1.5 rounded-xl border text-xs font-sans select-none transition-all duration-300 active:scale-95 cursor-pointer ${
                isActive
                  ? "bg-amber-50 border-amber-300 text-amber-800 font-medium shadow-[0_5px_15px_rgba(197,168,128,0.15)] scale-103"
                  : "bg-stone-50/50 hover:bg-white border-stone-200 text-stone-500 hover:text-stone-850"
              }`}
            >
              <div className="flex items-center gap-1.5 label-indicator">
                <span className="font-mono text-[10px] tracking-widest">{coord.direction}</span>
                <span className="font-light">{coord.label}</span>
                {isActive && (
                  <Sparkles className="w-3 h-3 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Indicator of Active Direction Theme name */}
      <div className="hidden md:block border-l border-stone-200 pl-4 py-1 text-right">
        <p className="text-[9px] text-stone-400 font-sans tracking-[0.15em] uppercase">Focus Gallery</p>
        <p className="text-xs font-serif font-light text-amber-800 mt-0.5 italic">
          {coordinates[activeIndex].full}
        </p>
      </div>
    </div>
  );
}
