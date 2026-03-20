import { useMutation } from "@tanstack/react-query";

export function useStripeConnect() {
  return useMutation({
    mutationFn: async () => ({ url: "/api/stripe/connect" })
  });
}
