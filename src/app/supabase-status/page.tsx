"use client";

import { useEffect, useState } from "react";
import { testSupabaseConnection } from "@/lib/supabase";

export default function SupabaseStatusPage() {
  const [status, setStatus] = useState("CHECKING");
  const [message, setMessage] = useState("جاري اختبار الاتصال...");

  useEffect(() => {
    async function runCheck() {
      const result = await testSupabaseConnection();
      if (result.ok) {
        setStatus("CONNECTED");
        setMessage("تم الاتصال بنجاح بقاعدة بيانات Supabase.");
      } else {
        setStatus("NOT_CONNECTED");
        setMessage(result.error || "تعذر الاتصال بقاعدة البيانات.");
      }
    }

    runCheck();
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f3e8] p-8 text-[#221A12]" dir="rtl">
      <div className="mx-auto max-w-xl rounded-[28px] border border-[#efd9b0] bg-white p-8 shadow-[0_18px_40px_rgba(34,26,18,0.06)]">
        <h1 className="text-3xl font-black">حالة Supabase</h1>
        <p className="mt-4 text-lg text-[#5d4738]">
          حالة الاتصال الحالية: <span className="font-bold text-[#F4900E]">{status}</span>
        </p>
        <p className="mt-3 text-sm text-[#7d664f]">{message}</p>
        <div className="mt-6 rounded-2xl bg-[#fffaf4] p-4 text-sm text-[#4d3827]">
          URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || "غير موجود"}
        </div>
      </div>
    </div>
  );
}
