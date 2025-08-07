import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// GET lokasi-kerja
export async function GET(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.get("lokasi_kerja");
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to fetch Lokasi Kerja:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch Lokasi Kerja" },
      { status: 500 }
    );
  }
}

// POST lokasi-kerja
export async function POST(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: DataMaster = await req.json(); // ini penting! parsing data dari request body
    const res = await axiosAuth.post("lokasi_kerja", body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to post Lokasi Kerja:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to post Lokasi Kerja" },
      { status: 500 }
    );
  }
}
