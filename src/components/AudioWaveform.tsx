/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface AudioWaveformProps {
  isPlaying: boolean;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export function AudioWaveform({ isPlaying, color = "bg-amber-600", size = "md" }: AudioWaveformProps) {
  const bars = Array.from({ length: size === "lg" ? 18 : size === "md" ? 12 : 6 });

  return (
    <div className="flex items-end justify-center gap-[3px] h-6 px-1" id="audio-waveform-container">
      {bars.map((_, i) => {
        // Create variations of speed and height for each bar
        const rHeight = [24, 12, 18, 8, 22, 14, 20, 10, 16, 22, 10, 18, 14, 22][i % 14];
        const rDuration = ["0.8s", "0.5s", "0.7s", "0.9s", "0.6s", "0.8s", "0.5s"][i % 7];
        const rDelay = ["0.1s", "0.3s", "0s", "0.4s", "0.2s", "0s", "0.5s"][i % 7];

        return (
          <div
            key={i}
            id={`audio-wave-bar-${i}`}
            className={`w-[3px] rounded-t-sm ${color} transition-all duration-300`}
            style={{
              height: isPlaying ? `${rHeight}px` : "3px",
              animation: isPlaying ? `waveMotion ${rDuration} ease-in-out infinite alternate` : "none",
              animationDelay: isPlaying ? rDelay : "0s",
            }}
          />
        );
      })}
      <style>{`
        @keyframes waveMotion {
          0% {
            transform: scaleY(0.15);
          }
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
}
