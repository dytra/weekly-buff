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

export function getTotalWeekPassed(initialDate: Date, currentDate: Date):number {
  const timeDiff = currentDate.getTime() - initialDate.getTime();
  let weeksPassed = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000));
  weeksPassed = weeksPassed < 0 ? 0 : weeksPassed;
  return weeksPassed;

}

export function getCurrentWeekType(initialDate: Date, initialWeekType: WeekType, currentDate: Date): WeekType {
  const timeDiff = currentDate.getTime() - initialDate.getTime();
  const weeksPassed = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000));

  const weekTypes: WeekType[] = [initialWeekType, "marketing", "technical"];
  const currentWeekIndex = weeksPassed % weekTypes.length;

  return weekTypes[currentWeekIndex];
}

export function getWeekTypeByTotalWeeks(initialWeekType: WeekType, totalWeeksPassed: number): WeekType {
  const weekTypes: WeekType[] = [initialWeekType, "marketing", "technical"];
  const currentWeekIndex = totalWeeksPassed % weekTypes.length;

  return weekTypes[currentWeekIndex];
}