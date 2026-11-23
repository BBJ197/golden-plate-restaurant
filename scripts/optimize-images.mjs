// Converts every PNG/JPG in src/assets/images to a resized WebP next to it.
// Usage: node scripts/optimize-images.mjs [maxWidth]   (default 1000)
// Then import the .webp and delete the original, so the big files never ship.
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";

const dir = "src/assets/images";
const width = Number(process.argv[2]) || 1000;

for (const file of readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
  const src = `${dir}/${file}`;
  const out = `${dir}/${file
    .replace(/\.(png|jpe?g)$/i, "")
    .replace(/\s+/g, "-")
    .toLowerCase()}.webp`;
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  console.log(
    `${file}: ${Math.round(statSync(src).size / 1024)} KB -> ${Math.round(statSync(out).size / 1024)} KB`,
  );
}
