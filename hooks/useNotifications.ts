import { useQuery } from "@tanstack/react-query";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => [
      { id: "notif-1", title: "Quote received", body: "Bathroom remodel has a new quote." },
      { id: "notif-2", title: "Milestone funded", body: "Kitchen project milestone two is funded." }
    ]
  });
}
