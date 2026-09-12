import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const navItems = [
  { href: "/dashboard", label: "لوحة التحكم" },
  { href: "/pos", label: "نقطة البيع" },
  { href: "/products", label: "المنتجات" },
  { href: "/inventory", label: "المخزون" },
  { href: "/orders", label: "الطلبات" },
  { href: "/customers", label: "العملاء" },
  { href: "/vendors", label: "الموردون" },
  { href: "/bazaars", label: "البازارات" },
  { href: "/incoming-orders", label: "الطلبات الواردة" },
  { href: "/gifts", label: "الهدايا" },
  { href: "/returns", label: "المرتجعات" },
  { href: "/accounts", label: "الحسابات" },
  { href: "/expenses", label: "المصروفات" },
  { href: "/shortage", label: "العجز" },
  { href: "/reports", label: "التقارير" },
  { href: "/integrations", label: "التكاملات" },
  { href: "/settings", label: "الإعدادات" },
  { href: "/users", label: "المستخدمون" },
  { href: "/audit", label: "التدقيق" },
];

export function AppShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="min-h-screen bg-[#f9f3e8] text-[#221A12]" dir="rtl">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-l border-[#efe4d5] bg-[#fffdf9] p-5 lg:block">
          <div className="mb-6">
            <BrandLogo variant="sidebar" />
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center rounded-2xl px-3 py-2.5 text-sm font-medium text-[#402d1f] transition hover:bg-[#f5ead9] hover:text-[#221A12]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-10 border-b border-[#efe4d5] bg-[#fffdf9]/90 px-6 py-4 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6a41]">ALFANGARY</p>
                <h1 className="mt-1 text-2xl font-black text-[#221A12]">{title}</h1>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/reports" className="rounded-full border border-[#e7d7b8] bg-[#fff6eb] px-4 py-2 text-sm font-medium text-[#4d3a2a]">التقارير</Link>
                <div className="flex items-center gap-3 rounded-full border border-[#ead9bc] bg-[#fff9f3] px-3 py-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4900E] text-sm font-bold text-white">م</div>
                  <div className="text-left text-sm">
                    <div className="font-bold">محمد</div>
                    <div className="text-[#7d664f]">مدير</div>
                  </div>
                </div>
              </div>
            </div>
            {subtitle ? <p className="mt-2 text-sm text-[#6a5643]">{subtitle}</p> : null}
          </header>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
