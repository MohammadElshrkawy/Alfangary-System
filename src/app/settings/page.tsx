import { ModulePage } from "@/components/module-page";

export default function SettingsPage() {
  return <ModulePage title="الإعدادات" subtitle="إدارة إعدادات النظام والفروع" actionLabel="حفظ الإعدادات" columns={["الإعداد", "القيمة", "آخر تعديل", "عدّله", "الحالة"]} />;
}