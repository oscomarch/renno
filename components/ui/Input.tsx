import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-sm text-brown-800 outline-none placeholder:text-brown-400 focus:border-transparent focus:ring-2 focus:ring-terracotta-500",
        props.className
      )}
    />
  );
}
