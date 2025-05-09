import { z } from "zod";

export const personalSchema = z.object({
  nama: z.string().min(1, "Nama tidak boleh kosong"),
  nip: z
    .string()
    .min(1, "NIP tidak boleh kosong")
    .regex(/^\d+$/, "NIP harus berupa angka"),
  nik: z
    .string()
    .min(1, "NIK tidak boleh kosong")
    .regex(/^\d+$/, "NIK harus berupa angka"),
  email: z
    .string()
    .min(1, "Email tidak boleh kosong")
    .email("Format email invalid"),
  telephone: z
    .string()
    .min(1, "No telepon tidak boleh kosong")
    .regex(/^\d+$/, "No telepon harus berupa angka"),
  tempat_lahir: z.string().min(1, "Tempat lahir tidak boleh kosong"),
  tanggal_lahir: z.string().min(1, "Tanggal lahir tidak boleh kosong"),
  alamat: z.string().min(1, "Alamat tidak boleh kosong"),
  npwp: z.string().min(1, "NPWP tidak boleh kosong"),
});

export const partnerSchema = z.object({
  nama_pasangan: z.string().min(1, "Nama pasangan tidak boleh kosong"),
  tempat_lahir_pasangan: z
    .string()
    .min(1, "Tempat lahir pasangan tidak boleh kosong"),
  pekerjaan_pasangan: z
    .string()
    .min(1, "Pekerjaan pasangan tidak boleh kosong"),
  telephone_pasangan: z
    .string()
    .min(1, "No telepon pasangan tidak boleh kosong")
    .regex(/^\d+$/, "No telepon pasangan harus berupa angka"),
});

export const parentSchema = z.object({
  nama_ayah: z.string().min(1, "Nama ayah tidak boleh kosong"),
  nama_ibu: z.string().min(1, "Nama ibu tidak boleh kosong"),
  alamat_ayah: z.string().min(1, "Alamat ayah tidak boleh kosong"),
  alamat_ibu: z.string().min(1, "Alamat ibu tidak boleh kosong"),
});

export const childSchema = z.object({
  nama_anak: z.string().min(1, "Nama anak tidak boleh kosong"),
  nik_anak: z
    .string()
    .min(1, "NIK anak tidak boleh kosong")
    .regex(/^\d+$/, "NIK anak harus berupa angka"),
  tempat_lahir_anak: z.string().min(1, "Tempat lahir anak tidak boleh kosong"),
  tanggal_lahir_anak: z
    .string()
    .min(1, "Tanggal lahir anak tidak boleh kosong"),
});

export const childrenSchema = z.array(childSchema);

export const newFormSchema = z.object({
  ...personalSchema.shape,
  ...partnerSchema.shape,
  ...parentSchema.shape,
  children: childrenSchema.optional(),
});

export const newFormInitialValuesSchema = z.object({
  nama: z.string().optional(),
  nip: z.string().optional(),
  nik: z.string().optional(),
  email: z.string().optional(),
  telephone: z.string().optional(),
  tempat_lahir: z.string().optional(),
  tanggal_lahir: z.string().optional(),
  alamat: z.string().optional(),
  npwp: z.string().optional(),
  nama_pasangan: z.string().optional(),
  tempat_lahir_pasangan: z.string().optional(),
  pekerjaan_pasangan: z.string().optional(),
  telephone_pasangan: z.string().optional(),
  nama_ayah: z.string().optional(),
  nama_ibu: z.string().optional(),
  alamat_ayah: z.string().optional(),
  alamat_ibu: z.string().optional(),
  nama_anak: z.string().optional(),
  nik_anak: z.string().optional(),
  tempat_lahir_anak: z.string().optional(),
  tanggal_lahir_anak: z.string().optional(),
  children: childrenSchema.optional(),
});

export type ChildForm = z.infer<typeof childSchema>;

export type NewForm = z.infer<typeof newFormSchema>;

export type NewFormInitialValuesType = z.infer<
  typeof newFormInitialValuesSchema
>;
