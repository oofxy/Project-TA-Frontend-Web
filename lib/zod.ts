import { z } from "zod";

export const authFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Please fill the email")
    .email({ message: "Invalid email type" }),
  password: z.string().min(1, "Please fill the password"),
});
