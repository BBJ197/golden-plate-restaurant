import { timingSafeEqual } from "node:crypto";
import type { Context } from "hono";

const same = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/**
 * Works out which visitor a request came from, for rate limiting.
 *
 * The first entry of X-Forwarded-For is written by the visitor, so it can be
 * faked to dodge a limit. Two safer sources are used instead:
 *
 * 1. The Cloudflare proxy function sets `x-client-ip` (from CF-Connecting-IP)
 *    plus `x-proxy-secret`. When the secret matches PROXY_SECRET, that IP is
 *    trusted.
 * 2. Otherwise the LAST X-Forwarded-For entry, which is added by the host's own
 *    load balancer and cannot be set by the visitor. Behind a proxy this is the
 *    proxy's address, so it is coarse but never spoofable.
 *
 * With neither header (local development) every request shares the key "local".
 */
export function clientIp(c: Context, proxySecret?: string): string {
  const given = c.req.header("x-proxy-secret");
  const forwarded = c.req.header("x-client-ip")?.trim();
  if (proxySecret && given && forwarded && same(given, proxySecret)) {
    return forwarded;
  }
  const chain = c.req.header("x-forwarded-for")?.split(",") ?? [];
  return chain.at(-1)?.trim() || "local";
}
