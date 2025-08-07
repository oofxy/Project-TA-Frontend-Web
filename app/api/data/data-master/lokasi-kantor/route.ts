import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// GET lokasi-kantor
export async function GET(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.get("lokasi_kantor");
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to fetch Lokasi Kantor:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch Lokasi Kantor" },
      { status: 500 }
    );
  }
}

// POST lokasi-kantor
export async function POST(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: DataMaster = await req.json(); // ini penting! parsing data dari request body
    const res = await axiosAuth.post("lokasi_kantor", body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to post Lokasi Kantor:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to post Lokasi Kantor" },
      { status: 500 }
    );
  }
}
