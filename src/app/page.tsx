import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f9f3e8] p-6" dir="rtl">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-[#ecd8b5] bg-[#fffdf9] shadow-[0_18px_60px_rgba(34,26,18,0.08)]">
        <div className="grid items-center gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-10 lg:p-14">
            <div className="mb-8 inline-flex rounded-full border border-[#f0dfb9] bg-[#fffaf4] px-3 py-1 text-xs font-bold tracking-[0.18em] text-[#8b6a41]">
              ALFANGARY
            </div>
            <h1 className="text-4xl font-black text-[#221A12] sm:text-5xl">الفنجري</h1>
            <p className="mt-4 max-w-xl text-lg text-[#6a5643]">
              نظام إدارة المبيعات والمخزون، العملاء، البازارات، نقاط البيع، والمحاسبة في واجهة عربية أولاً.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login" className="rounded-2xl bg-[#F4900E] px-5 py-3 text-base font-bold text-white shadow-[0_16px_30px_rgba(244,144,14,0.28)]">
                تسجيل الدخول
              </Link>
              <Link href="/dashboard" className="rounded-2xl border border-[#ead9bc] bg-[#fff8ee] px-5 py-3 text-base font-bold text-[#4d3827]">
                لوحة التحكم
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(170,143,255,0.18),_transparent_30%),linear-gradient(135deg,#f9d8c7_0%,#f6ae4a_30%,#f4900e_55%,#221a12_100%)] p-8 sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(163,110,255,0.22),_transparent_28%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between text-[#fffaf0]">
              <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-sm">Natural Honey</div>
              <div>
                <h2 className="text-3xl font-black leading-tight">عسل الفنجري… نقاوة الطبيعة في كل نقطة</h2>
                <p className="mt-3 max-w-sm text-base text-[#fff4ea]">نظام تجاري مخصص للعلامة التجارية الفنجري مع إدارة دقيقة للمخزون والمبيعات.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
