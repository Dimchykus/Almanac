import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Returns true if the string is a valid ISO date in YYYY-MM-DD format. */
export function isISODate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}
