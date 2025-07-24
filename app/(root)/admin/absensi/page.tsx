"use client";

import { useEffect, useState } from "react";
import { TableData } from "@/components/TableData";
import { absensi } from "./columns";
import { DataAbsensi } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

function formatTime(datetime: string): string {
  const date = new Date(datetime);
  return date.toLocaleString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateTime(datetime: string): string {
  const date = new Date(datetime);
  return date.toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AbsensiPage() {
  const [data, setData] = useState<DataAbsensi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbsensi = async () => {
      try {
        const res = await fetch("/api/data/absensi");
        if (!res.ok) throw new Error("Gagal ambil data absensi");

        const rawData = await res.json();
        const mappedData = rawData.map((item: any) => ({
          id: item.id,
          name: item.user_id?.name || "-",
          tanggal: formatDateTime(item.tanggal),
          clock_in_time: item.clock_in_time
            ? formatTime(item.clock_in_time)
            : "--:--",
          clock_out_time: item.clock_out_time
            ? formatTime(item.clock_out_time)
            : "--:--",
          status: item.status_absensi.name || "",
        }));

        setData(mappedData);
      } catch (err) {
        console.error("❌ Gagal fetch absensi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbsensi();
  }, []);

  return loading ? (
    <Skeleton className="h-full w-full rounded-3xl" />
  ) : (
    <div className="w-full h-full bg-[#CDF9EF] rounded-3xl">
      <TableData columns={absensi} data={data} />
    </div>
  );
}
