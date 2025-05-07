import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export enum FormDataRoutes {
  PERSONAL_DATA = "/user/personal-data",
  PARTNER_DATA = "/user/partner-data",
  PARENT_DATA = "/user/parents-data",
  CHILDREN_DATA = "/user/children-data",
  REVIEW_DATA = "/user/review"
}
