import { DataKaryawan, DataAnak } from "@/types";
import ViewData from "./view-data";
import { fetchSelectOptions, getDataKaryawan, getAnakByKaryawanId } from "@/data/data-karyawan";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  try {
    const [karyawanResponse, selectOptionsResponse, childrenResponse] = await Promise.allSettled([
      getDataKaryawan(),
      fetchSelectOptions(),
      getAnakByKaryawanId(id),
    ]);

    if (karyawanResponse.status === "rejected") {
      console.error("Failed to fetch karyawan data:", karyawanResponse.reason);
      throw new Error("Gagal memuat data karyawan");
    }

    if (selectOptionsResponse.status === "rejected") {
      console.error("Failed to fetch select options:", selectOptionsResponse.reason);
      throw new Error("Gagal memuat opsi pilihan");
    }

    const karyawan: DataKaryawan[] = karyawanResponse.value;
    const data = karyawan.find((item) => item.id === id);

    if (!data) {
      notFound();
    }

    const children: DataAnak[] = childrenResponse.status === "fulfilled" ? childrenResponse.value : [];

    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <ViewData 
          data={data}
          children={children}
          selectOptions={selectOptionsResponse.value}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Error in Page component:", error);
    throw error;
  }
}

function LoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      <Skeleton className="h-12 w-64 mb-8" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4 p-6 border rounded-xl">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(8)].map((_, j) => (
              <div key={j} className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}