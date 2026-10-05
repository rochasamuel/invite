// Paper materials as SVG: the eggshell grain and the repeating embossed vine.
// Shapes are drawn in black only as an alpha height map; embossFilter repaints
// them in the paper's colour with lit shoulders. Rotations sit inside the
// filtered groups so the light always comes from the top left.

export const GROOVE = 'rgba(112, 96, 78, 0.26)'

// Sculpted blind emboss: the shape's alpha, blurred, becomes a height map lit
// from the top left. Flat areas resolve to the paper colour, so the relief is
// read only through its lit and shaded flanks, plus a faint cast shadow.
const PAPER_RGB = [0.898, 0.882, 0.855]
const PEAK_RGB = [0.992, 0.986, 0.972]

// Sealing wax: the same lit height map, resolved to deep red instead of paper.
export const WAX_RGB = [0.55, 0.1, 0.1]
export const WAX_PEAK_RGB = [0.7, 0.24, 0.23]
export const WAX_FIELD_RGB = [0.5, 0.085, 0.085]

// azimuth 225 lights from the top left (raised); 45 inverts it so a shape reads
// as pressed in. specular adds the glossy highlight poured wax has.
export function embossFilter(
  id,
  {
    blur = 1.4,
    scale = 3,
    elevation = 42,
    azimuth = 225,
    cast = 0.2,
    base = PAPER_RGB,
    peak = PEAK_RGB,
    castColor = '#4a3c2c',
    specular = 0,
  } = {},
) {
  const flat = Math.sin((elevation * Math.PI) / 180)
  const row = (i) => {
    const m = (peak[i] - base[i]) / (1 - flat)
    const c = peak[i] - m
    return `${m.toFixed(4)} 0 0 0 ${c.toFixed(4)}`
  }
  const shine = specular
    ? `<feSpecularLighting in="b" surfaceScale="${scale}" specularConstant="1" specularExponent="34" lighting-color="#ffffff" result="sp">
        <feDistantLight azimuth="${azimuth}" elevation="${elevation - 6}"/>
      </feSpecularLighting>
      <feComposite in="sp" in2="SourceAlpha" operator="in" result="sp2"/>
      <feComposite in="r0" in2="sp2" operator="arithmetic" k1="0" k2="1" k3="${specular}" k4="0" result="r"/>`
    : `<feComposite in="r0" in2="r0" operator="over" result="r"/>`
  return `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceAlpha" stdDeviation="${blur}" result="b"/>
    <feDiffuseLighting in="b" surfaceScale="${scale}" diffuseConstant="1" lighting-color="#ffffff" result="l">
      <feDistantLight azimuth="${azimuth}" elevation="${elevation}"/>
    </feDiffuseLighting>
    <feColorMatrix in="l" type="matrix" values="${row(0)}  ${row(1)}  ${row(2)}  0 0 0 0 1" result="t"/>
    <feComposite in="t" in2="SourceAlpha" operator="in" result="r0"/>
    ${shine}
    <feOffset in="b" dx="0.6" dy="1" result="o"/>
    <feFlood flood-color="${castColor}" flood-opacity="${cast}"/>
    <feComposite in2="o" operator="in" result="s"/>
    <feMerge><feMergeNode in="s"/><feMergeNode in="r"/></feMerge>
  </filter>`
}

const toUrl = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, ' '))}")`

// Eggshell: a fine bump map lit from the top left, kept close to white so it
// multiplies over the paper as a soft granular surface. Phones get a gentler
// pass: the same grain reads heavier and darker on small, dense screens.
const grain = ({ relief = 1.5, gain = 1.12, opacity = 0.6 } = {}) => `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220">
  <filter id="e" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="1.15" numOctaves="2" seed="4" stitchTiles="stitch"/>
    <feDiffuseLighting surfaceScale="${relief}" diffuseConstant="1" lighting-color="#fff">
      <feDistantLight azimuth="225" elevation="58"/>
    </feDiffuseLighting>
    <feColorMatrix type="matrix" values="${gain} 0 0 0 0  0 ${gain} 0 0 0  0 0 ${gain} 0 0  0 0 0 1 0"/>
  </filter>
  <rect width="220" height="220" filter="url(#e)" opacity="${opacity}"/>
</svg>`

// A softer, larger mottling so the sheet does not read as flat colour.
const mottle = ({ alpha = 0.13 } = {}) => `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
  <filter id="m" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="9" stitchTiles="stitch"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.39  0 0 0 0 0.31  0 0 0 ${alpha} 0"/>
  </filter>
  <rect width="600" height="600" filter="url(#m)"/>
</svg>`

function leaf(x, y, angle, len) {
  const l = len
  return `<path transform="translate(${x} ${y}) rotate(${angle})" d="M0 0 C ${l * 0.25} ${-l * 0.34}, ${l * 0.68} ${-l * 0.36}, ${l} 0 C ${l * 0.68} ${l * 0.36}, ${l * 0.25} ${l * 0.34}, 0 0 Z"/>`
}

function veins(x, y, angle, len) {
  const l = len
  return `<g transform="translate(${x} ${y}) rotate(${angle})">
    <path d="M${l * 0.1} 0 L ${l * 0.86} 0"/>
    <path d="M${l * 0.35} 0 L ${l * 0.5} ${-l * 0.16} M${l * 0.55} 0 L ${l * 0.68} ${-l * 0.13} M${l * 0.35} 0 L ${l * 0.5} ${l * 0.16} M${l * 0.55} 0 L ${l * 0.68} ${l * 0.13}"/>
  </g>`
}

function roseLayers(cx, cy, r, t) {
  const ring = (n, dist, pr, rot) =>
    Array.from({ length: n }, (_, i) => {
      const a = ((i * 360) / n + rot) * (Math.PI / 180)
      return `<circle cx="${(cx + Math.cos(a) * dist).toFixed(2)}" cy="${(cy + Math.sin(a) * dist).toFixed(2)}" r="${pr.toFixed(2)}"/>`
    }).join('')
  return `
    <g filter="url(#evp)" fill="#000"><g transform="${t}">${ring(5, r * 0.52, r * 0.5, -90)}</g></g>
    <g filter="url(#evp)" fill="#000"><g transform="${t}">${ring(5, r * 0.3, r * 0.36, -54)}</g></g>
    <g filter="url(#evp)" fill="#000"><g transform="${t}"><circle cx="${cx}" cy="${cy}" r="${r * 0.24}"/></g></g>`
}

// Edge tile: continuous scrollwork, seamless at x=0/240 (same height, flat tangent):
// a stem dipping under a small rose, with a C-scroll rising either side.
const EDGE_LEAVES = [
  [102, 45.5, 200, 15],
  [138, 45.5, -20, 15],
  [24, 33, -32, 13],
  [216, 33, 212, 13],
  [56, 37, 42, 11],
  [184, 37, 138, 11],
  [74, 18, -150, 10],
  [166, 18, -30, 10],
]

function vineInner(t) {
  return `
  <g filter="url(#ev)"><g transform="${t}" fill="none" stroke="#000" stroke-linecap="round">
    <path d="M-40 32 L 0 32 C 40 32, 60 47, 120 47 C 180 47, 200 32, 240 32 L 280 32" stroke-width="2.4" stroke-linecap="butt"/>
    <path d="M40 34 C 42 20, 58 11, 72 15 C 82 18, 83 29, 75 30 C 70 31, 69 25, 73 24" stroke-width="1.7"/>
    <path d="M200 34 C 198 20, 182 11, 168 15 C 158 18, 157 29, 165 30 C 170 31, 171 25, 167 24" stroke-width="1.7"/>
  </g></g>
  <g filter="url(#ev)" fill="#000"><g transform="${t}">
    ${EDGE_LEAVES.map(([x, y, a, l]) => leaf(x, y, a, l)).join('')}
  </g></g>
  <g filter="url(#evp)" fill="#000"><g transform="${t}">
    <circle cx="90" cy="25" r="2.2"/><circle cx="94" cy="30" r="1.8"/>
    <circle cx="150" cy="25" r="2.2"/><circle cx="146" cy="30" r="1.8"/>
    <circle cx="8" cy="30" r="1.4"/><circle cx="232" cy="30" r="1.4"/>
  </g></g>
  ${roseLayers(120, 36, 10.5, t)}
  <g transform="${t}" fill="none" stroke="${GROOVE}" stroke-width="0.6" stroke-linecap="round">
    ${EDGE_LEAVES.map(([x, y, a, l]) => veins(x, y, a, l)).join('')}
  </g>`
}

const vineSvg = (w, h, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${embossFilter('ev', { blur: 1.3, scale: 2.8 })}${embossFilter('evp', { blur: 1.1, scale: 2.4, cast: 0.14 })}</defs>${inner}</svg>`

export const vineX = toUrl(vineSvg(240, 64, vineInner('')))
export const vineY = toUrl(vineSvg(64, 240, vineInner('translate(64 0) rotate(90)')))

export const grainUrl = toUrl(grain())
export const mottleUrl = toUrl(mottle())
export const grainSoftUrl = toUrl(grain({ relief: 0.9, gain: 1.16, opacity: 0.35 }))
export const mottleSoftUrl = toUrl(mottle({ alpha: 0.07 }))
