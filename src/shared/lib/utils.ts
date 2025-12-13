import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate URL-friendly slug from a title
 * @param title - The title to convert to a slug
 * @param options - Optional configuration
 * @returns URL-safe slug string
 */
export function generateSlug(
  title: string,
  options?: {
    lowercase?: boolean;
    separator?: string;
    maxLength?: number;
  }
): string {
  const { lowercase = true, separator = "-", maxLength = 200 } = options || {};

  let slug = title
    // Remove leading/trailing whitespace
    .trim()
    // Convert to lowercase (optional)
    .toLowerCase()
    // Replace spaces with separator
    .replace(/\s+/g, separator)
    // Remove special characters (keep letters, numbers, and separator)
    .replace(/[^\w\-]+/g, "")
    // Replace multiple separators with single separator
    .replace(new RegExp(`${separator}+`, "g"), separator)
    // Remove separator from start and end
    .replace(new RegExp(`^${separator}+|${separator}+$`, "g"), "");

  // Apply lowercase if option is true
  if (!lowercase) {
    slug = title
      .trim()
      .replace(/\s+/g, separator)
      .replace(/[^\w\-]+/g, "")
      .replace(new RegExp(`${separator}+`, "g"), separator)
      .replace(new RegExp(`^${separator}+|${separator}+$`, "g"), "");
  }

  // Truncate to max length
  if (maxLength && slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
    // Remove trailing separator after truncation
    slug = slug.replace(new RegExp(`${separator}+$`), "");
  }

  return slug;
}
