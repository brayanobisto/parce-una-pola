import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  // eslint-disable-next-line
  return twMerge(clsx(inputs)) as string;
};
