import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi, RegisterData, ApiErrorResponse } from "../api/auth-api";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (response) => {
      toast.success("Registration successful!", {
        description: response.message,
      });

      // Redirect to verification page after a short delay
      setTimeout(() => {
        router.push(
          `/verify-email?email=${encodeURIComponent(response.data.email)}`
        );
      }, 1500);
    },
    onError: (error: ApiErrorResponse & { status?: number }) => {
      const errorMessage =
        error.message || "Registration failed. Please try again.";

      if (error.status === 409) {
        toast.error("Email already registered", {
          description: "This email is already associated with an account.",
        });
      } else if (error.status === 400) {
        toast.error("Validation error", {
          description: "Please check your input and try again.",
        });
      } else {
        toast.error("Registration failed", {
          description: errorMessage,
        });
      }
    },
  });
}
