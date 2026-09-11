import { AppShell } from "@/components/app-shell";

type ModulePageProps = {
  title: string;
  subtitle: string;
  actionLabel?: string;
  columns: string[];
  rows?: string[][];
};

export function ModulePage({ title, subtitle, actionLabel = "إضافة جديد", columns, rows = [] }: ModulePageProps) {
  return (
    <AppShell title={title} subtitle={subtitle}>
      <section className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-1 items-center gap-3">
            <input
              aria-label="بحث"
              placeholder="بحث..."
              className="max-w-sm flex-1 rounded-2xl border border-[#e9dcc1] bg-[#fffaf4] px-4 py-3 text-right outline-none focus:border-[#F4900E]"
            />
            <button type="button" className="rounded-2xl border border-[#e7d7b8] bg-[#fff6eb] px-4 py-3 text-sm font-semibold text-[#4d3a2a]">
              تصفية
            </button>
          </div>
          <button type="button" className="rounded-2xl bg-[#F4900E] px-5 py-3 text-sm font-bold text-white">
            {actionLabel}
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#f0e1c9]">
          <table className="w-full min-w-[620px] text-right text-sm">
            <thead className="bg-[#fffaf4] text-[#6a5643]">
              <tr>
                {columns.map((column) => <th key={column} className="px-4 py-3 font-semibold">{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-[#f3e8d8] text-[#3f2d20]">
                  {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-4">{cell}</td>)}
                </tr>
              )) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center text-[#806c59]">لا توجد بيانات بعد</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}