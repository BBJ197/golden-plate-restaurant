# Update notes

## Security

- **Rate limits can no longer be dodged by faking `X-Forwarded-For`.** New `api/src/clientIp.ts` trusts the
  visitor IP only when the Cloudflare proxy sends it together with a matching `PROXY_SECRET`; otherwise it
  uses the last (host-written) `X-Forwarded-For` entry. Login and contact limiters both use it.
  **To turn on exact per-visitor limits, set the same `PROXY_SECRET` (16+ chars) on Render and Cloudflare Pages.**
  Without it the limits still work but are coarser (they key on the proxy address).
- Rate-limit maps now prune expired entries instead of growing forever.
- `.env` files are no longer in the package. **Rotate the Resend API key** that was in `api/.env`
  if the original zip was shared anywhere. The root `.env` was unused (the frontend only reads `VITE_*`).

## Performance

- Page images: 12 MB -> about 1 MB. 15 used PNG/JPG files became resized WebP; unused originals
  (`wine bottle`, `bottle`, `glass`, `menu background.png`, and its duplicate in `public/`) were deleted.
- `scripts/optimize-images.mjs` now converts whatever is in `src/assets/images` (it pointed at files that no longer existed).

## Branding

- All "Alemitu" leftovers renamed to Golden Plate: session cookie (`golden_plate_session`), CI database names,
  backup artifact names, API package name, default email sender, schema comment.
- **Admins will have to sign in once after deploying** (the cookie name changed).
- The live URL `alemitu-coffee.pages.dev` in the README was left alone because it is a real address.
  Rename the Cloudflare project if you want it to match.

## Not changed (needs your decision or git access)

- Git history cleanup, and splitting the layered CSS (`golden.css`, `menu-theme.css`, `menu-modern.css`, `ui-polish.css`).
- I could not run `npm test` / `build` here (no network to install dependencies). The new IP and limiter logic was
  checked with a standalone script; run `npm test` and `cd api && npm test` before deploying.
