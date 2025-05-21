declare interface TableDataProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type DataKaryawan = {
  id: string;
  name: string;
  nip: string;
  nik: string;
  email: string;
  telephone: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  kelurahan_id: string;
  pendidikan_id: string;
  npwp: string;
  jenis_kelamin_id: string;
  mulai_tugas: string;
  pangkat_id: string;
  jabatan_id: string;
  pekerjaan_id: string;
  golongan_id: string;
  divisi_id: string;
  agama_id: string;
  lokasi_kantor_id: string;
  lokasi_kerja_id: string;
  status_id: string;
  nama_pasangan: string;
  tempat_lahir_pasangan: string;
  pekerjaan_id_pasangan: string;
  telephone_pasangan: string;
  nama_ayah: string;
  nama_ibu: string;
  alamat_ayah: string;
  alamat_ibu: string;
};

export type DataRegisterUser = {
  id: string;
  nama: string;
  email: string;
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
