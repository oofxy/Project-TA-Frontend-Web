import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// PATCH lokasi-kantor
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: Partial<DataMaster> = await req.json();
    const res = await axiosAuth.patch(`lokasi_kantor/${params.id}`, body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to patch Lokasi Kantor:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to patch Lokasi Kantor" },
      { status: 500 }
    );
  }
}

// DELETE lokasi-kantor
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.delete(`lokasi_kantor/${params.id}`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(
      "Failed to delete Lokasi Kantor:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to delete Lokasi Kantor" },
      { status: 500 }
    );
  }
}
