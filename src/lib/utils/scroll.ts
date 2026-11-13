/** Smooth-scroll to a section by id; falls back to page top for "home". */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  else if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
}
