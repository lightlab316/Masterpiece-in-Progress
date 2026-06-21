/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Headphones, Play, Pause, Square, MapPin, Globe, Compass, Keyboard, Star } from "lucide-react";
import { Artwork } from "../types";
import { EXHIBITION_WALLS } from "../data";
import { getPosterNum } from "./ArtworkCard";

interface ArtworkDetailModalProps {
  artwork: Artwork;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isPlayingAudio: boolean;
  isPausedAudio: boolean;
  onPlay: (artwork: Artwork) => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export function ArtworkDetailModal({
  artwork,
  onClose,
  onNext,
  onPrev,
  isPlayingAudio,
  isPausedAudio,
  onPlay,
  onPause,
  onResume,
  onStop,
  isFavorite = false,
  onToggleFavorite,
}: ArtworkDetailModalProps) {
  const [langTab, setLangTab] = useState<"zh" | "en">("zh");

  // Get direction description
  const getDirectionText = (wallId: number) => {
    switch (wallId) {
      case 0:
        return "北面牆 ─ 自然的低語 (N)";
      case 1:
        return "東面牆 ─ 抽象與多維 (E)";
      case 2:
        return "南面牆 ─ 人間百態 (S)";
      case 3:
        return "西面牆 ─ 構築光影 (W)";
      default:
        return "特展區";
    }
  };

  return (
    <div
      id="artwork-detail-modal-overlay"
      className="fixed inset-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      {/* film grain overlay inside modal */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay grain-noise-bg z-40" />

      {/* Absolute Header Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-50">
        <div className="bg-white/90 backdrop-blur-md border border-stone-200/80 text-stone-700 py-1.5 px-3.5 rounded-full flex items-center gap-2 text-[10px] font-sans tracking-widest uppercase font-light shadow-sm">
          <Compass className="w-3.5 h-3.5 text-amber-700 animate-spin" style={{ animationDuration: "12s" }} />
          <span>展位: {getDirectionText(artwork.wallId)}</span>
        </div>

        <button
          id="btn-close-modal"
          onClick={onClose}
          className="p-2.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 hover:text-amber-700 rounded-full transition-all active:scale-90 shadow-sm cursor-pointer"
          title="返回展廳 (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Modal Container */}
      <div
        id="artwork-detail-modal-container"
        className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(197,168,128,0.15)] border border-stone-200/80 relative flex flex-col md:flex-row min-h-[480px] my-8 text-stone-800 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT COMPONENT: Large Image with Next/Prev Carousel Controls */}
        <div className="md:w-[55%] bg-stone-50/50 relative flex items-center justify-center p-6 md:p-12 min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-stone-150">
          {/* Spotlight aura beneath painting */}
          <div
            className="absolute inset-[15%] rounded-full blur-[80px] opacity-15 pointer-events-none"
            style={{ backgroundColor: artwork.accentColor || "rgba(197,168,128,0.15)" }}
          />

          {/* Quick Arrow Left */}
          <button
            id="btn-modal-prev"
            onClick={onPrev}
            className="absolute left-4 p-3 rounded-full bg-white/80 hover:bg-white border border-stone-200 hover:border-amber-300 text-stone-500 hover:text-amber-800 transition-all z-20 active:scale-95 shadow-md cursor-pointer"
            title="前一幅展品 (←)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Picture Box */}
          <div className="relative max-h-[70vh] rounded-md border border-stone-200/80 bg-white shadow-xl overflow-hidden max-w-full p-2">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="max-h-[55vh] w-auto max-w-full object-contain pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* Spotlight shimmer */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-500/5 via-transparent to-white/10 pointer-events-none" />
          </div>

          {/* Quick Arrow Right */}
          <button
            id="btn-modal-next"
            onClick={onNext}
            className="absolute right-4 p-3 rounded-full bg-white/80 hover:bg-white border border-stone-200 hover:border-amber-300 text-stone-500 hover:text-amber-800 transition-all z-20 active:scale-95 shadow-md cursor-pointer"
            title="下一幅展品 (→)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Sequential indicator tag */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 text-stone-550 font-sans tracking-wider text-[10px] px-3 py-1 rounded-full border border-stone-200 uppercase shadow-sm">
            展品編號: Nº {getPosterNum(artwork.id)} / {EXHIBITION_WALLS.flatMap(w => w.artworks).length} Masterpieces
          </div>
        </div>

        {/* RIGHT COMPONENT: Fine Art Descriptions & Audio Guide player */}
        <div className="md:w-[45%] p-6 md:p-10 flex flex-col justify-between" id="modal-details-side">
          <div>
            {/* Lang Tab toggle */}
            <div className="flex justify-between items-center mb-5 border-b border-stone-150 pb-3.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-sans tracking-widest text-amber-800 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1 flex items-center gap-1 uppercase font-medium">
                  <Globe className="w-3 h-3 text-amber-600" />
                  EXHIBITION CARD
                </span>
                {onToggleFavorite && (
                  <button
                    onClick={() => onToggleFavorite(artwork.id)}
                    className={`p-1.5 rounded-full border transition-all active:scale-90 cursor-pointer ${
                      isFavorite 
                        ? "bg-amber-500/10 border-amber-300 text-amber-750 shadow-xs" 
                        : "bg-stone-50 border-stone-200 text-stone-400 hover:text-amber-600 hover:border-amber-300"
                    }`}
                    title={isFavorite ? "取消收藏" : "加入我的收藏"}
                  >
                    <Star className={`w-3.5 h-3.5 ${isFavorite ? "fill-amber-500 text-amber-500" : ""}`} />
                  </button>
                )}
              </div>
              <div className="flex gap-1 bg-stone-50 p-1 border border-stone-200 rounded-lg">
                <button
                  onClick={() => setLangTab("zh")}
                  className={`text-[10px] tracking-widest px-3 py-1 rounded-md font-sans transition-all cursor-pointer ${
                    langTab === "zh"
                      ? "bg-amber-50 border-amber-300 text-amber-800 font-medium"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  繁體中文
                </button>
                <button
                  onClick={() => setLangTab("en")}
                  className={`text-[10px] tracking-widest px-3 py-1 rounded-md font-sans transition-all cursor-pointer ${
                    langTab === "en"
                      ? "bg-amber-50 border-amber-300 text-amber-800 font-medium"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  ENGLISH
                </button>
              </div>
            </div>

            {/* Core Artwork Metadata */}
            <div className="mb-4">
              <span className="text-[10px] text-amber-800 font-mono tracking-wider bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded uppercase font-medium">
                Nº {artwork.id < 10 ? `0${artwork.id}` : artwork.id}
              </span>
              <h1 className="text-2xl font-serif font-light text-stone-900 tracking-wide mt-2.5">
                {langTab === "zh" ? artwork.title : artwork.descriptionEn ? artwork.title : "Untitled"}
              </h1>
              <p className="text-xs text-stone-500 mt-1 uppercase tracking-widest font-sans font-light">
                {artwork.artist} <span className="text-stone-400">• {artwork.year}</span>
              </p>
            </div>

            {/* Visual Specs / Location info */}
            <div className="grid grid-cols-2 gap-2 bg-stone-50 border border-stone-150 p-2.5 rounded-xl mb-4 text-xs font-sans font-light">
              <div className="flex items-center gap-1.5 text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                <span className="truncate">牆位: {artwork.wallId === 0 ? "北" : artwork.wallId === 1 ? "東" : artwork.wallId === 2 ? "南" : "西"}面牆 (Nº {getPosterNum(artwork.id)})</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-600">
                <Keyboard className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                <span className="truncate">快捷鍵: {[1,2,3,4,5,6,7,8,9].includes(artwork.id) ? artwork.id : artwork.id === 10 ? 0 : "無 (輪播選取)"}</span>
              </div>
            </div>

            {/* Description script */}
            <div className="text-stone-700 text-sm leading-relaxed max-h-48 overflow-y-auto pr-1">
              {langTab === "zh" ? (
                <p className="tracking-wide break-words font-sans font-light leading-relaxed">{artwork.descriptionZh}</p>
              ) : (
                <p className="font-sans font-light leading-relaxed text-stone-500 break-words">{artwork.descriptionEn}</p>
              )}
            </div>
          </div>

          {/* BOTTOM AUDIO NARRATOR QUICK TOGGLE CONTAINER */}
          {artwork.hasAudioGuide && (
            <div className="mt-6 border-t border-stone-150 pt-5">
              <div className="flex items-center justify-between gap-4 bg-stone-50 p-3 rounded-xl border border-stone-200/60 shadow-inner">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full border ${isPlayingAudio && !isPausedAudio ? 'bg-amber-50 border-amber-305 text-amber-700 animate-pulse' : 'bg-white border-stone-200 text-stone-400'}`}>
                    <Headphones className={`w-4 h-4 ${isPlayingAudio && !isPausedAudio ? 'animate-bounce' : ''}`} />
                  </div>
                  <div>
                    <p className="text-[9px] text-stone-400 font-sans tracking-widest">INTELLIGENT VOICE</p>
                    <p className="text-xs font-serif text-stone-800 tracking-widest uppercase font-light mt-0.5">
                      {isPlayingAudio ? (isPausedAudio ? "導覽已暫停" : "導覽播音中...") : "點擊啟動語音解解"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {isPlayingAudio && !isPausedAudio ? (
                    <button
                      id="modal-audio-btn-pause"
                      onClick={onPause}
                      className="p-2 bg-white hover:bg-stone-50 text-stone-700 rounded-lg active:scale-95 transition border border-stone-200 cursor-pointer shadow-sm"
                      title="暫停"
                    >
                      <Pause className="w-4 h-4 fill-current text-stone-700" />
                    </button>
                  ) : (
                    <button
                      id="modal-audio-btn-play"
                      onClick={() => {
                        if (isPlayingAudio && isPausedAudio) {
                          onResume();
                        } else {
                          onPlay(artwork);
                        }
                      }}
                      className="p-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg active:scale-95 transition border border-amber-600/30 shadow-[0_4px_12px_rgba(217,119,6,0.15)] cursor-pointer"
                      title="播放"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                  )}

                  <button
                    id="modal-audio-btn-stop"
                    onClick={onStop}
                    className="p-2 bg-white hover:bg-stone-50 text-stone-500 rounded-lg active:scale-95 transition border border-stone-200 cursor-pointer shadow-sm"
                    title="關閉"
                  >
                    <Square className="w-3.5 h-3.5 fill-current text-stone-550" />
                  </button>
                </div>
              </div>

              {/* Tips for Keyboard cycling */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[9px] text-stone-400 tracking-wider font-sans uppercase font-light">
                <span className="px-1.5 py-0.5 bg-stone-100 border border-stone-200 text-stone-500 rounded-md font-mono text-[9px]">←</span>
                <span>/</span>
                <span className="px-1.5 py-0.5 bg-stone-100 border border-stone-200 text-stone-500 rounded-md font-mono text-[9px]">→</span>
                <span>展品輪播</span>
                <span className="mx-1">•</span>
                <span className="px-1.5 py-0.5 bg-stone-100 border border-stone-200 text-stone-500 rounded-md font-mono text-[9px]">Esc</span>
                <span>退出</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
