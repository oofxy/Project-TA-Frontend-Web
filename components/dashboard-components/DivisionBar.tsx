"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Employee {
  divisi: { name: string };
}

export const DivisionBar = () => {
  const [divisionCounts, setDivisionCounts] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/data/karyawan");
      const data: Employee[] = await res.json();

      const counts: Record<string, number> = {};
      data.forEach((emp) => {
        const divisi = emp.divisi?.name || "Tidak Diketahui";
        counts[divisi] = (counts[divisi] || 0) + 1;
      });

      setDivisionCounts(counts);
    };

    fetchData();
  }, []);

  const labels = Object.keys(divisionCounts);
  const values = Object.values(divisionCounts);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Jumlah Karyawan",
        data: values,
        backgroundColor: "#17876E",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-2 items-center p-3 rounded-lg w-full border shadow">
      <h2 className="mb-4 text-center font-bold">Distribusi Divisi</h2>
      <div className="h-48">
        <Bar
          data={chartData}
          options={{
            plugins: { legend: { display: false } },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                ticks: {
                  stepSize: 1,
                  callback: function (value) {
                    return Number.isInteger(value) ? value : "";
                  },
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};
