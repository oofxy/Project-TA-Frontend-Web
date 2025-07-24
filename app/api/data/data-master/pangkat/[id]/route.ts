import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// PATCH pangkat
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: Partial<DataMaster> = await req.json();
    const res = await axiosAuth.patch(`pangkat/${params.id}`, body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to patch Pangkat:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to patch Pangkat" },
      { status: 500 }
    );
  }
}

// DELETE pangkat
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.delete(`pangkat/${params.id}`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(
      "Failed to delete Pangkat:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to delete Pangkat" },
      { status: 500 }
    );
  }
}
