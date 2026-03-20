import { Badge } from "@/components/ui/Badge";

export function SectionIntro({
  label,
  title,
  description
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Badge>{label}</Badge>
      <h2 className="mt-5 font-serif text-4xl leading-tight text-brown-800 sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-lg text-brown-400">{description}</p> : null}
    </div>
  );
}
