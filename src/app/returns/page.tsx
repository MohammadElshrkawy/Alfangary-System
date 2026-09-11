import { ModulePage } from "@/components/module-page";

export default function ReturnsPage() {
  return <ModulePage title="المرتجعات" subtitle="مراجعة المرتجعات وتسوياتها" columns={["رقم المرتجع", "الطلب", "العميل", "القيمة", "الحالة"]} />;
}