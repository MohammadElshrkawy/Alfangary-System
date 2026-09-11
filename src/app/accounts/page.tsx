import { ModulePage } from "@/components/module-page";

export default function AccountsPage() {
  return <ModulePage title="الحسابات" subtitle="متابعة الأرصدة والحسابات المالية" actionLabel="قيد جديد" columns={["الحساب", "النوع", "الرصيد", "آخر حركة", "الحالة"]} />;
}