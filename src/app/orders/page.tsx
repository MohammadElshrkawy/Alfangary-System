"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { loadOrders, Order } from "@/lib/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  useEffect(() => {
    startTransition(() => setOrders(loadOrders().reverse()));
  }, []);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return orders;
    return orders.filter((order) => [String(order.id), order.customerName, order.customerPhone, order.seller, order.paymentMethod].some((value) => value.toLowerCase().includes(query)));
  }, [orders, search]);

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  return (
    <AppShell title="الطلبات" subtitle="كل الطلبات المسجلة من نقطة البيع بكل تفاصيلها">
      <section className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div><h2 className="text-xl font-black text-[#221A12]">سجل الطلبات</h2><p className="mt-1 text-sm text-[#806c59]">{filteredOrders.length} طلب</p></div>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="بحث برقم الطلب أو العميل أو البائع" aria-label="بحث في الطلبات" className="min-w-[280px] rounded-2xl border border-[#e9dcc1] bg-[#fffaf4] px-4 py-3 text-right outline-none focus:border-[#F4900E]" />
        </div>
        <div className="overflow-x-auto rounded-2xl border border-[#f0e1c9]"><table className="w-full min-w-[900px] text-right text-sm"><thead className="bg-[#fffaf4] text-[#6a5643]"><tr>{["رقم الطلب", "العميل", "الموبايل", "البائع", "طريقة الدفع", "الأصناف", "الإجمالي", "التاريخ", "التفاصيل"].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}</tr></thead><tbody>{filteredOrders.map((order) => <tr key={order.id} className="border-t border-[#f3e8d8] text-[#3f2d20]"><td className="px-4 py-4 font-bold">#{order.id}</td><td className="px-4 py-4">{order.customerName}</td><td className="px-4 py-4" dir="ltr">{order.customerPhone}</td><td className="px-4 py-4 font-semibold">{order.seller || "-"}</td><td className="px-4 py-4">{order.paymentMethod}</td><td className="px-4 py-4">{order.items.reduce((sum, item) => sum + item.quantity, 0)} قطعة</td><td className="px-4 py-4 font-bold">{order.total.toLocaleString()} ج.م</td><td className="px-4 py-4">{new Date(order.createdAt).toLocaleString("ar-EG")}</td><td className="px-4 py-4"><button type="button" onClick={() => setSelectedOrderId(order.id)} className="rounded-xl bg-[#fff4df] px-3 py-2 font-semibold text-[#8a5700]">عرض</button></td></tr>)}{filteredOrders.length === 0 ? <tr><td colSpan={9} className="px-4 py-12 text-center text-[#806c59]">لا توجد طلبات محفوظة. أتمم طلبًا من نقطة البيع أولًا.</td></tr> : null}</tbody></table></div>
      </section>

      {selectedOrder ? <div className="mt-6 rounded-[28px] border border-[#f0e0c5] bg-[#fffaf4] p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-xl font-black text-[#221A12]">تفاصيل الطلب #{selectedOrder.id}</h2><p className="mt-1 text-sm text-[#806c59]">البائع: {selectedOrder.seller || "-"} · العميل: {selectedOrder.customerName}</p></div><button type="button" onClick={() => setSelectedOrderId(null)} className="rounded-xl border border-[#e7d7b8] px-3 py-2 font-semibold text-[#4d3827]">إغلاق</button></div><div className="grid gap-3 md:grid-cols-4"><div className="rounded-2xl bg-white p-3"><span className="text-xs text-[#806c59]">المجموع الفرعي</span><p className="mt-1 font-bold">{selectedOrder.subtotal.toLocaleString()} ج.م</p></div><div className="rounded-2xl bg-white p-3"><span className="text-xs text-[#806c59]">الخصم</span><p className="mt-1 font-bold">{selectedOrder.discountPercent}%</p></div><div className="rounded-2xl bg-white p-3"><span className="text-xs text-[#806c59]">الضريبة</span><p className="mt-1 font-bold">0 ج.م</p></div><div className="rounded-2xl bg-white p-3"><span className="text-xs text-[#806c59]">الإجمالي</span><p className="mt-1 font-black">{selectedOrder.total.toLocaleString()} ج.م</p></div></div><div className="mt-4 space-y-2">{selectedOrder.items.map((item) => <div key={item.id} className="flex items-center justify-between rounded-2xl border border-[#f0e1c9] bg-white p-3"><span className="font-bold">{item.name}</span><span>{item.quantity} × {item.unitPrice.toLocaleString()} ج.م</span><span>ربح {item.profitPercent ?? 0}%</span></div>)}</div></div> : null}
    </AppShell>
  );
}
