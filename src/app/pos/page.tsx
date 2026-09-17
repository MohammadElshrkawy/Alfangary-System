"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { cartSeed, productCatalog } from "@/data/mock";
import { loadProducts, Product, updateProductStock } from "@/lib/products";
import { loadSellers, Seller } from "@/lib/sellers";
import { addOrUpdateCustomer } from "@/lib/customers";
import { addOrder } from "@/lib/orders";

const PaymentMethods = ["نقدي", "Vodafone Cash", "Visa", "Mastercard", "InstaPay", "تحويل بنكي", "أخرى"];

export default function PosPage() {
  const [selectedSeller, setSelectedSeller] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("نقدي");
  const [received, setReceived] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(5);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>(productCatalog);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [cart, setCart] = useState(cartSeed);
  const [notice, setNotice] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    startTransition(() => {
      setProducts(loadProducts());
      setSellers(loadSellers());
    });
  }, []);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? products.filter((product) => [product.name, product.sku, product.size].some((value) => value.toLowerCase().includes(query))) : products;
  }, [products, search]);
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountValue = (subtotal * discountPercent) / 100;
  const tax = 0;
  const total = subtotal - discountValue;
  const changeDue = received - total;
  const cashReady = paymentMethod === "نقدي" ? received >= total && selectedSeller : selectedSeller !== "";

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { id: product.id, name: product.name, quantity: 1, unitPrice: product.price, discount: 0 }];
    });
    setNotice(`تمت إضافة ${product.name} إلى السلة`);
  }

  function updateQuantity(id: number, amount: number) {
    setCart((current) => current.flatMap((item) => item.id === id ? (item.quantity + amount > 0 ? [{ ...item, quantity: item.quantity + amount }] : []) : [item]));
  }

  function clearCart() {
    setCart([]);
    setReceived(0);
    setNotice("تم تفريغ السلة");
  }

  function completePayment() {
    if (!customerName.trim() || !customerPhone.trim()) {
      setNotice("أدخل اسم العميل ورقم الموبايل أولًا");
      return;
    }
    addOrUpdateCustomer(customerName.trim(), customerPhone.trim());
    addOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      seller: selectedSeller,
      paymentMethod,
      subtotal,
      discountPercent,
      tax,
      total,
      items: cart.map((item) => ({ id: item.id, name: item.name, quantity: item.quantity, unitPrice: item.unitPrice })),
    });
    setProducts(updateProductStock(cart.map((item) => ({ id: item.id, quantity: item.quantity }))));
    setNotice(`تم إتمام الدفع بقيمة ${total.toFixed(2)} ج.م`);
    setCart([]);
    setReceived(0);
    setCustomerName("");
    setCustomerPhone("");
  }

  return (
    <AppShell title="نقطة البيع" subtitle="واجهة مبيعات سريعة ومهنية">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_12px_32px_rgba(34,26,18,0.04)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="بحث بالاسم، SKU، Barcode"
              className="w-full rounded-2xl border border-[#e9dcc1] bg-[#fffaf4] px-4 py-3 text-right outline-none focus:border-[#F4900E]"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {visibleProducts.map((product) => (
              <div key={product.id} className="rounded-[22px] border border-[#f0e0c5] bg-[#fffaf4] p-3">
                <div className="mb-3 flex h-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f6e7bf] to-[#f8c065] text-3xl">ع</div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#7d664f]">{product.grade}</span>
                  <span className="rounded-full bg-[#fff4db] px-2 py-1 text-[10px] font-bold text-[#9a6500]">{product.size}</span>
                </div>
                <div className="text-lg font-black text-[#221A12]">{product.name}</div>
                <div className="mt-2 flex items-center justify-between text-sm text-[#4d3827]">
                  <span>{product.price} ج.م</span>
                  <span>{product.stock} في المخزون</span>
                </div>
                <button type="button" onClick={() => addToCart(product)} className="mt-3 w-full rounded-2xl bg-[#F4900E] px-3 py-2.5 text-sm font-bold text-white">إضافة للسلة</button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#f0e0c5] bg-[#fffaf4] p-5 shadow-[0_12px_32px_rgba(34,26,18,0.04)]">
          <div className="mb-4">
            <h2 className="text-xl font-black text-[#221A12]">السلة الحالية</h2>
          </div>

          <div className="mb-4 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="rounded-2xl border border-[#f2e0c7] bg-white p-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-[#221A12]">{item.name}</div>
                    <div className="text-xs text-[#7b6652]">{item.unitPrice} ج.م / الوحدة</div>
                  </div>
                  <button type="button" onClick={() => updateQuantity(item.id, -item.quantity)} className="text-sm text-[#b13a3a]">حذف</button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full bg-[#f8eedb] px-2 py-1">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)} className="h-6 w-6 rounded-full bg-white font-bold">-</button>
                    <span className="min-w-5 text-center font-bold">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)} className="h-6 w-6 rounded-full bg-white font-bold">+</button>
                  </div>
                  <div className="font-bold text-[#221A12]">{item.quantity * item.unitPrice} ج.م</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4 rounded-2xl border border-[#f1dfc0] bg-white p-3">
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium text-[#4d3827]">البائع</label>
              <select
                value={selectedSeller}
                onChange={(e) => setSelectedSeller(e.target.value)}
                className="w-full rounded-xl border border-[#e8d9b9] bg-[#fffaf4] px-3 py-2.5 text-sm outline-none focus:border-[#F4900E]"
              >
                <option value="">اختر البائع</option>
                {sellers.map((seller) => (
                  <option key={seller.id} value={seller.name}>{seller.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              {PaymentMethods.map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold ${paymentMethod === method ? "bg-[#F4900E] text-white" : "bg-[#f7ebd6] text-[#4d3827]"}`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 rounded-2xl border border-[#f1dfc0] bg-white p-3">
            <h3 className="mb-3 font-bold text-[#221A12]">بيانات العميل</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <input required value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="اسم العميل" aria-label="اسم العميل" className="rounded-xl border border-[#e9dcc1] bg-[#fffaf4] px-3 py-2.5 outline-none focus:border-[#F4900E]" />
              <input required type="tel" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} placeholder="رقم الموبايل" aria-label="رقم الموبايل" className="rounded-xl border border-[#e9dcc1] bg-[#fffaf4] px-3 py-2.5 text-left outline-none focus:border-[#F4900E]" />
            </div>
          </div>

          <div className="space-y-2 rounded-2xl border border-[#f1dfc0] bg-[#fffdfa] p-3 text-sm text-[#4d3827]">
            <div className="flex justify-between"><span>المجموع الفرعي</span><span>{subtotal} ج.م</span></div>
            <label className="flex items-center justify-between gap-3"><span>الخصم (%)</span><input type="number" min="0" max="100" value={discountPercent} onChange={(event) => setDiscountPercent(Number(event.target.value || 0))} className="w-20 rounded-lg border border-[#e9dcc1] bg-[#fffaf4] px-2 py-1 text-center outline-none focus:border-[#F4900E]" /></label>
            <div className="mt-3 flex justify-between border-t border-[#f2e0c7] pt-3 text-lg font-black text-[#221A12]"><span>الإجمالي</span><span>{total.toFixed(2)} ج.م</span></div>
          </div>

          {paymentMethod === "نقدي" && (
            <div className="mt-4 rounded-2xl border border-[#f1dfc0] bg-white p-3">
              <label className="mb-1 block text-sm font-medium text-[#4d3827]">المبلغ المستلم من العميل</label>
              <input
                type="number"
                value={received}
                onChange={(e) => setReceived(Number(e.target.value || 0))}
                className="w-full rounded-xl border border-[#e9dcc1] bg-[#fffaf4] px-3 py-2.5 text-base outline-none focus:border-[#F4900E]"
              />
              <div className={`mt-3 text-sm font-bold ${changeDue >= 0 ? "text-[#16814a]" : "text-[#b13a3a]"}`}>
                الباقي للعميل: {changeDue >= 0 ? `${changeDue.toFixed(2)} ج.م` : `- ${Math.abs(changeDue).toFixed(2)} ج.م`}
              </div>
            </div>
          )}

          {notice ? <p role="status" className="mt-4 rounded-xl bg-[#edf9f1] px-3 py-2 text-sm font-semibold text-[#1d7b4d]">{notice}</p> : null}

          <div className="mt-5 flex gap-3">
            <button type="button" onClick={clearCart} className="flex-1 rounded-2xl border border-[#e7d7b8] bg-[#fff8ee] px-4 py-3 font-bold text-[#4d3827]">تفريغ</button>
            <button
              type="button"
              onClick={completePayment}
              disabled={!cashReady}
              className={`flex-1 rounded-2xl px-4 py-3 font-bold text-white ${cashReady ? "bg-[#F4900E]" : "cursor-not-allowed bg-[#d9cab0]"}`}
            >
              إتمام الدفع
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
