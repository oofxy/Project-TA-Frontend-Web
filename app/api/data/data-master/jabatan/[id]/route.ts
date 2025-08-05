import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// PATCH jabatan
export async function PATCH(
  req: NextRequest,
  context: any
) {
  const { id } = context.params as { id: string }; 
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: Partial<DataMaster> = await req.json();
    const res = await axiosAuth.patch(`jabatan/${id}`, body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to patch Jabatan:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to patch Jabatan" },
      { status: 500 }
    );
  }
}

// DELETE jabatan
export async function DELETE(
  _: NextRequest,
  context: any
) {
  const { id } = context.params as { id: string }; 
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.delete(`jabatan/${id}`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(
      "Failed to delete Jabatan:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to delete Jabatan" },
      { status: 500 }
    );
  }
}
