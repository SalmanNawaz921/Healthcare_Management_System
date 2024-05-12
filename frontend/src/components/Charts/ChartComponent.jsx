import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js

export default function ChartComponent({
  backgroundColor,
  borderColor,
  labels,
  label,
  data,
}) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy previous chart instance
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: label,
              data: data || [
                4500, 5600, 3200, 4800, 5100, 6300, 3200, 4300, 5600, 4670,
                1200, 5000,
              ],
              backgroundColor: backgroundColor || "rgb(137, 190, 197, 1)", // Default to blue color if not provided
              borderColor: borderColor || "rgb(137, 190, 197, 1)", // Default to blue color if not provided
              borderWidth: 1,
              // barPercentage: 0.9,
              hoverBackgroundColor: "#81f99a",
              barThickness: 13,
              // categorySpacing: 10, // Set the spacing between bars in the same category group
              borderRadius: 10,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: false, // Hide x-axis labels
              // stacked: true,
            },
            y: {
              display: false, // Hide y-axis labels
              // stacked: true,
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend
            },
          },

          responsive: true,
          maintainAspectRatio: false, // Allow smaller chart size
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Cleanup on component unmount
      }
    };
  }, [backgroundColor, borderColor]); // Include props in dependency array

  return <canvas ref={chartRef} width={100} height={50}></canvas>; // Smaller canvas size
}
