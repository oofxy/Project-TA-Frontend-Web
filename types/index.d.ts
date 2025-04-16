declare interface TableDataProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  }
  
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
  
  export type Agama ={
    id: string
    agama: string
  }
  
  export type Pendidikan ={
    id: string
    pendidikan: string
  }
  
  export type Kelurahan ={
    id: string
    pendidikan: string
  }
  
  export type Kecamatan ={
    id: string
    pendidikan: string
  }
  
  export type Kabupaten ={
    id: string
    pendidikan: string
  }
  
  export type Provinsi ={
    id: string
    pendidikan: string
  }
  
  export type Jabatan ={
    id: string
    pendidikan: string
  }
  
  export type Pekerjaan ={
    id: string
    pendidikan: string
  }
  
  export type Golongan ={
    id: string
    pendidikan: string
  }
  
  export type StatusAbsensi ={
    id: string
    pendidikan: string
  }
  
  export type Divisi ={
    id: string
    pendidikan: string
  }
  
  export type LokasiKantor ={
    id: string
    pendidikan: string
  }
  
  export type LokasiKerja ={
    id: string
    pendidikan: string
  }
  
  export type JenisIzin ={
    id: string
    pendidikan: string
  }
  
  export type JenisKelamin ={
    id: string
    pendidikan: string
  }
  
  declare interface TextFieldProps {
    placeholder: string;
    className: string;
    type: React.HTMLInputTypeAttribute | undefined;
  }
  