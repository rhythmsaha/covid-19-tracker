import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const LineGraph = () => {
  const [data, setData] = useState({});

  const buildChartData = (data, caseTypes = "cases") => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[caseTypes][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[caseTypes][date];
    }

    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=60")
        .then((res) => res.json())
        .then((data) => {
          const chartData = buildChartData(data);
          setData(chartData);
        });
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      <h1>I am a graph</h1>

      <Line
        data={{
          datasets: [
            {
              label: "Cases",
              backgroundColor: "rgba(204, 16, 52, 0.5)",
              borderColor: "#cc1034",
              data: data,
            },
          ],
        }}
        // options={options}
      />
    </div>
  );
};

export default LineGraph;
