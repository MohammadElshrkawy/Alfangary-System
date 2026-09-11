"use client";

import { FormEvent, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { productCatalog } from "@/data/mock";

type Product = (typeof productCatalog)[number];

type ProductForm = {
  name: string;
  sku: string;
  grade: string;
  size: string;
  price: string;
  stock: string;
};

const emptyForm: ProductForm = { name: "", sku: "", grade: "", size: "", price: "", stock: "" };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(productCatalog);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter((product) => [product.name, product.sku, product.grade, product.size].some((value) => value.toLowerCase().includes(query)));
  }, [products, search]);

  function updateField(field: keyof ProductForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({ name: product.name, sku: product.sku, grade: product.grade, size: product.size, price: String(product.price), stock: String(product.stock) });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const product = { name: form.name.trim(), sku: form.sku.trim(), grade: form.grade.trim(), size: form.size.trim(), price: Number(form.price), stock: Number(form.stock) };
    if (!product.name || !product.sku || !product.grade || !product.size || !Number.isFinite(product.price) || !Number.isFinite(product.stock)) return;

    if (editingId !== null) {
      setProducts((current) => current.map((item) => item.id === editingId ? { ...item, ...product, arabic: product.name } : item));
    } else {
      setProducts((current) => [...current, { id: Date.now(), ...product, arabic: product.name }]);
    }
    resetForm();
  }

  function deleteProduct(id: number) {
    const product = products.find((item) => item.id === id);
    if (!product || !window.confirm(`حذف المنتج «${product.name}»؟`)) return;
    setProducts((current) => current.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  }

  return (
    <AppShell title="المنتجات" subtitle="إضافة وتعديل وحذف المنتجات والأسعار والأصناف">
      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <section className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-[#221A12]">{editingId === null ? "إضافة منتج" : "تعديل المنتج"}</h2>
              <p className="mt-1 text-sm text-[#806c59]">أدخل بيانات المنتج ثم احفظ التغييرات</p>
            </div>
            {editingId !== null ? <button type="button" onClick={resetForm} className="text-sm font-semibold text-[#a45f00]">إلغاء التعديل</button> : null}
          </div>
          <form onSubmit={submitForm} className="space-y-3">
            {([["name", "اسم المنتج"], ["sku", "SKU"], ["grade", "التصنيف"], ["size", "الحجم"], ["price", "السعر"], ["stock", "المخزون"]] as const).map(([field, label]) => (
              <label key={field} className="block text-sm font-semibold text-[#4d3827]">
                {label}
                <input
                  required
                  type={field === "price" || field === "stock" ? "number" : "text"}
                  min={field === "price" || field === "stock" ? "0" : undefined}
                  value={form[field]}
                  onChange={(event) => updateField(field, event.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#e8d9b9] bg-[#fffaf4] px-3 py-2.5 font-normal outline-none focus:border-[#F4900E]"
                />
              </label>
            ))}
            <button type="submit" className="w-full rounded-2xl bg-[#F4900E] px-4 py-3 font-bold text-white">
              {editingId === null ? "إضافة المنتج" : "حفظ التعديل"}
            </button>
          </form>
        </section>

        <section className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-[#221A12]">قائمة المنتجات</h2>
              <p className="mt-1 text-sm text-[#806c59]">{filteredProducts.length} منتج</p>
            </div>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="بحث بالاسم أو SKU" aria-label="بحث في المنتجات" className="rounded-2xl border border-[#e9dcc1] bg-[#fffaf4] px-4 py-3 text-right outline-none focus:border-[#F4900E]" />
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[#f0e1c9]">
            <table className="w-full min-w-[720px] text-right text-sm">
              <thead className="bg-[#fffaf4] text-[#6a5643]"><tr>{["المنتج", "SKU", "التصنيف", "السعر", "المخزون", "الإجراءات"].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}</tr></thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t border-[#f3e8d8] text-[#3f2d20]">
                    <td className="px-4 py-4 font-bold">{product.name}<div className="text-xs font-normal text-[#806c59]">{product.size}</div></td>
                    <td className="px-4 py-4">{product.sku}</td>
                    <td className="px-4 py-4">{product.grade}</td>
                    <td className="px-4 py-4">{product.price.toLocaleString()} ر.س</td>
                    <td className="px-4 py-4">{product.stock}</td>
                    <td className="px-4 py-4"><div className="flex gap-2"><button type="button" onClick={() => startEdit(product)} className="rounded-xl bg-[#fff4df] px-3 py-2 font-semibold text-[#8a5700]">تعديل</button><button type="button" onClick={() => deleteProduct(product.id)} className="rounded-xl bg-[#fde8e8] px-3 py-2 font-semibold text-[#b13a3a]">حذف</button></div></td>
                  </tr>
                ))}
                {filteredProducts.length === 0 ? <tr><td colSpan={6} className="px-4 py-12 text-center text-[#806c59]">لا توجد منتجات مطابقة</td></tr> : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}