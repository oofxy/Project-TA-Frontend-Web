import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const endpoints = {
  agama_id: "agama",
  pendidikan_id: "pendidikan",
  jenis_kelamin_id: "jenis_kelamin",
  pangkat_id: "pangkat",
  jabatan_id: "jabatan",
  pekerjaan_id: "pekerjaan",
  golongan_id: "golongan",
  divisi_id: "divisi",
  lokasi_kantor_id: "lokasi_kantor",
  lokasi_kerja_id: "lokasi_kerja",
  status_id: "status",
};

type EndpointKeys = keyof typeof endpoints;

interface SelectOption {
  value: string;
  label: string;
}

const axiosFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function POST(req: NextRequest) {
  try {
    const form = await req.json();
    console.log("Received form:", form);

    const karyawanPayload = {
      name: form.nama,
      nip: form.nip,
      nik: form.nik,
      email: form.email,
      telephone: form.telephone,
      tempat_lahir: form.tempat_lahir,
      tanggal_lahir: form.tanggal_lahir,
      alamat: form.alamat,
      provinsi: form.provinsi_nama,
      kabupaten: form.kabupaten_nama,
      kecamatan: form.kecamatan_nama,
      kelurahan: form.kelurahan_nama,
      pendidikan_id: form.pendidikan_id,
      npwp: form.npwp,
      jenis_kelamin_id: form.jenis_kelamin_id,
      mulai_tugas: form.mulai_tugas,
      pangkat_id: form.pangkat_id,
      jabatan_id: form.jabatan_id,
      pekerjaan_id: form.pekerjaan_id,
      golongan_id: form.golongan_id,
      divisi_id: form.divisi_id,
      agama_id: form.agama_id,
      lokasi_kantor_id: form.lokasi_kantor_id,
      lokasi_kerja_id: form.lokasi_kerja_id,
      nama_pasangan: form.nama_pasangan,
      tempat_lahir_pasangan: form.tempat_lahir_pasangan,
      pekerjaan_id_pasangan: form.pekerjaan_pasangan,
      telephone_pasangan: form.telephone_pasangan,
      nama_ayah: form.nama_ayah,
      nama_ibu: form.nama_ibu,
      alamat_ayah: form.alamat_ayah,
      alamat_ibu: form.alamat_ibu,
      status_id: form.status_id,
    };

    console.log("Karyawan payload:", karyawanPayload);

    let karyawanId;
    try {
      const res = await axiosFetch.post("karyawan", karyawanPayload);
      karyawanId = res.data?.karyawan?.id;
    } catch (err: any) {
      console.error(
        "Gagal create karyawan:",
        err?.response?.data || err.message
      );
      return NextResponse.json(
        { error: "Gagal menyimpan data karyawan ke server." },
        { status: 500 }
      );
    }

    if (!karyawanId) {
      return NextResponse.json(
        { error: "Gagal mendapatkan ID karyawan dari server." },
        { status: 500 }
      );
    }

    if (Array.isArray(form.children) && form.children.length > 0) {
      for (const child of form.children) {
        try {
          await axiosFetch.post("anak", {
            karyawan_id: karyawanId,
            name: child.name,
            nik: child.nik,
            jenis_kelamin_id: child.jenis_kelamin_id,
            tempat_lahir: child.tempat_lahir,
            tanggal_lahir: child.tanggal_lahir,
          });
        } catch (err: any) {
          console.error(
            "Gagal create anak:",
            err?.response?.data || err.message
          );
          return NextResponse.json(
            { error: "Gagal menyimpan data anak ke server." },
            { status: 500 }
          );
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Submit form failed:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data ke server." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const results: Partial<Record<EndpointKeys, SelectOption[]>> = {};

  try {
    await Promise.all(
      Object.entries(endpoints).map(async ([key, endpoint]) => {
        try {
          const res = await axiosFetch.get(endpoint);
          const arr = Array.isArray(res.data) ? res.data : res.data.data || [];

          results[key as EndpointKeys] = arr.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
        } catch (err: any) {
          console.error(
            `Error fetching ${endpoint}:`,
            err?.response?.data || err.message
          );
          results[key as EndpointKeys] = [];
        }
      })
    );

    return NextResponse.json(results);
  } catch (err: any) {
    console.error("Fatal GET submit-form error:", err);
    return NextResponse.json(results);
  }
}
