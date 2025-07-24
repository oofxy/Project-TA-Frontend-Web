import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// GET jenis-kelamin
export async function GET(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.get("jenis_kelamin");
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to fetch Jenis Kelamin:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch Jenis Kelamin" },
      { status: 500 }
    );
  }
}

// POST jenis-kelamin
export async function POST(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: DataMaster = await req.json(); // ini penting! parsing data dari request body
    const res = await axiosAuth.post("jenis_kelamin", body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to post Jenis Kelamin:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to post Jenis Kelamin" },
      { status: 500 }
    );
  }
}
