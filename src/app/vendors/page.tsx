"use client";

import { FormEvent, startTransition, useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { loadSellers, saveSellers, Seller } from "@/lib/sellers";
import { sellers as initialSellers } from "@/data/mock";

type SellerForm = { name: string; phone: string };
const emptyForm: SellerForm = { name: "", phone: "" };

export default function VendorsPage() {
  const [sellerList, setSellerList] = useState<Seller[]>(initialSellers);
  const [form, setForm] = useState<SellerForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setSellerList(loadSellers());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) saveSellers(sellerList);
  }, [hydrated, sellerList]);

  const filteredSellers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? sellerList.filter((seller) => `${seller.name} ${seller.phone}`.toLowerCase().includes(query)) : sellerList;
  }, [search, sellerList]);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = form.name.trim();
    const phone = form.phone.trim();
    if (!name) return;
    if (editingId !== null) setSellerList((current) => current.map((seller) => seller.id === editingId ? { ...seller, name, phone } : seller));
    else setSellerList((current) => [...current, { id: Date.now(), name, phone, sales: 0, commissions: 0 }]);
    setForm(emptyForm);
    setEditingId(null);
  }

  function deleteSeller(id: number) {
    const seller = sellerList.find((item) => item.id === id);
    if (!seller || !window.confirm(`حذف البائع «${seller.name}»؟`)) return;
    setSellerList((current) => current.filter((item) => item.id !== id));
  }

  return (
    <AppShell title="البائعون" subtitle="إضافة أسماء البائعين وإدارتها في نقطة البيع">
      <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <section className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
          <h2 className="text-xl font-black text-[#221A12]">{editingId === null ? "إضافة بائع" : "تعديل البائع"}</h2>
          <form onSubmit={submitForm} className="mt-5 space-y-3">
            <label className="block text-sm font-semibold text-[#4d3827]">اسم البائع<input required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="mt-1 w-full rounded-xl border border-[#e8d9b9] bg-[#fffaf4] px-3 py-2.5 font-normal outline-none focus:border-[#F4900E]" /></label>
            <label className="block text-sm font-semibold text-[#4d3827]">رقم الهاتف<input value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} className="mt-1 w-full rounded-xl border border-[#e8d9b9] bg-[#fffaf4] px-3 py-2.5 font-normal outline-none focus:border-[#F4900E]" /></label>
            <button type="submit" className="w-full rounded-2xl bg-[#F4900E] px-4 py-3 font-bold text-white">{editingId === null ? "إضافة البائع" : "حفظ التعديل"}</button>
            {editingId !== null ? <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="w-full rounded-2xl border border-[#e7d7b8] px-4 py-3 font-bold text-[#4d3827]">إلغاء</button> : null}
          </form>
        </section>
        <section className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
          <div className="mb-5 flex items-center justify-between gap-3"><div><h2 className="text-xl font-black text-[#221A12]">قائمة البائعين</h2><p className="mt-1 text-sm text-[#806c59]">{filteredSellers.length} بائع</p></div><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="بحث بالاسم أو الهاتف" className="rounded-2xl border border-[#e9dcc1] bg-[#fffaf4] px-4 py-3 text-right outline-none focus:border-[#F4900E]" /></div>
          <div className="overflow-x-auto rounded-2xl border border-[#f0e1c9]"><table className="w-full min-w-[650px] text-right text-sm"><thead className="bg-[#fffaf4] text-[#6a5643]"><tr>{["الاسم", "الهاتف", "المبيعات", "العمولة", "الإجراءات"].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}</tr></thead><tbody>{filteredSellers.map((seller) => <tr key={seller.id} className="border-t border-[#f3e8d8] text-[#3f2d20]"><td className="px-4 py-4 font-bold">{seller.name}</td><td className="px-4 py-4">{seller.phone || "-"}</td><td className="px-4 py-4">{seller.sales.toLocaleString()} ج.م</td><td className="px-4 py-4">{seller.commissions.toLocaleString()} ج.م</td><td className="px-4 py-4"><div className="flex gap-2"><button type="button" onClick={() => { setEditingId(seller.id); setForm({ name: seller.name, phone: seller.phone ?? "" }); }} className="rounded-xl bg-[#fff4df] px-3 py-2 font-semibold text-[#8a5700]">تعديل</button><button type="button" onClick={() => deleteSeller(seller.id)} className="rounded-xl bg-[#fde8e8] px-3 py-2 font-semibold text-[#b13a3a]">حذف</button></div></td></tr>)}{filteredSellers.length === 0 ? <tr><td colSpan={5} className="px-4 py-12 text-center text-[#806c59]">لا يوجد بائعون مطابقون</td></tr> : null}</tbody></table></div>
        </section>
      </div>
    </AppShell>
  );
}