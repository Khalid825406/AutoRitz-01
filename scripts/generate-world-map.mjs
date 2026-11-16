/**
 * Builds the dotted world map used by <WorldMap> (src/components/ui/world-map.tsx).
 *
 * dotted-map takes ~1 s and produces ~600 KB of SVG, so it runs once here instead of in the browser:
 *   - public/images/world-map-dots.svg     the dots (static, cached by the browser)
 *   - src/data/world-map-projection.json   constants to place lat/lng points on that SVG
 *
 * Run:  node scripts/generate-world-map.mjs
 */
import fs from "node:fs";
import DottedMap from "dotted-map";

const map = new DottedMap({ height: 100, grid: "diagonal" });
const raw = map.getSVG({ radius: 0.22, color: "#ffffff", shape: "circle", backgroundColor: "transparent" });

// Compact the SVG: one shared fill, short numbers, no per-circle attributes.
const [, vbW, vbH] = raw.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
const circles = [...raw.matchAll(/cx="([\d.]+)" cy="([\d.]+)"/g)]
  .map(([, x, y]) => `<circle cx="${+(+x).toFixed(2)}" cy="${+(+y).toFixed(2)}" r=".22"/>`)
  .join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}"><g fill="#fff">${circles}</g></svg>`;
fs.writeFileSync("public/images/world-map-dots.svg", svg);

// dotted-map uses a Mercator projection: x = x0 + kx·lng, y = y0 − ky·ln(tan(π/4 + lat/2)).
// Fit the constants by least squares over many pins (getPin snaps to the dot grid, so average it out).
const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const fit = (pairs) => {
  const n = pairs.length, sx = pairs.reduce((a, [u]) => a + u, 0), sy = pairs.reduce((a, [, v]) => a + v, 0);
  const sxx = pairs.reduce((a, [u]) => a + u * u, 0), sxy = pairs.reduce((a, [u, v]) => a + u * v, 0);
  const k = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  return { k, c: (sy - k * sx) / n };
};
const xs = [], ys = [];
for (let lat = -50; lat <= 70; lat += 2.5)
  for (let lng = -160; lng <= 170; lng += 5) {
    const p = map.getPin({ lat, lng });
    xs.push([lng, p.x]);
    ys.push([merc(lat), p.y]);
  }
const fx = fit(xs), fy = fit(ys);
const projection = {
  width: +vbW,
  height: +vbH,
  x0: +fx.c.toFixed(4),
  kx: +fx.k.toFixed(6),
  y0: +fy.c.toFixed(4),
  ky: +(-fy.k).toFixed(6),
};
fs.writeFileSync("src/data/world-map-projection.json", JSON.stringify(projection, null, 2) + "\n");

const check = (lat, lng) => {
  const p = map.getPin({ lat, lng });
  const x = projection.x0 + projection.kx * lng, y = projection.y0 - projection.ky * merc(lat);
  return `${p.x.toFixed(1)},${p.y.toFixed(1)} vs ${x.toFixed(1)},${y.toFixed(1)}`;
};
console.log("svg", Math.round(svg.length / 1024) + " KB", projection);
console.log("Dubai", check(25.2, 55.27), "| London", check(51.5, -0.13), "| Sydney", check(-33.87, 151.2));
