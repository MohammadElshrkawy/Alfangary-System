import { ModulePage } from "@/components/module-page";

export default function BazaarsPage() {
  return <ModulePage title="البازارات" subtitle="إدارة نقاط البيع والبازارات" actionLabel="إضافة بازار" columns={["البازار", "الموقع", "المسؤول", "المبيعات", "الحالة"]} />;
}