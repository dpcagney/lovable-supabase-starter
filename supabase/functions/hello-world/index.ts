
Deno.serve(() => new Response(JSON.stringify({ ok: true, ts: new Date().toISOString() }), {
  headers: { 'content-type': 'application/json' }
}))
