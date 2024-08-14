import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const PieActiveArc = () => {
  const data = [
    { id: 0, value: 10, label: "Series A" },
    { id: 1, value: 15, label: "Series B" },
    { id: 2, value: 20, label: "Series C" },
  ];

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={200}
    />
  );
};

export default PieActiveArc;
