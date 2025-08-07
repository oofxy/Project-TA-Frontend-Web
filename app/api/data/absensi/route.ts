import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";

export async function GET(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.get("absensi");
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to fetch Absensi:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch Absensi" },
      { status: 500 }
    );
  }
}
