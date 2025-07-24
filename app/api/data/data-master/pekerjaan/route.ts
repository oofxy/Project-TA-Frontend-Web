import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// GET pekerjaan
export async function GET(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.get("pekerjaan");
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to fetch Pekerjaan:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch Pekerjaan" },
      { status: 500 }
    );
  }
}

// POST pekerjaan
export async function POST(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: DataMaster = await req.json(); // ini penting! parsing data dari request body
    const res = await axiosAuth.post("pekerjaan", body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to post Pekerjaan:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to post Pekerjaan" },
      { status: 500 }
    );
  }
}
