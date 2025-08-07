"use client";

import { DoughnutChartProps } from "@/types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const GenderChart = ({ gender }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "Orang",
        data: gender,
        backgroundColor: ["#0747b6", "#ff8282"],
      },
    ],
    labels: ["Pria", "Wanita"],
  };

  return (
    <div className="w-48 h-48">
      <Doughnut
        data={data}
        options={{
          cutout: "60%",
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
