"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f9f3e8] text-[#221A12]" dir="rtl">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-4 lg:p-8">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-[#ecd8b5] bg-[#fffdf9] shadow-[0_22px_70px_rgba(34,26,18,0.08)] lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col justify-center bg-[#fffdf9] p-8 sm:p-10 lg:p-14">
            <div className="mb-8">
              <BrandLogo variant="light" />
            </div>

            <div className="mb-6">
              <h1 className="text-4xl font-black text-[#221A12]">مرحبًا بك في الفنجري</h1>
              <p className="mt-3 text-lg text-[#6a5643]">نظام إدارة المبيعات والمخزون</p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4d3827]">البريد الإلكتروني</label>
                <input
                  defaultValue="admin@alfangary.com"
                  className="w-full rounded-2xl border border-[#e9dcc1] bg-[#fffaf4] px-4 py-3 text-base outline-none ring-0 transition focus:border-[#F4900E]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4d3827]">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    defaultValue="password123"
                    className="w-full rounded-2xl border border-[#e9dcc1] bg-[#fffaf4] px-4 py-3 pr-11 text-base outline-none transition focus:border-[#F4900E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#7d664f]"
                  >
                    {showPassword ? "إخفاء" : "عرض"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-[#5d4738]">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-[#d8c39d] accent-[#F4900E]" />
                  تذكرني
                </label>
                <a href="#" className="font-medium text-[#c2770a]">هل نسيت كلمة المرور؟</a>
              </div>

              <Link href="/dashboard" className="mt-4 block w-full rounded-2xl bg-[#F4900E] px-4 py-3 text-center text-lg font-bold text-white shadow-[0_18px_30px_rgba(244,144,14,0.3)] transition hover:bg-[#e08709]">
                تسجيل الدخول
              </Link>
            </form>
          </div>

          <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(170,143,255,0.2),_transparent_30%),linear-gradient(135deg,#f9d8c7_0%,#f6ae4a_30%,#f4900e_55%,#221a12_100%)] p-8 sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(163,110,255,0.18),_transparent_28%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex justify-end">
                <BrandLogo variant="login" />
              </div>

              <div className="space-y-4">
                <div className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-[#fff8ee] backdrop-blur-sm">
                  Natural Honey
                </div>
                <h2 className="max-w-sm text-3xl font-black leading-tight text-[#fffaf0]">عسل الفنجري… نقاوة الطبيعة في كل نقطة</h2>
                <p className="max-w-sm text-base text-[#fff6ed]/90">
                  إدارة شاملة للمبيعات، المخزون، البازارات، السجلات المالية، والعملاء في منصة واحدة.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3 text-sm text-[#fff6ee]">
                <span>facebook.com/alfangary.online</span>
                <span>instagram.com/alfangary.online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
