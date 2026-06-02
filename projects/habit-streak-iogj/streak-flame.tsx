"use client";

interface StreakFlameProps {
  streak: number;
  animate: boolean;
}

export function StreakFlame({ streak, animate }: StreakFlameProps) {
  const intensity = Math.min(streak, 7);
  const height = 24 + intensity * 6;

  return (
    <div
      className={`relative flex items-end justify-center transition-transform duration-300 ${
        animate ? "scale-125 -translate-y-1" : ""
      }`}
      aria-hidden
    >
      <svg
        width="36"
        height={height + 8}
        viewBox={`0 0 36 ${height + 8}`}
        className={`overflow-visible transition-all duration-500 ${
          animate ? "animate-pulse" : ""
        }`}
      >
        <defs>
          <linearGradient id="flame-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        <path
          d={`M18 ${height + 4} C10 ${height - 4}, 6 ${height * 0.5}, 12 ${height * 0.35} C14 ${height * 0.15}, 16 4, 18 0 C20 4, 22 ${height * 0.15}, 24 ${height * 0.35} C30 ${height * 0.5}, 26 ${height - 4}, 18 ${height + 4}`}
          fill="url(#flame-grad)"
        />
        <ellipse
          cx="18"
          cy={height + 2}
          rx="10"
          ry="3"
          fill="rgba(234, 88, 12, 0.4)"
        />
      </svg>
    </div>
  );
}
