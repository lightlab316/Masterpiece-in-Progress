/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Headphones, Play, Pause } from "lucide-react";
import { Artwork } from "../types";

// Helper to get matching physical paper index from photo
export const getPosterNum = (id: number): string => {
  if (id === 5) return "11";
  if (id === 6) return "12";
  if (id === 7) return "13";
  if (id === 8) return "14";
  if (id === 9) return "15";
  if (id === 10) return "16";
  if (id === 11) return "17";
  if (id === 12) return "18";
  if (id === 13) return "19";
  if (id === 14) return "20";
  if (id === 20) return "21";
  if (id === 21) return "22";
  if (id === 22) return "23";
  
  if (id === 1) return "01";
  if (id === 2) return "02";
  if (id === 3) return "03";
  if (id === 4) return "04";
  if (id === 15) return "05";
  if (id === 16) return "06";
  if (id === 17) return "07";
  if (id === 18) return "08";
  if (id === 19) return "09";
  return String(id).padStart(2, "0");
};

interface ArtworkCardProps {
  key?: number;
  artwork: Artwork;
  isFocused: boolean;
  isPlayingAudio: boolean;
  isPausedAudio: boolean;
  onSelect: (artwork: Artwork) => void;
  onAudioToggle: (e: any, artwork: Artwork) => void;
}

export function ArtworkCard({
  artwork,
  isFocused,
  isPlayingAudio,
  isPausedAudio,
  onSelect,
  onAudioToggle,
}: ArtworkCardProps) {
  const isTextCard = [6, 7, 10, 11, 12, 14, 20, 21, 22].includes(artwork.id);
  const posterNum = getPosterNum(artwork.id);

  // Layout aspect ratio matches physical paper pages
  const aspectRatioClass =
    artwork.aspectRatio === "landscape"
      ? "aspect-[4/3] w-80 md:w-96"
      : "aspect-[3/4] w-64 md:w-76";

  return (
    <div
      id={`artwork-card-id-${artwork.id}`}
      onClick={() => onSelect(artwork)}
      className={`group relative flex flex-col items-center flex-shrink-0 transition-all duration-500 ease-out cursor-zoom-in select-none ${
        isFocused 
          ? "scale-[1.03] z-20" 
          : "hover:scale-[1.015]"
      }`}
    >
      {/* Dynamic Warm Ambient Behind the Sheets (simulating wall reflections) */}
      <div
        className="absolute inset-x-4 inset-y-8 rounded-lg blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-1000 -z-10 pointer-events-none"
        style={{ backgroundColor: artwork.accentColor || "rgba(224, 215, 196, 0.4)" }}
      />

      {/* The Physical Paper Board container with glossy plastic pocket sleeve behavior */}
      <div
        className={`${aspectRatioClass} relative bg-white border border-stone-200 poster-mounted-shadow rounded-sm transition-all duration-500 glossy-sheen ${
          isFocused 
            ? "ring-2 ring-amber-500/40 shadow-[0_20px_45px_rgba(40,30,10,0.18)]" 
            : ""
        }`}
      >
        {/* Physical Sheet Border Frame inside */}
        <div className="w-full h-full p-4 md:p-5 flex flex-col justify-between items-stretch">
          {/* Top Row: Index number box on top left + play button on right */}
          <div className="flex items-center justify-between mb-2 z-20">
            {/* Museum Serial Key (11, 12 etc) styled exactly like those physical paper headers! */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-black/80 text-black font-sans font-bold text-xs sm:text-sm rounded-sm bg-white">
              {posterNum}
            </div>

            {/* Title / Section watermark */}
            <span className="text-[9px] text-stone-400 font-sans tracking-[0.2em] uppercase truncate max-w-[120px]">
              {artwork.hasAudioGuide ? "Audio • 指導學" : "Exhibition"}
            </span>

            {/* Audio Guide Play action button */}
            {artwork.hasAudioGuide && (
              <button
                id={`card-audio-btn-${artwork.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onAudioToggle(e, artwork);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${
                  isPlayingAudio && !isPausedAudio
                    ? "bg-amber-600 border-amber-500 text-white scale-110 shadow-md animate-pulse"
                    : "bg-stone-50 hover:bg-stone-100 border-stone-300 text-stone-600 hover:text-amber-800"
                }`}
                title={isPlayingAudio ? "暫停導覽語音" : "播放語音導覽"}
              >
                {isPlayingAudio && !isPausedAudio ? (
                  <Pause className="w-2.5 h-2.5 fill-current" />
                ) : (
                  <Play className="w-2.5 h-2.5 fill-current text-stone-500 hover:text-amber-700" />
                )}
              </button>
            )}
          </div>

          {/* MAIN CONTENT INNER WRAPPER based on Text-only vs Image-heavy posters */}
          <div className="flex-1 flex flex-col justify-center overflow-hidden">
            {isTextCard ? (
              // TEXT QUOTE POSTER (mimicking 12, 13, 16, 17, 18, 20, 21, 22, 23)
              <div className="w-full h-full border border-stone-200/90 rounded-sm bg-[#FCFAF6]/60 p-3 flex flex-col justify-between relative overflow-hidden">
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <h4 className="text-xs sm:text-sm font-serif font-semibold text-stone-800 tracking-wider mb-2">
                    {artwork.title}
                  </h4>
                  <p className="text-[11px] sm:text-[12px] leading-relaxed text-stone-600 font-sans tracking-wide max-w-xs overflow-y-auto max-h-[140px] px-1 text-justify select-text">
                    {artwork.descriptionZh}
                  </p>
                </div>
                {/* Author or metadata watermark at bottom of text block */}
                <div className="text-center pt-2 border-t border-stone-150/50">
                  <span className="text-[8px] sm:text-[9px] text-stone-400 font-sans uppercase tracking-[0.15em] italic">
                    {artwork.artist} • {artwork.year}
                  </span>
                </div>
              </div>
            ) : (
              // IMAGE FOCUS POSTER (mimicking 11, 14, 15, 19)
              <div className="w-full h-full flex flex-col justify-between items-stretch">
                {/* Rounded framed photo container */}
                <div className="flex-1 rounded-sm border border-stone-200 bg-stone-50 overflow-hidden relative">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-full object-cover grayscale-[2%] brightness-[98%] group-hover:scale-102 transition-transform duration-700 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle inner shadow inside the picture frame */}
                  <div className="absolute inset-0 shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)] pointer-events-none" />
                </div>
                {/* Brief captions underneath pictured sheet */}
                <div className="mt-2 text-center">
                  <h5 className="text-[11px] sm:text-xs font-serif font-bold text-stone-800 tracking-wide truncate">
                    {artwork.title}
                  </h5>
                  <p className="text-[8px] sm:text-[9px] text-stone-400 font-sans capitalize tracking-wider mt-0.5 truncate">
                    {artwork.artist} • {artwork.year}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom subtle watermark or tag indicating "Masterpiece" */}
          <div className="flex justify-between items-center mt-2.5 pt-1.5 border-t border-stone-150/40 text-[8px] text-stone-400 font-sans tracking-widest uppercase">
            <span>{isTextCard ? "CLASS DISCUSSION" : "PHOTOGRAPHIC PRINT"}</span>
          </div>
        </div>
      </div>

      {/* Hover Floating Guide Trigger */}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-1 text-[9px] font-sans text-amber-800 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-full shadow-xs">
        點擊放大賞析 • Click to Explore
      </span>
    </div>
  );
}
