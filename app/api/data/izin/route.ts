import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";

export async function GET(req: NextRequest) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.get("izin");
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to fetch Izin:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch Izin" },
      { status: 500 }
    );
  }
}
