import { Clock, Database, FileText, Home, User, UserPlus } from "lucide-react";

export const adminSidebarLinks = [
  {
    icon: <Home />,
    route: "/admin",
    label: "Dashboard",
  },
  {
    icon: <Database />,
    route: "/admin/data-master",
    label: "Data Master",
    dropdownOptions: [
      { label: "Kelurahan", route: "/admin/data-master/kelurahan" },
      { label: "Kecamatan", route: "/admin/data-master/kecamatan" },
      { label: "Kabupaten", route: "/admin/data-master/kabupaten" },
      { label: "Provinsi", route: "/admin/data-master/provinsi" },
      { label: "Pendidikan", route: "/admin/data-master/pendidikan" },
      { label: "Pangkat", route: "/admin/data-master/pangkat" },
      { label: "Jabatan", route: "/admin/data-master/jabatan" },
      { label: "Pekerjaan", route: "/admin/data-master/pekerjaan" },
      { label: "Golongan", route: "/admin/data-master/golongan" },
      { label: "Divisi", route: "/admin/data-master/divisi" },
      { label: "Agama", route: "/admin/data-master/agama" },
      { label: "Lokasi Kantor", route: "/admin/data-master/lokasi-kantor" },
      { label: "Lokasi Kerja", route: "/admin/data-master/lokasi-kerja" },
      { label: "Jenis Kelamin", route: "/admin/data-master/jenis-kelamin" },
      { label: "Jenis Izin", route: "/admin/data-master/jenis-izin" },
      { label: "Status Absensi", route: "/admin/data-master/status-absensi" },
    ],
  },
  {
    icon: <Clock />,
    route: "/admin/absensi",
    label: "Absensi",
  },
  {
    icon: <FileText />,
    route: "/admin/izin",
    label: "Izin",
  },
  {
    icon: <User />,
    route: "/admin/data-karyawan",
    label: "Data Karyawan",
  },
  {
    icon: <UserPlus />,
    route: "/admin/register-user",
    label: "Register User",
  },
];