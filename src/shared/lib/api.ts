const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export class ApiError extends Error {
  constructor(message: string, public status: number, public data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;

    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, ApiError.prototype);

    // Capture stack trace (optional but good for debugging)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  headers?: Record<string, string>;
  credentials?: "include" | "omit" | "same-origin";
  retryCount?: number;
  skipAutoRefresh?: boolean;
};

export async function fetcher<T>(
  endpoint: string,
  options?: FetcherOptions
): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
    credentials = "include",
    retryCount = 0,
    skipAutoRefresh = false,
  } = options || {};

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // 🔄 AUTO-REFRESH ON 401
  if (response.status === 401 && retryCount === 0 && !skipAutoRefresh) {
    try {
      // Attempt to refresh tokens
      await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      // Retry original request with new tokens
      return fetcher<T>(endpoint, {
        ...options,
        retryCount: 1, // Prevent infinite loops
      });
    } catch (refreshError) {
      // Refresh failed - user needs to login
      throw new ApiError(
        "Session expired. Please login again.",
        401,
        refreshError
      );
    }
  }

  if (!response.ok) {
    const errorData = await response.json();

    const errorObj = {
      name: "ApiError",
      message: errorData.message || response.statusText,
      status: response.status,
      data: errorData,
      isApiError: true,
    };

    // Create error from the object
    throw new ApiError(
      errorObj.message || response.statusText,
      errorObj.status,
      errorObj.data
    );
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null as T;
  }

  const data = await response.json();
  return data;
}
