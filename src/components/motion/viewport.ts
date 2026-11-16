/**
 * Shared `viewport` for every `whileInView` reveal on the site.
 *
 * The root is stretched far ABOVE the screen and trimmed 10% at the bottom, so an element counts
 * as "in view" once its top has reached 90% of the screen height — and also if it was scrolled past
 * too fast to be detected (it is then above the screen, still inside the stretched root).
 * Without this, a fast flick on a phone could leave a section permanently invisible (`once: true`).
 */
export const REVEAL_VIEWPORT = { once: true, margin: "1000000px 0px -10% 0px" } as const;
