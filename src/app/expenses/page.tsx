import { ModulePage } from "@/components/module-page";

export default function ExpensesPage() {
  return <ModulePage title="المصروفات" subtitle="تسجيل ومراجعة مصروفات التشغيل" actionLabel="تسجيل مصروف" columns={["البيان", "التصنيف", "المبلغ", "التاريخ", "الحالة"]} />;
}