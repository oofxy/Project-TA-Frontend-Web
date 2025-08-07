import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// GET golongan
export async function GET(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.get("golongan");
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to fetch Golongan:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch Golongan" },
      { status: 500 }
    );
  }
}

// POST golongan
export async function POST(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: DataMaster = await req.json(); // ini penting! parsing data dari request body
    const res = await axiosAuth.post("golongan", body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to post Golongan:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to post Golongan" },
      { status: 500 }
    );
  }
}
