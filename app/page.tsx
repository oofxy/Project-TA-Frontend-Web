"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-2xl font-bold">Selamat Datang di Tiga Pilar Web</h1>
      <p className="text-gray-600">Pilih akses sesuai kebutuhan kamu</p>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.push("/form/personal-data")}
          className="px-4 py-2 rounded-xl bg-[#17876E] text-white hover:bg-[#17876E]/90 transition"
        >
          Pengisian Data Karyawan
        </button>
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 rounded-xl bg-[#17876E] text-white hover:bg-[#17876E]/90 transition"
        >
          Admin Login
        </button>
      </div>
    </main>
  );
}
