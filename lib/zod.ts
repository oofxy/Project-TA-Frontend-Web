import { z } from "zod";

export const dataMasterSchema = z.object({
  name: z.string().min(1, "Tolong isi data"),
  provinsiId: z.string().optional()
});

export type DataMasterSchema = z.infer<typeof dataMasterSchema>;
