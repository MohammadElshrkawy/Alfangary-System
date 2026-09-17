"use client";

import { startTransition, useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { increaseProductStock, loadProducts, Product } from "@/lib/products";

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [amounts, setAmounts] = useState<Record<number, string>>({});
  const [notice, setNotice] = useState("");

  useEffect(() => {
    startTransition(() => setProducts(loadProducts()));
  }, []);

  function addStock(product: Product) {
    const amount = Number(amounts[product.id] || 0);
    if (!Number.isFinite(amount) || amount <= 0) {
      setNotice("أدخل كمية أكبر من صفر");
      return;
    }
    setProducts(increaseProductStock(product.id, amount));
    setAmounts((current) => ({ ...current, [product.id]: "" }));
    setNotice(`تمت إضافة ${amount} إلى مخزون ${product.name}`);
  }

  return (
    <AppShell title="المخزون" subtitle="متابعة الكميات وإضافة الوارد الجديد">
      <section className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
        {notice ? <p role="status" className="mb-4 rounded-xl bg-[#edf9f1] px-3 py-2 text-sm font-semibold text-[#1d7b4d]">{notice}</p> : null}
        <div className="overflow-x-auto rounded-2xl border border-[#f0e1c9]"><table className="w-full min-w-[700px] text-right text-sm"><thead className="bg-[#fffaf4] text-[#6a5643]"><tr>{["الصنف", "SKU", "المتاح", "إضافة كمية", "الإجراء"].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}</tr></thead><tbody>{products.map((product) => <tr key={product.id} className="border-t border-[#f3e8d8] text-[#3f2d20]"><td className="px-4 py-4 font-bold">{product.name}</td><td className="px-4 py-4">{product.sku}</td><td className="px-4 py-4">{product.stock}</td><td className="px-4 py-4"><input type="number" min="1" value={amounts[product.id] ?? ""} onChange={(event) => setAmounts((current) => ({ ...current, [product.id]: event.target.value }))} placeholder="الكمية" className="w-28 rounded-xl border border-[#e8d9b9] bg-[#fffaf4] px-3 py-2 outline-none focus:border-[#F4900E]" /></td><td className="px-4 py-4"><button type="button" onClick={() => addStock(product)} className="rounded-xl bg-[#F4900E] px-3 py-2 font-semibold text-white">إضافة للمخزون</button></td></tr>)}</tbody></table></div>
      </section>
    </AppShell>
  );
}