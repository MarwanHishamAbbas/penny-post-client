import { useMutation } from "@tanstack/react-query";
import { authApi, RegisterData } from "../api/auth-api";

export function useSearchPosts(body: RegisterData) {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: () => authApi.register(body),
  });
}
