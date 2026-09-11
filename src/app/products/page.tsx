import { ModulePage } from "@/components/module-page";

export default function ProductsPage() {
  return <ModulePage title="المنتجات" subtitle="إدارة المنتجات والأسعار والأصناف" columns={["المنتج", "التصنيف", "السعر", "المخزون", "الحالة"]} />;
}