import { ModulePage } from "@/components/module-page";

export default function IncomingOrdersPage() {
  return <ModulePage title="الطلبات الواردة" subtitle="استقبال ومراجعة طلبات التوريد" actionLabel="طلب توريد" columns={["الطلب", "المورد", "تاريخ الوصول", "القيمة", "الحالة"]} />;
}