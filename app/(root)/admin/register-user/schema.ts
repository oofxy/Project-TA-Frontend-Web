import { z } from "zod";

export const userFormSchema = z.object({
  karyawanId: z.string().nonempty("Karyawan is required"),
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type FormSchema = z.infer<typeof userFormSchema>;