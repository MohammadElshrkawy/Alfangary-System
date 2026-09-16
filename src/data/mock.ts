export const revenueStats = [
  { label: "إجمالي المبيعات", value: "186,250 ج.م", delta: "+12.4%", tone: "positive" },
  { label: "إجمالي الأرباح", value: "64,850 ج.م", delta: "+8.1%", tone: "positive" },
  { label: "صافي الربح", value: "45,200 ج.م", delta: "+5.9%", tone: "positive" },
  { label: "عدد الطلبات", value: "328", delta: "+18", tone: "positive" },
  { label: "العملاء", value: "1,240", delta: "+29", tone: "positive" },
  { label: "المنتجات", value: "86", delta: "+6", tone: "positive" },
  { label: "منخفض المخزون", value: "12", delta: "-3", tone: "warning" },
  { label: "العجز", value: "2,410 ج.م", delta: "-1.3%", tone: "danger" },
];

export const bestSellers = [
  { name: "عسل المرق", size: "500g", sold: 88, revenue: 17600, cost: 10050, profit: 7550, margin: "42.9%" },
  { name: "عسل السدر", size: "1kg", sold: 56, revenue: 16800, cost: 10650, profit: 6150, margin: "36.6%" },
  { name: "عسل الربيع", size: "330g", sold: 74, revenue: 14800, cost: 8820, profit: 5980, margin: "40.4%" },
  { name: "مزيج النخيل", size: "750g", sold: 42, revenue: 12600, cost: 7280, profit: 5320, margin: "42.2%" },
];

export const paymentBreakdown = [
  { method: "نقدي", amount: 67000, percent: 38, count: 120 },
  { method: "Vodafone Cash", amount: 42000, percent: 24, count: 88 },
  { method: "Visa", amount: 32000, percent: 18, count: 70 },
  { method: "Mastercard", amount: 18000, percent: 10, count: 34 },
  { method: "InstaPay", amount: 14000, percent: 8, count: 22 },
  { method: "تحويل بنكي", amount: 9000, percent: 2, count: 12 },
];

export const productCatalog = [
  { id: 1, name: "عسل المرق", arabic: "عسل المرق", sku: "AL-250", price: 320, stock: 18, profitPercent: 0, grade: "عضوي", size: "250g" },
  { id: 2, name: "عسل السدر", arabic: "عسل السدر", sku: "AL-330", price: 440, stock: 12, profitPercent: 0, grade: "تغذية بسيطة", size: "330g" },
  { id: 3, name: "عسل الربيع", arabic: "عسل الربيع", sku: "AL-500", price: 590, stock: 7, profitPercent: 0, grade: "عضوي", size: "500g" },
  { id: 4, name: "مزيج النخيل", arabic: "مزيج النخيل", sku: "AL-750", price: 780, stock: 4, profitPercent: 0, grade: "تغذية بسيطة", size: "750g" },
];

export const cartSeed = [
  { id: 1, name: "عسل المرق", quantity: 2, unitPrice: 320, discount: 0 },
  { id: 2, name: "عسل السدر", quantity: 1, unitPrice: 440, discount: 5 },
];

export const sellers = [
  { id: 1, name: "أحمد سعد", phone: "01000000001", sales: 186250, commissions: 12400 },
  { id: 2, name: "سارة علي", phone: "01000000002", sales: 124800, commissions: 9600 },
  { id: 3, name: "خالد فهد", phone: "01000000003", sales: 98000, commissions: 7800 },
];

export const customers = [
  { id: 1, name: "ليلى أحمد", phone: "966500110011", totalSpend: 5600, orders: 12 },
  { id: 2, name: "فارس زيد", phone: "966500220022", totalSpend: 8900, orders: 18 },
  { id: 3, name: "مريم حسن", phone: "966500330033", totalSpend: 4300, orders: 9 },
];
