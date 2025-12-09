import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "../api/auth-api";
import { ApiError } from "@/src/shared/lib/api";

export function useVerifyEmail() {
  const router = useRouter();

  return useMutation({
    mutationKey: ["verify-email"],
    mutationFn: (token: string) => authApi.verifyEmail(token),
    onSuccess: (response) => {
      toast.success("Email Verified successfully!", {
        description: response.message,
      });

      setTimeout(() => {
        router.push(`/`);
      }, 1500);
    },
    onError: (error: ApiError) => {
      console.log(error.message);
      const errorMessage =
        error.message || "Email Verification failed. Please try again.";
      if (error.status === 400) {
        return toast.error("Verification Error", {
          description: error.message,
        });
      }
      if (error.status === 429) {
        return toast.error("Too Many Requests", {
          description: error.message,
        });
      } else {
        return toast.error("Email Verification failed", {
          description: errorMessage,
        });
      }
    },
  });
}
