const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export class ApiError extends Error {
  constructor(message: string, public status: number, public data?: unknown) {
    super(message);
    this.name = "ApiError";
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
    credentials = "include", // Important: include cookies for auth
  } = options || {};

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials, // This sends cookies with requests
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      error.message || "Something went wrong",
      response.status,
      error
    );
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null as T;
  }

  const data = await response.json();

  return data;
}
