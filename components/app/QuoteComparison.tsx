import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import type { Quote } from "@/types";

export function QuoteComparison({ quotes }: { quotes: Quote[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {quotes.map((quote) => {
        return (
          <Card key={quote.id} className="rounded-[28px]">
            <p className="text-sm uppercase tracking-[0.16em] text-brown-400">{quote.proName ?? "Professional"}</p>
            <h3 className="mt-4 font-serif text-4xl text-brown-800">{formatCurrency(quote.totalAmount)}</h3>
            <p className="mt-2 text-brown-400">{quote.message}</p>
            <div className="mt-6 space-y-3 border-t border-cream-300 pt-6">
              {quote.breakdown.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm text-brown-500">
                  <span>{item.label}</span>
                  <span>{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
