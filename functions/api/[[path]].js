// Cloudflare Pages Function: forwards /api/* to the API host (set API_ORIGIN in Cloudflare).
// This keeps the browser on one address, so the admin login cookie works.
//
// It also tells the API who the visitor is. CF-Connecting-IP is set by Cloudflare itself,
// so it cannot be faked. Set the same PROXY_SECRET here and on the API so the API can
// tell this header came from us. Any x-client-ip a visitor sends is overwritten.
export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const target = new URL(url.pathname + url.search, env.API_ORIGIN);
  const forwarded = new Request(target, request);
  forwarded.headers.delete("x-client-ip");
  forwarded.headers.delete("x-proxy-secret");
  const ip = request.headers.get("CF-Connecting-IP");
  if (env.PROXY_SECRET && ip) {
    forwarded.headers.set("x-client-ip", ip);
    forwarded.headers.set("x-proxy-secret", env.PROXY_SECRET);
  }
  return fetch(forwarded, { redirect: "manual" });
}
