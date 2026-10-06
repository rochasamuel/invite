import { useId, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { CODE_LENGTH, normalizeCode } from '../lib/code.js'
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
      setError('Não encontramos esse código. Confira os 4 caracteres que vieram com o seu convite.')
      setValue('')
      inputRef.current?.focus()
    }
  }

  function onChange(e) {
    const next = normalizeCode(e.target.value)
    setValue(next)
    setError(null)
    if (next.length === CODE_LENGTH) submit(next)
  }

  return (
    <div className="entry">
      <motion.form
        className="entry-sheet"
        onSubmit={(e) => {
          e.preventDefault()
          if (value.length === CODE_LENGTH) submit(value)
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
          Digite o código de 4 letras e números que veio junto com o link.
        </p>

        <div className="cells" onClick={() => inputRef.current?.focus()}>
          <input
            ref={inputRef}
            className="cells-input"
            inputMode="text"
            autoComplete="off"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            maxLength={CODE_LENGTH}
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

        <button type="submit" className="btn-primary entry-submit" disabled={value.length < CODE_LENGTH}>
          Abrir convite
        </button>
      </motion.form>
    </div>
  )
}
