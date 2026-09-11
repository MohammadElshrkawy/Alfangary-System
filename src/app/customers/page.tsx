import { ModulePage } from "@/components/module-page";

export default function CustomersPage() {
  return <ModulePage title="العملاء" subtitle="إدارة بيانات العملاء وحساباتهم" columns={["العميل", "الهاتف", "عدد الطلبات", "الرصيد", "الحالة"]} />;
}