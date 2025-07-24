import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// GET pangkat
export async function GET(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.get("pangkat");
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to fetch Pangkat:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch Pangkat" },
      { status: 500 }
    );
  }
}

// POST pangkat
export async function POST(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: DataMaster = await req.json(); // ini penting! parsing data dari request body
    const res = await axiosAuth.post("pangkat", body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to post Pangkat:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to post Pangkat" },
      { status: 500 }
    );
  }
}
