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

export type DataMaster = {
  id: string;
  name: string;
  provinsiId?: string
};

declare interface TextFieldProps {
  placeholder: string;
  className: string;
  type: React.HTMLInputTypeAttribute | undefined;
}

declare interface CustomDialogProps {
  id?: string;
  initialData?: Partial<Agama>;
  children: React.ReactNode;
  mode: "add" | "edit";
  mapData?: DataMaster[];
}
