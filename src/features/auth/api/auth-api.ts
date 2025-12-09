import { fetcher } from "@/src/shared/lib/api";

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}
export interface RegisterResponse {
  message: string;
  data: {
    userId: string;
    name: string;
    email: string;
    emailVerified: boolean;
    verificationEmailSent: boolean;
  };
}

export const authApi = {
  register: (data: RegisterData) => {
    return fetcher<RegisterResponse>("/auth/register", {
      method: "POST",
      body: data,
    });
  },
};
