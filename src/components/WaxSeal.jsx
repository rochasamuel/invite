// Red sealing wax with the couple's monogram pressed into it, built like a real
// seal: a thick poured rim with broad irregular lobes, a flat field pressed
// down by the stamp, a double ring and a leaf wreath raised in the field, and
// the initials at the centre. Shapes are drawn in black as height maps; the wax
// filters (Ornaments.jsx EmbossDefs) paint them as lit, glossy wax.

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

// Poured-wax outline: broad lobes, as wax spreads before the stamp lands.
function waxBlob(cx, cy, r, seed, n = 9, wobble = 0.17) {
  const rand = rng(seed)
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + rand() * 0.25
    const rr = r * (1 + (rand() - 0.5) * wobble)
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]
  })
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(2)} ${c1[1].toFixed(2)} ${c2[0].toFixed(2)} ${c2[1].toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`
  }
  return d + 'Z'
}

const OUTLINE = waxBlob(60, 60, 50, 23, 9, 0.13)
// a second, slightly smaller pour gives the rim its rolled, uneven top
const ROLL = waxBlob(60, 60, 45.5, 41, 11, 0.07)

const leafPath = (l) =>
  `M0 0 C ${l * 0.25} ${-l * 0.36}, ${l * 0.7} ${-l * 0.38}, ${l} 0 C ${l * 0.7} ${l * 0.38}, ${l * 0.25} ${l * 0.36}, 0 0 Z`

// Wreath: leaf pairs around a circle, alternating in and out of the stem.
const WREATH_R = 26.5
const WREATH = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * 360
  const rad = (a * Math.PI) / 180
  const out = i % 2 === 0
  const x = 60 + Math.cos(rad) * WREATH_R
  const y = 60 + Math.sin(rad) * WREATH_R
  // leaves point along the stem (tangent), tilted outward or inward
  return [x, y, a + 90 + (out ? -38 : 38), 6.2]
})

export function WaxSealArt({ initials }) {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true" style={{ overflow: 'visible' }}>
      {/* poured body and rolled rim */}
      <g filter="url(#wax)">
        <path d={OUTLINE} />
      </g>
      <g filter="url(#wax-roll)">
        <path d={ROLL} />
      </g>
      {/* the stamp's pressed field */}
      <g filter="url(#wax-field)">
        <circle cx="60" cy="60" r="40" />
      </g>
      {/* raised design inside the field */}
      <g filter="url(#wax-fine)" fill="none" stroke="#000" strokeLinecap="round">
        <circle cx="60" cy="60" r="37" strokeWidth="1.4" />
        <circle cx="60" cy="60" r="33.8" strokeWidth="0.8" />
        <circle cx="60" cy="60" r={WREATH_R} strokeWidth="0.9" />
      </g>
      <g filter="url(#wax-fine)" fill="#000">
        {WREATH.map(([x, y, a, l], i) => (
          <path key={i} transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${a.toFixed(1)})`} d={leafPath(l)} />
        ))}
      </g>
      {/* initials pressed deeper and lit brighter so they stand out from the wreath */}
      <g filter="url(#wax-letter)" fill="#000" stroke="#000" strokeWidth="0.45" strokeLinejoin="round">
        <text x="59.5" y="66.5" fontFamily="'Great Vibes', cursive" fontSize="19" textAnchor="middle">
          {initials[0]}
          {initials[1]}
        </text>
      </g>
    </svg>
  )
}
