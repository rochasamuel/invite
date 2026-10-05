import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { event } from '../data/event.js'
import { loadRsvp, sendRsvp } from '../lib/rsvp.js'
import { Selo } from './Marks.jsx'

const fade = {
  initial: { opacity: 0, y: 10, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -6, filter: 'blur(4px)' },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
}

export default function Rsvp({ code, guest }) {
  const saved = loadRsvp(code)
  const [status, setStatus] = useState(saved ? (saved.attending ? 'yes' : 'no') : 'idle')
  const [pending, setPending] = useState(null)
  const [error, setError] = useState(false)

  async function answer(attending) {
    setPending(attending)
    setError(false)
    try {
      await sendRsvp({ code, guest, attending })
      setStatus(attending ? 'yes' : 'no')
    } catch (err) {
      console.error(err)
      setError(true)
    } finally {
      setPending(null)
    }
  }

  const busy = pending !== null

  return (
    <section className="rsvp" aria-labelledby="rsvp-title">
      <h2 id="rsvp-title" className="section-title">Você vem?</h2>

      <AnimatePresence mode="wait" initial={false}>
        {status === 'idle' && (
          <motion.div key="form" {...fade} className="rsvp-form">
            <p className="rsvp-lede">
              Confirme sua presença até <span className="nowrap">{event.rsvpBy}</span>, por favor.
            </p>

            <div className="rsvp-actions">
              <button type="button" className="btn-primary" onClick={() => answer(true)} disabled={busy} aria-busy={pending === true}>
                {pending === true ? 'Enviando…' : 'Sim, eu vou'}
              </button>
              <button type="button" className="btn-quiet" onClick={() => answer(false)} disabled={busy} aria-busy={pending === false}>
                {pending === false ? 'Enviando…' : 'Não vou poder ir'}
              </button>
            </div>

            {error && (
              <p className="rsvp-error" role="alert">
                Não conseguimos enviar sua resposta. Confira sua internet e toque de novo no botão.
              </p>
            )}
          </motion.div>
        )}

        {status === 'yes' && (
          <motion.div key="yes" {...fade} className="rsvp-done" role="status">
            <Selo dateLabel={event.dateShort} initials={event.couple.map((n) => n[0])} />
            <p className="rsvp-done-text">Que alegria! Sua presença está confirmada. Até lá.</p>
            <button type="button" className="btn-link" onClick={() => setStatus('idle')}>
              Mudar minha resposta
            </button>
          </motion.div>
        )}

        {status === 'no' && (
          <motion.div key="no" {...fade} className="rsvp-done" role="status">
            <p className="rsvp-done-text">Agradecemos por avisar. Vamos sentir sua falta.</p>
            <button type="button" className="btn-link" onClick={() => setStatus('idle')}>
              Mudar minha resposta
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
