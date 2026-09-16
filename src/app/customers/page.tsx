"use client";

import { startTransition, useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Customer, downloadCustomersCsv, loadCustomers } from "@/lib/customers";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    startTransition(() => setCustomers(loadCustomers()));
  }, []);

  return (
    <AppShell title="العملاء" subtitle="أسماء وأرقام العملاء المسجلة من الطلبات">
      <section className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div><h2 className="text-xl font-black text-[#221A12]">سجل العملاء</h2><p className="mt-1 text-sm text-[#806c59]">{customers.length} عميل مسجل</p></div>
          <button type="button" onClick={downloadCustomersCsv} className="rounded-2xl bg-[#F4900E] px-5 py-3 text-sm font-bold text-white">تحميل العملاء Excel</button>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-[#f0e1c9]"><table className="w-full min-w-[650px] text-right text-sm"><thead className="bg-[#fffaf4] text-[#6a5643]"><tr>{["اسم العميل", "رقم الموبايل", "عدد الطلبات", "آخر طلب"].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}</tr></thead><tbody>{customers.map((customer) => <tr key={customer.id} className="border-t border-[#f3e8d8] text-[#3f2d20]"><td className="px-4 py-4 font-bold">{customer.name}</td><td className="px-4 py-4" dir="ltr">{customer.phone}</td><td className="px-4 py-4">{customer.orders}</td><td className="px-4 py-4">{new Date(customer.lastOrderAt).toLocaleString("ar-EG")}</td></tr>)}{customers.length === 0 ? <tr><td colSpan={4} className="px-4 py-12 text-center text-[#806c59]">لم يتم تسجيل عملاء بعد. أضف بيانات العميل عند إتمام أول طلب.</td></tr> : null}</tbody></table></div>
      </section>
    </AppShell>
  );
}