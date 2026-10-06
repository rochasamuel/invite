import { useEffect, useState } from 'react'
import { guests } from '../data/guests.js'
import { Corners } from './Ornaments.jsx'

const PASS_KEY = 'convite:admin'
const people = (g) => (g.couple ? 2 : 1)
const STATUS = { yes: 'Vem', no: 'Não vem', none: 'Sem resposta' }
const ORDER = { yes: 0, none: 1, no: 2 }

function readPass() {
  try {
    return sessionStorage.getItem(PASS_KEY) || ''
  } catch {
    return ''
  }
}

function writePass(value) {
  try {
    if (value) sessionStorage.setItem(PASS_KEY, value)
    else sessionStorage.removeItem(PASS_KEY)
  } catch {
    /* sem armazenamento: pede a senha de novo na próxima visita */
  }
}

const when = (iso) =>
  new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })

// The couple's view of every answer, merged with the full guest list so the
// invites still waiting for an answer show up too.
export default function Admin() {
  const [pass, setPass] = useState(readPass)
  const [draft, setDraft] = useState('')
  const [answers, setAnswers] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function load(password) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/rsvps', { headers: { Authorization: `Bearer ${password}` } })
      const data = await res.json().catch(() => ({}))
      if (res.status === 401) {
        writePass('')
        setPass('')
        setError('Senha incorreta.')
        return
      }
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`)
      writePass(password)
      setPass(password)
      setAnswers(data.answers)
    } catch (err) {
      console.error(err)
      setError('Não foi possível carregar as respostas. Tente de novo.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (pass) load(pass)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!answers) {
    return (
      <div className="entry">
        <form
          className="entry-sheet"
          onSubmit={(e) => {
            e.preventDefault()
            if (draft) load(draft)
          }}
        >
          <div className="cover-relief" aria-hidden="true">
            <Corners size={76} inset={6} />
          </div>
          <h1 className="entry-title">Confirmações</h1>
          <p className="entry-hint">Digite a senha para ver as respostas.</p>
          <input
            className="admin-pass"
            type="password"
            autoComplete="current-password"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Senha"
            autoFocus
          />
          {error && (
            <p className="entry-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary entry-submit" disabled={!draft || loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    )
  }

  const rows = Object.entries(guests)
    .map(([code, g]) => {
      const a = answers[code]
      return { code, ...g, status: a ? (a.attending ? 'yes' : 'no') : 'none', at: a?.at, message: a?.message }
    })
    .sort((x, y) => ORDER[x.status] - ORDER[y.status] || x.name.localeCompare(y.name, 'pt-BR'))

  const count = (status, fn = () => 1) => rows.filter((r) => r.status === status).reduce((n, r) => n + fn(r), 0)
  const total = rows.reduce((n, r) => n + people(r), 0)

  return (
    <main className="admin">
      <header className="admin-head">
        <h1 className="entry-title">Confirmações</h1>
        <button type="button" className="btn-link" onClick={() => load(pass)} disabled={loading}>
          {loading ? 'Atualizando…' : 'Atualizar'}
        </button>
      </header>

      {error && (
        <p className="entry-error" role="alert">
          {error}
        </p>
      )}

      <dl className="admin-stats">
        <div>
          <dt>Pessoas confirmadas</dt>
          <dd>
            {count('yes', people)} <span>de {total}</span>
          </dd>
        </div>
        <div>
          <dt>Convites que vêm</dt>
          <dd>{count('yes')}</dd>
        </div>
        <div>
          <dt>Não vêm</dt>
          <dd>{count('no')}</dd>
        </div>
        <div>
          <dt>Sem resposta</dt>
          <dd>{count('none')}</dd>
        </div>
      </dl>

      <ul className="admin-list">
        {rows.map((r) => (
          <li key={r.code} className={`admin-row is-${r.status}`}>
            <div className="admin-who">
              <span className="admin-name">{r.name}</span>
              <span className="admin-meta">
                {r.code} · {r.type === 'completo' ? 'Cartório + rodízio' : 'Só rodízio'}
                {r.couple && ' · casal'}
              </span>
              {r.message && <span className="admin-message">“{r.message}”</span>}
            </div>
            <div className="admin-status">
              <span>{STATUS[r.status]}</span>
              {r.at && <span className="admin-meta">{when(r.at)}</span>}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
