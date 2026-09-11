import { ModulePage } from "@/components/module-page";

export default function IntegrationsPage() {
  return <ModulePage title="التكاملات" subtitle="إدارة الخدمات المتصلة بالنظام" actionLabel="إضافة تكامل" columns={["الخدمة", "النوع", "آخر مزامنة", "البيانات", "الحالة"]} />;
}