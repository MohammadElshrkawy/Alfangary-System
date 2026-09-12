import { AppShell } from "@/components/app-shell";
import { revenueStats, bestSellers, paymentBreakdown } from "@/data/mock";

function StatCard({ label, value, delta, tone }: { label: string; value: string; delta: string; tone: "positive" | "warning" | "danger" }) {
  const toneMap = {
    positive: "bg-[#edf9f1] text-[#1d7b4d]",
    warning: "bg-[#fff2dc] text-[#a45f00]",
    danger: "bg-[#fde8e8] text-[#b13a3a]",
  };

  return (
    <div className="rounded-[24px] border border-[#f0e0c5] bg-white p-4 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
      <div className="flex items-center justify-between">
        <div className="text-sm text-[#6f5641]">{label}</div>
        <div className={`rounded-full px-2 py-1 text-xs font-bold ${toneMap[tone]}`}>{delta}</div>
      </div>
      <div className="mt-4 text-2xl font-black text-[#221A12]">{value}</div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell title="لوحة التحكم" subtitle="مؤشرات الأداء الرئيسية خلال آخر 30 يومًا">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {revenueStats.slice(0, 8).map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} delta={item.delta} tone={item.tone as "positive" | "warning" | "danger"} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black text-[#221A12]">المبيعات عبر الزمن</h2>
            <div className="flex gap-2 text-sm text-[#7d664f]">
              <span className="rounded-full bg-[#f5ead9] px-2 py-1">يومي</span>
              <span>أسبوعي</span>
              <span>شهري</span>
            </div>
          </div>

          <div className="flex h-64 items-end gap-3 px-2">
            {[42, 58, 44, 62, 75, 81, 67, 90, 72, 84, 96, 78].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-2xl bg-gradient-to-t from-[#F4900E] via-[#ffb24d] to-[#f7d9a8]" style={{ height: `${height}%` }} />
                <span className="text-xs text-[#7d664f]">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
          <h2 className="mb-4 text-xl font-black text-[#221A12]">تحليل الدفع</h2>
          <div className="space-y-4">
            {paymentBreakdown.map((item) => (
              <div key={item.method}>
                <div className="mb-1 flex items-center justify-between text-sm text-[#4d3827]">
                  <span>{item.method}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#f6eedf]">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#F4900E] to-[#c47dff]" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black text-[#221A12]">أفضل المنتجات</h2>
            <span className="rounded-full bg-[#fff4df] px-3 py-1.5 text-sm font-medium text-[#7d4e00]">الأكثر مبيعًا</span>
          </div>

          <div className="space-y-3">
            {bestSellers.map((item) => (
              <div key={item.name} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 rounded-2xl border border-[#f0e1c9] bg-[#fffaf4] p-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4900E]/15 text-lg font-black text-[#F4900E]">ع</div>
                <div>
                  <div className="font-bold text-[#221A12]">{item.name}</div>
                  <div className="text-sm text-[#70604d]">{item.size}</div>
                </div>
                <div className="text-sm text-[#70604d]">{item.sold} قطعة</div>
                <div className="text-sm font-semibold text-[#221A12]">{item.revenue.toLocaleString()} ر.س</div>
                <div className="text-sm font-semibold text-[#1d7b4d]">{item.profit.toLocaleString()} ر.س</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#f0e0c5] bg-[#fffaf4] p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
          <h2 className="mb-4 text-xl font-black text-[#221A12]">نظرة سريعة</h2>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-[#6a5643]">المشتريات</div>
              <div className="mt-2 text-3xl font-black text-[#221A12]">₩ 68,420</div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-[#6a5643]">المبالغ المتوقعة</div>
              <div className="mt-2 text-3xl font-black text-[#221A12]">₩ 92,180</div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-[#6a5643]">التدقيق</div>
              <div className="mt-2 text-lg font-bold text-[#1d7b4d]">جميع المعاملات متزامنة</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
