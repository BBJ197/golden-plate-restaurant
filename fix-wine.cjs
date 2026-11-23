const fs = require("fs");
const p = "src/pages/MenuPage.tsx";
let s = fs.readFileSync(p, "utf8");
const imp = 'import MobileTabBar from "../components/MobileTabBar";';
if (!s.includes(imp)) throw new Error("import anchor");
s = s.replace(
  imp,
  imp +
    '\nimport bottle from "../assets/images/bottle.png";\nimport glass from "../assets/images/glass.png";',
);
const re = /<div className="menu-pan menu-pan-main" \/>/;
if (!re.test(s)) throw new Error("pan anchor");
const waveA = "M-150 290q37.5-18 75 0" + "t75 0".repeat(11) + "V620H-150Z";
const waveB = "M-150 296q37.5 14 75 0" + "t75 0".repeat(11) + "V620H-150Z";
const stream = "M0 0C14 22 22 120 22 266";
const ring = (n) =>
  `<ellipse className="mw-ring mw-ring-${n}" rx="40" ry="9" fill="none" stroke="rgba(255,200,205,0.6)" strokeWidth="2" />`;
const drop = (n) => `<circle className="mw-drop mw-d${n}" r="2.6" fill="#b3202f" />`;
s = s.replace(
  re,
  `<div className="menu-wine-scene">
          <svg viewBox="0 0 1000 1280" focusable="false">
            <defs>
              <clipPath id="mw-bowl">
                <path d="M218 55C190 160 182 260 186 340C195 440 280 520 370 524C460 520 548 440 552 340C558 260 548 160 522 55Z" />
              </clipPath>
              <linearGradient id="mw-wine-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#a41d2d" />
                <stop offset="0.35" stopColor="#6b0c1b" />
                <stop offset="1" stopColor="#2e0409" />
              </linearGradient>
            </defs>
            <g transform="translate(735 777) scale(0.42)">
              <g clipPath="url(#mw-bowl)">
                <g transform="translate(370 300)">
                  <g className="mw-slosh">
                    <g transform="translate(-370 -300)">
                      <path className="mw-wave-b" d="${waveB}" fill="#c22a3b" fillOpacity="0.55" />
                      <path className="mw-wave-a" d="${waveA}" fill="url(#mw-wine-grad)" stroke="rgba(255,190,195,0.4)" strokeWidth="1.5" />
                    </g>
                  </g>
                </g>
                <g transform="translate(405 292)">
                  ${ring(1)}
                  ${ring(2)}
                  ${ring(3)}
                  <ellipse className="mw-foam" rx="34" ry="6" fill="rgba(255,205,210,0.28)" />
                </g>
              </g>
              <image href={glass} width="736" height="1104" />
            </g>
            <g transform="translate(883 633)">
              <g className="mw-stream">
                <path className="mw-stream-body" d="${stream}" fill="none" stroke="#8f1627" strokeWidth="9" strokeLinecap="round" />
                <path className="mw-stream-flow" d="${stream}" fill="none" stroke="rgba(255,170,180,0.35)" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>
            <g transform="translate(905 899)">
              ${[1, 2, 3, 4, 5, 6].map(drop).join("\n              ")}
            </g>
            <g className="mw-bottle">
              <image href={bottle} x="-480" y="-514" width="960" height="1024" />
            </g>
          </svg>
        </div>`,
);
fs.writeFileSync(p, s);
