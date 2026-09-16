import { productCatalog } from "@/data/mock";

export type Product = (typeof productCatalog)[number];

const PRODUCTS_STORAGE_KEY = "alfangary-products";

export function loadProducts(): Product[] {
  if (typeof window === "undefined") return productCatalog;

  try {
    const storedProducts = window.localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!storedProducts) return productCatalog;

    const parsedProducts = JSON.parse(storedProducts) as Product[];
    return Array.isArray(parsedProducts) ? parsedProducts : productCatalog;
  } catch {
    return productCatalog;
  }
}

export function saveProducts(products: Product[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
}
