import { ModulePage } from "@/components/module-page";

export default function AuditPage() {
  return <ModulePage title="التدقيق" subtitle="سجل العمليات والتغييرات على النظام" columns={["العملية", "المستخدم", "الوحدة", "التاريخ", "التفاصيل"]} />;
}