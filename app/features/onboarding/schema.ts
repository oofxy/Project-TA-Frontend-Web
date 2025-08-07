import { z } from "zod";
import { REQUIRED, ONLY_DIGITS, INVALID_DATE } from "./types";

const stringRequired = (msg = REQUIRED) => z.string().min(1, msg);
const digitString = (length: number, msg?: string) =>
  z
    .string()
    .length(length, msg ?? `${length} digit angka diperlukan`)
    .regex(/^\d+$/, ONLY_DIGITS);

const dateString = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), { message: INVALID_DATE });

export const personalSchema = z.object({
  nama: stringRequired(),
  nip: digitString(18, "NIP harus 18 digit"),
  nik: digitString(16, "NIK harus 16 digit"),
  email: stringRequired().trim().email("Format email invalid"),
  telephone: z
    .string()
    .min(1, REQUIRED)
    .max(15, "No telepon tidak lebih dari 15 digit")
    .regex(/^\d+$/, ONLY_DIGITS),
  tempat_lahir: stringRequired(),
  tanggal_lahir: dateString,
  alamat: stringRequired(),
  provinsi_id: stringRequired(),
  kabupaten_id: stringRequired(),
  kecamatan_id: stringRequired(),
  kelurahan_id: stringRequired(),
  npwp: z
    .string()
    .min(15, "NPWP minimal 15 karakter")
    .max(20, "NPWP maksimal 20 karakter")
    .regex(/^\d+$/, ONLY_DIGITS),
  agama_id: stringRequired(),
  pendidikan_id: stringRequired(),
  jenis_kelamin_id: stringRequired(),
});

export const workSchema = z.object({
  pangkat_id: stringRequired(),
  jabatan_id: stringRequired(),
  pekerjaan_id: stringRequired(),
  golongan_id: stringRequired(),
  divisi_id: stringRequired(),
  status_id: stringRequired(),
  mulai_tugas: dateString,
  lokasi_kantor_id: stringRequired(),
  lokasi_kerja_id: stringRequired(),
});

export const partnerSchema = z.object({
  nama_pasangan: z.string().optional(),
  tempat_lahir_pasangan: z.string().optional(),
  pekerjaan_pasangan: z.string().optional(),
  telephone_pasangan: z.string().optional(),
});

export const parentSchema = z.object({
  nama_ayah: z.string().optional(),
  nama_ibu: z.string().optional(),
  alamat_ayah: z.string().optional(),
  alamat_ibu: z.string().optional(),
});

export const childSchema = z.object({
  name: stringRequired("Nama anak tidak boleh kosong"),
  nik: digitString(16, "NIK harus 16 digit"),
  jenis_kelamin_id: stringRequired(),
  jenis_kelamin_nama: z.string().optional(),
  tempat_lahir: stringRequired("Tempat lahir anak tidak boleh kosong"),
  tanggal_lahir: dateString,
});

export const childrenSchema = z.array(childSchema);

export const newFormSchema = z.object({
  ...personalSchema.shape,
  ...workSchema.shape,
  ...partnerSchema.shape,
  ...parentSchema.shape,

  provinsi_nama: z.string().optional(),
  kabupaten_nama: z.string().optional(),
  kecamatan_nama: z.string().optional(),
  kelurahan_nama: z.string().optional(),

  agama_nama: z.string().optional(),
  pendidikan_nama: z.string().optional(),
  jenis_kelamin_nama: z.string().optional(),

  pangkat_nama: z.string().optional(),
  jabatan_nama: z.string().optional(),
  pekerjaan_nama: z.string().optional(),
  golongan_nama: z.string().optional(),
  divisi_nama: z.string().optional(),
  status_nama: z.string().optional(),
  lokasi_kantor_nama: z.string().optional(),
  lokasi_kerja_nama: z.string().optional(),

  children: childrenSchema.optional(),
});

export const newFormInitialValuesSchema = newFormSchema.deepPartial();

export type MyPersonalForm = z.infer<typeof personalSchema>;
export type MyWorkForm = z.infer<typeof workSchema>;
export type MyChildForm = z.infer<typeof childSchema>;
export type NewForm = z.infer<typeof newFormSchema>;
export type NewFormInitialValuesType = z.infer<
  typeof newFormInitialValuesSchema
>;
