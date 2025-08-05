import { NextResponse } from "next/server";
import axios from "axios";

interface Params {
  params: { kecId: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { kecId } = params;
    const res = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecId}.json`
    );
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("🔥 Gagal ambil kelurahan:", error.message);
    return NextResponse.json(
      { error: "Gagal ambil kelurahan" },
      { status: 500 }
    );
  }
}
