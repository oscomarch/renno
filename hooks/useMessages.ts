import { useQuery } from "@tanstack/react-query";

import { demoMessages } from "@/lib/data";

export function useMessages(projectId?: string) {
  return useQuery({
    queryKey: ["messages", projectId],
    queryFn: async () => (projectId ? demoMessages.filter((message) => message.projectId === projectId) : demoMessages)
  });
}
