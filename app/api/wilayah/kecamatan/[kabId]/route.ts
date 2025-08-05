import { NextResponse } from "next/server";
import axios from "axios";

interface Params {
  params: { kabId: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { kabId } = params;
    const res = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabId}.json`
    );
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("🔥 Gagal ambil kecamatan:", error.message);
    return NextResponse.json(
      { error: "Gagal ambil kecamatan" },
      { status: 500 }
    );
  }
}
