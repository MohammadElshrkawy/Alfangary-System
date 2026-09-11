import { ModulePage } from "@/components/module-page";

export default function ReportsPage() {
  return <ModulePage title="التقارير" subtitle="تقارير المبيعات والمخزون والحسابات" actionLabel="إنشاء تقرير" columns={["التقرير", "الفترة", "آخر تشغيل", "أنشأه", "الإجراء"]} />;
}