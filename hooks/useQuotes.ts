import { useQuery } from "@tanstack/react-query";

import { demoQuotes } from "@/lib/data";

export function useQuotes(projectId?: string) {
  return useQuery({
    queryKey: ["quotes", projectId],
    queryFn: async () => (projectId ? demoQuotes.filter((quote) => quote.projectId === projectId) : demoQuotes)
  });
}
