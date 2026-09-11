import { ModulePage } from "@/components/module-page";

export default function OrdersPage() {
  return <ModulePage title="الطلبات" subtitle="متابعة الطلبات والمبيعات" columns={["رقم الطلب", "العميل", "التاريخ", "الإجمالي", "الحالة"]} />;
}