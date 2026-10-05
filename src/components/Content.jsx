import { motion, useReducedMotion } from 'motion/react'
import { event } from '../data/event.js'
import { NavIcon, PinIcon } from './Marks.jsx'
import { Flourish, Monogram } from './Ornaments.jsx'
import Rsvp from './Rsvp.jsx'
import alianca800 from '../assets/alianca-800.webp'
import alianca1400 from '../assets/alianca-1400.webp'

const mapsUrl = (p) => p.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.name}, ${p.address}`)}`
const wazeUrl = (p) => p.wazeUrl || `https://waze.com/ul?q=${encodeURIComponent(p.address)}&navigate=yes`

// A photograph tipped into the sheet, sitting inside a pressed plate mark.
function Photo({ small, large, alt }) {
  return (
    <figure className="photo">
      <img
        src={small}
        srcSet={`${small} 800w, ${large} 1400w`}
        sizes="(max-width: 32rem) 90vw, 30rem"
        width="1600"
        height="1050"
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </figure>
  )
}

function Stop({ time, title, place, note }) {
  return (
    <li className="stop">
      <h3 className="stop-title">
        <span className="nowrap">{title},</span>{' '}
        <span className="nowrap">
          às <span className="stop-time">{time}</span>
        </span>
      </h3>
      <div className="stop-body">
        <p className="stop-place">{place.name}</p>
        <p className="stop-address">{place.address}</p>
        {note && <p className="stop-note">{note}</p>}
        <p className="stop-links">
          <a href={mapsUrl(place)} target="_blank" rel="noreferrer" aria-label={`Abrir ${place.name} no Google Maps`} title="Google Maps">
            <PinIcon />
          </a>
          <a href={wazeUrl(place)} target="_blank" rel="noreferrer" aria-label={`Abrir ${place.name} no Waze`} title="Waze">
            <NavIcon />
          </a>
        </p>
      </div>
    </li>
  )
}

export default function Content({ code, guest, onClose }) {
  const reduce = useReducedMotion()
  const full = guest.type === 'completo'
  const [a, b] = event.couple
  const comma = event.date.indexOf(', ')
  const weekday = comma > 0 ? event.date.slice(0, comma) : ''
  const day = comma > 0 ? event.date.slice(comma + 2) : event.date

  const item = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
      }

  return (
    <motion.main
      className="content"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 } } }}
    >
      <header className="opening">
        <motion.div variants={item} className="monogram-wrap">
          <Monogram initials={[a[0], b[0]]} />
        </motion.div>
        <motion.p variants={item} className="salutation">
          {guest.name},
        </motion.p>
        <motion.p variants={item} className="lede">
          {full
            ? 'com muita alegria, convidamos você para o nosso casamento.'
            : 'com muita alegria, convidamos você para celebrar o nosso casamento.'}
        </motion.p>
        <motion.h1 variants={item} className="couple">
          <span>{a}</span>
          <span className="amp" aria-label="e">&amp;</span>
          <span>{b}</span>
        </motion.h1>
        <motion.p variants={item} className="date">
          {weekday && <span className="date-day">{weekday}</span>}
          <span className="nowrap-soft">{day}</span>
        </motion.p>
      </header>

      <motion.div variants={item}>
        <Flourish />
      </motion.div>

      <motion.section variants={item} className="day" aria-labelledby="day-title">
        <h2 id="day-title" className="section-title">
          Como vai ser
        </h2>
        <p className="story">
          {full
            ? 'Vamos dizer o sim no cartório, numa cerimônia simples e rápida. Depois, seguimos juntos para a pizzaria.'
            : 'O sim vai ser no cartório, numa cerimônia pequena. Depois, queremos você com a gente na pizzaria.'}
        </p>
        <ol className="timeline">
          {full && <Stop time={event.cartorio.time} title="Cerimônia civil" place={event.cartorio} />}
          <Stop
            time={event.pizzaria.time}
            title="Celebração"
            place={event.pizzaria}
            note="Venha com fome e com alegria: a celebração é por nossa conta."
          />
        </ol>
      </motion.section>

      <motion.div variants={item}>
        <Flourish />
      </motion.div>

      <motion.div variants={item}>
        <Rsvp code={code} guest={guest} />
      </motion.div>

      <motion.div variants={item}>
        <Flourish />
      </motion.div>

      <motion.div variants={item}>
        <Photo small={alianca800} large={alianca1400} alt={`${a} e ${b} sorrindo, com a aliança entre os dois`} />
      </motion.div>

      <motion.footer variants={item} className="closing">
        <p className="closing-line">Com carinho,</p>
        <p className="signature">
          {a} &amp; {b}
        </p>
        <button type="button" className="btn-link closing-replay" onClick={onClose}>
          Fechar o convite
        </button>
      </motion.footer>
    </motion.main>
  )
}
