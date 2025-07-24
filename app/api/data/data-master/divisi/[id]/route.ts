import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// PATCH divisi
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: Partial<DataMaster> = await req.json();
    const res = await axiosAuth.patch(`divisi/${params.id}`, body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to patch Divisi:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to patch Divisi" },
      { status: 500 }
    );
  }
}

// DELETE divisi
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.delete(`divisi/${params.id}`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(
      "Failed to delete Divisi:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to delete Divisi" },
      { status: 500 }
    );
  }
}
