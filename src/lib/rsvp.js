const ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT

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
    /* sem armazenamento local: a resposta já foi enviada à planilha */
  }
}

export async function sendRsvp({ code, guest, attending, message }) {
  const payload = {
    code,
    name: guest.name,
    type: guest.type,
    attending,
    message: message?.trim() || '',
    at: new Date().toISOString(),
  }

  if (!ENDPOINT) {
    console.warn('VITE_RSVP_ENDPOINT não configurado: resposta simulada.', payload)
    await new Promise((r) => setTimeout(r, 900))
  } else {
    // text/plain evita o preflight de CORS do Apps Script
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json().catch(() => ({ ok: true }))
    if (!data.ok) throw new Error(data.error || 'Falha ao salvar')
  }

  const stored = { attending, at: payload.at }
  saveRsvp(code, stored)
  return stored
}
