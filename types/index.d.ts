import { NewForm } from "@/app/features/onboarding/schema";

declare interface TableDataProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type DataKaryawan = {
  id: number;
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
  agama: string;
  edit: string;
};

export type DataRegisterUser = {
  id: number;
  nama: string;
  akun: string;
  password: string;
  edit: string;
};

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: any;
  setCurrentPage: any;
}

export type Absensi = {
  id: number;
  nama: string;
  masuk: string;
  pulang: string;
  status: "Tepat Waktu" | "Terlambat" | "Izin";
};

export type Pangkat = {
  id: string;
  pangkat: string;
};

export type Agama = {
  id: string;
  agama: string;
};

export type Pendidikan = {
  id: string;
  pendidikan: string;
};

export type Kelurahan = {
  id: string;
  kelurahan: string;
};

export type Kecamatan = {
  id: string;
  kecamatan: string;
};

export type Kabupaten = {
  id: string;
  kabupaten: string;
};

export type Provinsi = {
  id: string;
  provinsi: string;
};

export type Jabatan = {
  id: string;
  jabatan: string;
};

export type Pekerjaan = {
  id: string;
  pekerjaan: string;
};

export type Golongan = {
  id: string;
  golongan: string;
};

export type StatusAbsensi = {
  id: string;
  statusAbsensi: string;
};

export type Divisi = {
  id: string;
  divisi: string;
};

export type LokasiKantor = {
  id: string;
  lokasiKantor: string;
};

export type LokasiKerja = {
  id: string;
  lokasiKerja: string;
};

export type JenisIzin = {
  id: string;
  jenisIzin: string;
};

export type JenisKelamin = {
  id: string;
  jenisKelamin: string;
};

declare interface TextFieldProps {
  placeholder: string;
  className: string;
  type: React.HTMLInputTypeAttribute | undefined;
}

declare interface FormFieldConfig {
  name: keyof NewForm;
  label: string;
  type: React.HTMLInputTypeAttribute | "select";
  placeholder?: string;
}

declare interface SelectOption {
  value: string;
  label: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}
