import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";

export async function GET(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.get("karyawan");
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to fetch karyawan:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch karyawan" },
      { status: 500 }
    );
  }
}
