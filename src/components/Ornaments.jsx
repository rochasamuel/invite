import { motion, useReducedMotion } from 'motion/react'
import { GROOVE, WAX_FIELD_RGB, WAX_PEAK_RGB, WAX_RGB, embossFilter, vineX, vineY } from '../lib/paper.js'

// Shapes are drawn in black only to give the filter an alpha height map; the
// emboss filter repaints them in the paper's own colour with lit shoulders.
// Any mirroring happens inside the filtered groups, so the light always comes
// from the top left.
const INK = '#000'
// Monogram initials: the same blind emboss, resolved a shade deeper than the paper.
const TINT_RGB = [0.8, 0.765, 0.72]
const TINT_PEAK_RGB = [0.95, 0.935, 0.91]

// Shared filters, mounted once per document.
export function EmbossDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs
        dangerouslySetInnerHTML={{
          __html:
            embossFilter('emb', { blur: 1.6, scale: 3.2 }) +
            embossFilter('emb-petal', { blur: 1.2, scale: 2.6, cast: 0.14 }) +
            embossFilter('emb-fine', { blur: 0.9, scale: 2.2, cast: 0.16 }) +
            embossFilter('emb-tint', { blur: 1.6, scale: 3.2, cast: 0.24, base: TINT_RGB, peak: TINT_PEAK_RGB }) +
            embossFilter('wax', { blur: 1.9, scale: 4.2, elevation: 46, cast: 0, base: WAX_RGB, peak: WAX_PEAK_RGB, castColor: '#2a0806', specular: 0.5 }) +
            embossFilter('wax-roll', { blur: 1.3, scale: 2.6, elevation: 46, cast: 0, base: WAX_RGB, peak: WAX_PEAK_RGB, specular: 0.35 }) +
            embossFilter('wax-field', { blur: 0.9, scale: 2.8, elevation: 46, azimuth: 45, cast: 0, base: WAX_FIELD_RGB, peak: [0.64, 0.18, 0.17], specular: 0.15 }) +
            embossFilter('wax-letter', { blur: 0.7, scale: 2.8, elevation: 44, cast: 0.5, base: WAX_FIELD_RGB, peak: [0.8, 0.34, 0.32], castColor: '#1e0404', specular: 0.45 }) +
            embossFilter('wax-fine', { blur: 0.55, scale: 1.8, elevation: 46, cast: 0.35, base: WAX_FIELD_RGB, peak: [0.68, 0.22, 0.21], castColor: '#2a0606', specular: 0.3 }),
        }}
      />
    </svg>
  )
}

const leafPath = (l) =>
  `M0 0 C ${l * 0.25} ${-l * 0.34}, ${l * 0.68} ${-l * 0.36}, ${l} 0 C ${l * 0.68} ${l * 0.36}, ${l * 0.25} ${l * 0.34}, 0 0 Z`

function Leaves({ items }) {
  return items.map(([x, y, a, l], i) => <path key={i} transform={`translate(${x} ${y}) rotate(${a})`} d={leafPath(l)} />)
}

function Veins({ items }) {
  return items.map(([x, y, a, l], i) => (
    <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
      <path d={`M${l * 0.1} 0 L ${l * 0.86} 0`} />
      <path
        d={`M${l * 0.32} 0 L ${l * 0.47} ${-l * 0.16} M${l * 0.54} 0 L ${l * 0.67} ${-l * 0.13} M${l * 0.32} 0 L ${l * 0.47} ${l * 0.16} M${l * 0.54} 0 L ${l * 0.67} ${l * 0.13}`}
      />
    </g>
  ))
}

// A rose in three pressed layers so each ring of petals keeps its own shoulder.
export function Rose({ cx, cy, r, t }) {
  const ring = (n, dist, pr, rot) =>
    Array.from({ length: n }, (_, i) => {
      const a = ((i * 360) / n + rot) * (Math.PI / 180)
      return <circle key={i} cx={cx + Math.cos(a) * dist} cy={cy + Math.sin(a) * dist} r={pr} />
    })
  return (
    <g fill={INK}>
      <g filter="url(#emb-petal)">
        <g transform={t}>{ring(5, r * 0.52, r * 0.5, -90)}</g>
      </g>
      <g filter="url(#emb-petal)">
        <g transform={t}>{ring(5, r * 0.3, r * 0.36, -54)}</g>
      </g>
      <g filter="url(#emb-petal)">
        <g transform={t}>
          <circle cx={cx} cy={cy} r={r * 0.24} />
        </g>
      </g>
      <g transform={t}>
        <path
          d={`M${cx - r * 0.1} ${cy - r * 0.05} a ${r * 0.1} ${r * 0.1} 0 1 1 ${r * 0.14} ${r * 0.12}`}
          fill="none"
          stroke={GROOVE}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </g>
    </g>
  )
}

const CORNER_STEMS = [
  ['M14 84 C 14 40, 40 14, 86 14 C 124 14, 146 28, 178 22 C 198 18, 212 24, 213 37 C 214 49, 202 55, 195 49 C 190 44, 193 36, 199 38', 2.6],
  ['M40 100 C 42 66, 62 44, 94 42 C 108 41, 118 50, 114 60 C 111 67, 101 66, 102 59', 2],
  ['M150 25 C 153 35, 147 43, 141 41 C 137 39, 139 34, 143 35', 1.3],
  ['M118 18 C 124 28, 127 34, 133 39', 1.6],
]
const CORNER_LEAVES = [
  [98, 14, -24, 26],
  [106, 16, 196, 17],
  [136, 22, 22, 22],
  [160, 23, -28, 19],
  [184, 24, 38, 13],
  [68, 45, -40, 18],
  [76, 42, 28, 14],
]

function CornerHalf({ layer }) {
  if (layer === 'stems')
    return CORNER_STEMS.map(([d, w], i) => <path key={i} d={d} fill="none" stroke={INK} strokeWidth={w} strokeLinecap="round" />)
  if (layer === 'leaves') return <Leaves items={CORNER_LEAVES} />
  if (layer === 'berries')
    return (
      <>
        <circle cx="122" cy="37" r="3" />
        <circle cx="127.5" cy="41" r="2.5" />
        <circle cx="121" cy="43" r="2.1" />
        <circle cx="137" cy="42" r="4.4" />
        <circle cx="92" cy="30" r="1.6" />
      </>
    )
  return <Veins items={CORNER_LEAVES} />
}

const DIAGONAL = 'matrix(0 1 1 0 0 0)'
const FLIPS = {
  tl: undefined,
  tr: 'matrix(-1 0 0 1 220 0)',
  bl: 'matrix(1 0 0 -1 0 220)',
  br: 'matrix(-1 0 0 -1 220 220)',
}

// pos: 'tl' | 'tr' | 'bl' | 'br'
export function Corner({ size, pos = 'tl', style }) {
  const t = FLIPS[pos]
  const both = (layer) => (
    <g transform={t}>
      <CornerHalf layer={layer} />
      <g transform={DIAGONAL}>
        <CornerHalf layer={layer} />
      </g>
    </g>
  )
  return (
    <svg className="corner" style={style} viewBox="0 0 220 220" width={size} height={size} aria-hidden="true">
      <g filter="url(#emb)">{both('stems')}</g>
      <g filter="url(#emb)" fill={INK}>
        {both('leaves')}
      </g>
      <g filter="url(#emb-petal)" fill={INK}>
        {both('berries')}
        <g transform={t}>
          <circle cx="56" cy="56" r="2.6" />
          <circle cx="64" cy="64" r="2" />
          <circle cx="71" cy="71" r="1.5" />
        </g>
      </g>
      <Rose cx={36} cy={36} r={21} t={t} />
      <g fill="none" stroke={GROOVE} strokeWidth="0.7" strokeLinecap="round">
        {both('veins')}
      </g>
    </svg>
  )
}

export function Corners({ size, inset }) {
  return (
    <>
      <Corner size={size} pos="tl" style={{ left: inset, top: inset }} />
      <Corner size={size} pos="tr" style={{ right: inset, top: inset }} />
      <Corner size={size} pos="bl" style={{ left: inset, bottom: inset }} />
      <Corner size={size} pos="br" style={{ right: inset, bottom: inset }} />
    </>
  )
}

// Small pressed flourish: the only divider inside the page.
export function Flourish() {
  const leaves = [
    [80, 11, -160, 13],
    [120, 11, -20, 13],
    [52, 24, 150, 10],
    [148, 24, 30, 10],
  ]
  return (
    <div className="flourish" aria-hidden="true">
      <svg viewBox="0 0 200 44" width="176" height="39">
        <g filter="url(#emb-fine)" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round">
          <path d="M100 22 C 88 9, 70 9, 58 19 C 50 26, 38 27, 30 21 C 24 16, 27 10, 33 12 C 37 13.5, 36 18, 32 17.5" />
          <path d="M100 22 C 112 9, 130 9, 142 19 C 150 26, 162 27, 170 21 C 176 16, 173 10, 167 12 C 163 13.5, 164 18, 168 17.5" />
        </g>
        <g filter="url(#emb-fine)" fill={INK}>
          <Leaves items={leaves} />
          <circle cx="100" cy="35" r="1.6" />
        </g>
        <Rose cx={100} cy={22} r={8.5} />
        <g fill="none" stroke={GROOVE} strokeWidth="0.6" strokeLinecap="round">
          <Veins items={leaves} />
        </g>
      </svg>
    </div>
  )
}

// Pressed monogram: the couple's initials, centred, inside a laurel wreath.
export function Monogram({ initials }) {
  const left = [
    [66, 116, 196, 12],
    [56, 104, 206, 12],
    [48, 90, 218, 12],
    [43, 75, 232, 12],
    [42, 60, 246, 11],
    [45, 45, 260, 11],
    [51, 32, 274, 10],
    [60, 21, 290, 9],
  ]
  const leftIn = [
    [58, 110, 20, 9],
    [49, 96, 8, 9],
    [43, 80, -6, 9],
    [41, 64, -20, 8],
    [44, 49, -34, 8],
  ]
  const mirror = (items) => items.map(([x, y, a, l]) => [200 - x, y, 180 - a, l])
  const leaves = [...left, ...leftIn, ...mirror(left), ...mirror(leftIn)]
  return (
    <svg className="monogram" viewBox="0 0 200 140" role="img" aria-label={`Monograma ${initials.join(' e ')}`}>
      <g filter="url(#emb-fine)" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round">
        <path d="M86 128 C 54 120, 36 92, 40 60 C 42 42, 50 28, 64 16" />
        <path d="M114 128 C 146 120, 164 92, 160 60 C 158 42, 150 28, 136 16" />
        <path d="M86 128 C 92 130, 108 130, 114 128" />
      </g>
      <g filter="url(#emb-fine)" fill={INK}>
        <Leaves items={leaves} />
        <circle cx="100" cy="131" r="2.6" />
      </g>
      <g filter="url(#emb-tint)" fill={INK} fontFamily="'Great Vibes', cursive" fontSize="40" textAnchor="middle">
        <text x="98" y="90">
          {initials[0]}
          {initials[1]}
        </text>
      </g>
      <g fill="none" stroke={GROOVE} strokeWidth="0.5" strokeLinecap="round">
        <Veins items={leaves} />
      </g>
    </svg>
  )
}

// Fixed pressed frame around the full-screen sheet. The relief rises once, by opacity.
export function Frame({ W, band }) {
  const reduce = useReducedMotion()
  const c = Math.round(Math.min(band * 2.9, W * 0.4))
  const inset = Math.round(band * 0.16)
  const vine = Math.round(band * 0.82)
  const edgeStart = c * 0.82
  return (
    <motion.div
      className="frame"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0.3 : 1.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="vine" style={{ left: inset + edgeStart, right: inset + edgeStart, top: inset, height: vine, backgroundImage: vineX, backgroundSize: `auto ${vine}px` }} />
      <div className="vine" style={{ left: inset + edgeStart, right: inset + edgeStart, bottom: inset, height: vine, backgroundImage: vineX, backgroundSize: `auto ${vine}px` }} />
      <div className="vine" style={{ top: inset + edgeStart, bottom: inset + edgeStart, left: inset, width: vine, backgroundImage: vineY, backgroundSize: `${vine}px auto` }} />
      <div className="vine" style={{ top: inset + edgeStart, bottom: inset + edgeStart, right: inset, width: vine, backgroundImage: vineY, backgroundSize: `${vine}px auto` }} />
      <Corners size={c} inset={inset} />
    </motion.div>
  )
}
