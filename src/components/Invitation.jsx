import { useEffect, useState } from 'react'
import { animate as animateValue, motion, useAnimate, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import Content from './Content.jsx'
import { event } from '../data/event.js'
import { Corners, Frame } from './Ornaments.jsx'
import { WaxSealArt } from './WaxSeal.jsx'

const EASE_PRESS = [0.4, 0, 0.2, 1]
const EASE_OPEN = [0.55, 0, 0.15, 1]
const EASE_EXPAND = [0.22, 1, 0.36, 1]
const EASE_REVEAL = [0.65, 0, 0.25, 1]

// stages: sealed → breaking → opening → expanding → open
export default function Invitation({ code, guest, grid }) {
  const reduce = useReducedMotion()
  const [stage, setStage] = useState('sealed')
  const [scope, animate] = useAnimate()
  // Flap rotations as motion values, so each face can be hidden exactly when it
  // turns away. backface-visibility alone leaks the filtered relief and text
  // shadows through the back of the flap in Chromium.
  const rotL = useMotionValue(0)
  const rotR = useMotionValue(0)
  const frontL = useTransform(rotL, (v) => (v > -90 ? 1 : 0))
  const frontR = useTransform(rotR, (v) => (v < 90 ? 1 : 0))

  // A tall gatefold card, sized to the screen.
  const maxH = grid.H * 0.72
  let w = Math.round(Math.min(grid.W * 0.86, 400))
  let h = Math.round(w * 1.55)
  if (h > maxH) {
    h = Math.round(maxH)
    w = Math.round(h / 1.55)
  }
  const half = w / 2
  const seal = Math.round(w * 0.42)
  const sealTop = h / 2 - seal / 2
  const initials = event.couple.map((n) => n[0])
  const { paper } = grid

  async function open() {
    if (stage !== 'sealed') return
    if (reduce) {
      setStage('open')
      return
    }
    setStage('breaking')
    // a small press on the seal, as a finger would give it
    await animate('[data-part=seal]', { scale: 0.95 }, { duration: 0.16, ease: EASE_PRESS })
    await animate('[data-part=seal]', { scale: 1 }, { duration: 0.32, ease: EASE_EXPAND })
    setStage('opening')
    // the seal stays whole on the right flap and lifts off the left one with it
    animateValue(rotR, 172, { duration: 1.4, ease: EASE_OPEN })
    animateValue(rotL, -172, { duration: 1.4, ease: EASE_OPEN, delay: 0.08 })
    // the opened sheet itself grows to fill the screen while the flaps settle;
    // its real size animates (not a scale), so the paper grain never stretches
    await new Promise((r) => setTimeout(r, 950))
    setStage('expanding')
    const { W, H } = grid
    await Promise.all([
      animate(
        '[data-part=gate]',
        { width: W, height: H, marginLeft: -W / 2, marginTop: -H / 2 },
        { duration: 1.2, ease: EASE_REVEAL },
      ),
      animate('[data-part=gate-shadow]', { opacity: 0 }, { duration: 1.2, ease: 'easeIn' }),
      animate('[data-part=inside-corners]', { opacity: 0 }, { duration: 0.6, ease: 'linear', delay: 0.55 }),
    ])
    setStage('open')
  }

  // The opening, played backwards: the words fade, the sheet shrinks back to the
  // card and the flaps fold shut over the seal.
  async function close() {
    if (stage !== 'open') return
    if (reduce) {
      rotL.set(0)
      rotR.set(0)
      setStage('sealed')
      return
    }
    setStage('fading')
    await animate('[data-part=scroller]', { opacity: 0 }, { duration: 0.35, ease: 'easeOut' })
    rotL.set(-172)
    rotR.set(172)
    setStage('collapsing')
  }

  // Runs once the gate is mounted at full size with the flaps laid open.
  useEffect(() => {
    if (stage !== 'collapsing') return
    let live = true
    ;(async () => {
      await Promise.all([
        animate(
          '[data-part=gate]',
          { width: w, height: h, marginLeft: -half, marginTop: -h / 2 },
          { duration: 1.2, ease: EASE_REVEAL },
        ),
        animate('[data-part=gate-shadow]', { opacity: 1 }, { duration: 1.2, ease: 'easeOut' }),
        animate('[data-part=inside-corners]', { opacity: 1 }, { duration: 0.6, ease: 'linear' }),
        new Promise((r) => setTimeout(r, 750)).then(() =>
          Promise.all([
            animateValue(rotL, 0, { duration: 1.4, ease: EASE_OPEN }),
            animateValue(rotR, 0, { duration: 1.4, ease: EASE_OPEN, delay: 0.08 }),
          ]),
        ),
      ])
      if (!live) return
      // the seal settles back into place
      await animate('[data-part=seal]', { scale: 0.97 }, { duration: 0.14, ease: EASE_PRESS })
      await animate('[data-part=seal]', { scale: 1 }, { duration: 0.3, ease: EASE_EXPAND })
      if (live) setStage('sealed')
    })()
    return () => {
      live = false
    }
  }, [stage]) // eslint-disable-line react-hooks/exhaustive-deps

  const collapsing = stage === 'collapsing'
  const sealed =
    stage === 'sealed' || stage === 'breaking' || stage === 'opening' || stage === 'expanding' || collapsing
  const paperShown = stage === 'open' || stage === 'fading'


  // One full-width cover, shown half by half on the two flaps so the print
  // and the seal run continuously across the seam.
  const cover = (side) => (
    <div className="cover-full" style={{ width: w, height: h, left: side === 'l' ? 0 : -half }}>
      <div className="cover-relief" aria-hidden="true">
        <Corners size={w * 0.3} inset={6} />
      </div>
      <div className="cover-text" style={{ height: sealTop - h * 0.05 }}>
        <p className="cover-to">Para</p>
        <p className="cover-name" style={{ fontSize: nameSize(guest.name, w) }}>
          {guest.name}
        </p>
      </div>
      <div className="cover-foot" style={{ top: sealTop + seal, height: h - sealTop - seal - h * 0.04 }}>
        <blockquote className="cover-verse">
          <p>“Acima de tudo, porém, esteja o amor, que é o vínculo da perfeição.”</p>
          <cite>Colossenses 3:14</cite>
        </blockquote>
        <p className="cover-couple">
          {event.couple[0]} &amp; {event.couple[1]}
        </p>
      </div>
    </div>
  )

  return (
    <div ref={scope} className={`invitation stage-${stage}`}>
      {sealed && (
        <div className="stage-sealed-layer">
          <motion.div
            data-part="gate"
            className="gate"
            style={
              collapsing
                ? { width: grid.W, height: grid.H, marginLeft: -grid.W / 2, marginTop: -grid.H / 2 }
                : { width: w, height: h, marginLeft: -half, marginTop: -h / 2 }
            }
          >
            <motion.div data-part="gate-shadow" className="sheet-shadow" style={{ opacity: collapsing ? 0 : 1 }} />
            <div className="gate-inside">
              <motion.div
                data-part="inside-corners"
                className="cover-relief"
                aria-hidden="true"
                style={{ opacity: collapsing ? 0 : 1 }}
              >
                <Corners size={w * 0.3} inset={6} />
              </motion.div>
            </div>
              <motion.div data-part="flap-l" className="gflap" style={{ width: half, left: 0, originX: 0, z: 1, rotateY: rotL }}>
                <motion.div className="gface gface-front gface-l" style={{ opacity: frontL }}>
                  {cover('l')}
                </motion.div>
                <div className="gface gface-back" />
              </motion.div>
              <motion.div data-part="flap-r" className="gflap" style={{ width: half, right: 0, originX: 1, z: 1, rotateY: rotR }}>
                <motion.div className="gface gface-front gface-r" style={{ opacity: frontR }}>
                  {cover('r')}
                </motion.div>
                <div className="gface gface-back" />
                <motion.div
                  data-part="seal"
                  className="seal-attached"
                  style={{ width: seal, height: seal, left: -seal / 2, top: sealTop, z: 2, opacity: frontR }}
                >
                  <WaxSealArt initials={initials} />
                </motion.div>
              </motion.div>
            <button
              type="button"
              className="seal-button"
              onClick={open}
              disabled={stage !== 'sealed'}
              style={{ width: seal, height: seal, left: half - seal / 2, top: sealTop }}
              aria-label="Romper o selo e abrir o convite"
            />
          </motion.div>
        </div>
      )}

      {paperShown && (
        <>
          <div className="paper" style={{ left: paper.x, top: paper.y, width: paper.w, height: paper.h }} />
          <div data-part="scroller" className="scroller" style={{ inset: grid.band }}>
            <Content code={code} guest={guest} onClose={close} />
          </div>
          <Frame W={grid.W} band={grid.band} />
        </>
      )}
    </div>
  )
}

function nameSize(name, w) {
  const base = w * 0.11
  const len = name.length
  if (len <= 14) return base
  if (len <= 22) return base * 0.86
  return base * 0.74
}
