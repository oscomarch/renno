import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => ({
      user: {
        id: "client-1",
        name: "Olivia Harper",
        role: "client"
      }
    }),
    staleTime: Infinity
  });
}
