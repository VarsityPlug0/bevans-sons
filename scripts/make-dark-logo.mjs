import sharp from "sharp";

// The logo is white background with black text and gold icon.
// Strategy: replace white pixels with dark (#0A0A0A), keep gold and near-black pixels as-is
// but invert the dark text to white so it reads on a dark background.

const img = sharp("public/logo.jpg");
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.alloc(data.length);

for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];

  // Detect "white/near-white" background — replace with dark
  const isWhite = r > 220 && g > 220 && b > 220;

  // Detect gold pixels: high red, medium green, low blue
  const isGold = r > 150 && g > 100 && g < 200 && b < 100 && r > g && r > b;

  // Detect dark/black text pixels
  const isDark = r < 80 && g < 80 && b < 80;

  if (isWhite) {
    out[i]     = 10;  // dark background
    out[i + 1] = 10;
    out[i + 2] = 10;
  } else if (isDark) {
    out[i]     = 240; // invert dark text → white
    out[i + 1] = 240;
    out[i + 2] = 240;
  } else if (isGold) {
    out[i]     = r;   // keep gold as-is
    out[i + 1] = g;
    out[i + 2] = b;
  } else {
    // mid-tones: blend toward dark bg
    const brightness = (r + g + b) / 3;
    const factor = brightness / 255;
    out[i]     = Math.round(r * factor + 10 * (1 - factor));
    out[i + 1] = Math.round(g * factor + 10 * (1 - factor));
    out[i + 2] = Math.round(b * factor + 10 * (1 - factor));
  }

  if (channels === 4) out[i + 3] = data[i + 3]; // alpha
}

await sharp(out, { raw: { width, height, channels } })
  .jpeg({ quality: 95 })
  .toFile("public/logo-dark.jpg");

console.log("Done → public/logo-dark.jpg");
