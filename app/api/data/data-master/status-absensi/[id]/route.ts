import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// PATCH status-absensi
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: Partial<DataMaster> = await req.json();
    const res = await axiosAuth.patch(`status_absensi/${params.id}`, body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to patch Status Absensi:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to patch Status Absensi" },
      { status: 500 }
    );
  }
}

// DELETE status-absensi
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.delete(`status_absensi/${params.id}`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(
      "Failed to delete Status Absensi:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to delete Status Absensi" },
      { status: 500 }
    );
  }
}
