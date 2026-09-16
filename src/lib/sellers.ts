import { sellers } from "@/data/mock";

export type Seller = (typeof sellers)[number];

const SELLERS_STORAGE_KEY = "alfangary-sellers";

export function loadSellers(): Seller[] {
  if (typeof window === "undefined") return sellers;

  try {
    const storedSellers = window.localStorage.getItem(SELLERS_STORAGE_KEY);
    if (!storedSellers) return sellers;

    const parsedSellers = JSON.parse(storedSellers) as Seller[];
    return Array.isArray(parsedSellers) ? parsedSellers : sellers;
  } catch {
    return sellers;
  }
}

export function saveSellers(nextSellers: Seller[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SELLERS_STORAGE_KEY, JSON.stringify(nextSellers));
}
