import { useQuery } from "@tanstack/react-query";

import { demoProjects } from "@/lib/data";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => demoProjects
  });
}
