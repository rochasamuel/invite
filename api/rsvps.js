import { timingSafeEqual } from 'node:crypto'
import { allAnswers, json } from './_lib/store.js'

function authorized(request) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  const given = (request.headers.get('authorization') || '').replace(/^Bearer /, '')
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

// Every answer so far, keyed by invite code. For the couple's /admin page only.
export async function GET(request) {
  if (!authorized(request)) return json({ ok: false, error: 'senha incorreta' }, 401)
  try {
    return json({ ok: true, answers: await allAnswers() })
  } catch (err) {
    console.error(err)
    return json({ ok: false, error: 'Falha ao ler as respostas' }, 500)
  }
}
