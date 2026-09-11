import { ModulePage } from "@/components/module-page";

export default function GiftsPage() {
  return <ModulePage title="الهدايا" subtitle="إدارة الهدايا والعروض المجانية" actionLabel="إضافة هدية" columns={["الهدية", "النوع", "الكمية", "تاريخ الانتهاء", "الحالة"]} />;
}