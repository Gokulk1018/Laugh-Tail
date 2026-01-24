import { sections } from "../data/sections";
import { categoryPlaces } from "../data/categoryPlaces";

export function getAllSearchItems() {
  const res: { name: string; source: string }[] = [];

  Object.entries(sections).forEach(([s, places]) =>
    places.forEach((p) => res.push({ name: p, source: s }))
  );

  Object.entries(categoryPlaces).forEach(([c, places]) =>
    places.forEach((p) => res.push({ name: p, source: c }))
  );

  return res;
}