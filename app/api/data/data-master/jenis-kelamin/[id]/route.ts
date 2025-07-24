import { NextRequest, NextResponse } from "next/server";
import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { DataMaster } from "@/types";

// PATCH jenis-kelamin
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const body: Partial<DataMaster> = await req.json();
    const res = await axiosAuth.patch(`jenis_kelamin/${params.id}`, body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Failed to patch Jenis Kelamin:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to patch Jenis Kelamin" },
      { status: 500 }
    );
  }
}

// DELETE jenis-kelamin
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const axiosAuth = await createAxiosWithAuth();
  try {
    const res = await axiosAuth.delete(`jenis_kelamin/${params.id}`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(
      "Failed to delete Jenis Kelamin:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to delete Jenis Kelamin" },
      { status: 500 }
    );
  }
}
