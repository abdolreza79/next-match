import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { differenceInYears } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(date: Date) {
  return differenceInYears(new Date(), date);
}

export async function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 5000));
}