import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capFirst(str: string) {
  if (typeof str !== "string" || str.length === 0) {
    console.error("Input should be a non-empty string");
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
