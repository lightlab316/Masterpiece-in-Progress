/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Square, Headphones, FileText, ChevronUp, ChevronDown } from "lucide-react";
import { Artwork } from "../types";
import { AudioWaveform } from "./AudioWaveform";

interface AudioNarratorPanelProps {
  currentArtwork: Artwork | null;
  isPlaying: boolean;
  isPaused: boolean;
  onPlay: (artwork: Artwork) => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
}

export function AudioNarratorPanel({
  currentArtwork,
  isPlaying,
  isPaused,
  onPlay,
  onPause,
  onResume,
  onStop,
  speechRate,
  setSpeechRate,
}: AudioNarratorPanelProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Handle local volume mute toggling on Synthesis if needed
  useEffect(() => {
    if ("speechSynthesis" in window) {
      if (isMuted) {
        window.speechSynthesis.cancel(); // Quick mute stops the current audio
      } else if (currentArtwork && isPlaying && isPaused) {
        // Can resume
      }
    }
  }, [isMuted]);

  if (!currentArtwork) return null;

  return (
    <div
      id="floating-audio-narrator-panel"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full md:w-[380px] bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden transition-all duration-300 animate-slide-up text-stone-800"
    >
      {/* Target ambient colors dynamically based on painting theme */}
      <div 
        className="h-1 w-full bg-amber-500/80" 
        style={{ backgroundColor: currentArtwork.accentColor.replace('0.15', '0.8') || '#d97706' }} 
      />

      <div className="p-4" id="audio-panel-body">
        {/* Header containing meta */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-200/40">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] text-stone-400 font-sans tracking-[0.2em] uppercase font-light">Now Narrating</p>
              <h4 className="text-xs font-serif text-stone-800 tracking-widest uppercase">語音導解 • AUDIO GUIDE</h4>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <AudioWaveform isPlaying={isPlaying && !isPaused} color="bg-amber-600" size="sm" />
            <span className="text-[10px] font-mono text-amber-800 bg-amber-50 py-0.5 px-2 rounded border border-amber-200/60 font-bold">
              Nº {currentArtwork.id < 10 ? `0${currentArtwork.id}` : currentArtwork.id}
            </span>
          </div>
        </div>

        {/* Artwork Snapshot info */}
        <div className="flex gap-3 bg-stone-50 p-2 rounded-xl border border-stone-200/50 mb-3 items-center">
          <img
            src={currentArtwork.imageUrl}
            alt={currentArtwork.title}
            className="w-12 h-12 rounded-lg object-cover border border-stone-200 flex-shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0 flex-1">
            <h5 className="font-serif text-xs text-stone-950 truncate font-light tracking-wide">{currentArtwork.title}</h5>
            <p className="text-[10px] text-stone-500 truncate font-sans tracking-wide mt-0.5 uppercase">{currentArtwork.artist}</p>
          </div>
        </div>

        {/* Player Action Buttons */}
        <div className="flex items-center justify-between gap-2 bg-stone-50/80 p-1.5 rounded-lg border border-stone-200/60">
          <div className="flex items-center gap-1">
            {isPlaying && !isPaused ? (
              <button
                id="btn-voice-pause"
                onClick={onPause}
                title="暫停語音"
                className="p-2 bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-700 rounded-lg transition-all border border-stone-200/60 cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
              </button>
            ) : (
              <button
                id="btn-voice-play"
                onClick={() => {
                  if (isPlaying && isPaused) {
                    onResume();
                  } else {
                    onPlay(currentArtwork);
                  }
                }}
                title="播放語音"
                className="p-2 bg-amber-600 hover:bg-amber-500 active:scale-95 text-white rounded-lg transition-all border border-amber-600/30 shadow-[0_4px_12px_rgba(217,119,6,0.2)] cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
              </button>
            )}

            <button
              id="btn-voice-stop"
              onClick={onStop}
              title="停止導覽"
              className="p-2 bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-500 rounded-lg transition-all border border-stone-200/60 cursor-pointer"
            >
              <Square className="w-3 h-3 fill-current text-stone-500" />
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono pr-2 text-stone-500">
            <span>語速:</span>
            <select
              id="voice-speed-select"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="bg-white border border-stone-200/80 rounded px-1.5 py-0.5 text-stone-700 font-sans cursor-pointer focus:outline-none focus:border-amber-500 text-xs"
            >
              <option value={0.8}>0.8x</option>
              <option value={1.0}>1.0x (標準)</option>
              <option value={1.2}>1.2x</option>
              <option value={1.5}>1.5x</option>
            </select>
          </div>

          {/* Transcript show/hide & mute button */}
          <div className="flex gap-1">
            <button
              id="btn-toggle-transcript"
              onClick={() => setShowTranscript(!showTranscript)}
              title="查看文字導覽稿"
              className={`p-2 rounded-lg transition-all border cursor-pointer ${
                showTranscript
                  ? "bg-amber-50 text-amber-700 border-amber-300"
                  : "bg-stone-100 hover:bg-stone-200 border-stone-200/60 text-stone-500"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
            </button>

            <button
              id="btn-voice-mute"
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "取消靜音" : "靜音導覽"}
              className={`p-2 rounded-lg transition-all border cursor-pointer ${
                isMuted
                  ? "bg-red-50 text-red-700 border-red-300"
                  : "bg-stone-100 hover:bg-stone-200 border-stone-200/60 text-stone-500"
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Dynamic Transcript text box */}
        {showTranscript && (
          <div
            id="audio-transcript-box"
            className="mt-3 bg-stone-50 border border-stone-200/50 rounded-xl p-3 max-h-40 overflow-y-auto text-stone-700 animate-fade-in text-xs leading-relaxed font-sans"
          >
            <div className="flex items-center gap-1.5 mb-2 bg-white py-0.5 px-2 rounded w-fit text-[9px] text-amber-700 font-sans tracking-widest font-light uppercase border border-stone-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              導覽播報稿 TRANSCRIPT
            </div>
            <p className="tracking-wide text-stone-600 font-light leading-relaxed border-t border-stone-200/40 pt-2">{currentArtwork.audioScript}</p>
          </div>
        )}

        {/* Collapsible toggle info */}
        <div className="mt-3 flex justify-between items-center text-[9px] text-stone-400">
          <div className="flex items-center gap-1 font-sans uppercase tracking-[0.05em] font-light">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            Speech Engine Active
          </div>
          <button
            onClick={() => onStop()}
            className="hover:text-amber-700 font-light transition-colors uppercase tracking-[0.05em] cursor-pointer"
          >
            Close Guide 收起播報
          </button>
        </div>
      </div>
    </div>
  );
}
