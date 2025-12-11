import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi, LoginData } from "../api/auth-api";
import { useAuth } from "../context/auth-context";
import { ApiError } from "@/src/shared/lib/api";

export function useLogin() {
  const router = useRouter();
  const { setUser } = useAuth();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginData) => authApi.login(data),
    onSuccess: (response) => {
      // Update auth context with user data
      setUser(response.data.user);

      toast.success("Login successful!", {
        description: response.message,
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    },
    onError: (error: ApiError) => {
      const errorMessage = error?.message || "Login failed. Please try again.";

      // Handle specific error cases
      if (error?.status === 401) {
        toast.error("Invalid credentials", {
          description: "Please check your email and password.",
        });
      } else if (error?.status === 429) {
        toast.error("Too many attempts", {
          description: "Please wait a few minutes before trying again.",
        });
      } else {
        toast.error("Login failed", {
          description: errorMessage,
        });
      }
    },
  });
}
