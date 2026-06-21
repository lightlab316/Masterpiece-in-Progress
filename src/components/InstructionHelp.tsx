/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Keyboard, MousePointer, Volume2, MoveHorizontal, X, HelpCircle, Key, ArrowRightLeft } from "lucide-react";

export function InstructionHelp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Help Trigger Button */}
      <button
        id="btn-toggle-help"
        onClick={() => setIsOpen(true)}
        className="fixed top-24 right-6 z-40 bg-white/90 backdrop-blur-md hover:bg-white border border-stone-200 hover:border-amber-300 shadow-md p-2.5 rounded-full text-stone-600 hover:text-amber-800 active:scale-95 transition-all flex items-center gap-1.5 font-light text-[10px] tracking-widest uppercase font-sans cursor-pointer"
        aria-label="展覽導覽說明"
      >
        <HelpCircle className="w-4 h-4 text-amber-600 animate-pulse" />
        <span className="hidden md:inline">觀展指南 • GUIDE</span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          id="help-drawer-overlay"
          className="fixed inset-0 z-50 bg-stone-900/15 backdrop-blur-xs transition-opacity flex justify-end"
          onClick={() => setIsOpen(false)}
        >
          {/* Drawer Body */}
          <div
            id="help-drawer-body"
            className="w-full max-w-sm bg-white text-stone-700 h-full shadow-2xl p-6 relative flex flex-col overflow-y-auto animate-slide-left border-l border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200/85 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Keyboard className="w-4.5 h-4.5 text-amber-700" />
                <h3 className="font-serif font-light text-sm tracking-widest text-stone-900 uppercase">觀展指南 • GUIDE BOOK</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-stone-50 rounded-lg text-stone-400 hover:text-stone-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gesture Guide Section */}
            <div className="space-y-4 flex-1">
              <div>
                <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-amber-800 font-semibold mb-3">
                  基底操作 ─ 漫步與發現
                </h4>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start bg-stone-50 p-3 rounded-xl border border-stone-150 shadow-inner">
                    <div className="mt-0.5 bg-amber-50 text-amber-700 p-1.5 rounded-lg border border-amber-200/50">
                      <MoveHorizontal className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-serif text-xs text-stone-900 tracking-wide font-light">滑動/拖拽整面牆</p>
                      <p className="text-[11px] text-stone-500 font-sans font-light leading-relaxed mt-1">
                        按住滑鼠左鍵並向左或向右拖曳，或是以手指於觸控螢幕上左右撥動，即可流暢切換多面不同的展示牆。
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start bg-stone-50 p-3 rounded-xl border border-stone-150 shadow-inner">
                    <div className="mt-0.5 bg-amber-50 text-amber-700 p-1.5 rounded-lg border border-amber-200/50">
                      <MousePointer className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-serif text-xs text-stone-900 tracking-wide font-light">點擊展品 放大賞析</p>
                      <p className="text-[11px] text-stone-500 font-sans font-light leading-relaxed mt-1">
                        點擊牆上懸掛的任何一幅照片都可以打開畫框，獲取精緻聚焦的無遮蔽畫面、以及由藝術家為您撰寫的主題。
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start bg-stone-50 p-3 rounded-xl border border-stone-150 shadow-inner">
                    <div className="mt-0.5 bg-amber-50 text-amber-700 p-1.5 rounded-lg border border-amber-200/50">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-serif text-xs text-stone-900 tracking-wide font-light">雙語音聲導覽</p>
                      <p className="text-[11px] text-stone-500 font-sans font-light leading-relaxed mt-1">
                        展品畫框標有耳機符號代表有語音解說，點擊圖示後將呼叫瀏覽器的發音引擎，直接語音播報其創作故事。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keyboard shortcut section */}
              <div>
                <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-amber-800 font-semibold mb-3">
                  快捷操作 ─ 精準漫遊 KEYBOARD OPTIONS
                </h4>
                <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200/60 shadow-inner font-sans font-light">
                  <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-stone-200/60 uppercase tracking-wider text-stone-400 my-1">
                    <span>鍵按鍵 KEYPRESS</span>
                    <span>對應展品 ACTION</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <div className="flex gap-1">
                      <kbd className="px-2 py-0.5 bg-white text-amber-800 rounded-md border border-stone-250 text-[10px] font-mono font-bold">1</kbd>
                      <span className="text-stone-400">~</span>
                      <kbd className="px-2 py-0.5 bg-white text-amber-800 rounded-md border border-stone-250 text-[10px] font-mono font-bold">9</kbd>
                    </div>
                    <span className="text-stone-600">瞬間跳躍並放大展品 #1 - #9</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-stone-200/60">
                    <kbd className="px-2 py-0.5 bg-white text-amber-800 rounded-md border border-stone-250 text-[10px] font-mono font-bold">0</kbd>
                    <span className="text-stone-600">瞬間跳躍並放大展品 #10</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px]">
                    <div className="flex gap-1">
                      <kbd className="px-1 py-0.5 bg-white text-stone-500 rounded-md border border-stone-250 text-[10px] font-mono">←</kbd>
                      <kbd className="px-1 py-0.5 bg-white text-stone-500 rounded-md border border-stone-250 text-[10px] font-mono">→</kbd>
                    </div>
                    <span className="text-stone-600">放大時可前後輪播</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <kbd className="px-2.5 py-0.5 bg-white text-stone-500 rounded-md border border-stone-250 text-[10px] font-mono">Esc</kbd>
                    <span className="text-stone-600">返回大廳牆面</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-stone-200 pt-3 mt-4 text-[10px] text-stone-400 flex flex-col items-center gap-1.5 text-center">
              <p className="font-sans tracking-widest uppercase text-[9px] font-light">AURA VIRTUAL MUSEUM © 2026</p>
              <p className="text-[9px] text-amber-700/60 font-sans font-light">Supported with Speech Engines</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
