import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// PATCH jenis izin
export async function PATCH(
  req: NextRequest,
  context: any
) {
  const { id } = context.params as { id: string }; 
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: Partial<DataMaster> = await req.json();
    const res = await axiosAuth.patch(`jenis_izin/${id}`, body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to patch Jenis Izin:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to patch Jenis Izin" },
      { status: 500 }
    );
  }
}

// DELETE jenis izin
export async function DELETE(
  _: NextRequest,
  context: any
) {
  const { id } = context.params as { id: string }; 
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.delete(`jenis_izin/${context.params.id}`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(
      "Failed to delete Jenis Izin:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to delete Jenis Izin" },
      { status: 500 }
    );
  }
}
