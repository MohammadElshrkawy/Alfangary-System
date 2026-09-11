import { ModulePage } from "@/components/module-page";

export default function InventoryPage() {
  return <ModulePage title="المخزون" subtitle="متابعة الكميات وحركة المخزون" actionLabel="تسجيل حركة" columns={["الصنف", "المتاح", "الحد الأدنى", "آخر تحديث", "الحالة"]} />;
}