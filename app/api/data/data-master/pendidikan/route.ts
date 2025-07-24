import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// GET pendidikan
export async function GET(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.get("pendidikan");
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to fetch Pendidikan:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch Pendidikan" },
      { status: 500 }
    );
  }
}

// POST pendidikan
export async function POST(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: DataMaster = await req.json(); // ini penting! parsing data dari request body
    const res = await axiosAuth.post("pendidikan", body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to post Pendidikan:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to post Pendidikan" },
      { status: 500 }
    );
  }
}
