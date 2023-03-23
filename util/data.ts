import data from "../static/data.json" assert { type: "json" };

function dateToNum(yyddmm: string) {
  const [yy, mm, dd] = yyddmm.split("-");
  return parseInt(yy) * 10000 + parseInt(mm) * 100 + parseInt(dd);
}

const dramaSorted = data.dramas.sort((a, b) =>
  dateToNum(b.startDate) - dateToNum(a.startDate)
);

function alphanum(a: string, removeSpaces = true) {
  if (!removeSpaces) return a.toLowerCase().replace(/[^a-z0-9 ]/g, "");
  return a.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function findBySlug(slug: string) {
  return dramaSorted.find((drama) =>
    drama.id.toString() === slug || drama.slug === slug
  );
}

function queryIsRecentYear(q: string) {
  const year = parseInt(q);
  return !isNaN(year) && year >= 2016 && year <= new Date().getFullYear();
}

function queryYearMatch(q: string, drama: typeof data.dramas[number]) {
  return queryIsRecentYear(q) && drama.startDate.startsWith(q + "-");
}

export function search(k: string) {
  const parts = k.split(",").map((part) => alphanum(part));
  return dramaSorted.filter((drama) => (
    parts.some((part) =>
      drama.id === parseInt(part) ||
      queryYearMatch(part, drama) ||
      part === alphanum(drama.startDate) ||
      alphanum(drama.slug).includes(part) ||
      part.includes(alphanum(drama.slug)) ||
      drama.actors.some((actor) => alphanum(actor) === part) ||
      alphanum(drama.genre ?? "") === part ||
      alphanum(drama.description, false).includes(part)
    )
  ));
}

export { data };
