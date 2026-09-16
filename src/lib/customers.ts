export type Customer = {
  id: number;
  name: string;
  phone: string;
  lastOrderAt: string;
  orders: number;
};

const CUSTOMERS_STORAGE_KEY = "alfangary-customers";

export function loadCustomers(): Customer[] {
  if (typeof window === "undefined") return [];

  try {
    const storedCustomers = window.localStorage.getItem(CUSTOMERS_STORAGE_KEY);
    if (!storedCustomers) return [];

    const parsedCustomers = JSON.parse(storedCustomers) as Customer[];
    return Array.isArray(parsedCustomers) ? parsedCustomers : [];
  } catch {
    return [];
  }
}

export function saveCustomers(customers: Customer[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers));
}

export function addOrUpdateCustomer(name: string, phone: string) {
  const customers = loadCustomers();
  const existingCustomer = customers.find((customer) => customer.phone === phone);
  const now = new Date().toISOString();

  if (existingCustomer) {
    saveCustomers(customers.map((customer) => customer.phone === phone
      ? { ...customer, name, lastOrderAt: now, orders: customer.orders + 1 }
      : customer));
    return;
  }

  saveCustomers([...customers, { id: Date.now(), name, phone, lastOrderAt: now, orders: 1 }]);
}

function csvCell(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export function downloadCustomersCsv() {
  const customers = loadCustomers();
  const header = ["اسم العميل", "رقم الموبايل", "عدد الطلبات", "آخر طلب"].map(csvCell).join(",");
  const rows = customers.map((customer) => [customer.name, customer.phone, customer.orders, new Date(customer.lastOrderAt).toLocaleString("ar-EG")].map(csvCell).join(","));
  const csv = `\uFEFF${[header, ...rows].join("\n")}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `alfangary-customers-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
