import { event } from '../data/event.js'

// Brasília has no daylight saving, so local times map to UTC by a fixed offset.
const UTC_OFFSET_H = 3

// '16h30' on event.dateISO → '20261119T193000Z'
function stamp(time, plusHours = 0) {
  const [h, m] = time.split('h').map((n) => Number(n) || 0)
  const d = new Date(`${event.dateISO}T00:00:00Z`)
  d.setUTCHours(h + UTC_OFFSET_H + plusHours, m)
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n')

function vevent(id, title, place, hours) {
  return [
    'BEGIN:VEVENT',
    `UID:${id}-${event.dateISO}@casamento`,
    `DTSTAMP:${stamp('0h')}`,
    `DTSTART:${stamp(place.time)}`,
    `DTEND:${stamp(place.time, hours)}`,
    `SUMMARY:${esc(title)}`,
    `LOCATION:${esc(`${place.name}, ${place.address.replace(' · ', ', ')}`)}`,
    place.mapsUrl && `URL:${place.mapsUrl}`,
    'END:VEVENT',
  ].filter(Boolean)
}

// The guest's own day as an .ics file: the civil ceremony only for "completo" invites.
export function calendarHref(full) {
  const [a, b] = event.couple
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//convite//casamento//PT',
    'CALSCALE:GREGORIAN',
    ...(full ? vevent('civil', `Casamento ${a} & ${b} · cerimônia civil`, event.cartorio, 1) : []),
    ...vevent('celebracao', `Casamento ${a} & ${b} · celebração`, event.pizzaria, 3),
    'END:VCALENDAR',
  ]
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`
}
