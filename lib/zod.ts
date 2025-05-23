import { z } from "zod";

export const authFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Please fill the email")
    .email({ message: "Invalid email type" }),
  password: z.string().min(1, "Please fill the password"),
});

export const userFormSchema = z.object({
  karyawanId: z.string().nonempty("Karyawan is required"),
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type FormSchema = z.infer<typeof userFormSchema>;

export const dataMasterSchema = z.object({
  name: z.string().min(1, "Tolong isi data"),
  provinsiId: z.string().optional()
});

export type DataMasterSchema = z.infer<typeof dataMasterSchema>;