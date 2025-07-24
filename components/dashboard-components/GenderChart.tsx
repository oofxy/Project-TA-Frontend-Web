"use client";

import { DoughnutChartProps } from "@/types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderChart = ({ gender }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "Orang",
        data: gender,
        backgroundColor: ["#0747b6", "#2265d8"],
      },
    ],
    labels: ["Pria", "Wanita"],
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: { display: false },
        },
      }}
    />
  );
};

export default GenderChart;
