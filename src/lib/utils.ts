import { WeekType } from "@/types";
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


export function getCurrentWeekType(initialDate: Date, initialWeekType: WeekType, currentDate: Date): WeekType {
  const timeDiff = currentDate.getTime() - initialDate.getTime();
  const weeksPassed = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000));

  const cycle = ["technical", "marketing"];
  const currentWeekIndex = weeksPassed % cycle.length;

  return cycle[currentWeekIndex] as WeekType;
}
