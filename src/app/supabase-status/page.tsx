import { supabase } from "@/lib/supabase";

export default function SupabaseStatusPage() {
  const status = supabase ? "CONNECTED" : "NOT_CONNECTED";

  return (
    <div className="min-h-screen bg-[#f9f3e8] p-8 text-[#221A12]" dir="rtl">
      <div className="mx-auto max-w-xl rounded-[28px] border border-[#efd9b0] bg-white p-8 shadow-[0_18px_40px_rgba(34,26,18,0.06)]">
        <h1 className="text-3xl font-black">حالة Supabase</h1>
        <p className="mt-4 text-lg text-[#5d4738]">حالة الاتصال الحالية: <span className="font-bold text-[#F4900E]">{status}</span></p>
        <p className="mt-3 text-sm text-[#7d664f]">
          أضف قيم المشروع في ملف .env ثم ابدأ التطبيق لاستخدام قاعدة Supabase بشكل فعلي.
        </p>
      </div>
    </div>
  );
}
