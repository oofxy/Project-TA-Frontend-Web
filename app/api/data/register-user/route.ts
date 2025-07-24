import { createAxiosWithAuth } from "@/lib/axiosAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const axios = await createAxiosWithAuth();
  try {
    const [usersRes, karyawanRes] = await Promise.all([
      axios.get("user"),
      axios.get("karyawan"),
    ]);

    return NextResponse.json({
      success: true,
      users: usersRes.data,
      karyawans: karyawanRes.data,
    });
  } catch (error: any) {
    console.error("GET error:", error?.response?.data || error.message);
    return NextResponse.json(
      { success: false, error: "Gagal ambil data user/karyawan" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const axios = await createAxiosWithAuth();

  try {
    const payload = {
      karyawan_id: body.karyawanId,
      name: body.name,
      email: body.email,
      password: body.password,
    };

    const res = await axios.post("user", payload);
    return NextResponse.json({
      success: true,
      data: res.data,
      message: "User registered successfully",
    });
  } catch (error: any) {
    console.error("Register error:", error?.response?.data || error.message);
    return NextResponse.json(
      {
        success: false,
        error: error?.response?.data?.message || "Registration failed",
      },
      { status: 500 }
    );
  }
}
