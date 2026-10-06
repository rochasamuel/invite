// In `vite dev` there is no /api, so answers are only simulated there.
const ENDPOINT = import.meta.env.DEV ? '' : '/api/rsvp'

const key = (code) => `convite:rsvp:${code}`

export function loadRsvp(code) {
  try {
    const raw = localStorage.getItem(key(code))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveRsvp(code, value) {
  try {
    localStorage.setItem(key(code), JSON.stringify(value))
  } catch {
    /* sem armazenamento local: a resposta já foi enviada */
  }
}

export async function sendRsvp({ code, attending, message }) {
  const payload = { code, attending, message: message?.trim() || '' }

  if (!ENDPOINT) {
    console.warn('Ambiente de desenvolvimento: resposta simulada.', payload)
    await new Promise((r) => setTimeout(r, 900))
  } else {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`)
  }

  const stored = { attending, at: new Date().toISOString() }
  saveRsvp(code, stored)
  return stored
}
