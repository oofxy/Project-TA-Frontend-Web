import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, verification } = body;
    if (!id || (verification !== "disetujui" && verification !== "ditolak")) {
      return NextResponse.json(
        { success: false, error: "ID dan verification harus valid" },
        { status: 400 }
      );
    }

    const axios = await createAxiosWithAuth();
    console.log("Sending payload =>", { terverifikasi: verification });
    await axios.patch(`izin/${id}/verify`, { terverifikasi: verification });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Verification error:", error.response?.status);
    console.error("Backend response:", error.response?.data);
    return NextResponse.json(
      { success: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
