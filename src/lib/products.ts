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

export function updateProductStock(items: { id: number; quantity: number }[]) {
  const quantities = new Map(items.map((item) => [item.id, item.quantity]));
  const nextProducts = loadProducts().map((product) => {
    const soldQuantity = quantities.get(product.id) ?? 0;
    return soldQuantity ? { ...product, stock: Math.max(0, product.stock - soldQuantity) } : product;
  });
  saveProducts(nextProducts);
  return nextProducts;
}

export function increaseProductStock(id: number, quantity: number) {
  const nextProducts = loadProducts().map((product) => product.id === id ? { ...product, stock: product.stock + quantity } : product);
  saveProducts(nextProducts);
  return nextProducts;
}
