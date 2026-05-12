"use client";

import { useEffect, useRef, useState } from "react";

const labels = ["Ask", "Seek", "Knock"];

export function LiveMotion() {
  const frame = useRef<number | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();

    function animate(now: number) {
      setTick((now - startedAt) / 1000);
      frame.current = requestAnimationFrame(animate);
    }

    frame.current = requestAnimationFrame(animate);

    return () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  const progress = ((Math.sin(tick * 1.4) + 1) / 2) * 100;

  return (
    <div className="live-motion-card" aria-label="Animated career progress">
      <div className="live-motion-header">
        <span className="live-dot" />
        <p>Live career roadmap</p>
      </div>
      <div className="live-orbit" aria-hidden="true">
        {labels.map((label, index) => {
          const angle = tick * 0.9 + index * ((Math.PI * 2) / labels.length);
          const x = Math.cos(angle) * 86;
          const y = Math.sin(angle) * 42;

          return (
            <span
              className="live-chip"
              key={label}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0)`,
              }}
            >
              {label}
            </span>
          );
        })}
      </div>
      <div className="live-progress">
        <span style={{ width: `${Math.max(progress, 12)}%` }} />
      </div>
    </div>
  );
}
