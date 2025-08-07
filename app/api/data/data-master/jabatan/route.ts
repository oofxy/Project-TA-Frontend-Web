import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// GET jabatan
export async function GET(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.get("jabatan");
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to fetch Jabatan:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch Jabatan" },
      { status: 500 }
    );
  }
}

// POST jabatan
export async function POST(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: DataMaster = await req.json(); // ini penting! parsing data dari request body
    const res = await axiosAuth.post("jabatan", body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to post Jabatan:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to post Jabatan" },
      { status: 500 }
    );
  }
}
