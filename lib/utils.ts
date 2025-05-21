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

export const userFormSchema = z.object({
  karyawanId: z.string().nonempty("Karyawan is required"),
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type FormSchema = z.infer<typeof userFormSchema>;

export enum FormDataRoutes {
  PERSONAL_DATA = "/user/personal-data",
  WORK_DATA = "/user/work-data",
  PARTNER_DATA = "/user/partner-data",
  PARENT_DATA = "/user/parents-data",
  CHILDREN_DATA = "/user/children-data",
  REVIEW_DATA = "/user/review"
}

