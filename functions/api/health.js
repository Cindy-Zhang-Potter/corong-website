export async function onRequestGet() {
  return new Response(JSON.stringify({ status: 'ok', version: '1.0.0' }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
