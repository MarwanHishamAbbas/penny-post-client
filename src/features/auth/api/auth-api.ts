import { fetcher } from "@/src/shared/lib/api";

// Types
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

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      avatar_url: string | null;
      email_verified: boolean;
      created_at: string;
    };
    session: {
      expires_at: string;
    };
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface CurrentUserResponse {
  data: {
    user: User;
  };
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
  data?: {
    email?: string;
  };
}

// Auth API functions
export const authApi = {
  // Register
  register: (data: RegisterData) => {
    return fetcher<RegisterResponse>("/auth/register", {
      method: "POST",
      body: data,
    });
  },

  // Login
  login: (data: LoginData) => {
    return fetcher<LoginResponse>("/auth/login", {
      method: "POST",
      body: data,
    });
  },

  // Get current user
  getCurrentUser: () => {
    return fetcher<CurrentUserResponse>("/auth/me");
  },

  // Logout
  logout: (logoutAll: boolean = false) => {
    return fetcher("/auth/logout", {
      method: "POST",
      body: { logout_all: logoutAll },
    });
  },

  // Refresh token
  refresh: () => {
    return fetcher("/auth/refresh", {
      method: "POST",
    });
  },

  // Resend verification email
  resendVerification: (email: string) => {
    return fetcher("/auth/resend-verification", {
      method: "POST",
      body: { email },
    });
  },
};
