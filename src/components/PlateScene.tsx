import { type CSSProperties } from "react";
import plate from "../assets/images/plate.png";
import "../styles/plate-scene.css";

type Puff = CSSProperties & Record<`--${string}`, string>;

// x: left %, d: delay s, t: duration s, s: size % of plate width, drift: px sideways
const PUFFS: { x: number; d: number; t: number; s: number; drift: number }[] = [
  { x: 18, d: 0, t: 9, s: 34, drift: -40 },
  { x: 30, d: 2.2, t: 11, s: 40, drift: 30 },
  { x: 42, d: 4.5, t: 10, s: 36, drift: -25 },
  { x: 52, d: 1.1, t: 12, s: 44, drift: 35 },
  { x: 62, d: 3.4, t: 9.5, s: 38, drift: -35 },
  { x: 72, d: 5.6, t: 11, s: 42, drift: 28 },
  { x: 82, d: 0.8, t: 10, s: 32, drift: -30 },
  { x: 36, d: 6.8, t: 13, s: 46, drift: 20 },
  { x: 58, d: 7.9, t: 12, s: 40, drift: -20 },
  { x: 24, d: 8.6, t: 10, s: 34, drift: 25 },
];

/** Centered plate background with soft animated smoke rising from it. */
export default function PlateScene() {
  return (
    <div className="plate-scene">
      <svg className="ps-defs" width="0" height="0" focusable="false">
        <filter id="ps-wisp" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.022"
            numOctaves="3"
            seed="7"
          />
          <feDisplacementMap in="SourceGraphic" scale="70" />
        </filter>
      </svg>
      <img
        className="ps-plate"
        src={plate}
        alt=""
        width="1536"
        height="1024"
        decoding="async"
      />
      <div className="ps-smoke">
        {PUFFS.map((p, i) => {
          const style: Puff = {
            "--x": `${p.x}%`,
            "--d": `${p.d}s`,
            "--t": `${p.t}s`,
            "--s": `${p.s}%`,
            "--drift": `${p.drift}px`,
          };
          return <span key={i} className="ps-puff" style={style} />;
        })}
      </div>
    </div>
  );
}
