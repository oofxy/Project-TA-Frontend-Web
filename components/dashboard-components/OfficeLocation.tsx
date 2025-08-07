"use client";

import { useEffect, useState } from "react";

interface OfficeLocation {
  id: string;
  name: string;
  alamat: string;
}

interface Employee {
  lokasi_kantor: { id: string; name: string; alamat: string } | null;
}

export const OfficeLocationCards = () => {
  const [locations, setLocations] = useState<OfficeLocation[]>([]);
  const [employeeCounts, setEmployeeCounts] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      const resLocations = await fetch("/api/data/data-master/lokasi-kantor");
      const lokasiData: OfficeLocation[] = await resLocations.json();
      setLocations(lokasiData);

      const resEmployees = await fetch("/api/data/karyawan");
      const employeeData: Employee[] = await resEmployees.json();

      const counts: Record<string, number> = {};
      lokasiData.forEach((loc) => (counts[loc.id] = 0));

      employeeData.forEach((emp) => {
        const lokasiId = emp.lokasi_kantor?.id;
        if (lokasiId && counts[lokasiId] !== undefined) {
          counts[lokasiId] += 1;
        }
      });

      setEmployeeCounts(counts);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-2 items-start p-3 rounded-lg w-full border shadow">
      <h2 className="mb-4 text-center font-bold">Lokasi Kantor</h2>
      {locations.map((loc) => (
        <div key={loc.id} className="flex flex-col items-start">
          <h3 className="font-semibold text-gray-700">{loc.name}</h3>
          <p className=" font-normal text-gray-600">{loc.alamat}</p>
        </div>
      ))}
    </div>
  );
};
