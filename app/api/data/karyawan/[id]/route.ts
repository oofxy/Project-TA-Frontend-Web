import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const axios = await createAxiosWithAuth();

    const [karyawanRes, anakRes] = await Promise.all([
      axios.get(`karyawan/${params.id}`),
      axios.get(`anak/${params.id}`).catch((err) => {
        if (err.response?.status === 404) return { data: [] };
        throw err;
      }),
    ]);

    return NextResponse.json({
      success: true,
      karyawan: karyawanRes.data,
      anak: anakRes.data,
    });
  } catch (error: any) {
    console.error("Gagal ambil data karyawan dari API route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.response?.data?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const axios = await createAxiosWithAuth();
    const body = await req.json();

    const res = await axios.patch(`karyawan/${params.id}`, body);

    return NextResponse.json({
      success: true,
      message: "Data karyawan berhasil diupdate",
      data: res.data,
    });
  } catch (error: any) {
    console.error("Gagal update data karyawan:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.response?.data?.message ||
          "Gagal update data. Internal Server Error.",
      },
      { status: error?.response?.status || 500 }
    );
  }
}
