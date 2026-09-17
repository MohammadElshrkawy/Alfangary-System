export type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: number;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  seller: string;
  paymentMethod: string;
  subtotal: number;
  discountPercent: number;
  tax: number;
  total: number;
  items: OrderItem[];
};

const ORDERS_STORAGE_KEY = "alfangary-orders";

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];

  try {
    const storedOrders = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!storedOrders) return [];

    const parsedOrders = JSON.parse(storedOrders) as Order[];
    return Array.isArray(parsedOrders) ? parsedOrders : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function clearOrders() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ORDERS_STORAGE_KEY);
}

export function addOrder(order: Omit<Order, "id" | "createdAt">) {
  const nextOrder: Order = {
    ...order,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };
  saveOrders([...loadOrders(), nextOrder]);
  return nextOrder;
}
