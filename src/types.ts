/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Artwork {
  id: number; // 1 to 12
  title: string;
  artist: string;
  year: string;
  imageUrl: string;
  descriptionZh: string;
  descriptionEn: string;
  wallId: number; // 0: North, 1: East, 2: South, 3: West
  hasAudioGuide: boolean;
  aspectRatio: "portrait" | "landscape" | "square";
  accentColor: string; // Tailwind hex or class color for ambient glows
  audioScript: string;
}

export interface WallData {
  id: number;
  nameZh: string;
  nameEn: string;
  direction: string; // N, E, S, W
  descriptionZh: string;
  descriptionEn: string;
  artworks: Artwork[];
  wallColor: string; // Custom background styling class
}

export interface AudioState {
  isPlaying: boolean;
  isPaused: boolean;
  currentArtworkId: number | null;
  progress: number; // 0 to 100 representing mock speech time
}
