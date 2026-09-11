import { ModulePage } from "@/components/module-page";

export default function ShortagePage() {
  return <ModulePage title="العجز" subtitle="تسجيل ومراجعة فروق المخزون" actionLabel="تسجيل عجز" columns={["الصنف", "الكمية المتوقعة", "الكمية الفعلية", "الفرق", "الحالة"]} />;
}