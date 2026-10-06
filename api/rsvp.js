import { guests } from '../src/data/guests.js'
import { normalizeCode } from '../src/lib/code.js'
import { json, saveAnswer } from './_lib/store.js'

// A guest answers: only codes on the list are accepted, and answering again
// replaces the earlier answer.
export async function POST(request) {
  let data
  try {
    data = await request.json()
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400)
  }

  const code = normalizeCode(data.code)
  if (!guests[code]) return json({ ok: false, error: 'código inválido' }, 400)
  if (typeof data.attending !== 'boolean') return json({ ok: false, error: 'resposta inválida' }, 400)

  try {
    await saveAnswer(code, {
      attending: data.attending,
      message: String(data.message || '').slice(0, 500),
      at: new Date().toISOString(),
    })
  } catch (err) {
    console.error(err)
    return json({ ok: false, error: 'Falha ao salvar' }, 500)
  }
  return json({ ok: true })
}
