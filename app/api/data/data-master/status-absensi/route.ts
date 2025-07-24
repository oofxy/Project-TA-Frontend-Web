import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// GET status-absensi
export async function GET(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.get("status_absensi");
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to fetch Status Absensi:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch Status Absensi" },
      { status: 500 }
    );
  }
}

// POST status-absensi
export async function POST(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: DataMaster = await req.json();
    const res = await axiosAuth.post("status_absensi", body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to post Status Absensi:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to post Status Absensi" },
      { status: 500 }
    );
  }
}
