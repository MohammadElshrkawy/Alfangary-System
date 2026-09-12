"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";

type ModulePageProps = {
  title: string;
  subtitle: string;
  actionLabel?: string;
  columns: string[];
  rows?: string[][];
};

export function ModulePage({ title, subtitle, actionLabel = "إضافة جديد", columns, rows = [] }: ModulePageProps) {
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? rows.filter((row) => row.some((cell) => cell.toLowerCase().includes(query))) : rows;
  }, [rows, search]);

  return (
    <AppShell title={title} subtitle={subtitle}>
      <section className="rounded-[28px] border border-[#f0e0c5] bg-white p-5 shadow-[0_10px_25px_rgba(34,26,18,0.04)]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-1 items-center gap-3">
            <input
              aria-label="بحث"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="بحث..."
              className="max-w-sm flex-1 rounded-2xl border border-[#e9dcc1] bg-[#fffaf4] px-4 py-3 text-right outline-none focus:border-[#F4900E]"
            />
            <button type="button" onClick={() => setNotice(search ? `تم تطبيق البحث عن: ${search}` : "أدخل كلمة للبحث أولًا")} className="rounded-2xl border border-[#e7d7b8] bg-[#fff6eb] px-4 py-3 text-sm font-semibold text-[#4d3a2a]">تصفية</button>
          </div>
          <button type="button" onClick={() => setNotice(`زر ${actionLabel} جاهز للربط بقاعدة البيانات`)} className="rounded-2xl bg-[#F4900E] px-5 py-3 text-sm font-bold text-white">
            {actionLabel}
          </button>
        </div>
        {notice ? <p role="status" className="mb-4 rounded-xl bg-[#edf9f1] px-3 py-2 text-sm font-semibold text-[#1d7b4d]">{notice}</p> : null}

        <div className="overflow-x-auto rounded-2xl border border-[#f0e1c9]">
          <table className="w-full min-w-[620px] text-right text-sm">
            <thead className="bg-[#fffaf4] text-[#6a5643]">
              <tr>
                {columns.map((column) => <th key={column} className="px-4 py-3 font-semibold">{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {filteredRows.length > 0 ? filteredRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-[#f3e8d8] text-[#3f2d20]">
                  {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-4">{cell}</td>)}
                </tr>
              )) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center text-[#806c59]">{rows.length > 0 ? "لا توجد نتائج مطابقة" : "لا توجد بيانات بعد"}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}