import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth-api";

export function useVerifyEmail() {
  return useMutation({
    mutationKey: ["verify-email"],
    mutationFn: (token: string) => authApi.verifyEmail(token),
    onSuccess: () => {
      // TODO => Login
    },
  });
}
