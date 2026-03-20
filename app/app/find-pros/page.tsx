import { ProCard } from "@/components/app/ProCard";
import { TopBar } from "@/components/app/TopBar";
import { demoPros } from "@/lib/data";

export default function FindProsPage() {
  return (
    <div className="space-y-8">
      <TopBar title="Find pros" subtitle="Browse verified tradespeople by trade, city, rating, and fit." />
      <div className="grid gap-5 xl:grid-cols-2">
        {demoPros.map((pro) => (
          <ProCard key={pro.id} pro={pro} />
        ))}
      </div>
    </div>
  );
}
