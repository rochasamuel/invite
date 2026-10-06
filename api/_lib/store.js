import { Redis } from '@upstash/redis'

// One Redis hash, one field per invite code. The Upstash integration on Vercel
// sets either the KV_* or the UPSTASH_* pair, depending on how it was added.
const KEY = 'rsvp'

let client
function redis() {
  if (!client) {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
    if (!url || !token) throw new Error('Banco de dados não configurado')
    client = new Redis({ url, token })
  }
  return client
}

export const saveAnswer = (code, answer) => redis().hset(KEY, { [code]: answer })

export async function allAnswers() {
  return (await redis().hgetall(KEY)) || {}
}

export const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
