import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// GET agama
export async function GET(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.get("agama");
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to fetch Agama:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch Agama" },
      { status: 500 }
    );
  }
}

// POST agama
export async function POST(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: DataMaster = await req.json(); // ini penting! parsing data dari request body
    const res = await axiosAuth.post("agama", body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to post Agama:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to post Agama" },
      { status: 500 }
    );
  }
}
