import plate from "../assets/images/plate.png";
import "../styles/plate-scene.css";

/** Centered plate background. The smoke in the photo itself drifts upward. */
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
            values="0 0 0 0 0.8  0 0 0 0 0.8  0 0 0 0 0.82  0 0 0 3 0"
          />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.5 0.7 0.7" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="2" />
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
    </div>
  );
}
