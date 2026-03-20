import { notFound } from "next/navigation";
import { MapPin, ShieldCheck, Star } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { demoPros } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function ProProfilePage({ params }: { params: { id: string } }) {
  const pro = demoPros.find((entry) => entry.id === params.id);
  if (!pro) notFound();

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-cream-300 bg-white p-8">
        <p className="text-sm uppercase tracking-[0.18em] text-brown-400">Verified pro</p>
        <h1 className="mt-4 font-serif text-5xl text-brown-800">{pro.businessName}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-brown-400">{pro.bio}</p>
        <div className="mt-8 flex flex-wrap gap-5 text-sm text-brown-500">
          <span className="inline-flex items-center gap-2">
            <Star className="h-4 w-4 text-terracotta-500" />
            {pro.ratingAvg} average rating
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brown-400" />
            {pro.locationCity}
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-sage-600" />
            Verified licensing and insurance
          </span>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="rounded-[28px]">
          <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Trades</p>
          <p className="mt-4 text-brown-600">{pro.trades.join(" · ")}</p>
        </Card>
        <Card className="rounded-[28px]">
          <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Starting rate</p>
          <p className="mt-4 font-serif text-4xl text-brown-800">{formatCurrency(pro.hourlyRate)}/hr</p>
        </Card>
        <Card className="rounded-[28px]">
          <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Experience</p>
          <p className="mt-4 font-serif text-4xl text-brown-800">{pro.yearsExperience} years</p>
        </Card>
      </div>
    </div>
  );
}
