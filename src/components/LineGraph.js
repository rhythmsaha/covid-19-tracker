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
  Filler,
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
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const LineGraph = () => {
  const [data, setData] = useState({});

  const buildChartData = (data) => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data) {
      if (lastDataPoint !== undefined) {
        const num = data[date] - lastDataPoint;
        const newDataPoint = {
          x: date,
          y: num > 0 ? num : 0,
        };

        chartData.push(newDataPoint);
      }

      lastDataPoint = data[date];
    }

    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((res) => res.json())
        .then((data) => {
          const caseChartData = buildChartData(data.cases);
          const recoveredChartData = buildChartData(data.recovered);
          const deathsData = buildChartData(data.deaths);
          setData((prev) => ({
            cases: caseChartData,
            recovered: recoveredChartData,
            deaths: deathsData,
          }));
        });
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <Line
        data={{
          datasets: [
            {
              id: "cases",
              label: "Cases",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              borderColor: "rgba(53, 162, 235, 0.5)",
              data: data.cases,
              fill: true,
            },
          ],
        }}
        options={options}
      />

      <Line
        data={{
          datasets: [
            {
              id: "Deaths",
              label: "Deaths",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 0.5)",
              data: data.deaths,
              fill: true,
            },
          ],
        }}
        // options={options}
      />
      <Line
        data={{
          datasets: [
            {
              id: "Recovered",
              label: "Recovered",
              backgroundColor: "rgba(0, 255, 110, 0.2)",
              borderColor: "rgb(0, 255, 110, 0.2)",
              data: data.recovered,
              fill: true,
            },
          ],
        }}
        // options={options}
      />
    </div>
  );
};

export default LineGraph;
