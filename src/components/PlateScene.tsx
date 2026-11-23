import { type CSSProperties } from "react";
import plate from "../assets/images/plate.png";
import "../styles/plate-scene.css";

type Rim = CSSProperties & Record<`--${string}`, string>;

// x: left % of the plate, d: delay (s), t: duration (s), drift: sideways %
const RIM = [
  { x: 14, d: -0, t: 8, drift: -10 },
  { x: 21, d: -4, t: 9, drift: 8 },
  { x: 27, d: -7, t: 8.5, drift: -6 },
  { x: 72, d: -2, t: 8.5, drift: 8 },
  { x: 78, d: -5.5, t: 9, drift: -8 },
  { x: 84, d: -8, t: 8, drift: 10 },
];

/** Centered plate background with nonstop smoke: main column plus the plate rims. */
export default function PlateScene() {
  return (
    <div className="plate-scene">
      <svg className="ps-defs" width="0" height="0" focusable="false">
        <filter
          id="ps-wisp"
          colorInterpolationFilters="sRGB"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.016"
            numOctaves="2"
            seed="7"
          />
          <feDisplacementMap in="SourceGraphic" scale="28" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.62  0 0 0 0 0.62  0 0 0 0 0.65  0 0 0 3 0"
          />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.4 0.52 0.52" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="ps-curl" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves="2"
            seed="3"
          />
          <feDisplacementMap in="SourceGraphic" scale="55" />
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
      <img className="ps-steam ps-steam-1" src={plate} alt="" />
      <img className="ps-steam ps-steam-2" src={plate} alt="" />
      <img className="ps-steam ps-steam-3" src={plate} alt="" />
      <img className="ps-steam ps-steam-4" src={plate} alt="" />
      <div className="ps-rims">
        {RIM.map((r, i) => {
          const style: Rim = {
            "--x": `${r.x}%`,
            "--d": `${r.d}s`,
            "--t": `${r.t}s`,
            "--drift": `${r.drift}%`,
          };
          return <span key={i} className="ps-rim" style={style} />;
        })}
      </div>
    </div>
  );
}
