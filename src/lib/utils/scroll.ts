/**
 * Smooth-scroll to a homepage section by id.
 * On the homepage this behaves exactly as before; on any other page it navigates to "/#id".
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (window.location.pathname !== "/") {
    window.location.href = id === "home" ? "/" : `/#${id}`;
    return;
  }
  if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
}
