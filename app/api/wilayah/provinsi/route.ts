import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const res = await axios.get(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("🔥 Gagal ambil provinsi:", error.message);
    return NextResponse.json(
      { error: "Gagal ambil provinsi" },
      { status: 500 }
    );
  }
}
