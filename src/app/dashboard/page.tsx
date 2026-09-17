"use client";

import Link from "next/link";
import { startTransition, useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { revenueStats } from "@/data/mock";
import { clearOrders, loadOrders, Order } from "@/lib/orders";

function StatCard({ label, value, delta, tone }: { label: string; value: string; delta: string; tone: "positive" | "warning" | "danger" }) {
  const toneMap = {
    positive: "bg-[#edf9f1] text-[#1d7b4d]",
    warning: "bg-[#fff2dc] text-[#a45f00]",
    danger: "bg-[#fde8e8] text-[#b13a3a]",
  };

  return (
    <div className="rounded-[24px] border border-[#f0e0c5] bg-white p-4 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
      <div className="flex items-center justify-between">
        <div className="text-sm text-[#6f5641]">{label}</div>
        <div className={`rounded-full px-2 py-1 text-xs font-bold ${toneMap[tone]}`}>{delta}</div>
      </div>
      <div className="mt-4 text-2xl font-black text-[#221A12]">{value}</div>
    </div>
  );
}

export default function DashboardPage() {
  const [period, setPeriod] = useState("يومي");
  const [notice, setNotice] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    startTransition(() => setOrders(loadOrders()));
  }, []);

  const metrics = useMemo(() => {
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalDiscount = orders.reduce((sum, order) => sum + (order.subtotal * order.discountPercent) / 100, 0);
    const grossProfit = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + (item.unitPrice * item.quantity * (item.profitPercent ?? 0)) / 100, 0), 0);
    const netProfit = Math.max(grossProfit - totalDiscount, 0);
    const customers = new Set(orders.map((order) => order.customerPhone)).size;
    const products = new Map<string, { quantity: number; revenue: number }>();
    const payments = new Map<string, number>();
    orders.forEach((order) => {
      payments.set(order.paymentMethod, (payments.get(order.paymentMethod) ?? 0) + order.total);
      order.items.forEach((item) => {
        const current = products.get(item.name) ?? { quantity: 0, revenue: 0 };
        products.set(item.name, { quantity: current.quantity + item.quantity, revenue: current.revenue + item.quantity * item.unitPrice });
      });
    });
    const bestProducts = [...products.entries()].sort((a, b) => b[1].quantity - a[1].quantity).slice(0, 4);
    const paymentTotal = [...payments.values()].reduce((sum, value) => sum + value, 0);
    return { totalSales, totalDiscount, grossProfit, netProfit, customers, bestProducts, payments: [...payments.entries()], paymentTotal };
  }, [orders]);

  const statValues = [
    `${metrics.totalSales.toLocaleString()} ج.م`,
    `${metrics.grossProfit.toLocaleString()} ج.م`,
    `${metrics.netProfit.toLocaleString()} ج.م`,
    String(orders.length),
    String(metrics.customers),
    String(metrics.bestProducts.length),
    "0",
    "0 ج.م",
  ];

  const paymentBreakdown = metrics.payments.map(([method, amount]) => ({ method, percent: metrics.paymentTotal ? Math.round((amount / metrics.paymentTotal) * 100) : 0 }));
  const zeroBars = orders.length ? [12, 24, 18, 32, 27, 40, 35, 48, 42, 55, 62, 70] : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  function resetDashboard() {
    if (orders.length > 0 && !window.confirm("هل تريد حذف كل الطلبات وتصفير لوحة التحكم؟")) return;
    clearOrders();
    setOrders([]);
    setPeriod("يومي");
    setNotice("تم تصفير مؤشرات لوحة التحكم");
  }

  return (
    <AppShell title="لوحة التحكم" subtitle={`مؤشرات الأداء الرئيسية - ${period}`}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-[#f0e0c5] bg-white p-4 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
        <div>
          <h2 className="font-black text-[#221A12]">إجراءات سريعة</h2>
          {notice ? <p role="status" className="mt-1 text-sm font-semibold text-[#1d7b4d]">{notice}</p> : <p className="mt-1 text-sm text-[#806c59]">ابدأ بإضافة بيانات جديدة للنظام</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          {[['/pos', 'طلب بيع جديد'], ['/products', 'إضافة منتج'], ['/customers', 'إضافة عميل'], ['/inventory', 'حركة مخزون'], ['/reports', 'فتح التقارير']].map(([href, label]) => <Link key={href} href={href} className="rounded-xl bg-[#F4900E] px-4 py-2.5 text-sm font-bold text-white">{label}</Link>)}
          <button type="button" onClick={resetDashboard} className="rounded-xl border border-[#e7d7b8] bg-[#fff8ee] px-4 py-2.5 text-sm font-bold text-[#4d3827]">تصفير اللوحة</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {revenueStats.slice(0, 8).map((item, index) => (
          <StatCard key={item.label} label={item.label} value={statValues[index]} delta={orders.length ? "+" : "0%"} tone={item.tone as "positive" | "warning" | "danger"} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black text-[#221A12]">المبيعات عبر الزمن</h2>
            <div className="flex gap-2 text-sm text-[#7d664f]">
              {["يومي", "أسبوعي", "شهري"].map((option) => <button key={option} type="button" onClick={() => { setPeriod(option); setNotice(`تم اختيار الفترة: ${option}`); }} className={`rounded-full px-2 py-1 ${period === option ? "bg-[#f5ead9] font-bold" : ""}`}>{option}</button>)}
            </div>
          </div>

          <div className="flex h-64 items-end gap-3 px-2">
            {zeroBars.map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-2xl bg-gradient-to-t from-[#F4900E] via-[#ffb24d] to-[#f7d9a8]" style={{ height: `${height}%` }} />
                <span className="text-xs text-[#7d664f]">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
          <h2 className="mb-4 text-xl font-black text-[#221A12]">تحليل الدفع</h2>
          <div className="space-y-4">
            {(paymentBreakdown.length ? paymentBreakdown : [{ method: "لا توجد مدفوعات", percent: 0 }]).map((item) => (
              <div key={item.method}>
                <div className="mb-1 flex items-center justify-between text-sm text-[#4d3827]">
                  <span>{item.method}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#f6eedf]">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#F4900E] to-[#c47dff]" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black text-[#221A12]">أفضل المنتجات</h2>
            <Link href="/products" className="rounded-full bg-[#fff4df] px-3 py-1.5 text-sm font-medium text-[#7d4e00]">إدارة المنتجات</Link>
          </div>

          <div className="space-y-3">
            {metrics.bestProducts.length ? metrics.bestProducts.map(([name, data]) => <div key={name} className="flex items-center justify-between rounded-2xl border border-[#f0e1c9] bg-[#fffaf4] p-3"><span className="font-bold">{name}</span><span>{data.quantity} قطعة · {data.revenue.toLocaleString()} ج.م</span></div>) : <div className="rounded-2xl border border-dashed border-[#e7d7b8] bg-[#fffaf4] p-8 text-center text-[#806c59]">لا توجد مبيعات بعد. ابدأ من <Link href="/pos" className="font-bold text-[#F4900E]">طلب بيع جديد</Link>.</div>}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#f0e0c5] bg-[#fffaf4] p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
          <h2 className="mb-4 text-xl font-black text-[#221A12]">نظرة سريعة</h2>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-[#6a5643]">المشتريات</div>
              <div className="mt-2 text-3xl font-black text-[#221A12]">0 ج.م</div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-[#6a5643]">المبالغ المتوقعة</div>
              <div className="mt-2 text-3xl font-black text-[#221A12]">0 ج.م</div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-[#6a5643]">التدقيق</div>
              <div className="mt-2 text-lg font-bold text-[#1d7b4d]">جميع المعاملات متزامنة</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
