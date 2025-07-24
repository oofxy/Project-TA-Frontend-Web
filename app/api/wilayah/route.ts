import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = process.env.NEXT_PUBLIC_API_TOKEN;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const [provRes, kabRes, kecRes, kelRes] = await Promise.all([
      axios.get(`${baseUrl}provinsi`, { headers }),
      axios.get(`${baseUrl}kabupaten`, { headers }),
      axios.get(`${baseUrl}kecamatan`, { headers }),
      axios.get(`${baseUrl}kelurahan`, { headers }),
    ]);

    const provinsi = provRes.data;
    const kabupaten = kabRes.data;
    const kecamatan = kecRes.data;
    const kelurahan = kelRes.data;

    const kecamatanWithKelurahan = kecamatan.map((kec: any) => ({
      ...kec,
      kelurahans: kelurahan.filter((kel: any) => kel.kecamatan_id === kec.id),
    }));

    const kabupatenWithKecamatan = kabupaten.map((kab: any) => ({
      ...kab,
      kecamatans: kecamatanWithKelurahan.filter(
        (kec: any) => kec.kabupaten_id === kab.id
      ),
    }));

    const provinsiWithNested = provinsi.map((prov: any) => ({
      ...prov,
      kabupatens: kabupatenWithKecamatan.filter(
        (kab: any) => kab.provinsi_id === prov.id
      ),
    }));

    return NextResponse.json(provinsiWithNested);
  } catch (error: any) {
    console.error("🔥 Gagal ambil data wilayah:", error.message);
    return NextResponse.json(
      { error: "Gagal ambil data wilayah" },
      { status: 500 }
    );
  }
}
