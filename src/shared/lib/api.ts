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
