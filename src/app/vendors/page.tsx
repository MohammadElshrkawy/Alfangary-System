import { ModulePage } from "@/components/module-page";

export default function VendorsPage() {
  return <ModulePage title="الموردون" subtitle="إدارة الموردين وبيانات التوريد" columns={["المورد", "جهة الاتصال", "الهاتف", "الرصيد المستحق", "الحالة"]} />;
}