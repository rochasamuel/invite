import { useId, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Corners } from './Ornaments.jsx'

export default function CodeEntry({ initialError, onSubmit }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(initialError)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const hintId = useId()
  const errorId = useId()

  function submit(code) {
    const ok = onSubmit(code)
    if (!ok) {
      setError('Não encontramos esse código. Confira os 4 números que vieram com o seu convite.')
      setValue('')
      inputRef.current?.focus()
    }
  }

  function onChange(e) {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4)
    setValue(digits)
    setError(null)
    if (digits.length === 4) submit(digits)
  }

  return (
    <div className="entry">
      <motion.form
        className="entry-sheet"
        onSubmit={(e) => {
          e.preventDefault()
          if (value.length === 4) submit(value)
        }}
        initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="cover-relief" aria-hidden="true">
          <Corners size={76} inset={6} />
        </div>
        <h1 className="entry-title">Seu convite</h1>
        <p className="entry-hint" id={hintId}>
          Digite o código de 4 números que veio junto com o link.
        </p>

        <div className="cells" onClick={() => inputRef.current?.focus()}>
          <input
            ref={inputRef}
            className="cells-input"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={4}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label="Código do convite"
            aria-describedby={error ? `${hintId} ${errorId}` : hintId}
            aria-invalid={Boolean(error)}
            autoFocus
          />
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`cell${focused && i === Math.min(value.length, 3) ? ' is-active' : ''}${error ? ' is-error' : ''}`}
              aria-hidden="true"
            >
              {value[i] ?? ''}
            </span>
          ))}
        </div>

        {error && (
          <p className="entry-error" id={errorId} role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary entry-submit" disabled={value.length < 4}>
          Abrir convite
        </button>
      </motion.form>
    </div>
  )
}
