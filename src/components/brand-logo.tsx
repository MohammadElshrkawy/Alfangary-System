type BrandLogoVariant =
  | "light"
  | "dark"
  | "compact"
  | "sidebar"
  | "login"
  | "print";

const baseClasses = {
  light: "bg-[#FBF3DE] text-[#221A12] border border-[#f0d8a2]",
  dark: "bg-[#221A12] text-[#FBF3DE] border border-[#3a2d25]",
  compact: "bg-[#F4900E] text-[#FBF3DE] border border-[#eb8f0b]",
  sidebar: "bg-[#fffaf4] text-[#221A12] border border-[#eedcb4]",
  login: "bg-[#F4900E] text-[#FBF3DE] border border-[#e08b08] shadow-[0_12px_30px_rgba(244,144,14,0.35)]",
  print: "bg-white text-[#221A12] border border-[#e8e0d4]",
} as const;

export function BrandLogo({ variant = "light", className = "" }: { variant?: BrandLogoVariant; className?: string }) {
  const variantClass = baseClasses[variant] ?? baseClasses.light;

  if (variant === "compact") {
    return (
      <div className={`flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl ${variantClass} ${className}`}>
        <span className="text-xl font-black tracking-tighter">الف</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 rounded-2xl px-3 py-2 ${variantClass} ${className}`}>
      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-[#F4900E] text-[#FBF3DE] shadow-sm">
        <span className="text-xl font-black tracking-tighter">الف</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[1.15rem] font-black tracking-[0.02em]">الفنجري</span>
        <span className="mt-1 text-[0.55rem] font-semibold tracking-[0.22em] uppercase opacity-80">Natural Honey</span>
      </div>
    </div>
  );
}
