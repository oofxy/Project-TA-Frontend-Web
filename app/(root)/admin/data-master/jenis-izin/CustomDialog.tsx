"use client";

import { useState, ReactNode } from "react";

interface CustomDialogProps {
  children: ReactNode;
  jenisIzin?: any;
  mode: "add" | "edit";
}

export default function CustomDialog({
  children,
  jenisIzin,
  mode,
}: CustomDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    jenisIzin: jenisIzin?.jenisIzin || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Di sini Anda bisa menambahkan kode untuk menyimpan data ke API atau database
      console.log("Data yang dikirim:", formData);

      // Tutup dialog setelah berhasil
      setIsOpen(false);

      // Reset form jika mode add
      if (mode === "add") {
        setFormData({ jenisIzin: "" });
      }

      // Tambahkan notifikasi sukses jika diperlukan
      alert(
        `Jenis Izin berhasil ${mode === "add" ? "ditambahkan" : "diperbarui"}`
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {mode === "add" ? "Tambah" : "Edit"} Jenis Izin
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Jenis Izin
                </label>
                <input
                  type="text"
                  value={formData.jenisIzin}
                  onChange={(e) =>
                    setFormData({ ...formData, jenisIzin: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Masukkan nama jenis izin"
                  title="Nama Jenis Izin"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  {mode === "add" ? "Simpan" : "Perbarui"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
