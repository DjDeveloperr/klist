import data from "../static/data.json" assert { type: "json" };

function dateToNum(yyddmm: string) {
  const [yy, mm, dd] = yyddmm.split("-");
  return parseInt(yy) * 10000 + parseInt(mm) * 100 + parseInt(dd);
}

const dramaSorted = data.dramas.sort((a, b) =>
  dateToNum(b.startDate) - dateToNum(a.startDate)
);

function alphanum(a: string) {
  return a.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function findBySlug(slug: string) {
  return dramaSorted.find((drama) =>
    drama.id.toString() === slug || drama.slug === slug
  );
}

export function search(k: string) {
  const parts = k.split("+").map((part) => alphanum(part));
  return dramaSorted.filter((drama) => (
    parts.some((part) =>
      drama.id === parseInt(part) ||
      alphanum(drama.slug).startsWith(part) ||
      drama.actors.some((actor) => alphanum(actor) === part)
    )
  ));
}

export { data };
