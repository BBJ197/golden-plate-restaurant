import { useLayoutEffect } from "react";

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Drives the Golden Plate 3D scroll scenes with a few CSS variables (--p, --mx, --my).
 * Does nothing without IntersectionObserver or when the visitor prefers reduced motion,
 * so the page stays a plain, readable layout in that case.
 */
export function useGoldenScroll() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".gp");
    if (!root || typeof IntersectionObserver === "undefined") return;
    const media = (q: string) =>
      typeof matchMedia === "function" && matchMedia(q).matches;
    if (media("(prefers-reduced-motion: reduce)")) return;

    root.classList.add("gp-motion");
    const active = new Set<HTMLElement>();
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of active) {
        const r = el.getBoundingClientRect();
        const p =
          el.dataset.scene === "sticky"
            ? clamp(-r.top / Math.max(1, r.height - vh))
            : clamp((vh - r.top) / (vh + r.height));
        el.style.setProperty("--p", p.toFixed(3));
      }
      root.classList.toggle("gp-scrolled", window.scrollY > 40);
    };
    const tick = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) active.add(el);
          else active.delete(el);
        }
        tick();
      },
      { rootMargin: "10% 0px" },
    );
    root
      .querySelectorAll<HTMLElement>("[data-scene]")
      .forEach((el) => sceneObserver.observe(el));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("gp-in");
            revealObserver.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    root
      .querySelectorAll("[data-reveal]")
      .forEach((el) => revealObserver.observe(el));

    const tilt = root.querySelector<HTMLElement>("[data-tilt]");
    const onMove = (e: PointerEvent) => {
      tilt?.style.setProperty(
        "--mx",
        (e.clientX / window.innerWidth - 0.5).toFixed(3),
      );
      tilt?.style.setProperty(
        "--my",
        (e.clientY / window.innerHeight - 0.5).toFixed(3),
      );
    };
    const useTilt = !!tilt && media("(pointer: fine)");
    if (useTilt)
      window.addEventListener("pointermove", onMove, { passive: true });

    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    update();

    return () => {
      cancelAnimationFrame(frame);
      sceneObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      if (useTilt) window.removeEventListener("pointermove", onMove);
      root.classList.remove("gp-motion", "gp-scrolled");
    };
  }, []);
}
