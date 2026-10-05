import { motion, useReducedMotion } from 'motion/react'

const iconProps = {
  viewBox: '0 0 24 24',
  width: 22,
  height: 22,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

// Map pin, for Google Maps.
export function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21 C 12 21, 5 14.4, 5 9.5 A 7 7 0 0 1 19 9.5 C 19 14.4, 12 21, 12 21 Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  )
}

// Navigation arrow, for Waze.
export function NavIcon() {
  return (
    <svg {...iconProps}>
      <path d="M20 4 L 4 11 L 11 13 L 13 20 Z" />
    </svg>
  )
}

// Blind-embossed seal pressed into the sheet when presence is confirmed: rings,
// lettering and the couple's initials are all relief, no ink. The sentence
// beside it carries the meaning for screen readers and at a glance.
export function Selo({ dateLabel, initials }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="selo"
      role="img"
      aria-label={`Selo em relevo: presença confirmada, ${dateLabel}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.1, filter: 'blur(3px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={reduce ? { duration: 0.3 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg viewBox="0 0 120 120" width="100%" height="100%">
        <defs>
          <path id="seloTop" d="M17 60 a 43 43 0 0 1 86 0" />
          <path id="seloBottom" d="M11.5 60 a 48.5 48.5 0 0 0 97 0" />
        </defs>
        <g filter="url(#emb-fine)" fill="none" stroke="#000">
          <circle cx="60" cy="60" r="56" strokeWidth="2.2" />
          <circle cx="60" cy="60" r="51" strokeWidth="0.9" />
          <circle cx="60" cy="60" r="34" strokeWidth="1.4" />
        </g>
        <g filter="url(#emb-fine)" fill="#000" fontFamily="'EB Garamond', serif" fontWeight="600" fontSize="8.4" letterSpacing="0.9" textAnchor="middle">
          <text>
            <textPath href="#seloTop" startOffset="50%">PRESENÇA CONFIRMADA</textPath>
          </text>
          <text>
            <textPath href="#seloBottom" startOffset="50%">{dateLabel}</textPath>
          </text>
        </g>
        <g filter="url(#emb)" fill="#000" fontFamily="'Great Vibes', cursive" fontSize="30" textAnchor="middle">
          <text x="54" y="66">{initials[0]}</text>
          <text x="67" y="74">{initials[1]}</text>
        </g>
      </svg>
    </motion.div>
  )
}
