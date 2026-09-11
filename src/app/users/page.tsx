import { ModulePage } from "@/components/module-page";

export default function UsersPage() {
  return <ModulePage title="المستخدمون" subtitle="إدارة المستخدمين والصلاحيات" actionLabel="إضافة مستخدم" columns={["المستخدم", "البريد الإلكتروني", "الدور", "آخر دخول", "الحالة"]} />;
}