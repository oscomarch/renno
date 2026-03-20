import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import type { ProProfile } from "@/types";

export function ProCard({ pro }: { pro: ProProfile }) {
  return (
    <Card className="rounded-[28px] overflow-hidden p-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-56">
        <Image alt={pro.businessName} className="object-cover" fill src={pro.portfolioImages[0]} />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-3xl text-brown-800">{pro.businessName}</h3>
            <p className="mt-2 text-sm text-brown-400">{pro.bio}</p>
          </div>
          {pro.featured ? <Badge className="bg-terracotta-50 text-terracotta-700">Featured</Badge> : null}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {pro.trades.map((trade) => (
            <Badge key={trade}>{trade}</Badge>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-brown-500">
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 text-terracotta-500" />
            {pro.ratingAvg} ({pro.ratingCount})
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4 text-brown-400" />
            {pro.locationCity}
          </span>
          <span>From {formatCurrency(pro.hourlyRate)}/hr</span>
        </div>
        <Link className="mt-6 inline-flex text-sm font-medium text-terracotta-600" href={`/app/pro/${pro.id}`}>
          View profile
        </Link>
      </div>
    </Card>
  );
}
